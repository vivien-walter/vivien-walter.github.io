import { Link } from "react-router-dom";

export type BreadcrumbItem = {
  readonly label: string;
  readonly to?: string;
};

type BreadcrumbsProps = {
  readonly ariaLabel: string;
  readonly items: readonly BreadcrumbItem[];
};

function Breadcrumbs({ ariaLabel, items }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label={ariaLabel}>
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1;

          return (
            <li className="breadcrumbs__item" key={`${item.label}-${index}`}>
              {item.to && !isCurrentPage ? (
                <Link className="breadcrumbs__link" to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className="breadcrumbs__current"
                  aria-current={isCurrentPage ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
