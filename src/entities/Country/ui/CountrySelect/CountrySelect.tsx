import { useMemo, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select, SelectOption } from 'shared/ui/Select';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange: (value: Country) => void;
  readOnly?: boolean;
}

const CountrySelectEl = (props: CountrySelectProps) => {
  const { className, value, onChange, readOnly } = props;
  const { t } = useTranslation();

  const options = useMemo<SelectOption[]>(() => {
    const opts: SelectOption[] = [];
    for (const country of Object.entries(Country)) {
      opts.push({ value: country[0], content: country[1] });
    }
    return opts;
  }, []);

  return (
    <Select<Country>
      className={classNames('', {}, [className])}
      onChange={onChange}
      label={t('Select country')}
      options={options}
      value={value}
      readOnly={readOnly}
    />
  );
};

export const CountrySelect = memo(CountrySelectEl);
