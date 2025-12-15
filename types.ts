export enum NavigationTab {
  DASHBOARD = 'dashboard',
  CALENDAR = 'calendar',
  EDUCATION = 'education',
  SCANNER = 'scanner',
  PROGRESS = 'progress',
  AI_CONSULTANT = 'ai_consultant',
  PROFILE = 'profile',
}

export interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: 'wash' | 'moisturize' | 'protect' | 'style' | 'treatment';
}

export interface HairStats {
  hairType: string;
  porosity: 'Low' | 'Medium' | 'High';
  density: 'Low' | 'Medium' | 'High';
  lastWashDay: string; // ISO Date
  streak: number;
}

export interface ChartDataPoint {
  date: string;
  length: number; // in inches or cm
  hydration: number; // 1-10 scale
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface HairTypeInfo {
  id: string;
  type: string;
  description: string;
  careTips: string[];
  imageUrl: string;
}

export interface DiagnosticResult {
  hairType: 'Type 1' | 'Type 2' | 'Type 3' | 'Type 4';
  porosity: 'Low' | 'Medium' | 'High';
  density: 'Low' | 'Medium' | 'High';
  texture: 'Fine' | 'Medium' | 'Coarse';
  recommendations: {
    routine: string;
    ingredientsToLove: string[];
    ingredientsToAvoid: string[];
    stylingTip: string;
  };
}

export interface IngredientAnalysis {
  name: string;
  function: string;
  suitability: 'Good' | 'Caution' | 'Avoid' | 'Neutral';
  description: string;
}

export interface ProductAnalysisResult {
  productName: string;
  overallVerdict: string;
  ingredients: IngredientAnalysis[];
}
