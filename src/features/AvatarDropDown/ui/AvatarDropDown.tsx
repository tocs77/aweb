import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Dropdown } from '@/shared/ui/deprecated/Popups';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userActions, isUserAdmin, isUserManager, getAuthData } from '@/entities/User';

import { useSelector } from 'react-redux';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/consts/router';

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

  return (
    <Dropdown
      className={classNames('', {}, [className])}
      title={<Avatar size={30} src={authData.avatar || ''} fallBackInverted={true} />}
      items={[
        { content: t('Admin Panel'), href: getRouteAdminPanel(), hidden: !isAdminPanelAvailable },
        { content: t('User profile'), href: getRouteProfile(authData.id) },
        { content: t('Logout'), onClick: onLogout },
      ]}
    />
  );
};
