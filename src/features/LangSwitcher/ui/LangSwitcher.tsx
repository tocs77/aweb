import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/features';

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
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Button className={classNames('', {}, [className])} variant='clear' onClick={changeLanguage}>
          {t(short ? 'lang' : 'language')}
        </Button>
      }
      off={
        <ButtonDeprecated className={classNames('', {}, [className])} theme={ButtonTheme.CLEAR} onClick={changeLanguage}>
          {t(short ? 'lang' : 'language')}
        </ButtonDeprecated>
      }
    />
  );
};

export const LangSwitcher = memo(LangSwitcherEl);
