import React, { memo, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './Input.module.scss';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'readOnly'> {
  className?: string;
  value: string | number;
  onChange: (val: string) => void;
  autofocus?: boolean;
  readOnly?: boolean;
}

export const Input = memo(function Inp(props: InputProps) {
  const { className, value, onChange, placeholder, autofocus, type = 'text', readOnly, ...other } = props;
  const [focused, setFocused] = useState(other.autoFocus || false);
  const [caretPosition, setCaretPosition] = useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autofocus) {
      inputRef.current?.focus();
      setFocused(true);
      setCaretPosition(value.toString().length);
    }
  }, [autofocus, value]);

  const onBlured = () => {
    setFocused(false);
  };
  const onFocus = () => {
    if (readOnly) return;
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
    <div className={classNames(classes.InputWrapper, { [classes.readonly]: readOnly }, [className])}>
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
          readOnly={readOnly}
        />
        {focused && <span className={classes.caret} style={{ left: `${caretPosition * 9}px` }}></span>}
      </div>
    </div>
  );
});
