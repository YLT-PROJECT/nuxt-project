import createPersistedState from 'vuex-persistedstate'
import axios, { setToken } from './axios'
export default ({ store }: any) => {
    createPersistedState({
        key: 'ylt',
        paths: ['auth']
    })(store)
    const token = store.state.auth.token

    if (token) {
        setToken(token)
    }
}
