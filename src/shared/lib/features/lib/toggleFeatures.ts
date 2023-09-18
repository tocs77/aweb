import { FeatureFlags } from '@/shared/types';
import { getFeatureFlag } from './setGetFeatures';

interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags;
  on: () => T;
  off: () => T;
}

export const toggleFeatures = <T>({ name, on, off }: ToggleFeaturesOptions<T>): T => {
  return getFeatureFlag(name) ? on() : off();
};
