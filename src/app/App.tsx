import { Suspense, useEffect } from 'react';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserInited, userActions } from '@/entities/User';
import { useSelector } from 'react-redux';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLoaderLayout, MainLayout } from '@/shared/layout';
import { useAppToolbar } from './lib/useAppToolbar';

export const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    if (!inited) dispatch(userActions.initAuthData());
  }, [dispatch, inited]);

  const toolbar = useAppToolbar();

  if (!inited)
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <div className={classNames('app', {}, [theme])} id='app'>
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );

  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <div className={classNames('app_redesigned', {}, [theme])} id='app'>
          <Suspense fallback=''>
            <MainLayout content={<AppRouter />} sidebar={<Sidebar />} header={<Navbar />} toolbar={toolbar} />
          </Suspense>
        </div>
      }
      off={
        <div className={classNames('app', {}, [theme])} id='app'>
          <Suspense fallback=''>
            <Navbar />
            <div className='content-page'>
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
    />
  );
};
