import { useMemo } from 'react';

import { QuizIntro } from '@/components/QuizIntro';
import { QuizProgress } from '@/components/QuizProgress';
import { QuizQuestionCard } from '@/components/QuizQuestionCard';
import { QuizResultSummary } from '@/components/QuizResultSummary';
import { useQuiz } from '@/hooks/useQuiz';

export function QuizzLayout() {
  const {
    currentIndex,
    currentQuestion,
    getAnswerValue,
    setAnswer,
    goToNext,
    goToPrevious,
    finish,
    reset,
    isFirstQuestion,
    isLastQuestion,
    answeredCount,
    totalQuestions,
    result,
    isFinished,
    profiles,
  } = useQuiz();

  const profileById = useMemo(
    () => new Map(profiles.map((profile) => [profile.id, profile])),
    [profiles],
  );

  const currentAnswer = currentQuestion ? getAnswerValue(currentQuestion.id) : undefined;
  const currentProfileName = currentQuestion
    ? profileById.get(currentQuestion.profileId)?.name ?? currentQuestion.profileId
    : '';

  const canProceed = currentAnswer !== undefined;

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-4 text-center sm:text-left">
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Quel est mon profil identitaire d’apprentissage ?
        </h1>
        <p className="text-muted-foreground">
          Répondez aux affirmations pour découvrir votre style dominant et vos leviers secondaires
          d’apprentissage.
        </p>
      </header>

      <QuizIntro />

      {isFinished && result ? (
        <QuizResultSummary summary={result} onRestart={reset} />
      ) : (
        <section className="space-y-6">
          {currentQuestion ? (
            <>
              <QuizProgress
                currentIndex={currentIndex}
                totalQuestions={totalQuestions}
                answeredCount={answeredCount}
                currentProfileLabel={currentProfileName}
              />

              <QuizQuestionCard
                question={currentQuestion}
                profileName={currentProfileName}
                currentValue={currentAnswer}
                onSelect={(value) => currentQuestion && setAnswer(currentQuestion, value)}
                onNext={() => {
                  if (canProceed) {
                    goToNext();
                  }
                }}
                onPrevious={goToPrevious}
                onFinish={() => {
                  if (canProceed) {
                    finish();
                  }
                }}
                isFirst={isFirstQuestion}
                isLast={isLastQuestion}
                canProceed={canProceed}
              />
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border/70 bg-card p-8 text-center text-muted-foreground">
              Le questionnaire sera disponible dès que les questions seront chargées.
            </div>
          )}
        </section>
      )}
    </main>
  );
}
