type PageHeaderProps = {
  readonly eyebrow: string;
  readonly title: string;
  readonly introduction: string | readonly string[];
};

function PageHeader({ eyebrow, title, introduction }: PageHeaderProps) {
  const paragraphs =
    typeof introduction === "string" ? [introduction] : introduction;

  return (
    <header className="page-header">
      <p className="page-header__eyebrow">{eyebrow}</p>

      <h1 id="page-title" className="page-header__title">
        {title}
      </h1>

      <div className="page-header__introduction">
        {paragraphs.map((paragraph, index) => (
          <p key={`${index}-${paragraph}`}>{paragraph}</p>
        ))}
      </div>
    </header>
  );
}

export default PageHeader;
