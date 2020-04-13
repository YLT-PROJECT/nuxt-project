<template>
    <div class="modal is-active">
        <div class="modal-background" @click="$emit('dimiss')"></div>
        <div class="modal-card modal-box">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ title }}</p>
            </header>
            <section class="modal-card-body">
                <slot />
            </section>
        </div>
        <button class="modal-close is-large" @click="$emit('dimiss')"></button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        title: {
            type: String,
            default: `Título del modal`
        }
    }
})
</script>

<style scoped>
.modal-box {
    margin: 0px 20px !important;
}
</style>
