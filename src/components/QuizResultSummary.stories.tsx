import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { QUIZ_PROFILES } from '@/constants/profiles';

import { QuizResultSummary } from './QuizResultSummary';

const scores = QUIZ_PROFILES.map((profile, index) => ({
  profileId: profile.id,
  total: 30 - index * 2,
  percentage: Math.max(10, 80 - index * 8),
}));

const summary = {
  scores,
  dominant: scores[0]!,
  secondary: scores.slice(1, 3),
};

const meta: Meta<typeof QuizResultSummary> = {
  title: 'Quiz/ResultSummary',
  component: QuizResultSummary,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    summary,
    onRestart: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof QuizResultSummary>;

export const Default: Story = {};

