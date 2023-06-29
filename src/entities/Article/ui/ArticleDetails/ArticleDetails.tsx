import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ARTICLE_DETAILS_SLICE_NAME } from '../../model/types/articleDetailsSchema';
import classes from './ArticleDetails.module.scss';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text';
import { getArticleDetailsData, getError, getIsLoading } from '../../model/selectors/articleDetails';
import { Skeleton } from 'shared/ui/Skeleton';
import { Avatar } from 'shared/ui/Avatar';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import { TextSize } from 'shared/ui/Text/ui/Text';
import { Icon } from 'shared/ui/Icon';
import { ArticleBlock, ArticleBlockType } from '../../model/types/Article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  [ARTICLE_DETAILS_SLICE_NAME]: articleDetailsReducer,
};

const ArticleDetailsEl = (props: ArticleDetailsProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const article = useSelector(getArticleDetailsData);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useInitialEffect(() => dispatch(fetchArticleById(id)));

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent key={block.id} block={block} className={classes.block} />;
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent key={block.id} block={block} className={classes.block} />;
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent key={block.id} block={block} className={classes.block} />;
      default:
        return null;
    }
  }, []);

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
        <Text title={article?.title} text={article?.subtitle} size={TextSize.L} />
        <div className={classes.articleInfo}>
          <Icon Svg={EyeIcon} /> <Text text={String(article?.views)} />
        </div>
        <div className={classes.articleInfo}>
          <Icon Svg={CalendarIcon} />
          <Text text={article?.createdAt} />
        </div>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={classNames(classes.ArticleDetails, {}, [className])}>{content}</div>
    </DynamicModuleLoader>
  );
};

export const ArticleDetails = memo(ArticleDetailsEl);
