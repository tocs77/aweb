import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { StarRating } from '@/shared/ui/redesigned/StartRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button as ButtonDeprecated, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { Drawer } from '@/shared/ui/redesigned/Drower';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

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
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <>
          <Text title={feedbackTitle} />
          <Input placeholder={t('Your feedback')} value={feedback} onChange={setFeedback} />
        </>
      }
      off={
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated placeholder={t('Your feedback')} value={feedback} onChange={setFeedback} />
        </>
      }
    />
  );
  const titleText = rate === 0 ? title : t('Thanks for your feedback');

  const content = (
    <VStack align='center' gap='8' data-testid='RatingCard'>
      <ToggleFeatures feature='isAppRedesigned' on={<Text title={titleText} />} off={<TextDeprecated title={titleText} />} />

      <StarRating onSelect={onSelectRating} selectedStars={rate} />
      <BrowserView>
        <Modal isOpen={isModalOpen} onClose={cancelHandler} lazy>
          <VStack max align='center' gap='32'>
            {modalContent}
            <HStack max gap='8' align='end' justify='end'>
              <ToggleFeatures
                feature='isAppRedesigned'
                on={
                  <>
                    <Button variant='outline_warning' onClick={cancelHandler} data-testid='RatingCard.CancelBtn'>
                      {t('Cancel')}
                    </Button>
                    <Button variant='outline' onClick={acceptHandler} data-testid='RatingCard.SendBtn'>
                      {t('Send')}
                    </Button>
                  </>
                }
                off={
                  <>
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE_WARNING}
                      onClick={cancelHandler}
                      data-testid='RatingCard.CancelBtn'>
                      {t('Cancel')}
                    </ButtonDeprecated>
                    <ButtonDeprecated theme={ButtonTheme.OUTLINE} onClick={acceptHandler} data-testid='RatingCard.SendBtn'>
                      {t('Send')}
                    </ButtonDeprecated>
                  </>
                }
              />
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpened={isModalOpen} onClose={cancelHandler} lazy>
          <VStack max align='center' gap='32'>
            {modalContent}
            <ToggleFeatures
              feature='isAppRedesigned'
              on={
                <Button variant='background' onClick={acceptHandler} size='xl' data-testid='RatingCard.SendBtn'>
                  {t('Send')}
                </Button>
              }
              off={
                <ButtonDeprecated
                  theme={ButtonTheme.BACKGROUND}
                  onClick={acceptHandler}
                  size={ButtonSize.XL}
                  data-testid='RatingCard.SendBtn'>
                  {t('Send')}
                </ButtonDeprecated>
              }
            />
          </VStack>
        </Drawer>
      </MobileView>
    </VStack>
  );

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <Card className={classNames('', {}, [className])} padding='24' max>
          {content}
        </Card>
      }
      off={<CardDeprecated className={classNames('', {}, [className])}>{content}</CardDeprecated>}
    />
  );
};
