import { useTranslation } from 'react-i18next';

import { getFeatureFlag } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateFeatureFlag } from '@/shared/lib/features';
import { getAuthData } from '@/entities/User';
import { useAppSelector } from '@/app/providers/StoreProvider/config/store';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

interface UiDesignSwitcherProps {
  className?: string;
}
export const UiDesignSwitcher = (props: UiDesignSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const isAppRedesigned = getFeatureFlag('isAppRedesigned');
  const dispatch = useAppDispatch();
  const authData = useAppSelector(getAuthData);
  const forceUpdate = useForceUpdate();

  const items = [
    { content: t('New'), value: 'new' },
    { content: t('Old'), value: 'old' },
  ];
  const onChange = async (value: string) => {
    if (!authData) return;
    await dispatch(updateFeatureFlag({ newFeatures: { isAppRedesigned: value === 'new' ? true : false }, userId: authData.id }));
    forceUpdate();
  };
  return (
    <ListBox
      label={t('Interface variant')}
      value={isAppRedesigned ? 'new' : 'old'}
      className={className}
      items={items}
      onChange={onChange}></ListBox>
  );
};
