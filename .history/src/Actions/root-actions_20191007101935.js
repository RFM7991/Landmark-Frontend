export const CLEAR_DATA = 'state:clearData';

export function clearData() {
  return {
    type: UPDATE_READY,
    payload: {
      ready: undefined
    }
  }
}
