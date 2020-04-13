<template>
    <div>
        <div v-if="node" class="toolbar">
            <div style="display: flex;">
                <nuxt-link
                    v-if="$route.params.id !== 'root'"
                    :to="`/files/${node.child}`"
                >
                    <i class="fas fa-arrow-left"></i>
                </nuxt-link>
                <h2 class="is-size-6">{{ node.title }}</h2>
            </div>
            <div class="buttons">
                <nuxt-link :to="`/files/${$route.params.id}/editor`">
                    <div class="icon is-medium ">
                        <i class="fas fa-lg fa-plus"></i>
                    </div>
                </nuxt-link>
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
