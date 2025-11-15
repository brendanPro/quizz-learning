import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { QUIZ_QUESTIONS } from '@/constants/questions';
import { QUIZ_PROFILES } from '@/constants/profiles';

import { QuizQuestionCard } from './QuizQuestionCard';

const question = QUIZ_QUESTIONS[0]!;
const profile = QUIZ_PROFILES.find((item) => item.id === question.profileId);

const meta: Meta<typeof QuizQuestionCard> = {
  title: 'Quiz/QuestionCard',
  component: QuizQuestionCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    question,
    profileName: profile?.name ?? question.profileId,
    currentValue: 3,
    canProceed: true,
    isFirst: false,
    isLast: false,
    onSelect: fn(),
    onNext: fn(),
    onPrevious: fn(),
    onFinish: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof QuizQuestionCard>;

export const Default: Story = {};

export const WithoutSelection: Story = {
  args: {
    currentValue: undefined,
    canProceed: false,
  },
};

export const LastQuestion: Story = {
  args: {
    isLast: true,
  },
};

