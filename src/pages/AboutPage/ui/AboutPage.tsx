import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AboutPage = () => {
  const { t } = useTranslation();
  return <Page data-testid='about-page'>{t('About Page')}</Page>;
};
export default AboutPage;
