import { defaultLanguage, isSupportedLanguage } from '@/lib/content/localization';
import type { SupportedLanguage } from '@/types/localization';

export const navigationPageIds = ['home', 'experience', 'projects', 'research', 'software', 'contact'] as const;

export type NavigationPageId = (typeof navigationPageIds)[number];

export const detailPageKinds = ['experience', 'parallel-activity', 'project', 'research-theme', 'research-publication', 'software'] as const;

export type DetailPageKind = (typeof detailPageKinds)[number];

export type NavigationItem = {
  readonly id: NavigationPageId;
  readonly labelKey: string;
  readonly compactLabelKey?: string;
  readonly titleKey: string;
  readonly routes: Readonly<Record<SupportedLanguage, string>>;
  readonly showInPrimaryNavigation: boolean;
};

export type MainPageRouteMatch = {
  readonly kind: 'page';
  readonly language: SupportedLanguage;
  readonly pageId: NavigationPageId;
};

export type DetailPageRouteMatch = {
  readonly kind: DetailPageKind;
  readonly language: SupportedLanguage;
  readonly slug: string;
};

export type NotFoundRouteMatch = {
  readonly kind: 'not-found';
  readonly language: SupportedLanguage;
};

export type RouteMatch = MainPageRouteMatch | DetailPageRouteMatch | NotFoundRouteMatch;

export const navigationItems = [
  {
    id: 'home',
    labelKey: 'navigation.home',
    titleKey: 'navigation.home',
    routes: {
      fr: '/fr/',
      en: '/en/',
    },
    showInPrimaryNavigation: false,
  },
  {
    id: 'experience',
    labelKey: 'navigation.experience',
    titleKey: 'navigation.experience',
    routes: {
      fr: '/fr/experience/',
      en: '/en/experience/',
    },
    showInPrimaryNavigation: true,
  },
  {
    id: 'projects',
    labelKey: 'navigation.projects',
    titleKey: 'navigation.projects',
    routes: {
      fr: '/fr/projects/',
      en: '/en/projects/',
    },
    showInPrimaryNavigation: true,
  },
  {
    id: 'research',
    labelKey: 'navigation.research',
    compactLabelKey: 'navigation.researchCompact',
    titleKey: 'navigation.research',
    routes: {
      fr: '/fr/research/',
      en: '/en/research/',
    },
    showInPrimaryNavigation: true,
  },
  {
    id: 'software',
    labelKey: 'navigation.software',
    titleKey: 'navigation.software',
    routes: {
      fr: '/fr/software/',
      en: '/en/software/',
    },
    showInPrimaryNavigation: true,
  },
  {
    id: 'contact',
    labelKey: 'navigation.contact',
    titleKey: 'navigation.contact',
    routes: {
      fr: '/fr/contact/',
      en: '/en/contact/',
    },
    showInPrimaryNavigation: true,
  },
] as const satisfies readonly NavigationItem[];

export const primaryNavigationItems = navigationItems.filter((item) => item.showInPrimaryNavigation);

const detailListPageIds = {
  experience: 'experience',
  'parallel-activity': 'experience',
  project: 'projects',
  'research-theme': 'research',
  'research-publication': 'research',
  software: 'software',
} as const satisfies Readonly<Record<DetailPageKind, NavigationPageId>>;

export function normalizePathname(pathname: string): string {
  const pathnameWithoutQueryOrHash = pathname.split(/[?#]/, 1)[0] || '/';

  const pathnameWithLeadingSlash = pathnameWithoutQueryOrHash.startsWith('/') ? pathnameWithoutQueryOrHash : `/${pathnameWithoutQueryOrHash}`;

  const collapsedPathname = pathnameWithLeadingSlash.replace(/\/{2,}/g, '/');

  if (collapsedPathname === '/') {
    return '/';
  }

  return collapsedPathname.endsWith('/') ? collapsedPathname : `${collapsedPathname}/`;
}

function decodeSlug(value: string): string | undefined {
  try {
    const decodedValue = decodeURIComponent(value).trim();

    return decodedValue.length > 0 ? decodedValue : undefined;
  } catch {
    return undefined;
  }
}

export function getLanguageFromPathname(pathname: string): SupportedLanguage {
  const normalizedPathname = normalizePathname(pathname);

  const languageSegment = normalizedPathname.split('/')[1];

  return isSupportedLanguage(languageSegment) ? languageSegment : defaultLanguage;
}

export function getPageRoute(pageId: NavigationPageId, language: SupportedLanguage): string {
  const navigationItem = navigationItems.find((item) => item.id === pageId);

  return navigationItem?.routes[language] ?? navigationItems[0].routes[language];
}

export function getDetailRoute(kind: DetailPageKind, slug: string, language: SupportedLanguage): string {
  const listPageId = detailListPageIds[kind];
  const listRoute = getPageRoute(listPageId, language);
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return listRoute;
  }

  const encodedSlug = encodeURIComponent(normalizedSlug);

  if (kind === 'parallel-activity') {
    return `${listRoute}activities/${encodedSlug}/`;
  }

  if (kind === 'research-publication') {
    return `${listRoute}publications/${encodedSlug}/`;
  }

  return `${listRoute}${encodedSlug}/`;
}

export function getExperienceRoute(experienceId: string, language: SupportedLanguage): string {
  return getDetailRoute('experience', experienceId, language);
}

export function getParallelActivityRoute(activityId: string, language: SupportedLanguage): string {
  return getDetailRoute('parallel-activity', activityId, language);
}

export function getProjectRoute(projectId: string, language: SupportedLanguage): string {
  return getDetailRoute('project', projectId, language);
}

export function getResearchThemeRoute(themeId: string, language: SupportedLanguage): string {
  return getDetailRoute('research-theme', themeId, language);
}

export function getResearchPublicationRoute(publicationId: string, language: SupportedLanguage): string {
  return getDetailRoute('research-publication', publicationId, language);
}

export function getSoftwareRoute(softwareId: string, language: SupportedLanguage): string {
  return getDetailRoute('software', softwareId, language);
}

export function getDetailRoutePattern(kind: DetailPageKind, language: SupportedLanguage): string {
  const listPageId = detailListPageIds[kind];
  const listRoute = getPageRoute(listPageId, language);

  if (kind === 'parallel-activity') {
    return `${listRoute}activities/:slug/`;
  }

  if (kind === 'research-publication') {
    return `${listRoute}publications/:slug/`;
  }

  return `${listRoute}:slug/`;
}

export function getRouteMatchFromPathname(pathname: string): RouteMatch {
  const normalizedPathname = normalizePathname(pathname);

  const language = getLanguageFromPathname(normalizedPathname);

  const navigationItem = navigationItems.find((item) => item.routes[language] === normalizedPathname);

  if (navigationItem) {
    return {
      kind: 'page',
      language,
      pageId: navigationItem.id,
    };
  }

  const segments = normalizedPathname.split('/').filter(Boolean);

  if (segments.length === 4) {
    const [, section, subsection, encodedSlug] = segments;

    const slug = decodeSlug(encodedSlug);

    if (slug && section === 'experience' && subsection === 'activities') {
      return {
        kind: 'parallel-activity',
        language,
        slug,
      };
    }

    if (slug && section === 'research' && subsection === 'publications') {
      return {
        kind: 'research-publication',
        language,
        slug,
      };
    }
  }

  if (segments.length === 3) {
    const [, section, encodedSlug] = segments;
    const slug = decodeSlug(encodedSlug);

    if (slug && section === 'experience') {
      return {
        kind: 'experience',
        language,
        slug,
      };
    }

    if (slug && section === 'projects') {
      return {
        kind: 'project',
        language,
        slug,
      };
    }

    if (slug && section === 'research') {
      return {
        kind: 'research-theme',
        language,
        slug,
      };
    }

    if (slug && section === 'software') {
      return {
        kind: 'software',
        language,
        slug,
      };
    }
  }

  return {
    kind: 'not-found',
    language,
  };
}

export function getNavigationItemFromPathname(pathname: string): NavigationItem | undefined {
  const routeMatch = getRouteMatchFromPathname(pathname);

  if (routeMatch.kind === 'page') {
    return navigationItems.find((item) => item.id === routeMatch.pageId);
  }

  if (routeMatch.kind === 'experience' || routeMatch.kind === 'parallel-activity') {
    return navigationItems.find((item) => item.id === 'experience');
  }

  if (routeMatch.kind === 'project') {
    return navigationItems.find((item) => item.id === 'projects');
  }

  if (routeMatch.kind === 'research-theme' || routeMatch.kind === 'research-publication') {
    return navigationItems.find((item) => item.id === 'research');
  }

  if (routeMatch.kind === 'software') {
    return navigationItems.find((item) => item.id === 'software');
  }

  return undefined;
}

export function getPageIdFromPathname(pathname: string): NavigationPageId | undefined {
  const routeMatch = getRouteMatchFromPathname(pathname);

  if (routeMatch.kind === 'page') {
    return routeMatch.pageId;
  }

  if (routeMatch.kind === 'experience' || routeMatch.kind === 'parallel-activity') {
    return 'experience';
  }

  if (routeMatch.kind === 'project') {
    return 'projects';
  }

  if (routeMatch.kind === 'research-theme' || routeMatch.kind === 'research-publication') {
    return 'research';
  }

  if (routeMatch.kind === 'software') {
    return 'software';
  }

  return undefined;
}

export function getEquivalentLanguagePath(pathname: string, language: SupportedLanguage): string {
  const routeMatch = getRouteMatchFromPathname(pathname);

  if (routeMatch.kind === 'page') {
    return getPageRoute(routeMatch.pageId, language);
  }

  if (routeMatch.kind === 'experience') {
    return getExperienceRoute(routeMatch.slug, language);
  }

  if (routeMatch.kind === 'parallel-activity') {
    return getParallelActivityRoute(routeMatch.slug, language);
  }

  if (routeMatch.kind === 'project') {
    return getProjectRoute(routeMatch.slug, language);
  }

  if (routeMatch.kind === 'research-theme') {
    return getResearchThemeRoute(routeMatch.slug, language);
  }

  if (routeMatch.kind === 'research-publication') {
    return getResearchPublicationRoute(routeMatch.slug, language);
  }

  if (routeMatch.kind === 'software') {
    return getSoftwareRoute(routeMatch.slug, language);
  }

  return getPageRoute('home', language);
}

export function getFallbackRoute(pathname: string): string {
  return getPageRoute('home', getLanguageFromPathname(pathname));
}
