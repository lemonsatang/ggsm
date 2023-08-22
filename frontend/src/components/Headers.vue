<template>
    <header :class="[{'nav-back-transp': useRoute().path == '/'}, {'nav-close': useRoute().name == 'Scm'}, {'nav-close': useRoute().name == 'ScmLogin'}, {'nav-close': useRoute().name == 'ScmDetail'}, {'nav-close': useRoute().name == 'ScmNotiWr'} ]">
        <div class="common-inner">
            <router-link to="/">
                <img v-if="useRoute().path == '/'" data-main-logo src="/logo_w.png" alt="메인 로고 이미지">
                <img v-else data-main-logo src="/CI_header.svg" alt="메인 로고 이미지">
            </router-link>
            <nav @mouseenter="openStat = true" @mouseleave="openStat = false">
                <ul v-for="item in navGroup" :class="{'nav-back-transp': useRoute().path == '/' }">                    
                    <!-- 메인메뉴 -->
                    <li class="nav-main-menu">
                        <p>{{ item.title }}</p>
                    </li>
                </ul>
                <!-- 서브메뉴 -->
                
                <div :class="{'nav-back-transp': useRoute().path == '/' }" v-if="openStat == true" class="nav-sub-mass">
                    <div data-nav-inner-sub class="common-inner">
                        <div v-for="texts in navText" data-nav-sub-texts>
                            <hgroup>
                                <p>{{ texts.navSubTexts }}</p>
                                <h2>{{ texts.navTexts }}</h2>
                            </hgroup>
                        </div>
                        <section data-nav-submenu-section>
                            <ul v-for="item in navGroup" class="nav-sub-list">
                                <router-link :to="subItem.subTo" v-if="item.title != '제품소개'" v-for="subItem in item.childrens">
                                    <li>
                                        {{ subItem.subTitle }}
                                    </li>
                                </router-link>
                                <router-link :to="{name: 'Prod', params: {category: subItem.category}}" v-else v-for="subItem in item.childrens">
                                    <li>
                                        {{ subItem.subTitle }}
                                    </li>
                                </router-link>
                                
                            </ul>
                        </section>
                    </div>
                    
                </div>
                
            </nav>
            <div @click="navModalSt = !navModalSt" id="navModalBtn" :class="{'nav-modal-btn-absolute': mobVerIsShow == true, 'nav-modal-opened': navModalSt == true}">
                <span :class="{'nav-btn-white': useRoute().path == '/' }"></span>
                <span :class="{'nav-btn-white': useRoute().path == '/' }"></span>
                <span :class="{'nav-btn-white': useRoute().path == '/' }"></span>
            </div>
        </div>
        <div v-if="navModalSt" id="navModal">
            <section>
                <div data-nav-modal-menus v-for="item in navGroup">
                    <p data-nav-modal-head>
                        {{ item.title }}
                        <span>{{ item.subT }}</span>
                    </p>
                    <ul data-nav-modal-list>
                        <router-link :to="subItem.subTo" v-if="item.title != '제품소개'" v-for="subItem in item.childrens">
                            <li>
                                    {{ subItem.subTitle }}
                            </li>
                        </router-link>
                        <router-link :to="{name: 'Prod', params: {category: subItem.category}}" v-else v-for="subItem in item.childrens">
                            <li>
                                {{ subItem.subTitle }}
                            </li>
                        </router-link>
                    </ul>
                </div>
            </section>
            
        </div>
        
    </header>
</template>

<script setup>
    //store에서 영역별 데이터 import
    import { usehfStore } from '@/store/hfStore'
    import { storeToRefs } from 'pinia';

    const hfStore = usehfStore()
    const { navGroup, navText } = storeToRefs(hfStore)
    
    const isLoginPg = ref(false)

    const navModalSt = ref(false)
    var mobVerIsShow = ref(false)

    const openStat = ref(false)
    
    // 해상도 1600px 이하일 시 
    if ( matchMedia("(max-width: 1600px)").matches ) {
        mobVerIsShow.value = true
    }


    const subOpen = ref(false);

    import { useRoute } from 'vue-router'
    const route = useRoute()


    watch(route, (to, from) => {
        //페이지 이동시 메뉴팝업 닫기
        navModalSt.value = false

    })


</script>

<style lang="scss" scoped>
    header{
        @apply fixed top-0 w-full flex;

        height: 6.25rem;
        background-color: rgba(var(--white), .5);
        z-index: 9;

        > .common-inner {
            @apply flex items-center w-full;
        }

        &.nav-close {
            display: none;
        }
    }

    .nav-sub-mass.nav-back-transp {
        background-color: rgba(var(--white), 0.05);
        color: rgb(var(--white));
    }
    header.nav-back-transp {
        background-color: rgba(var(--white), 0.25);
        color: rgb(var(--white));
        
    }

    .nav-main-menu.nav-back-transp:hover {
        @apply relative;

        &:after {
            @apply absolute block;

            content: '';
            width: -webkit-fill-available;
            height: 2px;
            background-color: rgb(var(--white));
            bottom: .75rem;
            left: 50%;
            transform: translate(-50%);
        }

        // border-bottom: 2px solid rgb(var(--white));
        // margin-bottom: -2px;
    }

    [data-nav-sub-texts] {
        @apply relative w-full;

        padding-right: 2rem;

        hgroup {
            @apply absolute;

            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }

        h2 {
            font-size: var(--font32);
            font-weight: bold;
        }
    }

    [data-main-logo] {
        @apply cursor-pointer;

        width: 2.5rem;

    }

    nav {
        @apply flex relative;

        gap: .5rem;
        margin-left: auto;
        margin-top: 1.25rem;
    }

    .nav-main-menu {
        @apply relative cursor-pointer;

        height: fit-content;
        padding: 1.5rem 1.5rem;
        width: 10rem;
    }

    [data-nav-inner-sub] {
        @apply flex w-full;

        gap: .5rem;
        padding: 1rem .5rem 2rem;
    }

    [data-nav-submenu-section] {
        @apply flex;

        gap: .5rem;
        margin-left: auto;
    }

    .nav-sub-mass {
        @apply flex fixed;

        width: 100vw;
        top: 6rem;
        right: 50%;
        transform: translateX(50%);
        z-index: 99;
        background-color: rgba(var(--white), .5);
        padding-top: 1rem;
        transition: all 1s;
    }
    .nav-sub-list {
        @apply flex flex-col;

        width: 10rem;
        gap: .5rem;        

        li {
            padding: .5rem 1.5rem;
            user-select: none;

            &:hover {
                cursor: pointer;
                font-weight: 900;
            }
        }
    }

    // MODAL

    #navModalBtn {
        @apply flex flex-col cursor-pointer absolute;

        right: 3.25rem;
        gap: .31rem;
        padding: 1rem;
        margin-top: 1.25rem;

        span {
            width: 1.5rem;
            height: 2px;
            background-color: rgb(var(--black) 1);

            &.nav-btn-white {
                background-color: rgb(var(--white));
            }
        }

        &.nav-modal-btn-absolute {
            @apply relative;

            right: auto;
            margin-left: 3.25rem;
        }

        &.nav-modal-opened {
            z-index: 99999;

            span {
                @apply relative;

                transition: .5s;
                transform-origin: 12px -3px;
                background-color: rgb(var(--white));

                &:first-child {
                    transform: rotate(45deg);
                    
                }

                &:nth-child(2) {
                    display: none;
                }

                &:last-child {
                    transform: rotate(135deg);
                }
            }
        }
    }

    #navModal {
        @apply fixed top-0 right-0;

        width: 50vw;
        height: 100vh;
        background-color: rgba(var(--black) .85);
        z-index: 9999;

        [data-nav-modal-menus] {
            @apply flex flex-col;    

            color: rgb(var(--white));

            & + div {
                margin-top: 2rem;
            }
        }

        > section {
            @apply absolute;

            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    [data-nav-modal-head] {
        font-size: var(--fontT);
        font-weight: 300;
        user-select: none;

        span {
            font-size: 1rem;
            opacity: .5;
        }
    }

    [data-nav-modal-list] {
        @apply flex flex-col;

        top: 3rem;
        gap: 1rem;
        margin-top: 1.5rem;

        li {
            cursor: pointer;

            &:hover {
                font-weight: 700;
            }
        }
    }

    //mediaquery

    
    @media (max-width: 1024px) {
        [data-nav-modal-head] {
            line-height: 1;
        }

        [data-nav-modal-list] {
            gap: 1rem;
        }
    }

    @media (max-width: 768px) {

        header #navModalBtn {
            right: 0;
        }

        header {
            > .common-inner {
                justify-content: space-between;        
            }
        }

        [data-nav-modal-head] {
            font-size: var(--fontST);
        }
        
        [data-nav-modal-list] {
            gap: 1rem;
        }

        nav {
            display: none;
        }

        #navModal {
            width: 100vw;

            > section {
                width: 80%;
            }

            [data-nav-modal-menus] {

                & + div {
                    margin-top: 2.5rem;
                }
            }
        }

        #navModalBtn.nav-modal-btn-absolute {
            margin-top: 0;
            margin-left: 0;
        }

    }

</style>