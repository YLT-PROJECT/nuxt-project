<template>
    <p>redireccionando...</p>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        to: {
            type: String,
            default: '',
            required: true
        },
        ms: {
            type: Number,
            default: 1000
        }
    },
    mounted() {
        setTimeout(() => {
            this.$router.push(this.to)
        }, this.ms)
    }
})
</script>
