import type { LikertOption, ProfileId, QuizQuestion } from '@/types/question';

export const LIKERT_OPTIONS: LikertOption[] = [
  {
    value: 0,
    title: '0 — Pas du tout',
    description: 'Ce trait n’existe jamais chez moi.',
  },
  {
    value: 1,
    title: '1 — Très rarement',
    description: 'Ce trait existe très peu chez moi.',
  },
  {
    value: 2,
    title: '2 — Rarement',
    description: 'Ce trait se manifeste occasionnellement.',
  },
  {
    value: 3,
    title: '3 — Parfois',
    description: 'Ce trait existe modérément chez moi.',
  },
  {
    value: 4,
    title: '4 — Souvent',
    description: 'Ce trait est fréquent chez moi.',
  },
  {
    value: 5,
    title: '5 — Très souvent',
    description: 'Ce trait est presque toujours présent.',
  },
];

const profileSequences: Record<ProfileId, string[]> = {
  enthusiast: [
    'J’aime découvrir de nouvelles idées ou activités.',
    'Je suis curieux·se et je m’intéresse facilement à de nouveaux sujets.',
    'Je commence souvent des projets avec beaucoup d’énergie.',
    'Je cherche à vivre des expériences enrichissantes et variées.',
    'Je suis optimiste et j’essaie de voir le côté positif des situations.',
    'Je prends facilement l’initiative dans de nouvelles aventures.',
    'Je m’enthousiasme rapidement pour des idées ou projets.',
    'Je m’ennuie si je ne découvre pas de choses nouvelles régulièrement.',
  ],
  dynamic: [
    'J’aime apprendre en pratiquant et en expérimentant.',
    'Je préfère être actif·ve plutôt que de rester assis·e longtemps.',
    'Je prends souvent l’initiative dans les activités ou projets.',
    'J’aime le mouvement et l’action dans mon apprentissage.',
    'Je me sens stimulé·e par l’expérimentation concrète plutôt que par la théorie.',
    'J’ai du mal à rester immobile ou à suivre des routines strictes.',
    'Je préfère apprendre en faisant plutôt qu’en observant.',
    'Je cherche à me dépasser dans les activités pratiques.',
  ],
  intellectual: [
    'J’aime réfléchir avant d’agir et analyser les situations.',
    'Je préfère travailler seul·e pour approfondir mes idées.',
    'J’apprécie la lecture, l’étude ou l’analyse des concepts.',
    'Je questionne les informations avant de les accepter comme vraies.',
    'Je prends plaisir à résoudre des problèmes complexes.',
    'J’aime conceptualiser et organiser mes idées méthodiquement.',
    'Je suis motivé·e par la compréhension et la réflexion approfondie.',
    'Je me sens stimulé·e par les défis intellectuels.',
  ],
  rebel: [
    'Je préfère trouver ma propre façon de faire plutôt que de suivre les règles.',
    'Je remets en question les méthodes ou instructions imposées.',
    'Je suis indépendant·e et j’aime avoir le contrôle sur ma manière de travailler.',
    'Je défends mes idées même si elles sont impopulaires.',
    'J’aime expérimenter et sortir des sentiers battus.',
    'Je n’aime pas suivre aveuglément les consignes.',
    'Je cherche des solutions originales et personnelles.',
    'Je résiste aux conventions pour faire autrement.',
  ],
  perfectionist: [
    'J’aime que les choses soient bien faites, même si cela prend du temps.',
    'Je fais attention aux détails et à la qualité de mon travail.',
    'Je planifie soigneusement avant de prendre des décisions.',
    'Je ressens de la pression pour atteindre la perfection.',
    'Je révise souvent mon travail pour m’assurer qu’il est impeccable.',
    'Je suis exigeant·e envers moi-même et parfois envers les autres.',
    'J’aime que tout soit organisé et structuré.',
    'Je prends mon temps pour analyser les solutions possibles.',
  ],
  amiable: [
    'Je cherche l’harmonie et j’évite les conflits avec les autres.',
    'J’aime collaborer et travailler en équipe.',
    'Je suis attentif·ve aux besoins des autres.',
    'Je prends le temps d’écouter et de comprendre les autres.',
    'Je fais passer les autres avant moi pour maintenir de bonnes relations.',
    'Je valorise la coopération et l’entraide.',
    'Je suis patient·e et tolérant·e dans mes relations.',
    'Je m’efforce de maintenir de bonnes relations avec tous.',
  ],
  emotional: [
    'Mes émotions influencent fortement mes décisions.',
    'Je ressens profondément ce que vivent les autres.',
    'Je peux être touché·e par des événements positifs ou négatifs.',
    'Je prends le temps de gérer mes émotions avant de décider.',
    'Je suis sensible aux ambiances ou aux changements autour de moi.',
    'Je me laisse guider par mon ressenti dans certaines décisions.',
    'Je suis empathique et je comprends facilement les émotions des autres.',
    'Mes sentiments influencent mes priorités ou choix personnels.',
  ],
};

const createQuestionId = (profileId: ProfileId, index: number) =>
  `${profileId}-${String(index + 1).padStart(2, '0')}`;

export const QUIZ_QUESTIONS: QuizQuestion[] = (Object.entries(profileSequences) as [
  ProfileId,
  string[],
][]).flatMap(([profileId, prompts]) =>
  prompts.map((prompt, index) => ({
    id: createQuestionId(profileId, index),
    prompt,
    profileId,
  })),
);

export const QUESTIONS_PER_PROFILE = 8;
export const MAX_SCORE_PER_QUESTION = LIKERT_OPTIONS[LIKERT_OPTIONS.length - 1]!.value;
export const MAX_SCORE_PER_PROFILE = QUESTIONS_PER_PROFILE * MAX_SCORE_PER_QUESTION;

