export const UPDATE_TRADEZONE_BOUNDS = 'tradezone_bounds:updateTradezoneBounds';

export function updateTradezoneBounds(tradezone_bounds) {
  return {
    type: UPDATE_TRADEZONE_BOUNDS,
    payload: {
      tract: tradezone_bounds
    }
  }
}
