import { UPDATE_PLACES, ACTIVATE_PLACE } from '../Actions/places-actions';

export default function placesReducer(state = '', {type, payload}) {
    
    switch (type) {
       
        case UPDATE_PLACES:
            return payload.places;
        case ACTIVATE_PLACE:
            return payload.active_place;
        default:
            return state;
    }
}