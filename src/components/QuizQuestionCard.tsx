import { LIKERT_OPTIONS } from '@/constants/questions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { QuizQuestion } from '@/types/question';

interface QuizQuestionCardProps {
  question: QuizQuestion;
  profileName: string;
  currentValue: number | undefined;
  onSelect: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
  isFirst: boolean;
  isLast: boolean;
  canProceed: boolean;
}

export function QuizQuestionCard({
  question,
  profileName,
  currentValue,
  onSelect,
  onNext,
  onPrevious,
  onFinish,
  isFirst,
  isLast,
  canProceed,
}: QuizQuestionCardProps) {
  return (
    <Card className="border border-border/80 shadow-lg">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle className="text-xl sm:text-2xl">{question.prompt}</CardTitle>
            <CardDescription>Profil associé : {profileName}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <RadioGroup
          value={currentValue !== undefined ? String(currentValue) : undefined}
          onValueChange={(value) => onSelect(Number(value))}
          className="grid gap-3"
        >
          {LIKERT_OPTIONS.map((option) => (
            <div
              key={option.value}
              className="flex items-start gap-3 rounded-lg border border-border/80 bg-card/60 p-3 transition hover:border-primary"
            >
              <RadioGroupItem id={`likert-${question.id}-${option.value}`} value={String(option.value)} />
              <Label
                htmlFor={`likert-${question.id}-${option.value}`}
                className="cursor-pointer space-y-1 text-sm leading-tight"
              >
                <span className="block font-medium text-foreground">{option.title}</span>
                <span className="block text-muted-foreground">{option.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPrevious} disabled={isFirst}>
            Question précédente
          </Button>
          {!isLast ? (
            <Button onClick={onNext} disabled={!canProceed}>
              Question suivante
            </Button>
          ) : null}
        </div>
        {isLast ? (
          <Button onClick={onFinish} disabled={!canProceed} variant="default">
            Voir mon profil
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

