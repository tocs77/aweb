export const ADD_COMMENT_FORM_SLICE_NAME = 'addCommentForm';

export interface AddCommentFormSchema {
  text: string;
  error?: string;
}

export interface StoreWithAddCommentForm {
  [ADD_COMMENT_FORM_SLICE_NAME]: AddCommentFormSchema;
}
