export type ProfileId =
  | 'enthusiast'
  | 'dynamic'
  | 'intellectual'
  | 'rebel'
  | 'perfectionist'
  | 'amiable'
  | 'emotional';

export interface QuizQuestion {
  id: string;
  prompt: string;
  profileId: ProfileId;
}

export interface LikertOption {
  value: number;
  title: string;
  description: string;
}

