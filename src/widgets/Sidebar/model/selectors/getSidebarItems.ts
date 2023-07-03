import { createSelector } from '@reduxjs/toolkit';
import { getAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import ArticleaIcoт from 'shared/assets/icons/article-20-20.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getAuthData, (authData) => {
  const sidebarItemsList: SidebarItemType[] = [
    { path: RoutePath.main, text: 'Main Page', Icon: MainIcon },
    { path: RoutePath.about, text: 'About Page', Icon: AboutIcon },
  ];
  if (authData) {
    sidebarItemsList.push({
      path: `${RoutePath.profile}${authData?.id}`,
      text: 'Profile Page',
      Icon: ProfileIcon,
      authOnly: true,
    });
    sidebarItemsList.push({ path: RoutePath.articles, text: 'Articles Page', Icon: ArticleaIcoт, authOnly: true });
  }

  return sidebarItemsList;
});
