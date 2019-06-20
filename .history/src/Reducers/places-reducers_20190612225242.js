import { UPDATE_PLACES } from '../Actions/active-actions';

export default function placesReducer(state = '', {type, payload}) {
    
    switch (type) {
       
        case UPDATE_PLACES:
            return payload.places;
        default:
            return state;
    }
}