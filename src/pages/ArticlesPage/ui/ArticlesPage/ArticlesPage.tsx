import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ArticlesPage = () => {
  const { t } = useTranslation();
  return <h1>{t('Articles page')}</h1>;
};

export default memo(ArticlesPage);
