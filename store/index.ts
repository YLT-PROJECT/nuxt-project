import Vuex from 'vuex'
import * as AuthModule from './auth'
import * as NodeModule from './nodes'

const config = {
    modules: {
        auth: AuthModule,
        nodes: NodeModule
    }
}

export default () => new Vuex.Store<any>(config)
