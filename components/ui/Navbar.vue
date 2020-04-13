<template>
    <nav
        class="navbar is-dark app-nav"
        role="navigation"
        aria-label="main navigation"
    >
        <div class="navbar-brand app-menu">
            <span class="navbar-item">
                <h1 class="is-size-5">YLT</h1>
            </span>

            <a
                role="button"
                :class="classesBurguer"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                @click="isActive = !isActive"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div :class="classesNavbarMenu" @click="isActive = false">
            <div class="navbar-end">
                <div class="navbar-item">
                    <template v-if="token && token.length > 0">
                        <button class="button" @click="() => trashSession()">
                            Cerrar la sesion
                        </button>
                    </template>
                    <template v-else>
                        <div class="buttons">
                            <span class="button is-primary">Login</span>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
export default Vue.extend({
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        ...mapState(`auth`, [`token`]),
        classesNavbarMenu(): any {
            return {
                'navbar-menu': true,
                'is-active': this.isActive
            }
        },
        classesBurguer(): any {
            return {
                'navbar-burger': true,
                burger: true,
                'is-active': this.isActive
            }
        }
    },
    methods: {
        ...mapMutations(`auth`, [`trashSession`])
    }
})
</script>

<style scoped>
.app-menu {
    align-items: center;
}
</style>
