import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { Article, ArticleBlock } from '../../../model/types/Article';
import classes from './ArticleDetailsContentRedesigned.module.scss';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

interface ArticleDetailsContentRedeignedProps {
  isLoading: boolean;
  error?: string;
  article?: Article;
  renderBlock: (block: ArticleBlock) => JSX.Element | null;
}
export const ArticleDetailsContentRedeigned = (props: ArticleDetailsContentRedeignedProps) => {
  const { isLoading, error, article, renderBlock } = props;
  const { t } = useTranslation();
  let content: JSX.Element;

  if (isLoading) {
    content = (
      <>
        <Skeleton width={200} height={200} border='50%' className={classes.img} />
        <Skeleton width={300} height={32} className={classes.title} />
        <Skeleton width={600} height={24} className={classes.skeleton} />
        <Skeleton width={'100%'} height={200} className={classes.skeleton} />
        <Skeleton width={'100%'} height={200} className={classes.skeleton} />
      </>
    );
  } else if (error) {
    content = <Text text={error} variant='error' title={t('Error loading article')} align='center' />;
  } else {
    content = (
      <>
        <VStack max gap='8'>
          <Text title={article?.title} size='xl' data-testid='article-detils-title' bold />
          <Text text={article?.subtitle} size='l' data-testid='article-detils-title' />
          <AppImage src={article?.img} className={classes.img} />
        </VStack>

        {article?.blocks.map(renderBlock)}
      </>
    );
  }
  return content;
};
