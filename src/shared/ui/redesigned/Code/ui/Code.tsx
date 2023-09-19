import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Code.module.scss';
import CopyIcon from '@/shared/assets/icons/copy.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { useCallback } from 'react';

interface CodeProps {
  className?: string;
  code: string;
}

export const Code = (props: CodeProps) => {
  const { className, code: content } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
  }, [content]);

  return (
    <pre className={classNames(classes.Code, {}, [className])}>
      <Icon Svg={CopyIcon} clickable onClick={onCopy} className={classes.copyBtn} />

      <div className={classes.content}>
        <code>{content}</code>
      </div>
    </pre>
  );
};
