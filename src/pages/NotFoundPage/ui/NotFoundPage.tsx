import { useTranslation } from 'react-i18next';
import classes from './NotFoundPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = (props: NotFoundPageProps) => {
  const { t } = useTranslation();

  return <div className={classNames(classes.NotFoundPage, {}, [props.className])}>{t('Page not found')}</div>;
};
