export const UPDATE_TRANSPORTATION = 'transportation:updateTransportation';
s

export function updateTransportation(newTransportation) {
    return {
        type: UPDATE_TRANSPORTATION,
        payload: {
            transportation: newTransportation
        }
    }
}

