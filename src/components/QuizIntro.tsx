import { LIKERT_OPTIONS, QUIZ_QUESTIONS, QUESTIONS_PER_PROFILE } from '@/constants/questions';
import { QUIZ_PROFILES } from '@/constants/profiles';

const REFLECTION_PROMPTS = [
  'Comment est-ce que je réagis face à de nouvelles informations ou à des concepts inconnus ?',
  'Ai-je tendance à travailler seul·e ou en équipe ?',
  'Est-ce que je cherche la perfection ou suis-je plutôt flexible dans mes apprentissages ?',
  'Comment mes émotions influencent-elles mon apprentissage ?',
  'Suis-je motivé·e par la pratique, l’action ou plutôt par la réflexion et l’analyse ?',
  'Est-ce que je m’adapte facilement aux méthodes ou est-ce que je suis mon propre chemin ?',
  'Comment je gère les défis, les erreurs ou les situations nouvelles ?',
];

export function QuizIntro() {
  return (
    <section className="space-y-8 rounded-lg border border-border bg-card p-6 shadow-sm">
      <header className="space-y-3 text-center sm:text-left">
        <p className="text-sm uppercase tracking-wider text-muted-foreground">Questionnaire</p>
        <h2 className="text-2xl font-semibold sm:text-3xl">Explorez votre profil identitaire d’apprentissage</h2>
        <p className="text-base text-muted-foreground">
          Auto-évaluez-vous à travers {QUIZ_QUESTIONS.length} affirmations réparties sur{' '}
          {QUIZ_PROFILES.length} profils ({QUESTIONS_PER_PROFILE} questions chacun). Répondez selon ce
          que vous vivez habituellement, pas ce que vous aimeriez faire. Une fois terminé, découvrez vos
          profils dominants et secondaires.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Questions pour lancer la réflexion</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {REFLECTION_PROMPTS.map((prompt) => (
              <li key={prompt} className="rounded-md bg-muted/60 p-3">
                {prompt}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Échelle de réponse</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {LIKERT_OPTIONS.map((option) => (
              <li key={option.value} className="rounded-md border border-border/60 p-3">
                <span className="font-medium text-foreground">{option.title}</span>
                <br />
                {option.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

