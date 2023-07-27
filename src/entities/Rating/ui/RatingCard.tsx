import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drower';

interface RatingCardProps {
  className?: string;
  title: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel: (rating: number) => void;
  onAccept: (rating: number, feedback?: string) => void;
}

export const RatingCard = (props: RatingCardProps) => {
  const { className, title, feedbackTitle, hasFeedback, onCancel, onAccept } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const onSelectRating = (rating: number) => {
    setRating(rating);

    if (hasFeedback) {
      setIsModalOpen(true);
      return;
    }
    onAccept(rating);
  };

  const acceptHandler = () => {
    setIsModalOpen(false);
    onAccept(rating, feedback);
  };

  const cancelHandler = () => {
    onCancel(rating);
    setIsModalOpen(false);
  };

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input placeholder={t('Your feedback')} value={feedback} onChange={setFeedback} />
    </>
  );

  return (
    <Card className={classNames('', {}, [className])}>
      <VStack align='center' gap='8'>
        <Text title={title} />
        <StarRating onSelect={onSelectRating} />
        <BrowserView>
          <Modal isOpen={isModalOpen} onClose={cancelHandler} lazy>
            <VStack max align='center' gap='32'>
              {modalContent}
              <HStack max gap='8' align='end' justify='end'>
                <Button theme={ButtonTheme.OUTLINE_WARNING} onClick={cancelHandler}>
                  {t('Cancel')}
                </Button>
                <Button theme={ButtonTheme.OUTLINE} onClick={acceptHandler}>
                  {t('Send')}
                </Button>
              </HStack>
            </VStack>
          </Modal>
        </BrowserView>
        <MobileView>
          <Drawer isOpened={isModalOpen} onClose={cancelHandler} lazy>
            <VStack max align='center' gap='32'>
              {modalContent}
              <Button theme={ButtonTheme.BACKGROUND} onClick={acceptHandler} size={ButtonSize.XL}>
                {t('Send')}
              </Button>
            </VStack>
          </Drawer>
        </MobileView>
      </VStack>
    </Card>
  );
};
