import { useEffect, useState } from 'react';
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
  rating?: number;
}

export const RatingCard = (props: RatingCardProps) => {
  const { className, title, feedbackTitle, hasFeedback, onCancel, onAccept, rating = 0 } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rate, setRate] = useState(props.rating || 0);

  useEffect(() => {
    setRate(rating);
  }, [rating]);

  const onSelectRating = (rating: number) => {
    setRate(rating);

    if (hasFeedback) {
      setIsModalOpen(true);
      return;
    }
    onAccept(rating);
  };

  const acceptHandler = () => {
    setIsModalOpen(false);
    onAccept(rate, feedback);
  };

  const cancelHandler = () => {
    onCancel(rate);
    setIsModalOpen(false);
  };

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input placeholder={t('Your feedback')} value={feedback} onChange={setFeedback} />
    </>
  );
  const titleText = rate === 0 ? title : t('Thanks for your feedback');

  return (
    <Card className={classNames('', {}, [className])}>
      <VStack align='center' gap='8'>
        <Text title={titleText} />
        <StarRating onSelect={onSelectRating} selectedStars={rate} />
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