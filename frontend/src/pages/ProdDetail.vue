<template>
    <SubpHero />
    <section v-if="prodGroup[getId]" class="common-inner">
        <h1 data-common-head-title>{{ prodGroup[getId]?.title }}</h1>
        <div id="prodDtTexts">
            <img :src="prodGroup[getId]?.detailImg" alt="">
        </div>
    </section>
</template>

<script setup>
    import SubpHero from '@/components/SubpHero.vue';
    import { useRoute } from 'vue-router'

    //store에서 영역별 데이터 import
    import { useProdStore } from '@/store/prodStore'
    import { storeToRefs } from 'pinia';

    const prodStore = useProdStore()
    const { prodGroup } = storeToRefs(prodStore)

    const getParams = useRoute();
    const getId = parseInt(getParams.params.id)

    console.log(getId)
</script>

<style lang="scss" scoped>
    #prodDtTexts {
        @apply flex justify-center;

        img {
            user-select: none;
            pointer-events: none;
        }

    }
</style>