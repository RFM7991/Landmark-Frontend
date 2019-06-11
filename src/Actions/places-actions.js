export const UPDATE_PLACES = 'places:updatePlaces';

export function updatePlaces(newPlaces) {
    return {
      type: UPDATE_PLACES,
      payload: {
        places: newPlaces
      }
    }
}
