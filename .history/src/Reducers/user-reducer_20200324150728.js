import { UPDATE_USER, SHOW_ERROR } from '../Actions/user-actions';

export default function userReducer(state = '', {type, payload}) {
    switch (type) {
        case UPDATE_USER:
                console.log("payload", payload)
            return payload.user;
        case SHOW_ERROR:
            return payload.user;
        default:
            return state;
    }
}