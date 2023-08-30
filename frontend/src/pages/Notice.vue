<template>
    <SubpHero />
    <section id="histBody" class="common-inner">
        <h1 data-common-head-title>공지사항<span data-common-head-subtitle>Notice</span></h1>
        <div id="notiTexts" class="ani_down">
            <!-- item -->            
            <!-- <div v-for="item in copyOfData" data-notice-item @click="[isOpened = true, getNum(item.index)]"> -->
            <div v-for="item in copyOfData" data-notice-item @click="[isOpened = true, getThisMdData(item.index)]">
                <div data-notice-item-dates>
                    <p>{{ item.year }}</p>
                    <h2>{{ item.regMonth }}.{{ item.regDay }}</h2>
                </div>
                <div data-notice-item-texts>
                    <h3>{{ item.title }}</h3>
                    <p v-for="subItem in item.text">{{ subItem.texts }}</p>
                </div>
                <p data-notice-item-showmore>
                    <font-awesome-icon icon="fa-angle-right" />
                    show more
                </p>
            </div>
            <!-- item end -->
            
            <!-- 상세페이지 modal -->
            <div data-notice-modal v-if="isOpened">
                
                <div v-for="mdItem in isViewModal.value" data-notice-modal-texts>
                    <h1>공지사항</h1>
                    <div data-notice-item-dates>
                        <h3 class="notice-modal-title">{{ mdItem.title }}</h3>
                        <div class="notice-modal-dates">
                            <p>{{ mdItem.year }}.{{ mdItem.regMonth }}.{{ mdItem.regDay }}</p>
                        </div>
                        
                    </div>
                    <div data-notice-item-texts>
                        
                        <img v-if="mdItem.img != ''" :src="mdItem.img" alt="">
                        <p v-for="mdSubItem in mdItem.text">{{ mdSubItem.texts }}</p>
                    </div>
                    <ul class="notice-milestone-container">
                        <li v-if="mdItem.index > 0" class="notice-milestone-item">
                            <a href="#" @click="getPrevMdData(mdItem.index)" v-for="subItem in copyOfData.filter((x) => x.index === mdItem.index - 1)">
                                <p>이전글</p>
                                <p class="notice-milestone-title">{{ subItem.title }}</p>
                                <p class="notice-milestone-date">{{ subItem.year }}.{{ subItem.regMonth }}.{{ subItem.regDay }}</p>
                            </a>
                        </li>
                        <!-- <li v-else class="notice-milestone-item">
                            <p>이전 글이 없습니다.</p>
                        </li> -->
                        <li v-if="mdItem.index < copyOfData.length" class="notice-milestone-item">
                            <a href="#" @click="getNextMdData(mdItem.index)" v-for="subItem in copyOfData.filter((x) => x.index === mdItem.index + 1)">
                                <p>다음글</p>
                                <p class="notice-milestone-title">{{ subItem.title }}{{ copyOfData.length }}</p>
                                <p class="notice-milestone-date">{{ subItem.year }}.{{ subItem.regMonth }}.{{ subItem.regDay }}</p>
                            </a>
                        </li>
                        <!-- <li v-else class="notice-milestone-item">
                            <p>다음 글이 없습니다.</p>
                        </li> -->
                        
                    </ul>
                    <button @click="isOpened = !isOpened" class="common-button-style">
                        <font-awesome-icon icon="fa-xmark" />
                        닫기
                    </button>
                </div>
            </div>
            <!-- 상세페이지 modal end -->
        </div>
        <div class="filter-button-container web-common-button-container">
            <router-link :to="{name: 'NoticeWr'}">
                <button class="common-filter-button" id="scmSearchBtn" type="button">
                    <font-awesome-icon icon="fa-solid fa-pen" />
                    <p>글쓰기</p>
                </button>
            </router-link>
        </div>
    </section>
</template>

<script setup>
    import SubpHero from '@/components/SubpHero.vue';

    //store에서 영역별 데이터 import
    import { useNoticeStore } from '@/store/noticeStore'
    import { storeToRefs } from 'pinia';
    import { watch } from 'vue';

    
    const isOpened = ref(false)

    const noticeStore = useNoticeStore()
    const { noticeGroup } = storeToRefs(noticeStore)

    const copyOfData = reactive([...noticeGroup.value])
    const isViewModal = reactive({})

    let modalId = reactive({})

    function getNum(e) {
        modalId = e
        
    }

    function getThisMdData(i) {
        isViewModal.value = copyOfData.filter((x) => x.index == i);
    }

    function getPrevMdData(i) {
        isViewModal.value = copyOfData.filter((x) => x.index == i - 1);
    }

    function getNextMdData(i) {
        isViewModal.value = copyOfData.filter((x) => x.index == i + 1);
    }

    
</script>

<style lang="scss" scoped>
    #notiTexts {
        @apply grid;

        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;      
    }

    [data-notice-item] {
        @apply flex flex-col cursor-pointer;

        padding: 1rem 1.5rem 1.5rem;
        // background-color: rgba(var(--black) .045);
        border-radius: .25rem;
        border: 1px solid rgba(var(--black) 1);

        & * {
            user-select: none;
        }

        &:hover {
            background-color: rgba(var(--deepblue), 1);
            border: 1px solid rgba(var(--deepblue), 1);
            // filter: drop-shadow(0 0 10px rgba(var(--deepblue), .5));

            & * {
                color: rgba(var(--white), 1);
            }

            [data-notice-item-dates] {
                border-bottom: 1px solid rgba(var(--white), 1);
            }
        }
    }

    [data-notice-item-dates] {
        @apply flex flex-col;

        border-bottom: 1px solid rgba(var(--black) 1);
        padding-bottom: .5rem;

        p {
            opacity: .3;
            font-weight: 700;
            width: 100%;
            padding: .15rem .5rem;
            background-color: rgba(var(--main-black), .15);
        }

        h2 {
            font-size: 2rem;
            font-weight: 900;
            text-align: left;
            line-height: 1.35;
            color: rgba(var(--deepblue), .75);
            margin-top: .5rem;
        }
    }

    [data-notice-modal] [data-notice-item-dates] {
        p {
            background: transparent;
        }
    }

    [data-notice-item-texts] {
        @apply flex flex-col overflow-scroll;

        max-height: 50vh;

        h3 {
            font-weight: 900;
            margin-top: 1rem;
            font-size: var(--fontMT);
        }

        p {
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            margin-top: 1rem;
            height: 4.5rem;
        }

        img {
            margin-top: 2rem;
            aspect-ratio: 16/9;
            object-fit: contain;
            object-position: left;
        }


    }

    [data-notice-item-showmore] {
        margin: 1rem 0 0 auto;
        border-bottom: 1px solid rgba(var(--deepblue), .5);
        color: rgba(var(--deepblue), .5);
        display: flex;
        align-items: center;

        svg {
            padding-top: .15rem;
            font-size: 13px;
            margin-right: .5rem;
            opacity: .5;
        }
    }

    //상세페이지 modal
    [data-notice-modal] {
        @apply fixed top-0 left-0;

        cursor: auto;
        width: 100vw;
        height: 100vh;
        background-color: rgba(var(--black) .65);
        z-index: 10;

        [data-notice-item-texts] {

            h3 {
                font-size: 2rem;
                margin-top: 3rem;
            }

            p {
                margin-top: 3rem;
                overflow: visible;
                height: auto;
                display: block;
            }
            
            &::-webkit-scrollbar {
                width: .35rem;
                display: block;
            }

            &::-webkit-scrollbar-thumb {
                background: rgba(var(--main-clr), .1);
                border-radius: .5rem;
                
            }
        }

        [data-notice-item-dates] {
            padding-bottom: 1rem;
            border-bottom: 3px solid rgba(var(--main-clr), 1);

            p {
                text-align: right;
                margin-top: .5rem;
                opacity: .5;
            }
        }

        button {
            @apply absolute;

            svg {
                color: rgb(var(--white));    
            }

            gap: .5rem;
            background-color: rgba(var(--deepblue), 1);
            color: rgb(var(--white));
            bottom: 2rem;
            right: 3rem;
            border-radius: 2rem;
            min-width: 5rem;

            &:hover {
                opacity: .85;
            }
        }
        
    }

    .notice-modal-dates {
        display: flex;
        gap: .5rem;
    }

    .notice-modal-title {
        font-size: var(--fontST);
        font-weight: 700;
    }

    [data-notice-modal-texts] {
        @apply fixed;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(var(--white), 1);
        padding: 1rem 2rem 2rem 2rem;
        width: calc(100% - 1rem);
        min-width: 50vw;
        max-width: 60rem;
        height: 82vh;
        border-radius: 0.5rem;

        .notice-modal-dates {
            display: flex;
            align-items: center;

            p {
                margin-top: 0;
                color: rgba(var(--main-black), .5);
                opacity: 1;
                font-size: var(--fontBase);
                font-weight: 400;
            }
        }

        h1 {
            font-size: var(--fontMT);
            margin-bottom: 2rem;
        }
    }

    [data-notice-modal-texts] [data-notice-item-texts] {
        padding: 0 1rem;
    }

    // milestone
    .notice-milestone-container {
        position: absolute;
        bottom: 6rem;
        display: flex;
        flex-direction: column;
        border-top: 2px solid rgba(var(--black) 1);
        border-bottom: 2px solid rgba(var(--black) 1);
        width: calc(100% - 4rem);
        gap: .5rem;

        li {
            display: flex;
            align-items: center;
            height: 3rem;
            padding: .5rem;

            a {
                display: flex;
                gap: 1rem;
                width: 100%;
            }

            &:first-child {
                border-bottom: 1px solid rgba(var(--black) 1);
            }
        }

    }

    .notice-milestone-date {
        margin-left: auto;
    }

    .notice-milestone-title {
        display: flex;
        align-items: center;

        &:before {
            content: '';
            display: block;
            width: 1px;
            height: 1rem;
            background-color: rgba(var(--black) 1);
            margin-right: 1rem;
        }
    }


    //mediaquery
    @media (max-width: 1279px){
        #notiTexts {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
        }


    }

    @media (max-width: 767px){
        #notiTexts {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        [data-notice-item] {
            padding: 1.5rem 1.5rem;
        }

        [data-notice-item-texts] {
            h3 {
                margin-top: 1.5rem;
            }
        }

        [data-notice-item-dates] {

            h2 {
                font-size: var(--fontST);
            }
        }

        [data-notice-modal] {

            [data-notice-item-dates] {
                padding-bottom: 1rem;
            }

            [data-notice-modal-texts] {
                padding: 1.5rem 1.5rem 5rem 1.5rem;
                min-height: 50vh;
                max-height: 82vh;
                height: auto;

                h3 {
                    font-size: var(--fontMT);
                }

                p {
                    font-size: var(--fontM);
                }

            }

            [data-notice-item-texts] {

                h3 {
                    margin-top: 2rem;
                }

                p {
                    line-height: 1.75;
                }
            }
        }
    }

    @media (max-width: 500px){
        #notiTexts {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
    }



</style>