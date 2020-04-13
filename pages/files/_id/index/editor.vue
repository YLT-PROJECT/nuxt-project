<template>
    <box-modal :title="texts.title" @dimiss="$router.push(nodeRoute)">
        <form @submit.prevent="() => {}">
            <div class="field">
                <div class="control">
                    <input
                        v-model="data.title"
                        class="input"
                        type="text"
                        placeholder="Título del nodo"
                    />
                </div>
            </div>
            <template v-if="!editing">
                <h3 class="is-size-5">Tipo de bloque</h3>
                <div class="field">
                    <div class="control">
                        <label class="input-radio">
                            <input
                                id="typenode"
                                v-model="data.type"
                                type="radio"
                                name="typenode"
                                value="folder"
                            />
                            <span>Carpeta</span>
                        </label>
                        <label class="input-radio">
                            <input
                                id="typenode"
                                v-model="data.type"
                                type="radio"
                                name="typenode"
                                value="document"
                            />
                            <span>Documento</span>
                        </label>
                    </div>
                </div>
            </template>
            <div class="actions">
                <template v-if="editing">
                    <div class="field">
                        <div class="control">
                            <button
                                class="button is-success"
                                @click="updateNodeHttp"
                            >
                                Actualizar
                            </button>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="field">
                        <div class="control">
                            <button
                                class="button is-success"
                                @click="addDocument"
                            >
                                {{ texts.addDoc }}
                            </button>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button
                                class="button is-success"
                                @click="addFolder"
                            >
                                {{ texts.addFolder }}
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </form>
    </box-modal>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import BoxModal from '~/components/ui/ModalBox.vue'
import axios from '~/plugins/axios'

export default Vue.extend({
    components: { BoxModal },
    data() {
        return {
            data: {
                title: ``,
                type: `folder`
            },
            nodeEditing: {},
            editing: false
        }
    },
    computed: {
        nodeRoute() {
            console.log(ssdsd)
            return `/files/` + this.$route.params.id
        },
        texts() {
            const { editing } = this as any
            return {
                title: editing ? `Actualizar nodo` : `Añadir nodo`,
                addDoc: editing ? `Actualizar documento` : `Añadir documento`,
                addFolder: editing ? `Actualizar carpeta` : `Añadir carpeta`
            }
        }
    },
    mounted() {
        const { nodeId } = this.$route.query
        const filter = (node: any) => node._id === nodeId

        if (nodeId) {
            this.editing = true
            this.nodeEditing = this.$store.state.nodes.nodes
                .filter(filter)
                .pop()
            this.data.title = (this.nodeEditing as any).title
            this.data.type = (this.nodeEditing as any).type
        }
    },
    methods: {
        ...mapMutations(`nodes`, [`addNode`, `updateNode`]),
        addDocument() {
            this.saveNode()
        },
        addFolder() {
            this.saveNode()
        },
        async saveNode() {
            const { id } = this.$route.params
            const req = await axios.post(`/nodes`, {
                title: this.data.title,
                type: this.data.type,
                child: id
            })
            this.addNode(req.data)
            this.$router.push(this.nodeRoute)
        },
        async updateNodeHttp() {
            const nodeIdEditing = (this.nodeEditing as any)._id
            const req = await axios.put(`/nodes/` + nodeIdEditing, {
                title: this.data.title
            })
            this.updateNode({
                id: nodeIdEditing,
                node: req.data
            })
            this.$router.push(this.nodeRoute)
        }
    }
})
</script>

<style scoped>
.actions {
    display: flex;
    justify-content: space-between;
}
label.input-radio {
    font-size: 1.3em;
    cursor: pointer;
}
label.input-radio > input {
    display: none;
}
label.input-radio > input:checked + span {
    padding: 0.2em;
    color: white;
    background-color: steelblue;
    font-weight: bold;
}
</style>
