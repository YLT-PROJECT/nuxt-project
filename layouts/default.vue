<template>
    <div>
        <nav-bar />
        <main>
            <nuxt />
        </main>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import NavBar from '../components/ui/Navbar.vue'
export default Vue.extend({
    components: { NavBar }
})
</script>
<style scoped>
main {
    margin-top: 10px;
}
</style>
