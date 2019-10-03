import { UPDATE_STATS} from '../Actions/stats-actions';

export default function tractReducer(state = '', {type, payload}) {
    
    switch (type) {
       
        case UPDATE_STATS:
            return payload.stats;
        default:
            return stats;
    }
}