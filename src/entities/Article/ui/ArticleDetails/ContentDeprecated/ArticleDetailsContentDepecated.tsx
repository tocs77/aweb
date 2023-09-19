import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { TextSize } from '@/shared/ui/deprecated/Text/ui/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { Article, ArticleBlock } from '../../../model/types/Article';
import classes from './ArticleDetailsContentDeprecated.module.scss';

interface ArticleDetailsContentDeprProps {
  isLoading: boolean;
  error?: string;
  article?: Article;
  renderBlock: (block: ArticleBlock) => JSX.Element | null;
}
export const ArticleDetailsContentDeprecated = (props: ArticleDetailsContentDeprProps) => {
  const { isLoading, error, article, renderBlock } = props;
  const { t } = useTranslation();
  let content: JSX.Element;

  if (isLoading) {
    content = (
      <>
        <Skeleton width={200} height={200} border='50%' className={classes.avatar} />
        <Skeleton width={300} height={32} className={classes.title} />
        <Skeleton width={600} height={24} className={classes.skeleton} />
        <Skeleton width={'100%'} height={200} className={classes.skeleton} />
        <Skeleton width={'100%'} height={200} className={classes.skeleton} />
      </>
    );
  } else if (error) {
    content = <Text text={error} theme={TextTheme.ERROR} title={t('Error loading article')} align={TextAlign.CENTER} />;
  } else {
    content = (
      <>
        {article?.img && <Avatar size={200} src={article?.img} className={classes.avatar} />}
        <Text title={article?.title} text={article?.subtitle} size={TextSize.L} data-testid='article-detils-title' />
        <HStack gap='8'>
          <Icon Svg={EyeIcon} /> <Text text={String(article?.views)} />
        </HStack>
        <HStack gap='8'>
          <Icon Svg={CalendarIcon} />
          <Text text={article?.createdAt} />
        </HStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }
  return content;
};
