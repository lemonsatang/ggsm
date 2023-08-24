<template>
    <ScmHeaders />

    <section class="common-inner scm-min-height scm-common-inner">
        <!-- filter -->
        <div class="common-filter-body">
            <div class="common-filter-container">
                <div class="each-filter">
                    <h2 class="ft-header">재고구분</h2>
                    <div class="filter-type-checkbox">
                        <label>
                            <input ref="CATE_E" type="checkbox" name="stockCate" value="E">
                            원소재
                        </label>
                        <label>
                            <input ref="CATE_P" type="checkbox" name="stockCate" value="P">
                            제품
                        </label>
                        <label>
                            <input ref="CATE_K" type="checkbox" name="stockCate" value="K">
                            보관품
                        </label>
                    </div>
                </div>
                
                <div class="each-filter">
                    <h2 class="ft-header">품목</h2>
                    <input ref="I_ITCOD" type="text">
                </div>
                <div class="each-filter">
                    <h2 class="ft-header">재질</h2>
                    <input ref="I_MATRL" type="text">
                </div>
                <!-- -->
                <div class="each-filter">

                </div>
                <div class="each-filter">
                    <h2 class="ft-header">두께</h2>
                    <input ref="I_STSZ1" data-filter-thick-min type="text">
                    <input ref="I_EDSZ1" data-filter-thick-max type="text">
                </div>
                <div class="each-filter">
                    <h2 class="ft-header">폭</h2>
                    <input ref="I_STSZ2" data-filter-width-min type="text">
                    <input ref="I_EDSZ2" data-filter-width-max type="text">
                </div>

            </div>
            <div class="filter-button-container">
                <button @click="srchInv" @keyup.enter="srchInv" class="common-filter-button" id="scmSearchBtn" type="button">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    <p>Search</p>
                </button>
                <button class="common-filter-button bg-excel-green" id="scmExcelBtn" type="button">
                    <font-awesome-icon icon="fa-regular fa-file-excel" />
                    <p>Excel</p>
                </button>
                <button class="common-filter-button" id="scmPrintBtn" type="button">
                    <font-awesome-icon icon="fa-solid fa-print" />
                    <p>Print</p>
                </button>
            </div>
            
        </div>

        <!-- 본문 -->
        <div id="scmTexts" class="ani_down scm-common-body">
            <div class="scm-common-table">
                <div class="scm-table-header bg-bid-blue">
                    <ul class="scm-table-line scm-data-table-line" data-scm-table-header>
                        <li>품목</li>
                        <li>강종</li>
                        <li>재질</li>
                        <li>도금량</li>
                        <li>치수</li>
                        <li>수량</li>
                        <li>중량</li>
                        <li>창고</li>
                        <li>입고일자</li>
                        <li>제품번호</li>
                        <li>코일번호</li>
                        <li>비고</li>
                    </ul>
                </div>
                <div class="scm-table-body">
                    <ul v-for="(item, i) in copyOfData.value" class="scm-table-line">
                        <li>{{ item.ITNAM }}</li>
                        <li>{{ item.JJNAS }}</li>
                        <li>{{ item.MATRL }}</li>
                        <li>{{ item.GOLDW }}</li>
                        <li>{{ item.ISIZE }}</li>
                        <li>{{ item.GQTY }}</li>
                        <li>{{ item.GWGT }}</li>
                        <li>{{ item.HOUNM }}</li>
                        <li>{{ item.IDATE }}</li>
                        <li class="have-a-tooltip" @mouseover="showDetailP(i, event)" @mouseleave="closeDetailP(i)">
                            <span>{{ item.MITNO }}</span>
                            <p class="table-hidden-modal" v-if="item.isShowMd === true">
                                <font-awesome-icon icon="fa-eye" />
                                <span v-html="TooltipText"></span>
                            </p>
                        </li>
                        <li>{{ item.COLNO }}</li>
                        <li>{{ item.RK }}</li>
                        
                    </ul>
                </div>
                <ul class="scm-table-footer scm-table-line">
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 18L12.6796 12L5 6V4H19V6H8.26348L16 12L8.26348 18H19V20H5V18Z"></path></svg>
                        <p class="scm-footer-titles">
                            합계 <span>{{ isViewList.length }}</span>건
                        </p>
                        
                    </li>
                    <li>
                        <p class="scm-footer-titles">
                            <span>{{ totalQuantity }}</span>
                        </p>
                    </li>
                    <li>
                        <p class="scm-footer-titles">
                            <span>{{ totalWeight }}</span>
                        </p>
                    </li>
                    <li></li>
                </ul>
            </div>

            <!-- <section class="table-hidden-modal" v-if="isShowModal === true">
                <p v-html="TooltipText"></p>
            </section> -->
            
        </div><!-- 본문 끝 -->
    </section>
</template>

<script setup>
    import ScmHeaders from '@/components/ScmHeaders.vue';

    //store에서 영역별 데이터 import
    import { useScmInvStore } from '@/store/scmInvStore'
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue'
    import axios from 'axios'
    import { toast } from 'vue3-toastify';

    // const isShowModal = ref(false)
    const TooltipText = ref()

    // const copyOfData = [...scmInvGroup.value]
    const copyOfData = reactive([])

    //필터링 거친 데이터 여기 담기
    const isViewList = ref([])

    //**입력된 필터 데이터들 읽어들일것들것

    const I_ITCOD = ref() //품목
    const I_MATRL = ref() //재질

    //재고구분
    const CATE_E = ref()
    const CATE_P = ref()
    const CATE_K = ref()

    //두께
    const I_STSZ1 = ref()
    const I_EDSZ1 = ref()

    //폭
    const I_STSZ2 = ref()
    const I_EDSZ2 = ref()

    //**필터 데이터 받아서 서버에 전달할 애들
    const sendDataList = ref({
        I_MITGU: '',
        I_ITCOD: '',
        I_MATRL: '',
        I_STSZ1: '',
        I_EDSZ1: '',
        I_STSZ2: '',
        I_EDSZ2: '',
    })

    function srchInv() {
        
        //재고구분(E=원소재, P=제품, K=보관품)
        if(CATE_E.value.checked) {
            sendDataList.value.I_MITGU = 'E'
        } else if(CATE_P.value.checked) {
            sendDataList.value.I_MITGU = 'P'
        } else if(CATE_K.value.checked) {
            sendDataList.value.I_MITGU = 'K'
        }

        //품목
        sendDataList.value.I_ITCOD = I_ITCOD.value.value

        //재질
        sendDataList.value.I_MATRL = I_MATRL.value.value

        //두께
        sendDataList.value.I_STSZ1 = I_STSZ1.value.value
        sendDataList.value.I_EDSZ1 = I_EDSZ1.value.value

        //폭
        sendDataList.value.I_STSZ2 = I_STSZ2.value.value
        sendDataList.value.I_EDSZ2 = I_EDSZ2.value.value

        console.log(sendDataList.value)
    }

    
    //수량 합계
    const totalQuantity = ref()

    //중량 합계
    const totalWeight = ref()

    invCsList()        

    function invCsList() {
        axios.post('/api/invCsList', { })
            .then(res => {
                copyOfData.value = res.data

                //mouse hover시 툴팁출력을 위하여 가져온 배열들마다 isShowMd key와 false value를 추가
                for(let i=0; i < copyOfData.value.length; i++ ) {
                    copyOfData.value[i] = Object.assign(copyOfData.value[i], {isShowMd: false})
                }
                
                isViewList.value = Object.assign(copyOfData.value)

                totalQuantity.value = isViewList.value.reduce((x, y) => {
                    return parseInt(x) + parseInt(y.GQTY);
                }, 0);

                totalWeight.value = isViewList.value.reduce((x, y) => {
                    return parseInt(x) + parseInt(y.GWGT);
                }, 0);

                
            })
            .catch(error => { toast.error('목록을 불러오지 못했습니다.') })
    }

    function showDetailP(i, event) {
        copyOfData.value[i].isShowMd = true
        TooltipText.value = copyOfData.value[i].MITNO
    }

    function closeDetailP(i) {
        copyOfData.value[i].isShowMd = false
    }

</script>

<style lang="scss" scoped>
    .common-filter-container {
        grid-template-columns: repeat(3, minmax(3rem, 1fr));
    }

    .scm-table-line {
        grid-template-columns: .75fr .65fr 1fr .75fr .75fr .5fr .75fr .75fr .75fr 11rem minmax(7.5rem, 1fr) 1.25fr;
    }

    .scm-table-header {
        padding-right: 1rem;
        .scm-table-line li {
            text-align: center;
            color: rgba(var(--white), 1);
        }
    }

    .scm-table-footer {
        li:nth-child(1) {
            grid-column: 1/6;
        }
    
        li:nth-child(2) {
            background-color: rgba(var(--main-black), .025);
            padding: .75rem .75rem .75rem 1.25rem !important;
        }

        li:nth-child(3) {
            background-color: rgba(var(--main-black), .025);
            padding: .75rem .75rem .75rem 1rem !important;
        }

        li:nth-child(4) {
            grid-column: 10/15;
            border-right: none !important;
        }
    }

    
</style>