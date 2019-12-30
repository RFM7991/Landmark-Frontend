import { CLEAR_DATA } from '../Actions/root-actions';

export default function rootReducer(state = '', {type, payload}) {
    
    switch (type) {
       
        case CLEAR_DATA:
            return payload.ready;
        default:
            return state;
    }
}

