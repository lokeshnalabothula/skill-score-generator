import { useState, useCallback } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { AnalysisResult } from "@/types/analysis";

interface ResumeUploaderProps {
  onAnalysisComplete: (analysis: AnalysisResult) => void;
}

export const ResumeUploader = ({ onAnalysisComplete }: ResumeUploaderProps) => {
  const [resumeText, setResumeText] = useState("");
  const [jobRequirements, setJobRequirements] = useState(
    "React, TypeScript, Node.js, REST APIs, Git, Problem-solving, Team collaboration"
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    const validTypes = ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a TXT, PDF, or DOCX file");
      return;
    }

    if (file.type === 'text/plain') {
      const text = await file.text();
      setResumeText(text);
      toast.success("Resume loaded successfully!");
    } else {
      toast.info("For PDF/DOCX files, please paste your resume text manually for now");
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      toast.error("Please enter or upload your resume text");
      return;
    }

    if (!jobRequirements.trim()) {
      toast.error("Please enter job requirements");
      return;
    }

    setIsAnalyzing(true);

    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error(
          "Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file."
        );
      }

      const { data, error } = await supabase.functions.invoke('analyze-resume', {
        body: { resumeText, jobRequirements }
      });

      if (error) throw error;

      if (!data || !data.extractedSkills) {
        throw new Error("Invalid response from server. Please try again.");
      }

      toast.success("Resume analyzed successfully!");
      onAnalysisComplete(data);
    } catch (error) {
      console.error('Analysis error:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to analyze resume. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card
        className={`border-2 border-dashed transition-all ${
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your resume or click to browse
          </p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".txt,.pdf,.docx"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <FileText className="mr-2 h-4 w-4" />
            Browse Files
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Supported formats: TXT, PDF, DOCX
          </p>
        </div>
      </Card>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Resume Text
          </label>
          <Textarea
            placeholder="Paste your resume text here or upload a file above..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Job Requirements (comma-separated skills)
          </label>
          <Textarea
            placeholder="e.g., React, TypeScript, Node.js, Problem-solving..."
            value={jobRequirements}
            onChange={(e) => setJobRequirements(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button
          onClick={analyzeResume}
          disabled={isAnalyzing}
          className="w-full"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            "Analyze Resume"
          )}
        </Button>
      </div>
    </div>
  );
};