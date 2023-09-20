import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import classes from './AddCommentForm.module.scss';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addCommentFormActions } from '../../model/slices/addCommentFormSlice';
import { ADD_COMMENT_FORM_SLICE_NAME } from '../../model/types/addCommentForm';
import { addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import { getAddCommentError, getAddCommentText } from '@/features/AddCommentForm/model/selectors/addCommentFormSelectors';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';

interface AddCommentFormProps {
  className?: string;
  onSendComment: (val: string) => void;
}

const initialReducers: ReducersList = { [ADD_COMMENT_FORM_SLICE_NAME]: addCommentFormReducer };

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const text = useSelector(getAddCommentText);
  const error = useSelector(getAddCommentError);
  const dispatch = useAppDispatch();

  const onUpdateText = useCallback(
    (val: string) => {
      dispatch(addCommentFormActions.setText(val));
    },
    [dispatch],
  );

  const sendCommentHandler = useCallback(() => {
    onSendComment(text);
    dispatch(addCommentFormActions.setText(''));
  }, [dispatch, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <Card max variant='outlined' padding='16'>
            <HStack gap='16' className={classNames('', {}, [className])} data-testid='AddCommentForm'>
              {error && <Text text={error} variant='error' />}
              <Input
                placeholder={t('Enter comment')}
                value={text || ''}
                onChange={onUpdateText}
                className={classes.input}
                data-testid='AddCommentForm.Input'
              />
              <Button variant='outline' onClick={sendCommentHandler} data-testid='AddCommentForm.AddBtn'>
                {t('Add comment')}
              </Button>
            </HStack>
          </Card>
        }
        off={
          <div className={classNames(classes.AddCommentForm, {}, [className])} data-testid='AddCommentForm'>
            {error && <TextDeprecated text={error} theme={TextTheme.ERROR} />}
            <InputDeprecated
              placeholder={t('Enter comment')}
              value={text || ''}
              onChange={onUpdateText}
              className={classes.input}
              data-testid='AddCommentForm.Input'
            />
            <ButtonDeprecated theme={ButtonTheme.OUTLINE} onClick={sendCommentHandler} data-testid='AddCommentForm.AddBtn'>
              {t('Add comment')}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
