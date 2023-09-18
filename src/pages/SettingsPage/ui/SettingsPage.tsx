import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UiDesignSwitcher } from '@/features/UiDesignSwitcher/ui/UiDesignSwitcher';
import { Text } from '@/shared/ui/redesigned/Text';

const SettingsPage = () => {
  const { t } = useTranslation();
  return (
    <Page data-testid='settings-page'>
      <VStack gap='16'>
        <Text title={t('Settings')} />
        <UiDesignSwitcher />
      </VStack>
    </Page>
  );
};
export default SettingsPage;
