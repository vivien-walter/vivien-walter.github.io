import { useTranslation } from "react-i18next";

type PlaceholderPageProps = {
  titleKey: string;
};

function PlaceholderPage({ titleKey }: PlaceholderPageProps) {
  const { t } = useTranslation();

  return <h1>{t(titleKey)}</h1>;
}

export default PlaceholderPage;
