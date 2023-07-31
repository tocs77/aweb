import { createSelector } from '@reduxjs/toolkit';
import { getAuthData } from '@/entities/User';
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/consts/router';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticleaIcoт from '@/shared/assets/icons/article-20-20.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getAuthData, (authData) => {
  const sidebarItemsList: SidebarItemType[] = [
    { path: getRouteMain(), text: 'Main Page', Icon: MainIcon },
    { path: getRouteAbout(), text: 'About Page', Icon: AboutIcon },
  ];
  if (authData) {
    sidebarItemsList.push({
      path: getRouteProfile(authData?.id),
      text: 'Profile Page',
      Icon: ProfileIcon,
      authOnly: true,
    });
    sidebarItemsList.push({ path: getRouteArticles(), text: 'Articles Page', Icon: ArticleaIcoт, authOnly: true });
  }

  return sidebarItemsList;
});
