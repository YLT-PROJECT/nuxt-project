export const namespaced = true

export const state = () => ({
    token: '',
    info: {}
})

export const mutations = {
    commitSession(state: any, { token, userData }: any) {
        state.token = token
        state.info = userData
    }
}
