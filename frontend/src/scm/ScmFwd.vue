<template>
    <!-- filter -->
    <div class="common-filter-body">
        <div class="common-filter-container">
            <div class="each-filter">
                <h2 class="ft-header">출하기간</h2>
                <div class="filter-type-dates">
                    <VDatePicker v-model="range" is-range>
                        <template #default="{ inputValue, inputEvents }">
                            <div class="flex justify-center items-center">
                                <article data-date-container>
                                    <input type="text" :value="inputValue.start" v-on="inputEvents.start" />
                                    <font-awesome-icon icon="fa-regular fa-calendar" />
                                </article>
                                <article data-date-container>
                                    <input type="text" :value="inputValue.end" v-on="inputEvents.end" />
                                    <font-awesome-icon icon="fa-regular fa-calendar" />
                                </article>                        
                            </div>
                        </template>
                    </VDatePicker>
                    <!-- <button type="button" @click="setToday()">Today</button> -->
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
                    <li>출고일자</li>
                    <li>전표번호</li>
                    <li>품목</li>
                    <li>강종</li>
                    <li>재질</li>
                    <li>도금량</li>
                    <li>치수</li>
                    <li>수량</li>
                    <li>중량</li>
                    <li>창고</li>
                    <li>제품번호</li>
                    <li>코일번호</li>
                    <li>의뢰번호</li>
                    <li>비고</li>
                </ul>
            </div>
            <div class="scm-table-body">
                <ul v-for="item in copyOfData" class="scm-table-line">
                    <li>{{ item.FWDDATE }}</li>
                    <li>{{ item.STNO }}</li>
                    <li>{{ item.ITEM }}</li>
                    <li>{{ item.STGRADE }}</li>
                    <li>{{ item.MATERIAL }}</li>
                    <li>{{ item.MOP }}</li>
                    <li>{{ item.SIZE }}</li>
                    <li>{{ item.QUANTITY }}</li>
                    <li>{{ item.WEIGHT }}</li>
                    <li>{{ item.WARE }}</li>
                    <li>{{ item.PRODNO }}</li>
                    <li>{{ item.COILNO }}</li>
                    <li>{{ item.REQNO }}</li>
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
    <!-- <button type="button" @click="chkView()">test button</button> -->

</template>

<script setup>
    //store에서 영역별 데이터 import
    import { useScmFwdStore } from '@/store/scmFwdStore'
    import { storeToRefs } from 'pinia';
    import { computed } from 'vue';

    const scmFwdStore = useScmFwdStore()
    const { scmFwdGroup } = storeToRefs(scmFwdStore)
    const copyOfData = [...scmFwdGroup.value]

    const inputValue = ref(new Date())
    const hdCheck = ref([])

    //조회된 리스트 배열 여기 담기(copyOfData에서 필터링을 거친 후 여기 담기 / 지금은 임시)
    const isViewList = ref([...copyOfData])

    function chkView() {
        console.log()
    }

    //달력 관련
    const range = ref({
        start: new Date(),
        end: new Date(),
    });

    function setToday() {
        range.value = new Date()
        inputValue.value.start = new Date()
        console.log(range.value)
    }

    //전체 체크
    watch(hdCheck, () => {

        for(let i = 0; copyOfData.length > i; i++ ) {
            if ( hdCheck.value[0] == 'allChecked' ) {
                copyOfData[i].CHK = true
                console.log('체크됨!')
            } else {
                copyOfData[i].CHK = false
            }
        }
         
    })

    //수량 합계
    const totalQuantity = isViewList.value.reduce((x, y) => {
        return parseInt(x) + parseInt(y.QUANTITY);
    }, 0);

    //중량 합계
    const totalWeight = isViewList.value.reduce((x, y) => {
        return parseInt(x) + parseInt(y.WEIGHT);
    }, 0);


    
</script>

<style lang="scss" scoped>
    .common-filter-container {
        grid-template-columns: repeat(3, minmax(3rem, 1fr));
    }

    .scm-common-table {
        // height: 50vh;
        
    }

    // table

    .scm-table-line {
        grid-template-columns: minmax(7.5rem, 1fr) 1fr 1.25fr .75fR 1fr 1fr .75fr .75fr 1fr 1fr 1fr 1fr minmax(11rem, 1.5fr) 2fr;
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
            grid-column: 1/8;
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
    

    // @media (max-width: 1919px) {
    //     .common-filter-container {
    //         grid-template-columns: repeat(2, minmax(3rem, 1fr));
    //     }
    // }

    // @media (max-width: 1279px) {

    // }

    // @media (max-width: 1023px) {

    // }

    // @media (max-width: 767px) {
    //     .common-filter-container {
    //         grid-template-columns: repeat(1, minmax(3rem, 1fr));
    //     }
    // }

</style>