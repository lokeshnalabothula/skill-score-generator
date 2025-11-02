export interface AnalysisResult {
  extractedSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
  suggestions: string[];
  experienceSummary?: string;
  educationSummary?: string;
}

