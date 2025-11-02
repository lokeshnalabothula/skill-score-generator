import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText, jobRequirements } = await req.json();
    console.log("Analyzing resume with AI...");

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert resume analyzer. Analyze the provided resume text and extract:
1. Skills (technical and soft skills)
2. Education details
3. Work experience highlights
4. Key qualifications

Then compare against the job requirements provided and return a structured JSON response with:
- extractedSkills: array of skills found
- matchedSkills: array of skills that match job requirements
- missingSkills: array of required skills not found
- matchPercentage: number (0-100)
- suggestions: array of improvement suggestions
- experienceSummary: brief summary of experience
- educationSummary: brief summary of education

Be thorough and accurate in skill extraction.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Resume Text:\n${resumeText}\n\nJob Requirements:\n${jobRequirements}\n\nPlease analyze and return JSON only.`
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service requires additional credits.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from AI service');
    }
    
    const content = data.choices[0].message.content;
    
    if (!content) {
      throw new Error('Empty response from AI service');
    }
    
    // Parse JSON from response - try to extract JSON object
    let jsonMatch = content.match(/\{[\s\S]*\}/);
    
    // If no JSON found, try parsing the whole content
    if (!jsonMatch) {
      try {
        const parsed = JSON.parse(content);
        jsonMatch = [JSON.stringify(parsed)];
      } catch {
        throw new Error('Failed to extract JSON from AI response. Response: ' + content.substring(0, 200));
      }
    }
    
    let analysis;
    try {
      analysis = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      throw new Error('Failed to parse AI response as JSON');
    }
    
    // Validate required fields
    if (!analysis.extractedSkills || !Array.isArray(analysis.extractedSkills)) {
      analysis.extractedSkills = [];
    }
    if (!analysis.matchedSkills || !Array.isArray(analysis.matchedSkills)) {
      analysis.matchedSkills = [];
    }
    if (!analysis.missingSkills || !Array.isArray(analysis.missingSkills)) {
      analysis.missingSkills = [];
    }
    if (typeof analysis.matchPercentage !== 'number') {
      analysis.matchPercentage = 0;
    }
    if (!analysis.suggestions || !Array.isArray(analysis.suggestions)) {
      analysis.suggestions = [];
    }
    
    console.log("Analysis complete:", analysis);

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-resume function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});