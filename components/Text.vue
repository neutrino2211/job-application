<template>
    <div>
        <h2 v-bind:class="{ 'py-8': !inline }" class="mx-auto" v-if="creativeMode && creative">
            <slot></slot>
        </h2>

        <h2 v-bind:class="{ 'py-8': !inline }" class="mx-auto" v-if="!creativeMode && formal">
            <slot></slot>
        </h2>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        formal: Boolean,
        creative: Boolean,
        mode: Boolean,
        inline: Boolean
    },

    computed: {
        creativeMode() {
            return this.mode || ( this.$parent as any ).creativeMode
        }
    }
})
</script>