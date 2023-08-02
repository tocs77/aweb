import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const MainPage = () => {
  const { t } = useTranslation();
  return <Page data-testid='main-page'>{t('Main Page')}</Page>;
};

export default MainPage;
