export const SCROLL_KEEP_SLICE_NAME = 'scrollKeep';

export interface ScrollKeepSchema {
  scroll: Record<string, number>;
}

export interface StoreWithScrollKeep {
  [SCROLL_KEEP_SLICE_NAME]: ScrollKeepSchema;
}
