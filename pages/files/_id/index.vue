<template>
    <authed-view>
        <template slot="authed">
            <div class="container">
                <p>Vista de ficheros {{ $route.params.id }}</p>
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
import AuthedView from '~/components/ui/AuthedView.vue'
import RedirectTo from '~/components/ui/RedirectTo.vue'

export default Vue.extend({
    components: { AuthedView, RedirectTo }
})
</script>
