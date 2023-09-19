import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '@/entities/Article/model/types/Article';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code/ui/Code';
import { Code } from '@/shared/ui/redesigned/Code/ui/Code';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

const ArticleCodeBlockComponentEl = (props: ArticleCodeBlockComponentProps) => {
  const { className, block } = props;

  return (
    <div className={classNames(classes.ArticleCodeBlockComponent, {}, [className])}>
      <ToggleFeatures feature='isAppRedesigned' on={<Code code={block.code} />} off={<CodeDeprecated code={block.code} />} />
    </div>
  );
};

export const ArticleCodeBlockComponent = memo(ArticleCodeBlockComponentEl);
