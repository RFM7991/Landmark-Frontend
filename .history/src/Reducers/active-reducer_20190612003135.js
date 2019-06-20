import { ACTIVATE_PLACE } from '../Actions/places-actions';

export default function activeReducer(state = '', {type, payload}) {
    
    switch (type) {
       
        case ACTIVATE_PLACE:
            return payload.active_place;
        default:
            return state;
    }
}