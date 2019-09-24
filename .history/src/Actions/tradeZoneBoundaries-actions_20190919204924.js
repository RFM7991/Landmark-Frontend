export const UPDATE_TRADEZONE_BOUNDS = 'tradeZone_bounds:updateTradezoneBounds';

export function updateTradezoneBounds(tradeZone_bounds) {
  return {
    type: UPDATE_TRADEZONE_BOUNDS,
    payload: {
      tract: tradeZone_bounds
    }
  }
}
