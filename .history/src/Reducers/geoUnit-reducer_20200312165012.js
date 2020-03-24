import { UPDATE_GEO_UNIT } from '../Actions/geoUnit-actions';

export default function geoUnitReducer(state = '', {type, payload}) {
    
    switch (type) {
       
        case UPDATE_GEO_UNIT:
            return payload.geo_unit;
        default:
            return state;
    }
}
