import { lazy, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { menus as menusMount } from '~/Hooks/UseRoutesMenu/Utils';
import { useTranslation } from '~/Hooks/UseTranslation';
import { Home } from '~/Pages/Home';
import { TRoutesMenu } from '~/Types/TRoutesMenu';
import { TTriRoutes } from '~/Types/TTriRoutes';
import { triRoutes as triRoutesMount } from '~/Utils/TriRoutes';

const sortCustom = (a: TRoutesMenu, b: TRoutesMenu) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const NotFoundPage = lazy(() =>
  import('~/Pages/NotFound').then(({ NotFoundPage: NotFound }) => ({
    default: NotFound,
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
          implements_code: '',
          docs_code: '',
          element: <Home />,
          label: 'Home',
          hideTriRoutes: true,
        },

        // {
        // 	name: 'Countdown',
        // 	path: '/countdown',
        // 	implements_code:
        // 		'https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Components/Countdown',
        // 	docs_code:
        // 		'https://github.com/sajermann/MyImplementationsInReact/tree/main/src/Pages/Countdown',
        // 	element: <CountdownPage />,
        // 	label: 'Countdown',
        // 	demo: <CountdownDemo />,
        // },
        {
          name: 'NotFound',
          path: '*',
          implements_code: '',
          docs_code: '',
          element: <NotFoundPage />,
          label: translate('NOT_FOUND'),
          hideTriRoutes: true,
          hideMenu: true,
        },
      ].sort(sortCustom),
    [currentLanguage],
  );

  const triRoutes: TTriRoutes = useMemo(
    () => triRoutesMount.get(globalRoutes, location.pathname),
    [currentLanguage, location.pathname],
  );

  function globalMenus(filterValue: string) {
    return menusMount.get(globalRoutes, filterValue);
  }

  return {
    globalRoutes,
    triRoutes,
    globalMenus,
  };
}
