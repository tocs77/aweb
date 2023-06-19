import { PROFILE_SLICE_NAME, profileReducer } from 'entities/Profile';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const reducers: ReducersList = { [PROFILE_SLICE_NAME]: profileReducer };

const ProfilePage = () => {
  const { t } = useTranslation();
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <h1>{t('Profile Page')}</h1>
    </DynamicModuleLoader>
  );
};
export default ProfilePage;
