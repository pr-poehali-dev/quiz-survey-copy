export interface Question {
  id: number;
  text: string;
  options: { id: string; text: string; score: number }[];
  category: string;
}

export interface QuizResult {
  category: string;
  score: number;
  percentage: number;
  description: string;
  recommendations: string[];
  strengths: string[];
  developmentAreas: string[];
}

export interface PersonalProfile {
  dominantTrait: string;
  personalityType: string;
  careerPath: string[];
  overallRecommendations: string[];
}

export type ScreenType = 'welcome' | 'quiz' | 'results';