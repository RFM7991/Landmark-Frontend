export const UPDATE_STATS = 'tract:updateStats';

export function updateStats(stats) {
  return {
    type: UPDATE_STATS,
    payload: {
      stats: stats
    }
  }
}
