import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import classes from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '@/entities/Article/model/types/Article';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

const ArticleImageBlockComponentEl = (props: ArticleImageBlockComponentProps) => {
  const { className, block } = props;

  return (
    <div className={classNames(classes.ArticleImageBlockComponent, {}, [className])}>
      <img src={block.src} alt={block.title} className={classes.img}></img>
      {block.title && (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<Text title={block.title} className={classes.title} align='center' />}
          off={<TextDeprecated title={block.title} className={classes.title} align={TextAlign.CENTER} />}
        />
      )}
    </div>
  );
};

export const ArticleImageBlockComponent = memo(ArticleImageBlockComponentEl);
