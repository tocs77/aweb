import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/consts/router';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import classes from './ArticleListItemRedesigned.module.scss';
import { ArticleListItemProps } from '../ArticleListItem';
import { ArticleTextBlock } from '../../../model/types/Article';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar || ''} />
      <Text bold text={article.user.username} />
    </>
  );
  const views = (
    <HStack gap='8'>
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={classes.views} />
    </HStack>
  );

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

    return (
      <Card
        padding='24'
        max
        data-testid='ArticleListItem'
        className={classNames(classes.ArticleListItem, {}, [className, classes[view]])}>
        <VStack max gap='16'>
          <HStack gap='8' max>
            <Avatar size={32} src={article.user.avatar || ''} />
            <Text bold text={article.user.username} />
            <Text text={article.createdAt} />
          </HStack>
          <Text title={article.title} bold />
          <Text title={article.subtitle} size='m' />
          <AppImage
            fallback={<Skeleton width='100%' height={250} />}
            src={article.img}
            className={classes.img}
            alt={article.title}
          />
          {textBlock?.paragraphs && <Text className={classes.textBlock} text={textBlock.paragraphs.slice(0, 2).join(' ')} />}
          <HStack max justify='between'>
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
              <Button variant='outline'>{t('Читать далее...')}</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  return (
    <AppLink
      data-testid='ArticleListItem'
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(classes.ArticleListItem, {}, [className, classes[view]])}>
      <Card className={classes.card} border='round'>
        <AppImage
          fallback={<Skeleton width={200} height={200} />}
          alt={article.title}
          src={article.img}
          className={classes.img}
        />
        <VStack className={classes.info} gap='4'>
          <Text title={article.title} className={classes.title} />
          <VStack gap='4' className={classes.footer} max>
            <HStack justify='between' max>
              <Text text={article.createdAt} className={classes.date} />
              {views}
            </HStack>
            <HStack gap='4'>{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
