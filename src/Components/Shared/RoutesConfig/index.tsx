import { Fragment, Suspense } from 'react';
import { useRoutesMenu } from '~/Hooks/UseRoutesMenu';

import { Route, Routes, useLocation } from 'react-router-dom';
import { TRoutesMenu } from '~/Types/TRoutesMenu';
import { Sidebar } from '../Sidebar';
import _Breadcrumbs from './Breadcumbs';
import { IsLoading } from './IsLoading';

export function RoutesConfig() {
  const { globalRoutes: options } = useRoutesMenu();
  const location = useLocation();

  function mountRoutes(routes: TRoutesMenu[]) {
    return (
      <>
        {routes.map(route => (
          <Fragment key={route.name}>
            <Route key={route.name} path={route.path} element={route.element} />
            {route.subs && mountRoutes(route.subs)}
          </Fragment>
        ))}
      </>
    );
  }

  return (
    <div className="w-full 2xl:max-w-[1330px] p-2 gap-5 flex  my-0 mx-auto">
      <div className="w-full flex flex-col h-full gap-2 flex-1">
        <Suspense fallback={<IsLoading />}>
          <_Breadcrumbs />
          <Routes>{mountRoutes(options)}</Routes>
        </Suspense>
      </div>
      {location.pathname !== '/' && (
        <div className="hidden min-w-[18rem] w-72 max-w-[18rem] xl:flex">
          <Sidebar />
        </div>
      )}
    </div>
  );
}
