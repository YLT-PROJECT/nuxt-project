<template>
    <div class="box login-box">
        <authed-view>
            <template slot="authed">
                <p>Enhorabuena, ahora seras redireccionado</p>
                <redirect-to to="/files/root" />
            </template>
            <template slot="unauthed">
                <h2 class="is-size-2">Accede al sistema</h2>
                <result
                    v-if="status > 0"
                    :positive="status < 400"
                    :message="message"
                />
                <form @submit.prevent="login">
                    <div class="field">
                        <div class="control has-icons-left has-icons-right">
                            <input
                                v-model="data.email"
                                class="input"
                                type="email"
                                placeholder="email"
                            />
                            <span class="icon is-small is-left"
                                ><i class="fas fa-envelope"></i
                            ></span>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control has-icons-left">
                            <input
                                v-model="data.password"
                                class="input"
                                type="password"
                                placeholder="password"
                            />
                            <span class="icon is-small is-left"
                                ><i class="fas fa-lock"></i
                            ></span>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-success" type="submit">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </template>
        </authed-view>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { setToken } from '../../plugins/axios'
import instanceAxios, { setToken } from '~/plugins/axios.ts'
import Result from '~/components/ui/Result.vue'
import AuthedView from '~/components/ui/AuthedView.vue'
import RedirectTo from '~/components/ui/RedirectTo.vue'

export default Vue.extend({
    components: { Result, AuthedView, RedirectTo },
    data() {
        return {
            data: {
                email: '',
                password: ''
            },
            status: -1,
            message: ''
        }
    },
    computed: {
        ...mapState('auth', ['token'])
    },
    methods: {
        ...mapMutations('auth', ['commitSession']),
        async login() {
            try {
                const { email, password } = this.data
                const req = await instanceAxios.post('/auth/login', {
                    username: email,
                    password
                })
                setToken(req.data.token)
                this.status = req.status
                this.message = 'Accediste correctamente'
                this.commitSession(req.data)
            } catch (error) {
                this.status = error.response.status
                this.message = error.response.data.message
            }
        }
    }
})
</script>
<style scoped>
.login-box {
    margin: 0 10px;
}
</style>
