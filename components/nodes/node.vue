<template>
    <div class="card node-item">
        <div class="card-content node-content">
            <div class="icon-container">
                <span class="icon">
                    <i :class="iconClass"></i>
                </span>
            </div>
            <h2 class="is-size-5 node-title">
                <nuxt-link :to="linkTo">
                    {{ node.title }}
                </nuxt-link>
            </h2>
        </div>
        <footer class="card-footer">
            <div class="card-footer-item">
                <div class="buttons">
                    <nuxt-link
                        :to="
                            `/files/${$route.params.id}/editor?nodeId=${node._id}`
                        "
                        class="button is-primary"
                    >
                        Editar
                    </nuxt-link>
                </div>
            </div>
        </footer>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        node: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        iconClass() {
            return (this.node as any).type === 'folder'
                ? 'fas fa-folder'
                : 'fas fa-file'
        },
        linkTo() {
            const node = this.node as any
            return node.type === 'folder'
                ? `/files/${node._id}`
                : `/document/${node._id}/edit`
        }
    }
})
</script>

<style scoped>
.node-item {
    margin: 10px;
}
.node-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.node-content {
    display: flex;
    align-items: center;
    flex-direction: column;
}
.node-content .icon {
    font-size: 80px;
}
.icon-container {
    padding-top: 10px;
}
</style>
