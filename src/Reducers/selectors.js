import { createSelector } from 'reselect';

export const activeSelector = createSelector (
    state => state.active_place,
    active_place => active_place
  )
  
export const addressSelector = createSelector (
    state => state.address,
    address => address
  );
  
export const businessTypeSelector = createSelector (
    state => state.business_type,
    business_type => business_type
  );
  
export const dataRangeSelector = createSelector (
    state => state.data_range,
    data_range => data_range
  )

export const placesSelector = createSelector (
    state => state.places,
    places => places
  )

export const stateSelector = createSelector (
    state => state.state,
    state => state
  )

export const tractSelector = createSelector (
    state => state.tract,
    tract => tract
  )

export const userSelector = createSelector (
      state => state.user,
      user => user
  )
export const zipSelector = createSelector (
    state => state.zip,
    zip => zip
  )
export const readySelector = createSelector (
  state => state.ready,
  ready => ready
)