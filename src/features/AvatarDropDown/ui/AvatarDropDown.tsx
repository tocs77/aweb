import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Dropdown } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userActions, isUserAdmin, isUserManager, getAuthData } from '@/entities/User';

import { useSelector } from 'react-redux';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

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
      title={<Avatar size={30} src={authData.avatar || ''} />}
      items={[
        { content: t('Admin Panel'), href: `${RoutePath.admin_panel}`, hidden: !isAdminPanelAvailable },
        { content: t('User profile'), href: `${RoutePath.profile}${authData.id}` },
        { content: t('Logout'), onClick: onLogout },
      ]}
    />
  );
};
