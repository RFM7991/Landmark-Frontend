export const UPDATE_BUSINESS_TYPE = 'business_type:updateBusinessType';

export function UPDATE_BUSINESS_TYPE(type) {
    return {
      type: UPDATE_BUSINESS_TYPE,
      payload: {
        business_type: type
      }
    }
}
