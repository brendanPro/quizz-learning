import { Fragment, useMemo } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { QUIZ_PROFILES } from '@/constants/profiles';
import type { ProfileMeta, QuizResultSummary as QuizResultSummaryType } from '@/types/result';

interface QuizResultSummaryProps {
  summary: QuizResultSummaryType;
  onRestart: () => void;
}

const profileById = new Map(QUIZ_PROFILES.map((profile) => [profile.id, profile]));

export function QuizResultSummary({ summary, onRestart }: QuizResultSummaryProps) {
  const dominantProfile = profileById.get(summary.dominant.profileId);

  const chartData = useMemo(
    () =>
      summary.scores.map((score) => {
        const profile = profileById.get(score.profileId);
        return {
          profileId: score.profileId,
          label: profile?.name ?? score.profileId,
          percentage: Number(score.percentage.toFixed(2)),
        };
      }),
    [summary.scores],
  );

  return (
    <section className="space-y-8">
      <Card className="border border-primary/30 shadow-lg">
        <CardHeader className="space-y-3 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Résultat dominant
          </p>
          <CardTitle className="text-2xl sm:text-3xl">
            {dominantProfile?.name ?? 'Profil dominant'}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {dominantProfile?.archetype}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 text-sm sm:text-base leading-relaxed">
          {dominantProfile ? (
            <Fragment>
              <p>
                <strong>Caractéristiques :</strong> {dominantProfile.characteristics}
              </p>
              <p>
                <strong>Mode d’apprentissage :</strong> {dominantProfile.learningStyle}
              </p>
              <p>
                <strong>Atouts :</strong> {dominantProfile.strengths}
              </p>
              <p>
                <strong>Risques :</strong> {dominantProfile.risks}
              </p>
            </Fragment>
          ) : (
            <p>Complétez le quiz pour découvrir votre profil dominant.</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="text-sm text-muted-foreground">
            Profils secondaires proches :{' '}
            {summary.secondary.length === 0
              ? 'aucun'
              : summary.secondary
                  .map((score) => profileById.get(score.profileId)?.name ?? score.profileId)
                  .join(', ')}
          </div>
          <Button variant="outline" onClick={onRestart}>
            Recommencer le quiz
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <Card className="border border-border/80 bg-card/80">
          <CardHeader>
            <CardTitle>Répartition de vos profils</CardTitle>
            <CardDescription>
              Chaque pourcentage est calculé sur un total maximum de 40 points par profil.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="80%">
                <PolarGrid />
                <PolarAngleAxis dataKey="label" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  formatter={(value: number, _name, item) =>
                    [`${value.toFixed(1)}%`, profileLabel(item.payload.profileId)]
                  }
                />
                <Radar
                  name="Pourcentage"
                  dataKey="percentage"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border/80">
          <CardHeader>
            <CardTitle>Lecture détaillée</CardTitle>
            <CardDescription>
              Explorez l’intensité de chaque profil identitaire pour mieux comprendre vos leviers
              d’apprentissage.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {summary.scores.map((score) => {
              const profile = profileById.get(score.profileId);
              return (
                <div key={score.profileId} className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-medium">
                    <span>{profile?.name ?? score.profileId}</span>
                    <span>{score.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary/80 transition-all"
                      style={{ width: `${Math.min(score.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function profileLabel(profileId: ProfileMeta['id']): string {
  return profileById.get(profileId)?.name ?? profileId;
}

