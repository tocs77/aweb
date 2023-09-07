import { createSelector } from '@reduxjs/toolkit';
import { getAuthData } from '@/entities/User';
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/consts/router';
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import { SidebarItemType } from '../types/sidebar';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebarItems = createSelector(getAuthData, (authData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRouteMain(),
      text: 'Main Page',
      Icon: toggleFeatures<React.FC<React.SVGProps<SVGSVGElement>>>({
        name: 'isAppRedesigned',
        on: () => MainIcon,
        off: () => MainIconDeprecated,
      }),
    },
    {
      path: getRouteAbout(),
      text: 'About Page',
      Icon: toggleFeatures<React.FC<React.SVGProps<SVGSVGElement>>>({
        name: 'isAppRedesigned',
        on: () => AboutIcon,
        off: () => AboutIconDeprecated,
      }),
    },
  ];
  if (authData) {
    sidebarItemsList.push({
      path: getRouteProfile(authData?.id),
      text: 'Profile Page',
      Icon: toggleFeatures<React.FC<React.SVGProps<SVGSVGElement>>>({
        name: 'isAppRedesigned',
        on: () => ProfileIcon,
        off: () => ProfileIconDeprecated,
      }),
      authOnly: true,
    });
    sidebarItemsList.push({
      path: getRouteArticles(),
      text: 'Articles Page',
      Icon: toggleFeatures<React.FC<React.SVGProps<SVGSVGElement>>>({
        name: 'isAppRedesigned',
        on: () => ArticleIcon,
        off: () => ArticleIconDeprecated,
      }),
      authOnly: true,
    });
  }

  return sidebarItemsList;
});
