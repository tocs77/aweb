import { FeatureFlags } from '@/shared/types';
import { ReactElement } from 'react';
import { getFeatureFlag } from '../../lib/setGetFeatures';

interface ToggleFeatureProps {
  feature: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

export const ToggleFeatures = (props: ToggleFeatureProps) => {
  const { feature, on, off } = props;
  if (getFeatureFlag(feature)) return on;
  return off;
};
