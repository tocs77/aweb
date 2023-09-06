import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import classes from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/Article';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

const ArticleTextBlockComponentEl = (props: ArticleTextBlockComponentProps) => {
  const { className, block } = props;

  return (
    <div className={classNames(classes.ArticleTextBlockComponentWrapper, {}, [className])}>
      {block.title && <Text title={block.title} className={classes.title} />}
      {block.paragraphs.map((paragraph, index) => (
        <Text text={paragraph} key={index} className={classes.paragraph} />
      ))}
    </div>
  );
};

export const ArticleTextBlockComponent = memo(ArticleTextBlockComponentEl);
