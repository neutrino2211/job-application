<template>
    <div :slide-id="slideId" class="slide text-center min-h-screen py-32 mx-auto md:w-5/6 xl:w-2/3">
        <h1 style="font-size: 3rem;"> <slot></slot> </h1>

        <div>
            <h2 class="mx-auto py-8">
                <slot name="description"></slot>
            </h2>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        slideId: Number,
    }
})
</script>