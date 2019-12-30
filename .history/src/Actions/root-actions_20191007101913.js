export const CLEAR_DATA = 'state:clearData';

export function updateReady(isReady) {
  return {
    type: UPDATE_READY,
    payload: {
      ready: isReady
    }
  }
}
