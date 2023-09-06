import { useMemo, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Currency } from '../../model/types/currency';
import { ListBox, ListBoxItem } from '@/shared/ui/deprecated/Popups';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange: (value: Currency) => void;
  readOnly?: boolean;
}

const CurrencySelectEl = (props: CurrencySelectProps) => {
  const { className, value = Currency.RUB, onChange, readOnly } = props;
  const { t } = useTranslation();

  const options = useMemo<ListBoxItem[]>(() => {
    const counties = Object.entries(Currency);
    const opts: ListBoxItem[] = [];
    for (const country of counties) {
      opts.push({ value: country[0], content: country[1] });
    }
    return opts;
  }, []);

  return (
    <ListBox<Currency>
      className={classNames('', {}, [className])}
      onChange={onChange}
      items={options}
      value={value}
      defaultValue={t('Select currency')}
      label={t('Select currency')}
      readonly={readOnly}
    />
  );
};

export const CurrencySelect = memo(CurrencySelectEl);
