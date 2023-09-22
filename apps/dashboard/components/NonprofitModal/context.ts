import { createContext, useContext } from 'react';
import { noop } from 'lodash';
import { Nonprofit } from '@gated/graphql-types';

export type NonprofitPartial = Pick<Nonprofit, 'id' | 'name'>;

export interface NonprofitContext {
  currentId: string;
  selected?: NonprofitPartial;
  categoryId: string;

  setSelected: (nonprofit: NonprofitPartial) => void;

  setCategoryId: (id: string) => void;
}
export const nonprofitContext = createContext<NonprofitContext>({
  categoryId: '',
  currentId: '',
  setSelected: noop,
  setCategoryId: noop,
});

export const useNonprofit = () => {
  return useContext(nonprofitContext);
};
