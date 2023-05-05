import {store} from '../store/store'

export function useAuth() {
    const {user} = store.getState();
    // console.log(user);
    // if()
    const state = {
        auth: false,
    }

    return state.auth;
}