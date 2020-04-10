import createPersistedState from 'vuex-persistedstate'

export default ({ store }: any) => {
    createPersistedState({
        key: 'ylt',
        paths: ['auth']
    })(store)
}
