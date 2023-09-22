import { AppRoutes } from '@/shared/consts/router';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { useRouteChange } from '@/shared/lib/router';
import { ReactElement } from 'react';

export const useAppToolbar = () => {
  const currentRoute = useRouteChange();

  const toolbarByAppRoute: Partial<Record<AppRoutes, ReactElement>> = {
    articles: <ScrollToolbar />,
    article_details: <ScrollToolbar />,
    main: <div>{'Main'}</div>,
    about: <div>{'About'}</div>,
  };

  return toolbarByAppRoute[currentRoute];
};
