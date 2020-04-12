<template>
    <div>
        <node-list />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NodeList from '~/components/nodes/list.vue'
export default Vue.extend({
    components: { NodeList }
})
</script>
