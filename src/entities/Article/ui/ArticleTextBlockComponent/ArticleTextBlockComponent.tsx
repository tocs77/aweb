import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import classes from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/Article';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

const ArticleTextBlockComponentEl = (props: ArticleTextBlockComponentProps) => {
  const { className, block } = props;

  return (
    <div className={classNames(classes.ArticleTextBlockComponentWrapper, {}, [className])}>
      {block.title && (
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<Text title={block.title} className={classes.title} />}
          off={<TextDeprecated title={block.title} className={classes.title} />}
        />
      )}
      {block.paragraphs.map((paragraph, index) => (
        <ToggleFeatures
          key={index}
          feature='isAppRedesigned'
          on={<Text text={paragraph} className={classes.paragraph} />}
          off={<TextDeprecated text={paragraph} className={classes.paragraph} />}
        />
      ))}
    </div>
  );
};

export const ArticleTextBlockComponent = memo(ArticleTextBlockComponentEl);
