import { StoreWithAddCommentForm, ADD_COMMENT_FORM_SLICE_NAME } from '../types/addCommentForm';

export const getAddCommentText = (state: StoreWithAddCommentForm) => state[ADD_COMMENT_FORM_SLICE_NAME]?.text;
export const getAddCommentError = (state: StoreWithAddCommentForm) => state[ADD_COMMENT_FORM_SLICE_NAME]?.error;
