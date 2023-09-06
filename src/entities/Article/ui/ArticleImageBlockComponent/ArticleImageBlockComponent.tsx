import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign } from '@/shared/ui/deprecated/Text';
import classes from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '@/entities/Article/model/types/Article';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

const ArticleImageBlockComponentEl = (props: ArticleImageBlockComponentProps) => {
  const { className, block } = props;

  return (
    <div className={classNames(classes.ArticleImageBlockComponent, {}, [className])}>
      <img src={block.src} alt={block.title} className={classes.img}></img>
      {block.title && <Text title={block.title} className={classes.title} align={TextAlign.CENTER} />}
    </div>
  );
};

export const ArticleImageBlockComponent = memo(ArticleImageBlockComponentEl);
