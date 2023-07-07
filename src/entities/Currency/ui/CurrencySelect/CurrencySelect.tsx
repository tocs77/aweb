import { useMemo, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select, SelectOption } from 'shared/ui/Select';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange: (value: Currency) => void;
  readOnly?: boolean;
}

const CurrencySelectEl = (props: CurrencySelectProps) => {
  const { className, value = Currency.RUB, onChange, readOnly } = props;
  const { t } = useTranslation();

  const options = useMemo<SelectOption[]>(() => {
    const counties = Object.entries(Currency);
    const opts: SelectOption[] = [];
    for (const country of counties) {
      opts.push({ value: country[0], content: country[1] });
    }
    return opts;
  }, []);

  return (
    <Select<Currency>
      className={classNames('', {}, [className])}
      onChange={onChange}
      label={t('Select currency')}
      options={options}
      value={value}
      readOnly={readOnly}
    />
  );
};

export const CurrencySelect = memo(CurrencySelectEl);
