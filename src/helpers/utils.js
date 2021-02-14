import store from '@/store';

export function extractTokenData(token) {
    return JSON.parse(atob(token.split('.')[1]));
}

export function getUserFromId(id) {
    const user = store.getters["Users/getUsers"].filter(({_id}) => _id === id);
    return user[0];
}

export function isLoggedIn() {
    return !!store.getters["Auth/getAccessToken"];
}
