export const UPDATE_USER = 'users:updateUser';
export const SHOW_ERROR = 'users:showError';
export const KEY = 'AIzaSyAApJlSsL7fsf9ElKRHLLOhEM2pZM00-ho';
const GEO_CODE = 'https://maps.googleapis.com/maps/api/geocode/json?';
const API = 'http://localhost:3001/api/';

export function updateUser(newUser) {
    return {
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
    }
}

export function showError() {
    return {
        type: SHOW_ERROR,
        payload: {
            user: 'ERROR!!'}
    }
}

