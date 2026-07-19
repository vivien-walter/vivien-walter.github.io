import { useLocation } from "react-router-dom";

import { getLanguageFromPathname } from "../navigation";
import { getSiteContentState } from "./site-content";

export function useSiteContent() {
  const { pathname } = useLocation();
  const language = getLanguageFromPathname(pathname);
  const { content, issues } = getSiteContentState(language);

  return {
    language,
    content,
    issues,
  } as const;
}
