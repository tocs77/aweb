import { setFeatureFlags } from '@/shared/lib/features';
import { FeatureFlags } from '@/shared/types';
import { StoryFn } from '@storybook/react';

export const FeatureFlagsDecorator = (features: Partial<FeatureFlags>) => (Story: StoryFn) => {
  setFeatureFlags(features);
  return <Story />;
};
