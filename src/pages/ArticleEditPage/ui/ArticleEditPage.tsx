import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';

const ArticleEditPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  return <Page>{isEdit ? t('Редактирование статьи') : t('СозданиеСтатьи')}</Page>;
};
export default ArticleEditPage;
