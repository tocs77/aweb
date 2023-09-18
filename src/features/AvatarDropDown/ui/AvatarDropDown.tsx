import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userActions, isUserAdmin, isUserManager, getAuthData } from '@/entities/User';

import { useSelector } from 'react-redux';
import { getRouteAdminPanel, getRouteProfile, getRouteSettings } from '@/shared/consts/router';
import { ToggleFeatures } from '@/shared/lib/features';

interface AvatarDropDownProps {
  className?: string;
}

export const AvatarDropDown = (props: AvatarDropDownProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const authData = useSelector(getAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const isAdminPanelAvailable = isAdmin || isManager;

  const onLogout = () => {
    dispatch(userActions.logout());
  };

  if (!authData) return null;

  const dropdownItems = [
    { content: t('Admin Panel'), href: getRouteAdminPanel(), hidden: !isAdminPanelAvailable },
    { content: t('User profile'), href: getRouteProfile(authData.id) },
    { content: t('Settings'), href: getRouteSettings() },
    { content: t('Logout'), onClick: onLogout },
  ];

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Dropdown
          className={classNames('', {}, [className])}
          title={<Avatar size={40} src={authData.avatar || ''} />}
          items={dropdownItems}
        />
      }
      off={
        <DropdownDeprecated
          className={classNames('', {}, [className])}
          title={<AvatarDeprecated size={30} src={authData.avatar || ''} fallBackInverted={true} />}
          items={dropdownItems}
        />
      }
    />
  );
};
