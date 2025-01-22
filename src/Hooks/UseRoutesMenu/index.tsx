import { lazy, useMemo } from 'react';
import { createRoutesFromElements, useLocation } from 'react-router';

import {
  _getMenus,
  _sortCustom,
  getTriRoutes,
} from '~/Hooks/UseRoutesMenu/Utils';
import { useTranslation } from '~/Hooks/UseTranslation';
import { Home } from '~/Pages/Home';
import { TRoutesMenu } from '~/Types/TRoutesMenu';
import { TTriRoutes } from './Types';

const NotFoundPage = lazy(() =>
  import('~/Pages/NotFound').then(({ NotFoundPage: NotFound }) => ({
    default: NotFound,
  })),
);

const DemoPage = lazy(() =>
  import('~/Pages/Demo').then(({ DemoPage: Demo }) => ({
    default: Demo,
  })),
);

export function useRoutesMenu() {
  const { translate, currentLanguage } = useTranslation();
  const location = useLocation();
  const globalRoutes: TRoutesMenu[] = useMemo(
    (): TRoutesMenu[] =>
      [
        {
          name: 'Home',
          path: '/',
          element: <Home />,
          label: 'Home',
          hideTriRoutes: true,
          index: true,
        },
        {
          name: 'Demo',
          path: '/demo',
          description: translate('MY_DEMO'),
          element: <DemoPage />,
          label: 'Demo',
        },
        {
          name: 'NotFound',
          path: '*',
          element: <NotFoundPage />,
          label: translate('NOT_FOUND'),
          hideTriRoutes: true,
          hideMenu: true,
        },
      ].sort(_sortCustom),
    [currentLanguage],
  );

  const triRoutes: TTriRoutes = useMemo(
    () => getTriRoutes(globalRoutes, location.pathname),
    [currentLanguage, location.pathname],
  );

  return {
    globalRoutes,
    triRoutes,
    globalMenus: (filterValue: string) => _getMenus(globalRoutes, filterValue),
  };
}
