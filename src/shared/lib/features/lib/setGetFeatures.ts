import { FeatureFlags } from '@/shared/types';

let featureFlags: FeatureFlags;

export const setFeatureFlags = (newFeatureFlags: Partial<FeatureFlags>) => {
  if (newFeatureFlags) featureFlags = { ...featureFlags, ...newFeatureFlags };
};

export const getFeatureFlag = (flag: keyof FeatureFlags) => {
  return featureFlags?.[flag];
};

export const getAllFeatureFlags = (): FeatureFlags => {
  return featureFlags;
};
