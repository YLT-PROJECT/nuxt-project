<template>
    <div>
        <template v-if="token.length > 0">
            <slot name="authed" />
        </template>
        <template v-else>
            <slot name="unauthed">
                <p>No has accedido</p>
            </slot>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
    computed: {
        ...mapState('auth', ['token'])
    }
})
</script>
