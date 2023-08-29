<template>
    <ScmHeaders />

    <section class="common-inner scm-min-height scm-common-inner">
        <!-- filter -->
        <div class="common-filter-body">
            <div class="common-filter-container">
                <div class="each-filter">
                    <h2 class="ft-header">재고구분</h2>
                    <div class="filter-type-radio">
                        <label>
                            <input ref="CATE_E" type="radio" name="stockCate" value="E">
                            원소재
                        </label>
                        <label>
                            <input ref="CATE_P" type="radio" name="stockCate" value="P">
                            제품
                        </label>
                        <label>
                            <input ref="CATE_K" type="radio" name="stockCate" value="K">
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
                <button @click="exDown()" class="common-filter-button bg-excel-green" id="scmExcelBtn" type="button">
                    <font-awesome-icon icon="fa-regular fa-file-excel" />
                    <p>Excel</p>
                </button>
                    <!-- <button @click="printJS({printable: isViewList, properties: ['ITNAM', 'JJNAS', 'MATRL', 'GOLDW', 'ISIZE', 'GQTY', 'GWGT', 'HOUNM', 'IDATE', 'MITNO', 'COLNO', 'RK'], type: 'json'})" class="common-filter-button" id="scmPrintBtn" type="button"> -->
                    <!-- <button @click="printJS({printable: 'scmTexts', css: ['/public/assets/scss/style.css'], scanStyles: false, type: 'html'})" class="common-filter-button" id="scmPrintBtn" type="button"> -->
                        <!-- <button @click="printJS({printable: 'scmTexts', targetStyle: ['/public/assets/scss/common.scss'], scanStyles: false, type: 'html'})" class="common-filter-button" id="scmPrintBtn" type="button"> -->
                <button @click="printJS({
                            printable: 'scmTexts', 
                            css: ['/public/assets/scss/print.css'], 
                            scanStyles: false, 
                            type: 'html', 
                            header: '<h3 data-for-print-header>재고현황 리스트</h3>',
                            documentTitle: '금강에스엠 SCM',
                        })" class="common-filter-button" id="scmPrintBtn" type="button">
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
                            <span v-if="item.MITNO.split(',').length < 2">{{ item.MITNO }}</span>
                            <span v-else>{{ item.MITNO.split(",")[0] }}, {{ item.MITNO.split(",").filter((x, index) => index != 0).join() }}</span>

                            <label class="ellipsis-total-number-count">({{ item.MITNO.split(",").length }}건)</label>
                            <p class="table-hidden-modal" v-if="item.isShowMd === true">
                                <font-awesome-icon icon="fa-eye" />
                                <span v-html="TooltipText"></span>
                            </p>
                        </li><!-- 제품번호 -->
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
    import printJS from 'print-js'
    import ScmHeaders from '@/components/ScmHeaders.vue';

    //store에서 영역별 데이터 import
    import { useScmInvStore } from '@/store/scmInvStore'
    import { storeToRefs } from 'pinia'
    import { onMounted } from 'vue'
    import axios from 'axios'
    import { toast } from 'vue3-toastify'
    import * as XLSX from 'xlsx-js-style'

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
                console.log(res.data)
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


    
    // 엑셀 다운로드
    function exDown() {
        const wb = XLSX.utils.book_new();
        
        let excelData = isViewList.value.map(x => {
            const mutedObj = {
                품목: x.ITNAM,
                강종: x.JJNAS,
                재질: x.MATRL,
                도금량: x.GOLDW,
                치수: x.ISIZE,
                수량: x.GQTY,
                중량: x.GWGT,
                창고: x.HOUNM,
                입고일자: x.IDATE,
                제품번호: x.MITNO,
                코일번호: x.COLNO,
                비고: x.RK
            }

            return mutedObj
        })

        const sheetByJson = XLSX.utils.json_to_sheet(excelData);

        const wscols = [
                {width: 5, fill: { fgColor: { rgb: "E9E9E9" } }},
                {width: 5},
                {width: 10},
                {width: 10},
                {width: 15},
                {width: 5},
                {width: 7},
                {width: 7},
                {width: 13},
                {width: 18},
                {width: 10},
                {width: 20},
        ];

        // 높이, 넓이 길이 지정 (아래 스타일 지정에서 불가능)
        sheetByJson['!cols'] = wscols;
        sheetByJson['!rows'] = [{
            hpt: 24
        }];

        // 스타일 지정
        for (let i in sheetByJson) {
            if (typeof(sheetByJson[i]) != "object") continue
            let cell = XLSX.utils.decode_cell(i)

            if (cell.r === 0) {
                sheetByJson[i].s = {
                    font: {
                        bold: true
                    },
                    alignment: {
                        vertical: 'center',
                        horizontal: 'center'
                    },
                    fill: {
                        fgColor: { rgb: 'E9E9E9' }
                    },
                    border: {
                        right: {
                            style: "thin",
                            color: "000000"
                        },
                        left: {
                            style: "thin",
                            color: "000000"
                        },
                        bottom: {
                            style: "thin",
                            color: "000000"
                        },
                    }
                }
            }

            if (cell.r !== 0) {
                sheetByJson[i].s = {
                    alignment: {
                        horizontal: 'right'
                    }
                }
            }
        }
        XLSX.utils.book_append_sheet(wb, sheetByJson, '재고현황');

        let date = new Date()
        let getYear = date.getFullYear()
        let getMonthAfter = date.getMonth()
        let getMonth = ("0" + getMonthAfter).slice(-2);
        let getDayAfter = date.getDate()
        let getDay = ("0" + getDayAfter).slice(-2);

        XLSX.writeFile(wb, '재고현황' + '_' + getYear + getMonth + getDay + '.xlsx')
    }




</script>

<style lang="scss" scoped>
    .common-filter-container {
        grid-template-columns: repeat(3, minmax(3rem, 1fr));
    }

    .scm-table-line {
        grid-template-columns: .5fr 6rem .75fr .75fr .75fr 5rem .5fr .5fr .75fr 11rem 7.5rem 1.25fr;
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