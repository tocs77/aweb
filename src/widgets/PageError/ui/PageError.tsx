import classes from './PageError.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';

interface PageErrorProps {
  className?: string;
}

export const PageError = (props: PageErrorProps) => {
  const { t } = useTranslation();

  const reloadPageHandler = () => {
    window.location.reload();
  };
  return (
    <div className={classNames(classes.PageError, {}, [props.className])}>
      <p>{t('Something went wrong')}</p>
      <Button onClick={reloadPageHandler}>{t('Reload page')}</Button>
    </div>
  );
};
