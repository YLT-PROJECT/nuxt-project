<template>
    <div class="container">
        <div>
            <div class="tabs is-centered is-boxed">
                <ul>
                    <li
                        :class="isTabActive('login')"
                        @click="tabActive = 'login'"
                    >
                        <a>Login</a>
                    </li>
                    <li
                        :class="isTabActive('register')"
                        @click="tabActive = 'register'"
                    >
                        <a>Register</a>
                    </li>
                </ul>
            </div>
        </div>
        <login-form v-if="tabActive === 'login'" />
        <register-form v-if="tabActive === 'register'" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginForm from '~/components/auth/Login.vue'
import RegisterForm from '~/components/auth/Register.vue'

export default Vue.extend({
    components: { LoginForm, RegisterForm },
    data() {
        return {
            tabActive: `login`
        }
    },
    methods: {
        isTabActive(tabName: string) {
            return {
                'is-active': this.tabActive === tabName
            }
        }
    }
})
</script>
