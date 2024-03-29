import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/consts/router';
import { Button } from '@/shared/ui/deprecated/Button';
import classes from './ArticleDetailsPageHeader.module.scss';
import { canEditArticle } from '../../model/selectors/article';

interface ArtilceDetailPageHeaderProps {
  className?: string;
}

const ArtilceDetailPageHeaderEl = ({ className }: ArtilceDetailPageHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const canEdit = useSelector(canEditArticle);

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    if (!id) {
      console.log('No id to edit');
      return;
    }
    navigate(getRouteArticleEdit(id));
  }, [id, navigate]);

  return (
    <div className={classNames(classes.ArtilceDetailPageHeader, {}, [className])}>
      <Button onClick={onBackToList}>{t('Back')}</Button>
      {canEdit && (
        <Button onClick={onEditArticle} className={classes.editBtn}>
          {t('Edit')}
        </Button>
      )}
    </div>
  );
};

export const ArtilceDetailPageHeader = memo(ArtilceDetailPageHeaderEl);
