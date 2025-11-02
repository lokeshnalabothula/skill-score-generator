import { useState } from "react";
import { FileSearch, Sparkles } from "lucide-react";
import { ResumeUploader } from "@/components/ResumeUploader";
import { AnalysisResults } from "@/components/AnalysisResults";
import type { AnalysisResult } from "@/types/analysis";

const Index = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
              <FileSearch className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Resume Analyzer
              </h1>
              <p className="text-sm text-muted-foreground">
                Powered by Advanced AI Technology
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {!analysis ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Analysis</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Analyze Your Resume
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Instantly with AI
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload your resume and get instant AI-powered insights on skill matching,
                experience analysis, and personalized improvement suggestions.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  title: "Smart Extraction",
                  description: "AI extracts skills, experience, and education automatically",
                },
                {
                  title: "Skill Matching",
                  description: "Compare your skills against job requirements instantly",
                },
                {
                  title: "AI Suggestions",
                  description: "Get personalized recommendations to improve your resume",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-card p-4 rounded-lg border shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Uploader */}
            <ResumeUploader onAnalysisComplete={setAnalysis} />
          </div>
        ) : (
          <AnalysisResults analysis={analysis} onReset={() => setAnalysis(null)} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript, and Lovable AI • Secure & Private Analysis
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;