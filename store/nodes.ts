import { findIndex } from 'lodash'
import axios from '~/plugins/axios.ts'

export const namespaced = true

export const state = () => ({
    nodes: []
})

export const mutations = {
    list(state: any, items: []) {
        state.nodes = items
    },
    addNode(state: any, node: any) {
        state.nodes = {
            ...state.nodes,
            node
        }
    },
    updateNode(state: any, { id, node }: any) {
        const nodeIndex = findIndex(state.nodes, { _id: id })
        state.nodes.splice(nodeIndex, 1, node)
    }
}

export const actions = {
    async retrieve(ctx: any, id: string) {
        const req = await axios.get('/nodes/' + id)
        ctx.commit('list', req.data.items)
    }
}
