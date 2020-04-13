<template>
    <div>
        <div class="toolbar">
            <div style="display: flex;">
                <nuxt-link :to="`/files/${nodeEditing.child}`">
                    <i class="fas fa-arrow-left"></i>
                </nuxt-link>
                <h2 class="is-size-5">Título documento</h2>
            </div>
            <div>
                <nuxt-link
                    v-if="/edit$/.test($route.name)"
                    :to="`/document/${currentId}/study`"
                >
                    <i class="fa fa-eye" />
                </nuxt-link>
                <nuxt-link
                    v-if="/study$/.test($route.name)"
                    :to="`/document/${currentId}/edit`"
                >
                    <i class="fa fa-edit" />
                </nuxt-link>
                <span class="icon" @click="examing = true">
                    <i class="fa fa-check-circle" />
                </span>
            </div>
        </div>
        <div>
            <p>{{ $route.name }}</p>
        </div>
        <nuxt />
        <examing v-if="examing" @dimiss="examing = false" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Examing from '~/components/tables/examing.vue'
export default Vue.extend({
    components: { Examing },
    data() {
        return {
            nodeEditing: {},
            examing: false
        }
    },
    computed: {
        currentId() {
            return this.$route.params.id
        }
    },
    mounted() {}
})
</script>
<style scoped>
.toolbar {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}
</style>
