<template>
    <box-modal @dimiss="$emit('dimiss')">
        <p>Examing</p>
    </box-modal>
</template>

<script lang="ts">
import Vue from 'vue'
import BoxModal from '../ui/ModalBox.vue'
export default Vue.extend({
    components: { BoxModal }
})
</script>
