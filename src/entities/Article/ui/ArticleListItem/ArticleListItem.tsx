import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './ArticleListItem.module.scss';
import { Text } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { Card } from '@/shared/ui/deprecated/Card/ui/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button } from '@/shared/ui/deprecated/Button';
import { Article, ArticleTextBlock } from '../../model/types/Article';
import { ArticleBlockType, ArticleView } from '../../model/consts/consts';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { getRouteArticleDetails } from '@/shared/consts/router';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { AppImage } from '@/shared/ui/deprecated/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const ArticleListItemEl = (props: ArticleListItemProps) => {
  const { className, view, article, target } = props;
  const { t } = useTranslation();

  const types = <Text text={article.type.join(', ')} className={classes.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={classes.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (ArticleView.LIST == view) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
    return (
      <div className={classNames(classes.ArticleListItem, {}, [className, classes[view]])}>
        <Card className={classes.card}>
          <div className={classes.header}>
            <Avatar size={30} src={article.user.avatar || ''} />
            <Text text={article.user.username} className={classes.username} />
            <Text text={article.createdAt} className={classes.date} />
          </div>
          <Text text={article.title} className={classes.title} />
          {types}
          <AppImage src={article.img} className={classes.img} alt='article logo' fallback={<Skeleton width={50} height={50} />} />
          {textBlock && <ArticleTextBlockComponent block={textBlock} className={classes.textBlock} />}
          <div className={classes.footer}>
            <AppLink to={getRouteArticleDetails(article.id)} target={target}>
              <Button>{t('Read more')}</Button>
            </AppLink>

            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(classes.ArticleListItem, {}, [className, classes[view]])}>
      <Card className={classes.card} data-testid='articles-card'>
        <div className={classes.imageWrapper}>
          <AppImage src={article.img} className={classes.img} alt='article logo' fallback={<Skeleton width={50} height={50} />} />
          <Text text={article.createdAt} className={classes.date} />
        </div>
        <div className={classes.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={classes.title} />
      </Card>
    </AppLink>
  );
};

export const ArticleListItem = memo(ArticleListItemEl);
