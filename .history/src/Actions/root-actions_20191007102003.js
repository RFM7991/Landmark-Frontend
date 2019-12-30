export const CLEAR_DATA = 'state:clearData';

export function clearData(data) {
  return {
    type: UPDATE_READY,
    payload: {
      data: data
    }
  }
}
