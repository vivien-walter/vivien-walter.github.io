export const supportedLanguages = ["fr", "en"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export type NavigationPageId =
  | "home"
  | "experience"
  | "projects"
  | "research"
  | "software"
  | "contact";

type LocalizedRoutes = Record<SupportedLanguage, string>;

export type NavigationItem = {
  id: NavigationPageId;
  labelKey: string;
  titleKey: string;
  routes: LocalizedRoutes;
  showInPrimaryNavigation: boolean;
};

export const navigationItems: readonly NavigationItem[] = [
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
      fr: "/fr/parcours/",
      en: "/en/experience/",
    },
    showInPrimaryNavigation: true,
  },
  {
    id: "projects",
    labelKey: "navigation.projects",
    titleKey: "pages.projects.title",
    routes: {
      fr: "/fr/projets/",
      en: "/en/projects/",
    },
    showInPrimaryNavigation: true,
  },
  {
    id: "research",
    labelKey: "navigation.research",
    titleKey: "pages.research.title",
    routes: {
      fr: "/fr/recherche-et-publications/",
      en: "/en/research-and-publications/",
    },
    showInPrimaryNavigation: true,
  },
  {
    id: "software",
    labelKey: "navigation.software",
    titleKey: "pages.software.title",
    routes: {
      fr: "/fr/logiciels/",
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
];

export const primaryNavigationItems = navigationItems.filter(
  (item) => item.showInPrimaryNavigation,
);

export function isSupportedLanguage(
  language: string,
): language is SupportedLanguage {
  return supportedLanguages.includes(language as SupportedLanguage);
}

export function getNavigationItem(pageId: NavigationPageId): NavigationItem {
  const item = navigationItems.find(({ id }) => id === pageId);

  if (!item) {
    throw new Error(`Unknown navigation page: ${pageId}`);
  }

  return item;
}

export function getPageRoute(
  pageId: NavigationPageId,
  language: SupportedLanguage,
): string {
  return getNavigationItem(pageId).routes[language];
}

function normalizePathname(pathname: string): string {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function getPageIdFromPathname(
  pathname: string,
): NavigationPageId | undefined {
  const normalizedPathname = normalizePathname(pathname);

  return navigationItems.find((item) =>
    supportedLanguages.some(
      (language) => item.routes[language] === normalizedPathname,
    ),
  )?.id;
}

export function getEquivalentLanguagePath(
  pathname: string,
  targetLanguage: SupportedLanguage,
): string {
  const pageId = getPageIdFromPathname(pathname);

  if (!pageId) {
    return getPageRoute("home", targetLanguage);
  }

  return getPageRoute(pageId, targetLanguage);
}
