import store from '@/store';

export function extractTokenData(token) {
    return JSON.parse(atob(token.split('.')[1]));
}

export function isLoggedIn() {
    return !!store.getters["Auth/getAccessToken"];
}
