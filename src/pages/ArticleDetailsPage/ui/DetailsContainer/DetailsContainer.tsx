import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';

export const DetailsContainer = () => {
  const { id } = useParams<{ id: string }>();

  return <Card padding='24'>{id && <ArticleDetails id={id} />}</Card>;
};
