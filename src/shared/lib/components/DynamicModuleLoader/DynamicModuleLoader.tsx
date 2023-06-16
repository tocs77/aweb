import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { PropsWithChildren, useEffect } from 'react';
import { useStore } from 'react-redux';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

type ReducerListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}
export const DynamicModuleLoader = (props: PropsWithChildren<DynamicModuleLoaderProps>) => {
  const { reducers, children, removeAfterUnmount } = props;
  const store = useStore() as ReduxStoreWithManager;

  useEffect(
    () => {
      Object.entries(reducers).forEach(([name, reducer]: ReducerListEntry) => {
        store.reducerManager.add(name, reducer);
      });
      return () => {
        if (removeAfterUnmount) {
          Object.entries(reducers).forEach(([name, _]) => {
            store.reducerManager.remove(name as StateSchemaKey);
          });
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <>{children}</>;
};
