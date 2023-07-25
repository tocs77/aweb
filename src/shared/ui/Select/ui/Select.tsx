import { memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import classes from './Select.module.scss';

export interface SelectOption<T = string> {
  value: T;
  content: string;
}

interface SelectProps<T = string> {
  className?: string;
  label?: string;
  options: SelectOption[];
  value: T;
  onChange: (value: T) => void;
  readOnly?: boolean;
}

export const SelectEl = <T,>(props: SelectProps<T>) => {
  const { className, label, options, value, onChange, readOnly } = props;

  const optionsList = useMemo(
    () =>
      options.map((option) => (
        <option className={classes.option} key={option.value} value={option.value}>
          {option.content}
        </option>
      )),
    [options],
  );

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange(value as T);
  };

  return (
    <div className={classNames(classes.Wrapper, {}, [className])}>
      {label && <span className={classes.label}>{`${label}>`}</span>}
      <select className={classes.select} value={value as string} onChange={changeHandler} disabled={readOnly}>
        {optionsList}
      </select>
    </div>
  );
};

export const Select = memo(SelectEl) as typeof SelectEl;
