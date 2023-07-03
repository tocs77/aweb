import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import classes from './ArticleListItem.module.scss';
import { Text } from 'shared/ui/Text';
import { Icon } from 'shared/ui/Icon';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Card } from 'shared/ui/Card/ui/Card';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';
import { Article, ArticleBlockType, ArticleTextBlock, ArticleView } from '../../model/types/Article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

const ArticleListItemEl = (props: ArticleListItemProps) => {
  const { className, view, article } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article.id}`);
  }, [article.id, navigate]);

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
          <img src={article.img} className={classes.img} alt='article logo' />
          {textBlock && <ArticleTextBlockComponent block={textBlock} className={classes.textBlock} />}
          <div className={classes.footer}>
            <Button onClick={onOpenArticle}>{t('Read more')}</Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(classes.ArticleListItem, {}, [className, classes[view]])}>
      <Card className={classes.card} onClick={onOpenArticle}>
        <div className={classes.imageWrapper}>
          <img src={article.img} className={classes.img} alt='article logo' />
          <Text text={article.createdAt} className={classes.date} />
        </div>
        <div className={classes.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={classes.title} />
      </Card>
    </div>
  );
};

export const ArticleListItem = memo(ArticleListItemEl);
