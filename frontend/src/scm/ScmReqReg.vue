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
                <button class="common-filter-button" id="scmPrintBtn" type="button">
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
                        <li></li>
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

    
</script>

<style lang="scss" scoped>
    .common-filter-container {
        grid-template-columns: repeat(2, minmax(3rem, 1fr));
    }

    .scm-table-line {
        grid-template-columns: 1fr 1fr 1fr .75fr  1.25fr .75fr 1.25fr .75fr 1fr 2fr .75fr;
        padding: 0;
    }
</style>