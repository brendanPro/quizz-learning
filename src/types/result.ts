import type { ProfileId } from './question';

export interface ProfileMeta {
  id: ProfileId;
  name: string;
  archetype: string;
  characteristics: string;
  learningStyle: string;
  strengths: string;
  risks: string;
}

export interface ProfileScore {
  profileId: ProfileId;
  total: number;
  percentage: number;
}

export interface QuizResultSummary {
  scores: ProfileScore[];
  dominant: ProfileScore;
  secondary: ProfileScore[];
}

