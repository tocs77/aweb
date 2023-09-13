import React, { ReactElement, memo, useState } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import classes from './Input.module.scss';

type InputSize = 'm' | 'l';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'readOnly'> {
  className?: string;
  value: string | number;
  label?: string;
  onChange: (val: string) => void;
  autofocus?: boolean;
  readOnly?: boolean;
  addonLeft?: ReactElement;
  addonRight?: ReactElement;
  inputSize?: InputSize;
}

export const Input = memo(function Inp(props: InputProps) {
  const {
    className,
    value,
    onChange,
    placeholder,
    autofocus,
    type = 'text',
    label,
    readOnly,
    addonLeft,
    addonRight,
    inputSize = 'm',
    ...other
  } = props;
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

  const input = (
    <div className={classNames(classes.InputWrapper, mods, [className, classes[`size_${inputSize}`]])}>
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

  return label ? (
    <HStack max gap='8'>
      <Text text={label} />
      {input}
    </HStack>
  ) : (
    input
  );
});
