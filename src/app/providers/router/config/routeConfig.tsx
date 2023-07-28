import { AboutPage } from '@/pages/AboutPage';
import { MainPage } from '@/pages/MainPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { AppRoutes, RoutePath } from '@/shared/consts/router';
import { AppRouteProps } from '@/shared/types';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath[AppRoutes.MAIN],
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath[AppRoutes.ABOUT],
    element: <AboutPage />,
  },

  // [AppRoutes.PROFILE]: {
  //   path: RoutePath[AppRoutes.PROFILE],
  //   element: <ProfilePage />,
  //   authOnly: true,
  // },
  [AppRoutes.PROFILE]: {
    path: `${RoutePath[AppRoutes.PROFILE]}:id`,
    element: <ProfilePage />,
    authOnly: true,
  },
  [AppRoutes.FORBIDDEN]: {
    path: RoutePath[AppRoutes.FORBIDDEN],
    element: <ForbiddenPage />,
  },
  [AppRoutes.ARTICLES]: {
    path: RoutePath[AppRoutes.ARTICLES],
    element: <ArticlesPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: `${RoutePath[AppRoutes.ARTICLE_DETAILS]}:id`,
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: `${RoutePath[AppRoutes.ARTICLE_EDIT]}`,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: `${RoutePath[AppRoutes.ARTICLE_CREATE]}`,
    element: <ArticleEditPage />,
    authOnly: true,
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: `${RoutePath[AppRoutes.ADMIN_PANEL]}`,
    element: <AdminPanelPage />,
    authOnly: true,
    roles: ['ADMIN', 'MANAGER'],
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
