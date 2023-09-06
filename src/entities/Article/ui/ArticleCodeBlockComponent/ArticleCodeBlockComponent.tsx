import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '@/entities/Article/model/types/Article';
import { Code } from '@/shared/ui/deprecated/Code/ui/Code';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

const ArticleCodeBlockComponentEl = (props: ArticleCodeBlockComponentProps) => {
  const { className, block } = props;

  return (
    <div className={classNames(classes.ArticleCodeBlockComponent, {}, [className])}>
      <Code code={block.code} />
    </div>
  );
};

export const ArticleCodeBlockComponent = memo(ArticleCodeBlockComponentEl);
