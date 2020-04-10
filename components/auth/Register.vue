<template>
    <div class="box login-box">
        <h2 class="is-size-2">Accede al sistema</h2>
        <form @submit.prevent="login">
            <div class="field">
                <div class="control">
                    <input
                        v-model="data.name"
                        class="input"
                        type="text"
                        placeholder="Nombre"
                    />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <input
                        v-model="data.surname"
                        class="input"
                        type="text"
                        placeholder="Apellidos"
                    />
                </div>
            </div>
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
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
// import { mapMutations } from 'vuex'
export default Vue.extend({
    data() {
        return {
            data: {
                email: '',
                password: '',
                name: '',
                surname: ''
            }
        }
    },
    methods: {
        // ...mapMutations(['session']),
        login() {
            const { name, surname, email, password } = this.data
            console.log(name, surname, email, password)

            // const req = await this.$api.login(email, password)
            // this.session({
            //     token: req.jwt,
            //     user: req.user
            // })
            // this.$emit('close')
        }
    }
})
</script>
<style scoped>
.login-box {
    margin: 0 10px;
}
</style>
