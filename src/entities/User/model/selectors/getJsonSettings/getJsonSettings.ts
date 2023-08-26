import { buildSelector } from '@/shared/lib/store';
import { JsonSettings, defaultJsonSettings } from '../../types/jsonSettings';
import { StoreWithUser, USER_SLICE_NAME } from '../../types/user';

export const [useGetJsonSettings, getJsonSettings] = buildSelector<StoreWithUser, JsonSettings, [void]>(
  (state) => state[USER_SLICE_NAME].authData?.jsonSettings ?? defaultJsonSettings,
);
export const [useGetJsonSettingsByKey, getjsonSettingsByKey] = buildSelector<StoreWithUser, unknown, [key: keyof JsonSettings]>(
  (state, key) => state[USER_SLICE_NAME].authData?.jsonSettings?.[key],
);
