<template>
    <authed-view>
        <template slot="authed">
            <div class="container">
                <div class="nodes-container">
                    <node-item
                        v-for="item in nodes"
                        :key="item._id"
                        :node="item"
                    />
                </div>
            </div>
        </template>
        <template slot="unauthed">
            <p>No estas autorizado</p>
            <redirect-to to="/" />
        </template>
    </authed-view>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
import axios from '~/plugins/axios.ts'
import AuthedView from '~/components/ui/AuthedView.vue'
import RedirectTo from '~/components/ui/RedirectTo.vue'
import NodeItem from '~/components/nodes/node.vue'
export default Vue.extend({
    components: { AuthedView, RedirectTo, NodeItem },
    computed: {
        ...mapState(`nodes`, [`nodes`])
    },
    async mounted() {
        const { id } = this.$route.params
        const req = await axios.get(`/nodes/` + id)
        this.list(req.data.items)
        this.$emit(`input`, req.data.node)
    },
    methods: {
        ...mapMutations(`nodes`, [`list`])
    }
})
</script>

<style scoped>
.nodes-container {
    margin: 0px 20px;
}
</style>
