import { useSelector } from 'react-redux';

import { getArticleDetailsData } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';

import classes from './AdditionalInfoContainer.module.scss';

export const AdditionalInfoContainer = () => {
  const article = useSelector(getArticleDetailsData);
  if (!article) return null;
  return (
    <Card padding='24' border='round' className={classes.card} max>
      <ArticleAdditionalInfo author={article.user} createdAt={article.createdAt} views={article.views} />
    </Card>
  );
};
