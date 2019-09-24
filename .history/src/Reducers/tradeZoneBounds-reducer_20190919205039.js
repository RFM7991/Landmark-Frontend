import { UPDATE_TRADEZONE_BOUNDS } from '../Actions/tradeZoneBoundaries-actions';

export default function tractReducer(state = '', {type, payload}) {
    
    switch (type) {
       
        case UPDATE_TRADEZONE_BOUNDS:
            return payload.tradezone_bounds;
        default:
            return state;
    }
}