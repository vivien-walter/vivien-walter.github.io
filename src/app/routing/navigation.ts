import {
  supportedLanguages,
  type SupportedLanguage,
} from "@/shared/content/localized-content";

export { supportedLanguages };
export type { SupportedLanguage };

export const navigationPageIds = [
  "home",
  "experience",
  "projects",
  "research",
  "software",
  "contact",
] as const;

export type NavigationPageId = (typeof navigationPageIds)[number];

export const detailPageKinds = ["project", "software"] as const;

export type DetailPageKind = (typeof detailPageKinds)[number];

export type NavigationItem = {
  readonly id: NavigationPageId;
  readonly labelKey: string;
  readonly titleKey: string;
  readonly routes: Readonly<Record<SupportedLanguage, string>>;
  readonly showInPrimaryNavigation: boolean;
};

export type MainPageRouteMatch = {
  readonly kind: "page";
  readonly language: SupportedLanguage;
  readonly pageId: NavigationPageId;
};

export type DetailPageRouteMatch = {
  readonly kind: DetailPageKind;
  readonly language: SupportedLanguage;
  readonly slug: string;
};

export type NotFoundRouteMatch = {
  readonly kind: "not-found";
  readonly language: SupportedLanguage;
};

export type RouteMatch =
  | MainPageRouteMatch
  | DetailPageRouteMatch
  | NotFoundRouteMatch;

export const navigationItems = [
  {
    id: "home",
    labelKey: "navigation.home",
    titleKey: "pages.home.title",
    routes: {
      fr: "/fr/",
      en: "/en/",
    },
    showInPrimaryNavigation: false,
  },
  {
    id: "experience",
    labelKey: "navigation.experience",
    titleKey: "pages.experience.title",
    routes: {
      fr: "/fr/experience/",
      en: "/en/experience/",
    },
    showInPrimaryNavigation: true,
  },
  {
    id: "projects",
    labelKey: "navigation.projects",
    titleKey: "pages.projects.title",
    routes: {
      fr: "/fr/projects/",
      en: "/en/projects/",
    },
    showInPrimaryNavigation: true,
  },
  {
    id: "research",
    labelKey: "navigation.research",
    titleKey: "pages.research.title",
    routes: {
      fr: "/fr/research/",
      en: "/en/research/",
    },
    showInPrimaryNavigation: true,
  },
  {
    id: "software",
    labelKey: "navigation.software",
    titleKey: "pages.software.title",
    routes: {
      fr: "/fr/software/",
      en: "/en/software/",
    },
    showInPrimaryNavigation: true,
  },
  {
    id: "contact",
    labelKey: "navigation.contact",
    titleKey: "pages.contact.title",
    routes: {
      fr: "/fr/contact/",
      en: "/en/contact/",
    },
    showInPrimaryNavigation: true,
  },
] as const satisfies readonly NavigationItem[];

export const primaryNavigationItems = navigationItems.filter(
  (item) => item.showInPrimaryNavigation,
);

export const mobileNavigationItems = navigationItems;

const detailListPageIds = {
  project: "projects",
  software: "software",
} as const satisfies Readonly<Record<DetailPageKind, NavigationPageId>>;

export function normalizePathname(pathname: string): string {
  const pathnameWithoutQueryOrHash = pathname.split(/[?#]/, 1)[0] || "/";

  const pathnameWithLeadingSlash = pathnameWithoutQueryOrHash.startsWith("/")
    ? pathnameWithoutQueryOrHash
    : `/${pathnameWithoutQueryOrHash}`;

  const collapsedPathname = pathnameWithLeadingSlash.replace(/\/{2,}/g, "/");

  if (collapsedPathname === "/") {
    return "/";
  }

  return collapsedPathname.endsWith("/")
    ? collapsedPathname
    : `${collapsedPathname}/`;
}

export function isSupportedLanguage(value: string): value is SupportedLanguage {
  return supportedLanguages.some((language) => language === value);
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
  const languageSegment = normalizedPathname.split("/")[1];

  return isSupportedLanguage(languageSegment) ? languageSegment : "fr";
}

export function getPageRoute(
  pageId: NavigationPageId,
  language: SupportedLanguage,
): string {
  const navigationItem = navigationItems.find((item) => item.id === pageId);

  return (
    navigationItem?.routes[language] ?? navigationItems[0].routes[language]
  );
}

export function getDetailRoute(
  kind: DetailPageKind,
  slug: string,
  language: SupportedLanguage,
): string {
  const listPageId = detailListPageIds[kind];
  const listRoute = getPageRoute(listPageId, language);
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return listRoute;
  }

  return `${listRoute}${encodeURIComponent(normalizedSlug)}/`;
}

export function getProjectRoute(
  projectId: string,
  language: SupportedLanguage,
): string {
  return getDetailRoute("project", projectId, language);
}

export function getSoftwareRoute(
  softwareId: string,
  language: SupportedLanguage,
): string {
  return getDetailRoute("software", softwareId, language);
}

export function getDetailRoutePattern(
  kind: DetailPageKind,
  language: SupportedLanguage,
): string {
  const listPageId = detailListPageIds[kind];

  return `${getPageRoute(listPageId, language)}:slug/`;
}

export function getRouteMatchFromPathname(pathname: string): RouteMatch {
  const normalizedPathname = normalizePathname(pathname);
  const language = getLanguageFromPathname(normalizedPathname);

  const navigationItem = navigationItems.find(
    (item) => item.routes[language] === normalizedPathname,
  );

  if (navigationItem) {
    return {
      kind: "page",
      language,
      pageId: navigationItem.id,
    };
  }

  const segments = normalizedPathname.split("/").filter(Boolean);

  if (segments.length === 3) {
    const [, section, encodedSlug] = segments;
    const slug = decodeSlug(encodedSlug);

    if (slug && section === "projects") {
      return {
        kind: "project",
        language,
        slug,
      };
    }

    if (slug && section === "software") {
      return {
        kind: "software",
        language,
        slug,
      };
    }
  }

  return {
    kind: "not-found",
    language,
  };
}

export function getNavigationItemFromPathname(
  pathname: string,
): NavigationItem | undefined {
  const routeMatch = getRouteMatchFromPathname(pathname);

  if (routeMatch.kind === "page") {
    return navigationItems.find((item) => item.id === routeMatch.pageId);
  }

  if (routeMatch.kind === "project") {
    return navigationItems.find((item) => item.id === "projects");
  }

  if (routeMatch.kind === "software") {
    return navigationItems.find((item) => item.id === "software");
  }

  return undefined;
}

export function getPageIdFromPathname(
  pathname: string,
): NavigationPageId | undefined {
  const routeMatch = getRouteMatchFromPathname(pathname);

  if (routeMatch.kind === "page") {
    return routeMatch.pageId;
  }

  if (routeMatch.kind === "project") {
    return "projects";
  }

  if (routeMatch.kind === "software") {
    return "software";
  }

  return undefined;
}

export function getEquivalentLanguagePath(
  pathname: string,
  language: SupportedLanguage,
): string {
  const routeMatch = getRouteMatchFromPathname(pathname);

  if (routeMatch.kind === "page") {
    return getPageRoute(routeMatch.pageId, language);
  }

  if (routeMatch.kind === "project") {
    return getProjectRoute(routeMatch.slug, language);
  }

  if (routeMatch.kind === "software") {
    return getSoftwareRoute(routeMatch.slug, language);
  }

  return getPageRoute("home", language);
}

export function getFallbackRoute(pathname: string): string {
  return getPageRoute("home", getLanguageFromPathname(pathname));
}