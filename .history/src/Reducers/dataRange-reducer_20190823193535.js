import { UPDATE_DATA_RANGE } from '../Actions/dataRange-actions';

export default function dataRangeReducer(state = '', {type, payload}) {
    
    switch (type) {
       
        case UPDATE_BUSINESS_TYPE:
            return payload.dataRange;
        default:
            return state;
    }
}
