<template>
    <div>
        <div v-if="node" class="toolbar">
            <h2 class="is-size-4">{{ node.title }}</h2>
            <div class="buttons">
                <div class="icon is-medium ">
                    <i class="fas fa-lg fa-plus"></i>
                </div>
            </div>
        </div>
        <client-only>
            <node-list v-model="node" />
        </client-only>
        <nuxt />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NodeList from '~/components/nodes/list.vue'
export default Vue.extend({
    components: { NodeList },
    data() {
        return {
            node: null
        }
    }
})
</script>

<style scoped>
.toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
}
</style>
