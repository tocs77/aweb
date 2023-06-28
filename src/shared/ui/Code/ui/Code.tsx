import { classNames } from 'shared/lib/classNames/classNames';
import classes from './Code.module.scss';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button';
import CopyIcon from 'shared/assets/icons/copy-20-20.svg';
import { Icon } from 'shared/ui/Icon';
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
      <Button className={classes.copyBtn} square={true} size={ButtonSize.XL} theme={ButtonTheme.CLEAR} onClick={onCopy}>
        <Icon Svg={CopyIcon} />
      </Button>
      <div className={classes.content}>
        <code>{content}</code>
      </div>
    </pre>
  );
};
