export const UPDATE_TRANSPORTATION = 'transportation:updateTransportation';

export function updateTransportation(newTransportation) {
    return {
        type: UPDATE_TRANSPORTATION,
        payload: {
            transportation: newTransportation
        }
    }
}

