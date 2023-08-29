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
                <button @click="searchFwd" @keyup.enter="searchFwd" class="common-filter-button" id="scmSearchBtn" type="button">
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
                <button class="common-filter-button" id="scmPrintBtn" type="button">
                    <font-awesome-icon icon="fa-solid fa-print" />
                    <p>Print</p>
                </button>
            </div>
            
        </div>
        <div id="scmTexts" class="ani_down scm-common-body">
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
                        <li>파일첨부</li>
                    </ul>
                </div>
                <div class="scm-table-body">
                    <ul class="scm-table-line">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
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
                    <li></li>
                </ul>
            </div>
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
                    <button @click="" class="common-filter-button" id="scmPrintBtn" type="button">
                        <font-awesome-icon icon="fa-solid fa-plus" />
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
                            <li>MAKER</li>
                            <li>강종</li>
                            <li>재질</li>
                            <li>도금량</li>
                            <li>두께</li>
                            <li>폭</li>
                            <li>길이</li>
                            <li>수량</li>
                            <li>단위</li>
                            <li>단중</li>
                            <li>중량</li>
                            <li>단가</li>
                            <li>공급가액</li>
                            <li>부가세</li>
                            <li>합계금액</li>
                        </ul>
                    </div>
                    <div class="scm-table-body">
                        <ul class="scm-table-line">
                            <li>
                                <input type="text" ref="MD_PROD">
                            </li>
                            <li>
                                <input type="text" ref="MD_MAKER">
                            </li>
                            <li>
                                <input type="text" ref="MD_KJ">
                            </li>
                            <li>
                                <input type="text" ref="MD_MAT">
                            </li>
                            <li>
                                <input type="text" ref="MD_COAT">
                            </li>
                            <li>
                                <input type="text" ref="MD_HEIGHT">
                            </li>
                            <li>
                                <input type="text" ref="MD_WIDTH">
                            </li>
                            <li>
                                <input type="text" ref="MD_LENGTH">
                            </li>
                            <li>
                                <input type="text" ref="MD_AMOUNT">
                            </li>
                            <li>
                                <input type="text" ref="MD_UNIT">
                            </li>
                            <li>
                                <input type="text" ref="MD_DJ">
                            </li>
                            <li>
                                <input type="text" ref="MD_WEIGHT">
                            </li>
                            <li>
                                <input type="text" ref="MD_UNPRICE">
                            </li>
                            <li>
                                <input type="text" ref="MD_SPPRICE">
                            </li>
                            <li>
                                <input type="text" ref="MD_VAT">
                            </li>
                            <li>
                                <input type="text" ref="MD_SUMPRICE">
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
    
    //input type='file'로 업로드 파일 정보 가져오기
    let recentFile = reactive({})
    const recentFileList = reactive([])

    const inputToReq = (e) => {
        let inputDatas = e.currentTarget.files

        console.log(inputDatas)

        recentFile.name = inputDatas[0].name;
        recentFile.size = '(' + Math.floor(inputDatas[0].size / 1024) + 'kb)'

        let isUploaded = true
    }

    const delInput = (e) => {

    }

    function closeReqMd() {
        isShowAddMd.value = 'false'
    }

    //'추가' 팝업창
    

</script>

<style lang="scss" scoped>
    .common-filter-container {
        grid-template-columns: repeat(2, minmax(3rem, 1fr));
    }

    .scm-table-line {
        grid-template-columns: 1fr 1fr 1fr .75fr  1.25fr .75fr 1.25fr .75fr 1fr 2fr .75fr;
        padding: 0;
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
            }
        }

        &:hover {
            background-color: rgb(var(--white));
        }
    }

    #addModal .scm-table-line {
        grid-template-columns: 1fr 1fr .75fr 1fr repeat(6, .75fr) .8fr 1fr 1.15fr 1.15fr 1.15fr 1.15fr;
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
</style>