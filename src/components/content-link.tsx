import { Link } from "react-router-dom";

import type { ContentLink as ContentLinkData } from "../content/site-content";
import { getPageRoute, type SupportedLanguage } from "../navigation";
import ExternalLink from "./external-link";

type ContentLinkProps = {
  readonly className?: string;
  readonly language: SupportedLanguage;
  readonly link: ContentLinkData;
};

function ContentLink({ className, language, link }: ContentLinkProps) {
  if (link.pageId !== undefined) {
    return (
      <Link className={className} to={getPageRoute(link.pageId, language)}>
        {link.label}
      </Link>
    );
  }

  return (
    <ExternalLink
      className={className}
      label={link.label}
      linkId={link.siteLinkId}
    />
  );
}

export default ContentLink;
