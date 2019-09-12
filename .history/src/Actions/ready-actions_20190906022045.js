export const UPDATE_READY = 'state:updateReady';

export function updateReady(ready) {
  return {
    type: UPDATE_READY,
    payload: {
      ready: ready
    }
  }
}
