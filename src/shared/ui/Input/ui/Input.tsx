import React, { memo, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import classes from './Input.module.scss';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  className?: string;
  value: string;
  onChange: (val: string) => void;
  autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
  const { className, value, onChange, placeholder, autofocus, type = 'text', ...other } = props;
  const [focused, setFocused] = useState(other.autoFocus || false);
  const [caretPosition, setCaretPosition] = useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autofocus) {
      inputRef.current?.focus();
      setFocused(true);
      setCaretPosition(value.length);
    }
  }, [autofocus, inputRef.current]);

  const onBlured = () => {
    setFocused(false);
  };
  const onFocus = () => {
    setFocused(true);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setCaretPosition(e.target.value.length);
  };
  const onSelectHandler = (e: React.SyntheticEvent<HTMLInputElement, Event>) => {
    if (e.target instanceof HTMLInputElement) {
      setCaretPosition(e.target.selectionStart || 0);
    }
  };

  return (
    <div className={classNames(classes.InputWrapper, {}, [className])}>
      {placeholder && <div className={classes.placeholder}>{`${placeholder}>`}</div>}
      <div className={classes.caretWrapper}>
        <input
          ref={inputRef}
          value={value}
          onChange={onChangeHandler}
          type={type}
          className={classes.input}
          {...other}
          onBlur={onBlured}
          onFocus={onFocus}
          onSelect={onSelectHandler}
        />
        {focused && <span className={classes.caret} style={{ left: `${caretPosition * 9}px` }}></span>}
      </div>
    </div>
  );
});
