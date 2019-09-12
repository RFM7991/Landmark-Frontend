export const UPDATE_READY = 'state:updateReady';

export function updateReady(state) {
  return {
    type: UPDATE_READY,
    payload: {
      state: ready
    }
  }
}
