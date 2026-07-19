import { useTranslation } from "react-i18next";

import { getSiteLink, type SiteLinkId } from "../content/site-links";

type ExternalLinkProps = {
  readonly className?: string;
  readonly label?: string;
  readonly linkId: SiteLinkId;
};

function ExternalLink({ className, label, linkId }: ExternalLinkProps) {
  const { t } = useTranslation();
  const link = getSiteLink(linkId);

  const linkClassName = ["external-link", className].filter(Boolean).join(" ");

  const visibleLabel = label ?? t(link.labelKey);

  return (
    <a
      className={linkClassName}
      href={link.href}
      data-external={link.isExternal ? "true" : undefined}
    >
      <span className="external-link__label">{visibleLabel}</span>

      {link.isExternal ? (
        <span className="external-link__marker" aria-hidden="true">
          ↗
        </span>
      ) : null}
    </a>
  );
}

export default ExternalLink;
