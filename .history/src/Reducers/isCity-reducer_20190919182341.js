import { UPDATE_IS_CITY } from '../Actions/isCity-actions';

export default function activeReducer(state = '', {type, payload}) {
    
    switch (type) {
       
        case ACTIVATE_PLACE:
            return payload.active_place;
        default:
            return state;
    }
}

