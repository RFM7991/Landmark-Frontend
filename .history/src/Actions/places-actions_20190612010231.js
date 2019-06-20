export const UPDATE_PLACES = 'places:updatePlaces';
export const ACTIVATE_PLACE = 'active_place:activatePlace';

export function updatePlaces(newPlaces) {
    return {
      type: UPDATE_PLACES,
      payload: {
        places: newPlaces
      }
    }
}

export function activatePlace(place) {
  return {
    type: ACTIVATE_PLACE,
    payload: {
      active_place: place
    }
  }
}
