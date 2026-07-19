import { useTranslation } from "react-i18next";

type PlaceholderPageProps = {
  titleKey: string;
};

function PlaceholderPage({ titleKey }: PlaceholderPageProps) {
  const { t } = useTranslation();

  return (
    <section className="placeholder-page" aria-labelledby="page-title">
      <div className="placeholder-page__inner">
        <h1 id="page-title">{t(titleKey)}</h1>
      </div>
    </section>
  );
}

export default PlaceholderPage;
