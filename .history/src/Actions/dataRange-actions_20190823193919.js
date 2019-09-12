export const UPDATE_DATA_RANGE = 'business_type:updateBusinessType';

export function updateBusinessType(type) {
    return {
      type: UPDATE_DATA_RANGE,
      payload: {
        business_type: type
      }
    }
}
