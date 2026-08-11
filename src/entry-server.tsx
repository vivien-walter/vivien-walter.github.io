import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import i18n from '@/app/i18n';
import { getLanguageFromPathname } from '@/app/routing/navigation';
import AppRouter from '@/app/routing/router';
import ApplicationErrorBoundary from '@/app/shell/application-error-boundary';

export async function render(pathname: string): Promise<string> {
  const language = getLanguageFromPathname(pathname);

  await i18n.changeLanguage(language);

  return renderToString(
    <ApplicationErrorBoundary>
      <StaticRouter location={pathname}>
        <AppRouter />
      </StaticRouter>
    </ApplicationErrorBoundary>,
  );
}
