import { useState, useCallback } from "react";
import { Loader2, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import type { AnalysisResult } from "@/types/analysis";

interface ResumeUploaderProps {
  onAnalysisComplete: (analysis: AnalysisResult) => void;
}

export const ResumeUploader = ({ onAnalysisComplete }: ResumeUploaderProps) => {
  const [resumeText, setResumeText] = useState("");
  const [jobRequirements, setJobRequirements] = useState(
    "Python, Flask, Docker, REST API, Problem-solving, Communication, Teamwork, Git, Linux, JavaScript, React, TypeScript, Node.js, AWS, SQL, MongoDB"
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file) return;

    const validTypes = ['text/plain', 'application/pdf'];
    const fileName = file.name.toLowerCase();
    
    if (!fileName.endsWith('.txt') && !fileName.endsWith('.pdf')) {
      toast.error("Please upload a TXT or PDF file");
      return;
    }

    setIsUploading(true);

    try {
      if (fileName.endsWith('.txt')) {
        // Read TXT file directly
        const text = await file.text();
        if (text && text.trim()) {
          setResumeText(text);
          toast.success("Resume loaded successfully! Text box is now filled.");
        } else {
          toast.error("File appears to be empty. Please check your file.");
        }
      } else if (fileName.endsWith('.pdf')) {
        // For PDF, upload to Flask backend
        const formData = new FormData();
        formData.append('file', file);

        const flaskBackendUrl = import.meta.env.VITE_FLASK_BACKEND_URL || 'http://localhost:5000';
        const response = await fetch(`${flaskBackendUrl}/upload`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to upload PDF file');
        }

        const data = await response.json();
        if (data.text && data.text.trim()) {
          setResumeText(data.text);
          toast.success("PDF processed successfully! Text box is now filled.");
        } else {
          throw new Error("No text extracted from PDF or file is empty");
        }
      }
    } catch (error) {
      console.error('File upload error:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to process file. Please try pasting the text manually.";
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
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
      toast.error("Please upload a resume file (TXT or PDF) first");
      return;
    }

    if (!jobRequirements.trim()) {
      toast.error("Please enter job requirements");
      return;
    }

    setIsAnalyzing(true);

    try {
      // Use Flask backend (default) or Supabase if configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const flaskBackendUrl = import.meta.env.VITE_FLASK_BACKEND_URL || 'http://localhost:5000';
      
      let data;
      
      if (supabaseUrl) {
        // Use Supabase if configured
        const { supabase } = await import("@/integrations/supabase/client");
        const result = await supabase.functions.invoke('analyze-resume', {
          body: { resumeText, jobRequirements }
        });
        
        if (result.error) throw result.error;
        data = result.data;
      } else {
        // Use Flask backend
        const response = await fetch(`${flaskBackendUrl}/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resumeText,
            jobRequirements
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();
      }

      if (!data || !data.extractedSkills) {
        throw new Error("Invalid response from server. Please try again.");
      }

      toast.success("Resume analyzed successfully!");
      onAnalysisComplete(data);
    } catch (error) {
      console.error('Analysis error:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to analyze resume. Make sure the Flask backend is running on port 5000.";
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
        <div className="p-6 text-center">
          <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="text-lg font-semibold mb-2">
            Upload Resume File {resumeText.trim() ? "✓" : ""}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your resume file or click to browse
          </p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".txt,.pdf"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
            disabled={isUploading}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Browse Files
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Supported formats: TXT, PDF
          </p>
        </div>
      </Card>

      <div className="space-y-4">

        <div>
          <label className="text-sm font-medium mb-2 block">
            Job Requirements (comma-separated skills)
          </label>
          <Textarea
            placeholder="Enter comma-separated skills..."
            value={jobRequirements}
            onChange={(e) => setJobRequirements(e.target.value)}
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Default skills are pre-filled. Edit as needed for your target job.
          </p>
        </div>

        <Button
          onClick={analyzeResume}
          disabled={isAnalyzing || !resumeText.trim()}
          className="w-full"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing with AI...
            </>
          ) : !resumeText.trim() ? (
            "⚠️ Please upload a resume file first"
          ) : (
            "🚀 Analyze Resume"
          )}
        </Button>
        {!resumeText.trim() && (
          <p className="text-xs text-amber-600 text-center mt-2">
            ⚠️ Please upload a resume file (TXT or PDF) to continue
          </p>
        )}
      </div>
    </div>
  );
};