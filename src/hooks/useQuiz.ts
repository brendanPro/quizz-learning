import { useCallback, useMemo, useState } from 'react';

import { QUIZ_PROFILES } from '@/constants/profiles';
import { QUIZ_QUESTIONS } from '@/constants/questions';
import { expectedQuestionsCount, isQuizComplete, summarizeResult } from '@/lib/scoring';
import type { QuizAnswer } from '@/lib/scoring';
import type { QuizQuestion } from '@/types/question';
import type { QuizResultSummary } from '@/types/result';

export interface QuizState {
  currentIndex: number;
  currentQuestion: QuizQuestion | undefined;
  answers: QuizAnswer[];
  answeredCount: number;
  totalQuestions: number;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isComplete: boolean;
  isFinished: boolean;
  result: QuizResultSummary | null;
  profiles: typeof QUIZ_PROFILES;
  setAnswer: (question: QuizQuestion, value: number) => void;
  getAnswerValue: (questionId: string) => number | undefined;
  goToNext: () => void;
  goToPrevious: () => void;
  finish: () => void;
  reset: () => void;
}

export function useQuiz(): QuizState {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerMap, setAnswerMap] = useState<Map<string, number>>(new Map());
  const [isFinished, setIsFinished] = useState(false);

  const totalQuestions = expectedQuestionsCount();

  const answers: QuizAnswer[] = useMemo(
    () =>
      Array.from(answerMap.entries()).map(([questionId, value]) => ({
        questionId,
        value,
      })),
    [answerMap],
  );

  const answeredCount = answerMap.size;

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const isComplete = useMemo(() => isQuizComplete(answers), [answers]);

  const result = useMemo<QuizResultSummary | null>(
    () => (isFinished ? summarizeResult(answers) : null),
    [answers, isFinished],
  );

  const setAnswer = useCallback((question: QuizQuestion, value: number) => {
    setAnswerMap((prev) => {
      const next = new Map(prev);
      next.set(question.id, value);
      return next;
    });
  }, []);

  const getAnswerValue = useCallback(
    (questionId: string) => answerMap.get(questionId),
    [answerMap],
  );

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
  }, [totalQuestions]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const finish = useCallback(() => {
    if (isComplete) {
      setIsFinished(true);
    }
  }, [isComplete]);

  const reset = useCallback(() => {
    setAnswerMap(new Map());
    setCurrentIndex(0);
    setIsFinished(false);
  }, []);

  return {
    currentIndex,
    currentQuestion,
    answers,
    answeredCount,
    totalQuestions,
    isFirstQuestion: currentIndex === 0,
    isLastQuestion: currentIndex === totalQuestions - 1,
    isComplete,
    isFinished,
    result,
    profiles: QUIZ_PROFILES,
    setAnswer,
    getAnswerValue,
    goToNext,
    goToPrevious,
    finish,
    reset,
  };
}

