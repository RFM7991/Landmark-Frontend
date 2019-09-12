import { createSelector } from 'reselect';

export const activeSelector = createSelector (
    state => state.active_place,
    active_place => active_place
  )