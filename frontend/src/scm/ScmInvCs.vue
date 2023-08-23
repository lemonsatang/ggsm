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
                            <input type="checkbox" name="stockCate" value="rawMt">
                            원소재
                        </label>
                        <label>
                            <input type="checkbox" name="stockCate" value="prod">
                            제품
                        </label>
                        <label>
                            <input type="checkbox" name="stockCate" value="stProd">
                            보관품
                        </label>
                    </div>
                </div>
                
                <div class="each-filter">
                    <h2 class="ft-header">품목</h2>
                    <input type="text">
                </div>
                <div class="each-filter">
                    <h2 class="ft-header">재질</h2>
                    <input type="text">
                </div>
                <!-- -->
                <div class="each-filter">

                </div>
                <div class="each-filter">
                    <h2 class="ft-header">두께</h2>
                    <input data-filter-thick-min type="text">
                    <input data-filter-thick-max type="text">
                </div>
                <div class="each-filter">
                    <h2 class="ft-header">폭</h2>
                    <input data-filter-width-min type="text">
                    <input data-filter-width-max type="text">
                </div>

            </div>
            <div class="filter-button-container">
                <button class="common-filter-button" id="scmSearchBtn" type="button">
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
                    <ul v-for="item in copyOfData" class="scm-table-line">
                        <li>{{ item.ITEM }}</li>
                        <li>{{ item.STGRADE }}</li>
                        <li>{{ item.MATERIAL }}</li>
                        <li>{{ item.MOP }}</li>
                        <li>{{ item.SIZE }}</li>
                        <li>{{ item.QUANTITY }}</li>
                        <li>{{ item.WEIGHT }}</li>
                        <li>{{ item.WARE }}</li>
                        <li>{{ item.RCVDATE }}</li>
                        <li>{{ item.PRODNO }}</li>
                        <li>{{ item.COILNO }}</li>
                        <li>{{ item.NOTE }}</li>
                        
                    </ul>
                </div>
                <ul v-for="item in isViewList" class="scm-table-footer scm-table-line">
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
        </div>
    </section>
</template>

<script setup>
    import ScmHeaders from '@/components/ScmHeaders.vue';

    //store에서 영역별 데이터 import
    import { useScmInvStore } from '@/store/scmInvStore'
    import { storeToRefs } from 'pinia';
    import { computed, onMounted } from 'vue'
    import axios from 'axios'
    import { toast } from 'vue3-toastify';

    const scmInvStore = useScmInvStore()
    const { scmInvGroup } = storeToRefs(scmInvStore)

    const copyOfData = [...scmInvGroup.value]

    //조회된 리스트 배열 여기 담기(copyOfData에서 필터링을 거친 후 여기 담기 / 지금은 임시)
    const isViewList = ref([...copyOfData])
    
    //수량 합계
    const totalQuantity = isViewList.value.reduce((x, y) => {
        return parseInt(x) + parseInt(y.QUANTITY);
    }, 0);

    //중량 합계
    const totalWeight = isViewList.value.reduce((x, y) => {
        return parseInt(x) + parseInt(y.WEIGHT);
    }, 0);

    invCsList()        

    function invCsList() {
        axios.post('/api/invCsList', { })
            .then(res => {
                console.log(res.data)
            })
            .catch(error => { toast.error('목록을 불러오지 못했습니다.') })
    }
</script>

<style lang="scss" scoped>
    .common-filter-container {
        grid-template-columns: repeat(3, minmax(3rem, 1fr));
    }

    .scm-table-line {
        grid-template-columns: 1.25fr .75fr 1fr 1fr .75fr .75fr 1fr 1fr 1fr 1fr minmax(7.5rem, 1fr) 1.25fr;
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