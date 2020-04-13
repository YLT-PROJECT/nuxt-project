<template>
    <div :class="`notification ${positive ? 'is-primary' : 'is-danger'}`">
        {{ message }}
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        positive: {
            default: false,
            type: Boolean
        },
        message: {
            default: ``,
            type: String
        }
    }
})
</script>
