import { QUIZ_PROFILES } from '@/constants/profiles';
import {
  MAX_SCORE_PER_PROFILE,
  MAX_SCORE_PER_QUESTION,
  QUIZ_QUESTIONS,
  QUESTIONS_PER_PROFILE,
} from '@/constants/questions';
import type { ProfileScore, QuizResultSummary } from '@/types/result';
import type { ProfileId } from '@/types/question';

export interface QuizAnswer {
  questionId: string;
  value: number;
}

const SECONDARY_THRESHOLD = 10; // percentage points

const questionIndex = new Map(QUIZ_QUESTIONS.map((question) => [question.id, question]));

const createEmptyScoreMap = (): Record<ProfileId, number> =>
  Object.fromEntries(QUIZ_PROFILES.map((profile) => [profile.id, 0])) as Record<ProfileId, number>;

const clampValue = (value: number) => {
  if (Number.isNaN(value)) return 0;
  return Math.min(Math.max(value, 0), MAX_SCORE_PER_QUESTION);
};

export function computeProfileScores(answers: QuizAnswer[]): ProfileScore[] {
  const aggregated = createEmptyScoreMap();

  for (const answer of answers) {
    const question = questionIndex.get(answer.questionId);
    if (!question) continue;

    aggregated[question.profileId] += clampValue(answer.value);
  }

  return Object.entries(aggregated).map(([profileId, total]) => ({
    profileId: profileId as ProfileId,
    total,
    percentage: Number(((total / MAX_SCORE_PER_PROFILE) * 100).toFixed(2)),
  }));
}

export function summarizeResult(answers: QuizAnswer[]): QuizResultSummary {
  const scores = computeProfileScores(answers).sort((a, b) => b.percentage - a.percentage);

  const dominant = scores[0] ?? {
    profileId: QUIZ_PROFILES[0]!.id,
    total: 0,
    percentage: 0,
  };

  const secondary = scores
    .slice(1)
    .filter((score) => dominant.percentage - score.percentage <= SECONDARY_THRESHOLD);

  return { scores, dominant, secondary };
}

export function isQuizComplete(answers: QuizAnswer[]): boolean {
  const answeredIds = new Set(answers.map((answer) => answer.questionId));
  return QUIZ_QUESTIONS.every((question) => answeredIds.has(question.id));
}

export function expectedQuestionsCount(): number {
  return QUIZ_QUESTIONS.length;
}

export function expectedAnswersPerProfile(): number {
  return QUESTIONS_PER_PROFILE;
}

