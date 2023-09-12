import React, { ReactElement, memo, useState } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import classes from './Input.module.scss';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'readOnly'> {
  className?: string;
  value: string | number;
  onChange: (val: string) => void;
  autofocus?: boolean;
  readOnly?: boolean;
  addonLeft?: ReactElement;
  addonRight?: ReactElement;
}

export const Input = memo(function Inp(props: InputProps) {
  const { className, value, onChange, placeholder, autofocus, type = 'text', readOnly, addonLeft, addonRight, ...other } = props;
  const [focused, setFocused] = useState(autofocus || false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const onFocus = () => {
    if (readOnly) return;
    setFocused(true);
  };

  const onBlured = () => {
    setFocused(false);
  };

  const mods: Mods = {
    [classes.readonly]: readOnly,
    [classes.focused]: focused,
    [classes.withLeftAddon]: Boolean(addonLeft),
    [classes.withRightAddon]: Boolean(addonRight),
  };

  return (
    <div className={classNames(classes.InputWrapper, mods, [className])}>
      {addonLeft && <div className={classes.addonLeft}>{addonLeft}</div>}
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeHandler}
        type={type}
        className={classes.input}
        {...other}
        onFocus={onFocus}
        readOnly={readOnly}
        placeholder={placeholder}
        autoFocus={autofocus}
        onBlur={onBlured}
      />
      {addonRight && <div className={classes.addonRight}>{addonRight}</div>}
    </div>
  );
});
