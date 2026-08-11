import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const distDirectory = resolve('dist');
const clientTemplatePath = join(distDirectory, 'index.html');
const serverEntryPath = resolve('dist-ssr/entry-server.js');

const clientTemplate = await readFile(clientTemplatePath, 'utf8');

const { render } = await import(pathToFileURL(serverEntryPath).href);

const rootElementPattern = /<div\s+id=(["'])root\1><\/div>/i;

if (!rootElementPattern.test(clientTemplate)) {
  throw new Error('Le template Vite ne contient pas de racine React vide #root.');
}

const prerenderableRoutePatterns = [
  /^\/(?:fr|en)\/$/,
  /^\/(?:fr|en)\/(?:experience|projects|research|software|contact)\/$/,
  /^\/(?:fr|en)\/experience\/[^/]+\/$/,
  /^\/(?:fr|en)\/projects\/[^/]+\/$/,
  /^\/(?:fr|en)\/research\/publications\/[^/]+\/$/,
  /^\/(?:fr|en)\/research\/[^/]+\/$/,
  /^\/(?:fr|en)\/software\/[^/]+\/$/,
];

function normalizeRoute(href) {
  const url = new URL(href, 'https://prerender.local');
  const pathname = url.pathname.replace(/\/{2,}/g, '/');

  if (pathname === '/') {
    return pathname;
  }

  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function isPrerenderableRoute(route) {
  return prerenderableRoutePatterns.some((pattern) => pattern.test(route));
}

function extractInternalRoutes(html) {
  const routes = new Set();
  const hrefPattern = /\shref=(["'])(.*?)\1/g;

  for (const match of html.matchAll(hrefPattern)) {
    const href = match[2];

    if (!href || !href.startsWith('/')) {
      continue;
    }

    const route = normalizeRoute(href);

    if (isPrerenderableRoute(route)) {
      routes.add(route);
    }
  }

  return routes;
}

function getRouteLanguage(route) {
  return route.startsWith('/en/') ? 'en' : 'fr';
}

function createDocument(route, appHtml) {
  const language = getRouteLanguage(route);

  return clientTemplate
    .replace(/(<html\b[^>]*\blang=)(["'])[^"']*\2/i, `$1"${language}"`)
    .replace(rootElementPattern, `<div id="root">${appHtml}</div>`);
}

function getOutputPath(route) {
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');

  return join(distDirectory, relativeRoute, 'index.html');
}

const pendingRoutes = ['/fr/', '/en/'];
const prerenderedRoutes = new Set();

while (pendingRoutes.length > 0) {
  const route = pendingRoutes.shift();

  if (!route || prerenderedRoutes.has(route)) {
    continue;
  }

  const appHtml = await render(route);
  const documentHtml = createDocument(route, appHtml);
  const outputPath = getOutputPath(route);

  await mkdir(dirname(outputPath), {
    recursive: true,
  });

  await writeFile(outputPath, documentHtml, 'utf8');

  prerenderedRoutes.add(route);

  for (const discoveredRoute of extractInternalRoutes(appHtml)) {
    if (!prerenderedRoutes.has(discoveredRoute)) {
      pendingRoutes.push(discoveredRoute);
    }
  }
}

/*
 * GitHub Pages sert 404.html lorsqu'aucun fichier statique ne correspond
 * à l'URL demandée. On conserve ici le shell client Vite sans pré-rendu :
 * BrowserRouter pourra alors traiter l'URL inconnue et afficher NotFoundPage.
 */
await writeFile(join(distDirectory, '404.html'), clientTemplate, 'utf8');

console.log(`Pré-rendu terminé : ${prerenderedRoutes.size} routes statiques générées.`);
