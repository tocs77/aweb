import { FeatureFlags } from '@/shared/types';

let featureFlags: FeatureFlags;

export const setFeatureFlags = (newFeatureFlags: FeatureFlags) => {
  if (newFeatureFlags) featureFlags = newFeatureFlags;
};

export const getFeatureFlag = (flag: keyof FeatureFlags) => {
  return featureFlags?.[flag];
};
