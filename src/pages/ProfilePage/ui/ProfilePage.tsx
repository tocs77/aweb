import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/EditableProfileCard';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  return <Page>{id && <EditableProfileCard id={id} />}</Page>;
};
export default ProfilePage;
