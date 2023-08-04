import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import classes from './AddCommentForm.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text, TextTheme } from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addCommentFormActions } from '../../model/slices/addCommentFormSlice';
import { ADD_COMMENT_FORM_SLICE_NAME } from '../../model/types/addCommentForm';
import { addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import { getAddCommentError, getAddCommentText } from '@/features/AddCommentForm/model/selectors/addCommentFormSelectors';

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
      <div className={classNames(classes.AddCommentForm, {}, [className])} data-testid='AddCommentForm'>
        {error && <Text text={error} theme={TextTheme.ERROR} />}
        <Input
          placeholder={t('Enter comment')}
          value={text || ''}
          onChange={onUpdateText}
          className={classes.input}
          data-testid='AddCommentForm.Input'
        />
        <Button theme={ButtonTheme.OUTLINE} onClick={sendCommentHandler} data-testid='AddCommentForm.AddBtn'>
          {t('Add comment')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
