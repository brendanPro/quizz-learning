import { describe, expect, it } from 'vitest';

import { QUIZ_PROFILES } from '@/constants/profiles';
import {
  MAX_SCORE_PER_PROFILE,
  QUIZ_QUESTIONS,
  QUESTIONS_PER_PROFILE,
} from '@/constants/questions';

import {
  computeProfileScores,
  expectedAnswersPerProfile,
  expectedQuestionsCount,
  isQuizComplete,
  summarizeResult,
  type QuizAnswer,
} from './scoring';

describe('scoring utilities', () => {
  const buildAnswers = (value: number): QuizAnswer[] =>
    QUIZ_QUESTIONS.map((question) => ({
      questionId: question.id,
      value,
    }));

  it('computes profile scores and percentages', () => {
    const answers = buildAnswers(3);
    const scores = computeProfileScores(answers);

    expect(scores).toHaveLength(QUIZ_PROFILES.length);

    for (const score of scores) {
      expect(score.total).toBe(QUIZ_QUESTIONS.filter((question) => question.profileId === score.profileId).length * 3);
      expect(score.percentage).toBeCloseTo((score.total / MAX_SCORE_PER_PROFILE) * 100, 2);
      expect(score.percentage).toBeLessThanOrEqual(100);
      expect(score.percentage).toBeGreaterThanOrEqual(0);
    }
  });

  it('identifies dominant and secondary profiles', () => {
    const answers: QuizAnswer[] = [
      ...QUIZ_QUESTIONS.filter((question) => question.profileId === QUIZ_PROFILES[0]!.id).map(
        (question) => ({ questionId: question.id, value: 5 }),
      ),
      ...QUIZ_QUESTIONS.filter((question) => question.profileId === QUIZ_PROFILES[1]!.id).map(
        (question) => ({ questionId: question.id, value: 5 }),
      ),
    ];

    const summary = summarizeResult(answers);

    expect(summary.dominant.profileId).toBe(QUIZ_PROFILES[0]!.id);
    expect(summary.secondary.map((item) => item.profileId)).toContain(QUIZ_PROFILES[1]!.id);
  });

  it('detects quiz completion state', () => {
    const answers = buildAnswers(2);
    expect(isQuizComplete(answers)).toBe(true);

    const missingOne = answers.slice(1);
    expect(isQuizComplete(missingOne)).toBe(false);
  });

  it('exposes expected quiz metrics', () => {
    expect(expectedQuestionsCount()).toBe(QUIZ_QUESTIONS.length);
    expect(expectedAnswersPerProfile()).toBe(QUESTIONS_PER_PROFILE);
  });
});

