import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { SCROLL_KEEP_SLICE_NAME, StoreWithScrollKeep } from '../types/ScrollKeepSchema';

export const getScroll = (state: StoreWithScrollKeep) => state[SCROLL_KEEP_SLICE_NAME].scroll;
export const getScrollByPath = createDraftSafeSelector(
  getScroll,
  (_: StoreWithScrollKeep, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
