export const UPDATE_IS_CITY = 'isCity:isCity';

export function updateIsCity(isCity) {
  return {
    type: UPDATE_ISCITY,
    payload: {
      isCity: isCity
    }
  }
}
