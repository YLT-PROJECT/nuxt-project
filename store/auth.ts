export const namespaced = true

export const state = () => ({
    token: 'un token',
    info: {}
})

export const mutations = {
    commitSession(state: any, { token, userData }: any) {
        console.log('guardando', { token, userData })

        state.token = token
        state.info = userData
    }
}
