import { Link } from "react-router-dom";

export type DetailNavigationLink = {
  readonly label: string;
  readonly to: string;
};

type DetailNavigationProps = {
  readonly ariaLabel: string;
  readonly backLink: DetailNavigationLink;
  readonly previousLink?: DetailNavigationLink;
  readonly nextLink?: DetailNavigationLink;
  readonly previousLabel: string;
  readonly nextLabel: string;
};

function DetailNavigation({
  ariaLabel,
  backLink,
  previousLink,
  nextLink,
  previousLabel,
  nextLabel,
}: DetailNavigationProps) {
  return (
    <nav className="detail-navigation" aria-label={ariaLabel}>
      <Link className="detail-navigation__back editorial-link" to={backLink.to}>
        {backLink.label}
      </Link>

      {previousLink || nextLink ? (
        <ul className="detail-navigation__list">
          {previousLink ? (
            <li className="detail-navigation__item">
              <Link
                className="detail-navigation__link"
                rel="prev"
                to={previousLink.to}
              >
                <span className="detail-navigation__direction">
                  {previousLabel}
                </span>

                <span className="detail-navigation__title">
                  {previousLink.label}
                </span>
              </Link>
            </li>
          ) : null}

          {nextLink ? (
            <li className="detail-navigation__item detail-navigation__item--next">
              <Link
                className="detail-navigation__link"
                rel="next"
                to={nextLink.to}
              >
                <span className="detail-navigation__direction">
                  {nextLabel}
                </span>

                <span className="detail-navigation__title">
                  {nextLink.label}
                </span>
              </Link>
            </li>
          ) : null}
        </ul>
      ) : null}
    </nav>
  );
}

export default DetailNavigation;
