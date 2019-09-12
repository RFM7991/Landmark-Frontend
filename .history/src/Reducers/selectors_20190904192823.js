import { createSelector } from 'reselect';

export const activeSelector = createSelector (
    state => state.active_place,
    active_place => active_place
  )


const placesSelector = createSelector (
    state => state.places,
    places => places
  )
  
  const addressSelector = createSelector (
    state => state.address,
    address => address
  );
  
  const businessTypeSelector = createSelector (
    state => state.business_type,
    business_type => business_type
  );
  
 
  
  const tractSelector = createSelector (
    state => state.tract,
    tract => tract
  )
  
  const stateSelector = createSelector (
    state => state.state,
    state => state
  )
  
  const dataRangeSelector = createSelector (
    state => state.data_range,
    data_range => data_range
  )

  const userSelector = createSelector (
      state => state.user,
      user => user
  )
  const zipSelector = createSelector (
    state => state.zip,
    zip => zip
  )