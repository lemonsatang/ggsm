<template>
    <ScmHeaders />

    <!-- <section class="common-inner scm-min-height scm-common-inner">

        <div v-show="getCate == 'fwd'">
            <ScmFwd />
        </div>
        <div v-show="getCate == 'invCs'">
            <ScmInvCs />
        </div>
        <div v-show="getCate == 'reqReg'">
            <ScmReqReg />
        </div> -->

        <!-- <div v-show="getCate == 'scmNoti'">
            <ScmNotice />
        </div>         
        
    </section> -->

</template>

<script setup>
    import ScmHeaders from '@/components/ScmHeaders.vue';

    import ScmNotice from '@/scm/ScmNoti.vue'; //공지사항
    import ScmFwd from '@/scm/ScmFwd.vue'; //출고현황
    import ScmInvCs from '@/scm/ScmInvCs.vue'; //재고현황

    import ScmReqReg from '@/scm/ScmReqReg.vue'; //주문의뢰서 접수


    //store에서 영역별 데이터 import
    import { useScmStore } from '@/store/scmStore'
    import { storeToRefs } from 'pinia';

    import { routerKey, useRoute, useRouter } from 'vue-router'

    
    const router = useRouter()

    const getParams = useRoute().params
    const getCate = useRoute().params.category

    const scmStore = useScmStore()
    const { scmGroup, scmUsr, isTap } = storeToRefs(scmStore)   
    const copyOfUsr = [...scmUsr.value]

    
</script>

<style lang="scss" scoped>


    
</style>
