<template>
    <h1 data-common-head-title>주문의뢰서 접수</h1>
    <div id="scmTexts" class="ani_down">
        
    </div>
</template>

<script setup>
    //store에서 영역별 데이터 import
    import { useScmReqStore } from '@/store/scmReqStore'
    import { storeToRefs } from 'pinia';

    const scmReqStore = useScmReqStore()
    const { scmReqGroup } = storeToRefs(scmReqStore)
    

    
</script>

<style lang="scss" scoped>
    
</style>