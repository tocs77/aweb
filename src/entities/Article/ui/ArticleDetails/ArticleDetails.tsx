import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getArticleDetailsData, getError, getIsLoading } from '../../model/selectors/articleDetails';
import { ArticleBlockType } from '../../model/consts/consts';
import { ArticleBlock } from '../../model/types/Article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ARTICLE_DETAILS_SLICE_NAME } from '../../model/types/articleDetailsSchema';
import classes from './ArticleDetails.module.scss';
import { ArticleDetailsContentDeprecated } from './ContentDeprecated/ArticleDetailsContentDepecated';
import { ArticleDetailsContentRedeigned } from './ContentRedesigned/ArticleDetailsContentRedesigned';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  [ARTICLE_DETAILS_SLICE_NAME]: articleDetailsReducer,
};

const ArticleDetailsEl = (props: ArticleDetailsProps) => {
  const { className, id } = props;
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

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={classNames(classes.ArticleDetails, {}, [className])} data-testid='article-details'>
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<ArticleDetailsContentRedeigned article={article} isLoading={isLoading} error={error} renderBlock={renderBlock} />}
          off={
            <ArticleDetailsContentDeprecated article={article} isLoading={isLoading} error={error} renderBlock={renderBlock} />
          }
        />
      </div>
    </DynamicModuleLoader>
  );
};

export const ArticleDetails = memo(ArticleDetailsEl);
