<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand app-menu">
            <span class="navbar-item">
                <h1 class="is-size-1">YLT</h1>
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

        <div :class="classesNavbarMenu">
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <span class="button is-primary">Login</span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            isActive: false
        }
    },
    computed: {
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
    }
})
</script>

<style scoped>
.app-menu {
    align-items: center;
}
</style>
