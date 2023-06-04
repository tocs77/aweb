import { classNames } from 'shared/lib/classNames';
import classes from './LangSwitcher.module.scss';
import { Button, ThemeButton } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button className={classNames(classes.LangSwitcher, {}, [className])} theme={ThemeButton.CLEAR} onClick={changeLanguage}>
      {t('language')}
    </Button>
  );
};
