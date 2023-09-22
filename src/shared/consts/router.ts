export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  NOT_FOUND = 'not_found',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN = 'forbidden',
  SETTINGS = 'settings',
}

export const getRouteAbout = () => '/about';
export const getRouteMain = () => '/';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdminPanel = () => '/admin_panel';
export const getRouteForbidden = () => '/forbidden';
export const getRouteSettings = () => '/settings';
export const getRouteNotFound = () => '*';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteProfile(':id')]: AppRoutes.PROFILE,
  [getRouteArticles()]: AppRoutes.ARTICLES,
  [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
  [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
  [getRouteAdminPanel()]: AppRoutes.ADMIN_PANEL,
  [getRouteForbidden()]: AppRoutes.FORBIDDEN,
  [getRouteSettings()]: AppRoutes.SETTINGS,
  [getRouteNotFound()]: AppRoutes.NOT_FOUND,
};
