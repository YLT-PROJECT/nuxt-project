<template>
    <div>
        <nav-bar />
        <nuxt />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import NavBar from '../components/ui/Navbar.vue'
export default Vue.extend({
    components: { NavBar }
})
</script>
