import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

const LangSwitcherEl = ({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button className={classNames('', {}, [className])} theme={ButtonTheme.CLEAR} onClick={changeLanguage}>
      {t(short ? 'lang' : 'language')}
    </Button>
  );
};

export const LangSwitcher = memo(LangSwitcherEl);
