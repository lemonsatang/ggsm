<template>
    <ScmHeaders />

    <section class="common-inner scm-min-height scm-common-inner">
        <!-- filter -->
        <div class="common-filter-body">
            <div class="common-filter-container">
                <div class="each-filter">
                    <h2 class="ft-header">주문기간</h2>
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
                    <h2 class="ft-header">재질</h2>
                    <input ref="MATRL" type="text">
                </div>
                <!-- -->

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
                <button @click="searchReqReg" @keyup.enter="searchReqReg" class="common-filter-button" id="scmSearchBtn" type="button">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    <p>Search</p>
                </button>
                <button @click="isShowAddMd = 'true'" class="common-filter-button" id="scmPrintBtn" type="button">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                    <p>Add</p>
                </button>
                <button class="common-filter-button bg-excel-green" id="scmExcelBtn" type="button">
                    <font-awesome-icon icon="fa-regular fa-file-excel" />
                    <p>Excel</p>
                </button>
                <button @click="printJS({
                            printable: 'PrintObj', 
                            css: ['/public/assets/scss/print.css'], 
                            scanStyles: false, 
                            type: 'html', 
                            header: '<h3 data-for-print-header>주문의뢰서 접수 리스트</h3>',
                            documentTitle: '금강에스엠 SCM',
                        })" class="common-filter-button" id="scmPrintBtn" type="button">
                    <font-awesome-icon icon="fa-solid fa-print" />
                    <p>Print</p>
                </button>
            </div>
            
        </div>
        <div id="scmTexts" data-scm-req-body class="ani_down scm-common-body">
            <div class="scm-common-table">
                <div class="scm-table-header bg-bid-blue">
                    <ul class="scm-table-line scm-data-table-line" data-scm-table-header>
                        <li>주문일자</li>
                        <li>주문번호</li>
                        <li>품목</li>
                        <li>강종</li>
                        <li>재질</li>
                        <li>도금량</li>
                        <li>치수</li>
                        <li>수량</li>
                        <li>중량</li>
                        <li>비고</li>
                        <li>파일첨부 여부</li>
                    </ul>
                </div>
                <div class="scm-table-body">
                    <div v-for="(item, i) in objBySLINO">
                        <ul v-for="subitem in item" class="scm-table-line">
                            <li>{{ subitem === item[0] ? subitem.TDATE : '' }}</li>
                            <li>{{ subitem === item[0] ? subitem.SLINO: '' }}</li>
                            <li>{{ subitem.ITCOD }}</li>
                            <li>{{ subitem.JJNAS }}</li>
                            <li>{{ subitem.MATRL }}</li>
                            <li>{{ subitem.GOLDW }}</li>
                            <li>{{ subitem.SIZE1 }}</li>
                            <li>{{ subitem.TRQTY }}</li>
                            <li>{{ subitem.TRWGT }}</li>
                            <li>{{ subitem.RK }}</li>
                            <li>{{ subitem.FILEYN }}</li>
                        </ul>
                    </div>
                    
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

            <section id="PrintObj">
                
                <table class="scm-common-table">

                    <thead class="scm-table-header bg-bid-blue">
                        <tr class="scm-table-lines" data-scm-table-header>
                            <td></td>
                            <td>주문일자</td>
                            <td>주문번호</td>
                            <td>품목</td>
                            <td>강종</td>
                            <td>재질</td>
                            <td>도금량</td>
                            <td>치수</td>
                            <td>수량</td>
                            <td>중량</td>
                            <td>비고</td>
                            <td>파일 여부</td>
                        </tr>
                    </thead>
                    <tbody v-for="(item, i) in objBySLINO" class="scm-table-body">
                        
                        <tr v-for="subitem in item" class="scm-table-line">
                            <td v-if="subitem === item[0]" class="req-obj-header" :rowspan="item.length">
                                <p>거래처: {{ subitem.PCVNM }}</p>
                                <p>착지명: {{ subitem.LNNAM }}</p>
                                <p>착지담당: {{ subitem.LNPLN }}</p>
                                <p>착지주소: {{ subitem.LNADR }}</p>   
                            </td>                            
                            <td v-if="subitem === item[0]" :rowspan="item.length">{{ subitem.TDATE }}</td>
                            <td v-if="subitem === item[0]" :rowspan="item.length">{{ subitem.SLINO }}</td>
                            <td>{{ subitem.ITCOD }}</td>
                            <td>{{ subitem.JJNAS }}</td>
                            <td>{{ subitem.MATRL }}</td>
                            <td>{{ subitem.GOLDW }}</td>
                            <td>{{ subitem.SIZE1 }}</td>
                            <td>{{ subitem.TRQTY }}</td>
                            <td>{{ subitem.TRWGT }}</td>
                            <td>{{ subitem.RK }}</td>
                            <td>{{ subitem.FILEYN }}</td>
                        </tr>
                    </tbody>
                    <tfoot class="scm-table-footer scm-table-lines">
                        <td>
                            <p class="scm-footer-titles">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 18L12.6796 12L5 6V4H19V6H8.26348L16 12L8.26348 18H19V20H5V18Z"></path></svg>
                                합계 <span>{{ isViewList.length }}</span>건
                            </p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <p class="scm-footer-titles">
                                <span>{{ totalQuantity }}</span>
                            </p>
                        </td>
                        <td>
                            <p class="scm-footer-titles">
                                <span>{{ totalWeight }}</span>
                            </p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tfoot>
                </table>
            </section>
            <!-- 인쇄전용 레이아웃 끝 -->
        </div>
    </section>

    <!-- 추가 팝업창 -->
    
    <section v-show="isShowAddMd == 'true'" id="addModal">
        <div id="reqAddMdContainer">
            <!-- filter -->
            <div class="common-filter-body">
                <div class="common-filter-container">
                    <div data-md-filter-top>
                        <div class="each-filter">
                            <h2 class="ft-header">거래처</h2>
                            <input ref="CORP_NAME" type="text">
                        </div>

                        <div class="each-filter">
                            <h2 class="ft-header">착지명</h2>
                            <input ref="PLC_NAME" type="text">
                        </div>

                        <div class="each-filter">
                            <h2 class="ft-header">착지담당</h2>
                            <input ref="PLC_PERSON" type="text">
                        </div>
                    </div>
                    <div data-md-filter-bottom>
                        <div class="each-filter">
                            <h2 class="ft-header">착지 주소</h2>
                            <input ref="PLC_LOCATION" type="text">
                        </div>

                        <div class="each-filter" data-req-md-file>
                            <h2 class="ft-header">파일 첨부</h2>
                            <input id="reqAddFile" type="file" @change="inputToReq">
                            <label for="reqAddFile">
                                <font-awesome-icon icon="fa-folder-open" />
                                Browse
                            </label>
                            <p>{{ recentFile.name }} <span ref="upFileSize">{{ recentFile.size }}</span></p>
                            <button v-show="isUploaded = false" @click="delInput">
                                <font-awesome-icon icon="trash-can" />
                            </button>
                            
                        </div>
                    </div>

                </div>
                <div class="filter-button-container">
                    <button @click="addRow" class="common-filter-button" id="scmPrintBtn" type="button">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        <p>행 추가</p>
                    </button>
                    <button @click="addReqReg" class="common-filter-button" id="scmPrintBtn" type="button">
                        <font-awesome-icon icon="fa-floppy-disk" />
                        <p>저장</p>
                    </button>
                    <button @click="closeReqMd" class="common-filter-button" id="scmPrintBtn" type="button">
                        <font-awesome-icon icon="fa-xmark" />
                        <p>닫기</p>
                    </button>
                </div>
                
            </div>

            <div class="ani_down scm-common-body">
                <div class="scm-common-table">
                    <div class="scm-table-header bg-bid-blue">
                        <ul class="scm-table-line scm-data-table-line" data-scm-table-header>
                            <li>품목</li>
                            <li>강종</li>
                            <li>재질</li>
                            <li>도금량</li>
                            <li>두께</li>
                            <li>폭</li>
                            <li>길이</li>
                            <li>수량</li>
                            <li>단중</li>
                            <li>중량</li>
                        </ul>
                    </div>
                    <div class="scm-table-body">
                        <ul v-for="item in addTemp" class="scm-table-line">
                            <li>
                                <input type="text" ref="MD_PROD" v-model="item.ITCOD">
                            </li>
                            
                            <li>
                                <input type="text" ref="MD_KJ" v-model="item.JJNAS">
                            </li>
                            <li>
                                <input type="text" ref="MD_MAT" v-model="item.MATRL">
                            </li>
                            <li>
                                <input type="text" ref="MD_COAT" v-model="item.GOLDW">
                            </li>
                            <li>
                                <input type="text" ref="MD_HEIGHT" v-model="item.SIZE1">
                            </li>
                            <li>
                                <input type="text" ref="MD_WIDTH" v-model="item.SIZE2">
                            </li>
                            <li>
                                <input type="text" ref="MD_LENGTH" v-model="item.SIZE3">
                            </li>
                            <li>
                                <input type="text" ref="MD_AMOUNT" v-model="item.TRQTY">
                            </li>
                            <li>
                                <input type="text" ref="MD_DJ" v-model="item.ITWGT">
                            </li>
                            <li>
                                <input @keyup.enter="addRow" type="text" ref="MD_WEIGHT" v-model="item.TRWGT">
                            </li>
                            
                        </ul>
                    </div>
                    <ul class="scm-table-footer scm-table-line">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 18L12.6796 12L5 6V4H19V6H8.26348L16 12L8.26348 18H19V20H5V18Z"></path></svg>
                            <p class="scm-footer-titles">
                                합계 <span></span>건
                            </p>
                            
                        </li>
                        <li>
                            <p class="scm-footer-titles">
                                <span></span>
                            </p>
                        </li>
                        <li>
                            <p class="scm-footer-titles">
                                <span></span>
                            </p>
                        </li>
                        <li>
                            <p class="scm-footer-titles">
                                <span></span>
                            </p>
                        </li>
                        <li>
                            <p class="scm-footer-titles">
                                <span></span>
                            </p>
                        </li>
                        <li>
                            <p class="scm-footer-titles">
                                <span></span>
                            </p>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import printJS from 'print-js'
    import ScmHeaders from '@/components/ScmHeaders.vue';

    //store에서 영역별 데이터 import
    import { usehfStore } from '@/store/hfStore'
    import { storeToRefs } from 'pinia'
    import { onMounted } from 'vue'
    import axios from 'axios'
    import { toast } from 'vue3-toastify';

    const hfStore = usehfStore()
    const { navGroup, navText } = storeToRefs(hfStore)
    
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

    const isShowAddMd = ref('false')

    const CORP_NAME = ref() //거래처
    const PLC_NAME = ref() //착지명
    const PLC_PERSON = ref() //착지담당
    const PLC_LOCATION = ref() //착지주소

    const upFileSize = ref() //업로드 파일 사이즈
    let isUploaded = false //업로드 되었는지 상태
    let uploadFile = ref() //업로드 파일 정보
    
    //input type='file'로 업로드 파일 정보 가져오기
    let recentFile = reactive({})
    const recentFileList = reactive([])

    const inputToReq = (e) => {
        let inputDatas = e.currentTarget.files

        uploadFile = inputDatas[0]

        console.log(inputDatas)

        recentFile.name = inputDatas[0].name;
        recentFile.size = '(' + Math.floor(inputDatas[0].size / 1024) + 'kb)'

        let isUploaded = true
    }

    const delInput = (e) => {

    }

    function testss() {
        

        console.log('기존 배열은', copyOfData.value)
        console.log('reduce된 배열은', objBySLINO)
    }    
    
    

    function closeReqMd() {
        let addTempCount = addTemp.length
        addTemp.splice(1, addTempCount - 1)
        console.log(addTemp.length)
        isShowAddMd.value = 'false'
    }

    // const copyOfData = [...scmInvGroup.value]
    const copyOfData = reactive([])

    //필터링 거친 데이터 여기 담기
    const isViewList = ref([])

    //**입력된 필터 데이터들 읽어들일것들
    const MATRL = ref()
    //두께
    const I_STSZ1 = ref()
    const I_EDSZ1 = ref()
    //폭
    const I_STSZ2 = ref()
    const I_EDSZ2 = ref()

    //**필터 데이터 받아서 서버에 전달할 애들
    const sendDataList = ref({
        i_matrl: '',
        i_stsz1: 0,
        i_edsz1: 0,
        i_stsz2: 0,
        i_edsz2: 0,
        i_strdt: new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(Date.now()),
        i_enddt: new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(Date.now())
    })

    function searchReqReg() {        

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
        sendDataList.value.i_strdt = startDay
        sendDataList.value.i_enddt = endDay

        sendDataList.value.i_matrl = MATRL.value.value//재질

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

        reqRegList()
    }

    //수량 합계
    const totalQuantity = ref()

    //중량 합계
    const totalWeight = ref()

    reqRegList()

    const objBySLINO = ref([])

    function reqRegList() {
        console.log(sendDataList.value)

        axios.post('/api/reqRegList', sendDataList.value)
            .then(res => {
                copyOfData.value = res.data

                isViewList.value = Object.assign(copyOfData.value)

                totalQuantity.value = isViewList.value.reduce((x, y) => {
                    return parseInt(x) + parseInt(y.TRQTY);
                }, 0);

                totalWeight.value = isViewList.value.reduce((x, y) => {
                    return parseInt(x) + parseInt(y.TRWGT);
                }, 0);

                objBySLINO.value = copyOfData.value.reduce((acc, obj) => {
                    const { SLINO } = obj;

                    acc[SLINO] = acc[SLINO] ?? [];
                    acc[SLINO].push(obj);
                    return acc;
                
                }, {})
            
            })
            .catch(error => { toast.error('목록을 불러오지 못했습니다.') })
    }
    
    const addTemp = reactive([{
        ITCOD: '',//품목
        JJNAS: '',//강종
        MATRL: '',//재질
        GOLDW: '',//도금량
        SIZE1: '',//둒께
        SIZE2: '',//폭
        SIZE3: '',//길이
        TRQTY: '',//수량
        //단위
        ITWGT: '',//단중
        TRWGT: '',//중량

    }])

    function addRow() {
        let newRow = {
            ITCOD: '',//품목
            JJNAS: '',//강종
            MATRL: '',//재질
            GOLDW: '',//도금량
            SIZE1: '',//둒께
            SIZE2: '',//폭
            SIZE3: '',//길이
            TRQTY: '',//수량
            //단위
            ITWGT: '',//단중
            TRWGT: '',//중량
        }
        addTemp.push({...newRow})
    }

    // 주문의뢰서 추가
    function addReqReg() {
    
        let data = {
            CVCOD: localStorage.getItem('CVCOD'),
            PCVNM: CORP_NAME.value.value,
            LNNAM: PLC_NAME.value.value,
            LNPLN: PLC_PERSON.value.value,
            LNADR: PLC_LOCATION.value.value
        }

        const formData = new FormData()
        formData.append('data', JSON.stringify(data))
        formData.append('dataList', JSON.stringify(addTemp))
        formData.append('file', uploadFile)

        axios.post('/api/addReqReg', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(error => toast.error('주문의뢰서를 저장하던 도중 오류가 발생했습니다.'))

        // const CORP_NAME = ref() //거래처
        // const PLC_NAME = ref() //착지명
        // const PLC_PERSON = ref() //착지담당
        // const PLC_LOCATION = ref() //착지주소

        // const upFileSize = ref() //업로드 파일 사이즈
        // let isUploaded = false //업로드 되었는지 상태
        
        // //input type='file'로 업로드 파일 정보 가져오기
        // let recentFile = reactive({})
        // const recentFileList = reactive([])
    }

</script>

<style lang="scss" scoped>
    .common-filter-container {
        grid-template-columns: repeat(2, minmax(3rem, 1fr));
    }

    .scm-table-line-container {
        display: contents;        
    }

    .scm-table-line {
        grid-template-columns: 1fr 1fr 1fr .75fr  1.25fr .75fr 1.25fr .75fr 1fr 2fr .75fr;
        padding: 0;
    }

    #scmTexts {
        .scm-table-header {
            padding-right: 1rem;
        }
    }

    #scmTexts .scm-table-footer {
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
            grid-column: 10/12;
            border-right: none !important;
        }
    }

    #addModal {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 8;
        background-color: rgba(var(--black) .75);

        .common-filter-container {
            grid-template-columns: 1fr;
            width: 80rem;

            > div {
                display: grid;
                gap: 1rem;
            }

            [data-md-filter-top] {
                grid-template-columns: repeat(3, minmax(3rem, 1fr));
            }
            
            [data-md-filter-bottom] {                
                grid-template-columns: 2fr 1fr;
            }
        }

        .common-filter-body {
            margin-bottom: .5rem;
        }
        
        .scm-table-header {
            padding-right: 1rem;
        }

        .scm-table-footer {
            li {
                border-right: 1px solid rgba(var(--main-black), 0.25)
            }

            li:nth-child(1) {
                grid-column: 1/9;
            }
        
            li:nth-child(2) {
                background-color: rgba(var(--main-black), .025);
                padding: .75rem .75rem .75rem 1.25rem !important;
                grid-column: 9/10;
            }

            li:nth-child(3) {
                background-color: rgba(var(--main-black), .025);
                padding: .75rem .75rem .75rem 1rem !important;
                grid-column: 12/13;
            }

            li:nth-child(4) {
                grid-column: 14/15;
            }

            li:nth-child(5) {
                grid-column: 15/16;
            }

            li:nth-child(6) {
                grid-column: 16/17;
                border-right: none !important;
            }
        }

        [data-scm-table-header] {
            li {
                display: flex;
                justify-content: center;
            }
        }

    }

    #addModal .scm-table-body .scm-table-line {

        li {
            padding: .5rem .35rem;

            input {
                outline: 0;
                width: 100%;
                background-color: transparent;

            }
        }

        &:hover {
            background-color: rgb(var(--white));
        }
    }

    #addModal .scm-table-line {
        grid-template-columns: 1fr .75fr 1fr repeat(5, .75fr) .8fr 1fr;
    }

    #reqAddMdContainer {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgb(var(--white));
        width: 80vw;
        min-width: 110rem;
        border-radius: .5rem;
        padding: 0 0.5rem;
    }

    #reqAddFile {
        display: none;
    }

    .each-filter[data-req-md-file] {
        label {
            background-color: rgb(var(--deepblue));
            border-radius: 2rem;
            padding: .5rem .75rem;
            color: rgb(var(--white));
            font-size: var(--font13);
            font-weight: 100;
            display: flex;
            align-items: center;
            gap: .5rem;
            cursor: pointer;

            &:hover {
                opacity: .85;
            }
        }

        span {
            opacity: .5;
        }
    }

    //인쇄용

    #PrintObj {
        display: none;
    }
</style>