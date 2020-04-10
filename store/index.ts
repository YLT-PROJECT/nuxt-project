import Vuex from 'vuex'
import * as AuthModule from './auth'

const config = {
    modules: {
        auth: AuthModule
    }
}

export default () => new Vuex.Store<any>(config)
