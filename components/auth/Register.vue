<template>
    <div class="box register-box">
        <h2 class="is-size-2">Accede al sistema</h2>
        <result v-if="status > 0" :positive="status < 400" :message="message" />

        <form @submit.prevent="register">
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
import instanceAxios from '~/plugins/axios.ts'
import Result from '~/components/ui/Result.vue'

export default Vue.extend({
    components: { Result },
    data() {
        return {
            data: {
                email: '',
                password: '',
                name: '',
                surname: ''
            },
            status: -1,
            message: ''
        }
    },
    methods: {
        // ...mapMutations(['session']),
        async register() {
            try {
                const { email, password, name, surname } = this.data
                const req = await instanceAxios.post('/auth/register', {
                    email,
                    password,
                    name,
                    surname
                })
                this.status = req.status
                this.message = 'Te registraste correctamente'
            } catch (error) {
                this.status = error.response.status
                this.message = error.response.data.message
            }
        }
    }
})
</script>
<style scoped>
.register-box {
    margin: 0 10px;
}
</style>
