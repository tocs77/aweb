import { ArticleDetails } from 'entities/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const ArticleDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>{t('Article not found')}</div>;
  return (
    <div>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
