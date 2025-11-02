import { CheckCircle2, XCircle, Lightbulb, GraduationCap, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { AnalysisResult } from "@/types/analysis";

interface AnalysisResultsProps {
  analysis: AnalysisResult;
  onReset: () => void;
}

export const AnalysisResults = ({ analysis, onReset }: AnalysisResultsProps) => {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-accent";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Analysis Results</h2>
        <Button variant="outline" onClick={onReset}>
          Analyze Another Resume
        </Button>
      </div>

      {/* Match Score Card */}
      <Card className="border-2 shadow-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Overall Match Score</p>
              <div className={`text-6xl font-bold ${getScoreColor(analysis.matchPercentage)}`}>
                {analysis.matchPercentage}%
              </div>
            </div>
            <Progress value={analysis.matchPercentage} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {analysis.matchPercentage >= 80 && "Excellent match! Your skills align very well."}
              {analysis.matchPercentage >= 60 && analysis.matchPercentage < 80 && "Good match with room for improvement."}
              {analysis.matchPercentage < 60 && "Consider developing additional skills for this role."}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-accent">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Matched Skills ({analysis.matchedSkills.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.matchedSkills.map((skill, idx) => (
                <Badge key={idx} variant="default" className="bg-accent">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missing Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <XCircle className="mr-2 h-5 w-5" />
              Missing Skills ({analysis.missingSkills.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.missingSkills.map((skill, idx) => (
                <Badge key={idx} variant="outline" className="border-destructive text-destructive">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Extracted Skills */}
      <Card>
        <CardHeader>
          <CardTitle>All Extracted Skills ({analysis.extractedSkills.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {analysis.extractedSkills.map((skill, idx) => (
              <Badge key={idx} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience & Education */}
      {(analysis.experienceSummary || analysis.educationSummary) && (
        <div className="grid md:grid-cols-2 gap-6">
          {analysis.experienceSummary && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Experience Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{analysis.experienceSummary}</p>
              </CardContent>
            </Card>
          )}

          {analysis.educationSummary && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Education Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{analysis.educationSummary}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Suggestions */}
      {analysis.suggestions && analysis.suggestions.length > 0 && (
        <Card className="border-warning/50">
          <CardHeader>
            <CardTitle className="flex items-center text-warning">
              <Lightbulb className="mr-2 h-5 w-5" />
              Improvement Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.suggestions.map((suggestion, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-warning mr-2">•</span>
                  <span className="text-sm">{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};