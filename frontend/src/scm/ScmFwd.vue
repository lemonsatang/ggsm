<template>
    <ScmHeaders />

    <section class="common-inner scm-min-height scm-common-inner">
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
                    <input ref="ITNAM" type="text">
                </div>
                <div class="each-filter">
                    <h2 class="ft-header">재질</h2>
                    <input ref="MATRL" type="text">
                </div>
                <!-- -->
                <div class="each-filter">
                    <h2 class="ft-header">재고구분</h2>
                    <div class="filter-type-radio">
                        <label>
                            <input ref="CATE_E" type="radio" name="stockCate" value="1">
                            원소재
                        </label>
                        <label>
                            <input ref="CATE_P" type="radio" name="stockCate" value="2">
                            제품
                        </label>
                        <label>
                            <input ref="CATE_K" type="radio" name="stockCate" value="2">
                            보관품
                        </label>
                    </div>
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
                <button @click="searchFwd" @keyup.enter="searchFwd" class="common-filter-button" id="scmSearchBtn" type="button">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    <p>Search</p>
                </button>
                <button @click="exDown()" class="common-filter-button bg-excel-green" id="scmExcelBtn" type="button">
                    <font-awesome-icon icon="fa-regular fa-file-excel" />
                    <p>Excel</p>
                </button>
                <button @click="printJS({
                            printable: 'scmTexts', 
                            css: ['/public/assets/scss/print.css'], 
                            scanStyles: false, 
                            type: 'html', 
                            header: '<h3 data-for-print-header>출고관리 리스트</h3>',
                            documentTitle: '금강에스엠 SCM',
                        })" class="common-filter-button" id="scmPrintBtn" type="button">
                    <font-awesome-icon icon="fa-solid fa-print" />
                    <p>Print</p>
                </button>
            </div>
            
        </div>

        <!-- 본문 -->
        <div id="scmTexts" data-scm-fwd-body class="ani_down scm-common-body">
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
                    <ul v-for="(item, i) in copyOfData.value" class="scm-table-line">
                        <li>{{ item.TDATE }}</li><!-- 출고일자 -->
                        <li>{{ item.SLINO }}</li><!-- 전표번호 -->
                        <li>{{ item.ITNAM }}</li><!-- 품목 -->
                        <li>{{ item.JJNAS }}</li><!-- 강종 -->
                        <li>{{ item.MATRL }}</li><!-- 재질 -->
                        <li>{{ item.GOLDW }}</li><!-- 도금량 -->
                        <li>{{ item.ISIZE }}</li><!-- 치수 -->
                        <li>{{ item.TRQTY }}</li><!-- 수량 -->
                        <li>{{ item.TRWGT }}</li><!-- 중량 -->
                        <li>{{ item.HOUSE }}</li><!-- 창고 -->
                        <li class="have-a-tooltip" @mouseover="showDetailP(i, event)" @mouseleave="closeDetailP(i)">
                            <span v-if="item.MITNO.split(',').length < 2">{{ item.MITNO }}</span>
                            <span v-else>{{ item.MITNO.split(",")[0] }}, {{ item.MITNO.split(",").filter((x, index) => index != 0).join() }}</span>

                            <label class="ellipsis-total-number-count">({{ item.MITNO.split(",").length }}건)</label>
                            <p class="table-hidden-modal" v-if="item.isShowMd === true">
                                <font-awesome-icon icon="fa-eye" />
                                <span v-html="TooltipText"></span>
                            </p>
                        </li><!-- 제품번호 -->
                        <li>{{ item.COILNO }}</li><!-- 코일번호 -->
                        <li>{{ item.SUJNO }}</li><!-- 의뢰번호 -->
                        <li>{{ item.RK }}</li><!-- 비고 -->
                    </ul>
                </div>
                <ul class="scm-table-footer scm-table-line">
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 18L12.6796 12L5 6V4H19V6H8.26348L16 12L8.26348 18H19V20H5V18Z"></path></svg>
                        <p class="scm-footer-titles">
                            합계 <span>{{ viewTotalLine.totalNum }}</span>건
                        </p>
                        
                    </li>
                    <li>
                        <p class="scm-footer-titles">
                            <span>{{ viewTotalLine.totalQuantity }}</span>
                        </p>
                    </li>
                    <li>
                        <p class="scm-footer-titles">
                            <span>{{ viewTotalLine.totalWeight }}</span>
                        </p>
                    </li>
                    <li></li>
                </ul>
            </div>
        </div>
    </section>

    <!-- <button type="button" @click="chkView()">test button</button> -->

</template>

<script setup>
    import printJS from 'print-js'
    import ScmHeaders from '@/components/ScmHeaders.vue';

    //store에서 영역별 데이터 import
    import { usehfStore } from '@/store/hfStore'
    import { storeToRefs } from 'pinia'
    import { onMounted } from 'vue'
    import axios from 'axios'
    import { toast } from 'vue3-toastify'
    import * as XLSX from 'xlsx-js-style'

    const TooltipText = ref()

    const hfStore = usehfStore()
    const { navGroup, navText } = storeToRefs(hfStore)
    // const copyOfData = [...scmFwdGroup.value]

    const copyOfData = reactive([])


    const inputValue = ref(new Date())
    const hdCheck = ref([])

    //필터링 거친 데이터 여기 담기
    const isViewList = ref([])

    //**입력된 필터 데이터들 읽어들일것들

    const ITNAM = ref()
    const MATRL = ref()
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

    //**필터 데이터 받아서 서버에 전달할 애들(일자는 dataObj로 별도)
    const sendDataList = ref({
        i_mitgu: '',
        i_itcod: '',
        i_matrl: '',
        i_stsz1: 0,
        i_edsz1: 0,
        i_stsz2: 0,
        i_edsz2: 0,
        i_savit: '2',
        i_date1: new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(Date.now()),
        i_date2: new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(Date.now())
    })

    function searchFwd() {        

        //시작 연, 월, 일 가져오기
        let getStYear = range.value.start.getFullYear()
        let getStMonth = range.value.start.getMonth() + 1
        let getStDay = range.value.start.getDate()

        let startDay = getStYear + '-' + ('0' + (getStMonth)).slice(-2) + '-' + ('0' + (getStDay)).slice(-2)

        //끝 연, 월, 일 가져오기
        let getEdYear = range.value.end.getFullYear()
        let getEdMonth = range.value.end.getMonth() + 1
        let getEdDay = range.value.end.getDate()

        let endDay = getEdYear + '-' + ('0' + (getEdMonth)).slice(-2) + '-' + ('0' + (getEdDay)).slice(-2)

        //날짜
        sendDataList.value.i_date1 = startDay
        sendDataList.value.i_date2 = endDay
        
        sendDataList.value.i_itcod = ITNAM.value.value//품목
        sendDataList.value.i_matrl = MATRL.value.value//재질

        //재고구분(1=원소지, 2=제품, 1=보관품)
        if(CATE_E.value.checked) {
            sendDataList.value.i_mitgu = '1'
        } else if(CATE_P.value.checked) {
            sendDataList.value.i_mitgu = '2'
        } 
        
        if(CATE_K.value.checked) {
            sendDataList.value.i_savit = '1'
        } else {
            sendDataList.value.i_savit = '2'
        }
        
        //두께
        if(I_STSZ1.value.value == null || I_STSZ1.value.value == '') {
            sendDataList.value.i_stsz1 = 0
        } else {
            sendDataList.value.i_stsz1 = I_STSZ1.value.value
        }

        if(I_EDSZ1.value.value == null || I_EDSZ1.value.value == '') {
            sendDataList.value.i_edsz1 = 0
        } else {
            sendDataList.value.i_edsz1 = I_EDSZ1.value.value
        }
        
        //폭
        if(I_STSZ2.value.value == null || I_STSZ2.value.value == '') {
            sendDataList.value.i_stsz2 = 0
        } else {
            sendDataList.value.i_stsz2 = I_STSZ2.value.value
        }

        if(I_EDSZ2.value.value == null || I_EDSZ2.value.value == '') {
            sendDataList.value.i_edsz2 = 0
        } else {
            sendDataList.value.i_edsz2 = I_EDSZ2.value.value
        }

        console.log(sendDataList.value)
        
        getList()
    }

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
    // watch(hdCheck, () => {

    //     for(let i = 0; copyOfData.length > i; i++ ) {
    //         if ( hdCheck.value[0] == 'allChecked' ) {
    //             copyOfData[i].CHK = true
    //             console.log('체크됨!')
    //         } else {
    //             copyOfData[i].CHK = false
    //         }
    //     }
    // })

    //합계 라인
    const viewTotalLine = ref({
        totalQuantity: '',
        totalWeight: '',
        totalNum: ''
    })
    
    onMounted(() => {
        getList()        
            
    })

    async function getList() {

        axios.post('/api/fwdList', sendDataList.value)
            .then(res => {
                copyOfData.value = [...res.data]

                //mouse hover시 툴팁출력을 위하여 가져온 배열들마다 isShowMd key와 false value를 추가
                for(let i=0; i < copyOfData.value.length; i++ ) {
                    copyOfData.value[i] = Object.assign(copyOfData.value[i], {isShowMd: false})
                }

                isViewList.value = Object.assign(copyOfData.value)

                viewTotalLine.value.totalQuantity = isViewList.value.reduce((x, y) => {
                    return parseInt(x) + parseInt(y.TRQTY);
                }, 0);

                viewTotalLine.value.totalWeight = isViewList.value.reduce((x, y) => {
                    return parseInt(x) + parseInt(y.TRWGT);
                }, 0);

                viewTotalLine.value.totalNum = isViewList.value.length
                
                // copyOfData.value.push({...isViewList})
                
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
                출고일자: x.TDATE,
                전표번호: x.SLINO,
                품목: x.ITNAM,
                강종: x.JJNAS,
                재질: x.MATRL,
                도금량: x.GOLDW,
                치수: x.ISIZE,
                수량: x.TRQTY,
                중량: x.TRWGT,
                창고: x.HOUSE,
                제품번호: x.MITNO,
                코일번호: x.COILNO,
                의뢰번호: x.SUJNO,
                비고: x.RK
            }

            return mutedObj
        })

        const sheetByJson = XLSX.utils.json_to_sheet(excelData);

        const wscols = [
                {width: 13},
                {width: 18},
                {width: 7},
                {width: 5},
                {width: 12},
                {width: 8},
                {width: 15},
                {width: 5},
                {width: 7},
                {width: 7},
                {width: 30},
                {width: 10},
                {width: 15},
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
        XLSX.utils.book_append_sheet(wb, sheetByJson, '출고관리');

        let date = new Date()
        let getYear = date.getFullYear()
        let getMonthAfter = date.getMonth()
        let getMonth = ("0" + getMonthAfter).slice(-2);
        let getDayAfter = date.getDate()
        let getDay = ("0" + getDayAfter).slice(-2);

        XLSX.writeFile(wb, '출고관리' + '_' + getYear + getMonth + getDay + '.xlsx')
    }
    
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
        grid-template-columns: 7.5rem 1.1fr .75fr .5fR 1fr .75fr 1fr 4.5rem .75fr .5fr 13rem .7fr 10rem 1.5fr;
        padding: 0;
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