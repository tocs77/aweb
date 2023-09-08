import { useMemo, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ListBox, ListBoxItem } from '@/shared/ui/redesigned/Popups';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange: (value: Country) => void;
  readOnly?: boolean;
}

const CountrySelectEl = (props: CountrySelectProps) => {
  const { className, value = Country.Australia, onChange, readOnly } = props;
  const { t } = useTranslation();

  const options = useMemo<ListBoxItem[]>(() => {
    const opts: ListBoxItem[] = [];
    for (const country of Object.entries(Country)) {
      opts.push({ value: country[0], content: country[1] });
    }
    return opts;
  }, []);

  return (
    <ListBox<Country>
      className={classNames('', {}, [className])}
      onChange={onChange}
      defaultValue={t('Select country')}
      label={t('Select country')}
      items={options}
      value={value}
      readonly={readOnly}
      direction='top-right'
    />
  );
};

export const CountrySelect = memo(CountrySelectEl);
