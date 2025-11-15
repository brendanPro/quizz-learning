import { cn } from '@/lib/utils';

interface QuizProgressProps {
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  currentProfileLabel: string;
}

export function QuizProgress({
  currentIndex,
  totalQuestions,
  answeredCount,
  currentProfileLabel,
}: QuizProgressProps) {
  const answeredPercentage = Math.round((answeredCount / totalQuestions) * 100);
  const currentPercentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="space-y-3 rounded-lg border border-border bg-card/60 p-4 text-sm shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-medium text-foreground">
          Question {currentIndex + 1} sur {totalQuestions}
        </span>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wide text-secondary-foreground">
          Profil {currentProfileLabel}
        </span>
      </div>
      <div className="space-y-1">
        <Progress value={currentPercentage} label="Progression du questionnaire" />
        <p className="text-xs text-muted-foreground">
          {answeredCount} réponses enregistrées ({answeredPercentage}%)
        </p>
      </div>
    </div>
  );
}

interface ProgressProps {
  value: number;
  label?: string;
}

function Progress({ value, label }: ProgressProps) {
  return (
    <div className="space-y-1">
      {label ? (
        <p id="quiz-progress-label" className="sr-only">
          {label}
        </p>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-labelledby={label ? 'quiz-progress-label' : undefined}
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className={cn('h-full bg-primary transition-all duration-300')}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

