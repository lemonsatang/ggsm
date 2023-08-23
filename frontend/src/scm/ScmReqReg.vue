<template>
    <ScmHeaders />

    <section class="common-inner scm-min-height scm-common-inner">
        <div id="scmTexts" class="ani_down scm-common-body">
        
        </div>
    </section>
    
</template>

<script setup>
    import ScmHeaders from '@/components/ScmHeaders.vue';
    
    //store에서 영역별 데이터 import
    import { useScmReqStore } from '@/store/scmReqStore'
    import { storeToRefs } from 'pinia';

    const scmReqStore = useScmReqStore()
    const { scmReqGroup } = storeToRefs(scmReqStore)
    

    
</script>

<style lang="scss" scoped>
    
</style>