import { BrowserRouter } from 'react-router-dom';
import { BreadcrumbsProvider } from '~/Hooks/UseBreadcrumbs';
import { FontSizeProvider } from '~/Hooks/UseFontSize';
import { Layout } from '../Layout';

import '~/Config/i18n';

export function InjectorProviders({
  children,
  noLayout,
}: {
  children: React.ReactNode;
  noLayout?: true;
}) {
  return (
    <BrowserRouter basename={import.meta.env.VITE_URL_BASENAME}>
      <BreadcrumbsProvider>
        <FontSizeProvider>
          {noLayout && children}
          {!noLayout && <Layout>{children}</Layout>}
        </FontSizeProvider>
      </BreadcrumbsProvider>
    </BrowserRouter>
  );
}
