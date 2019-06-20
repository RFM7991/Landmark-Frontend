export const UPDATE_PLACES = 'places:updatePlaces';
export const ACTIVATE_PLACE = 'active_place:activatePlaces';

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
    type: UPDATE_PLACES,
    payload: {
      active_place: place
    }
  }
}
