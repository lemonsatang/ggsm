<template>
    <header :class="[{'nav-back-transp': useRoute().path == '/'}, {'nav-close': useRoute().name == 'Scm'}, {'nav-close': useRoute().name == 'ScmLogin'}, {'nav-close': useRoute().name == 'ScmFwd'}, {'nav-close': useRoute().name == 'ScmInvCs'}, {'nav-close': useRoute().name == 'ScmReqReg'} ]">
        <div class="common-inner">
            
            <div v-if="loginUserName == null" class="header-top-line">
                <!-- <router-link :to="{name: 'ScmLogin'}"> -->
                <button class="main-adm-login" type="button" @click="loginNback">
                    <font-awesome-icon icon="fa-right-to-bracket" />
                    <p>LOGIN</p>
                </button>
                <!-- </router-link> -->
            </div>

            <div v-else class="header-top-line">
                <button class="main-adm-login" type="button" @click="loginNback">
                    <font-awesome-icon icon="fa-user" />
                    <p>{{ loginUserName }}님 반갑습니다.</p>
                </button>
            </div>

            <div class="header-bottom-line">
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
                    
                    <div :class="{'nav-back-transp': useRoute().path == '/', 'nav-sub-open': openStat == true }" v-if="openStat == true" class="nav-sub-mass">
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
            </div>
            <!-- <div> -->
                
            <!-- </div> -->
            
            <div @click="navModalSt = !navModalSt" id="navModalBtn" :class="{'nav-modal-opened': navModalSt == true}">
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
    const userName = ref()

    /* import font awesome 컴포넌트 */
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    /* 원하는 아이콘을 개별적으로 import */
    import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

    /* 위에서 import한 아이콘들을 Core library에 등록 */
    library.add(faRightToBracket)

    //store에서 영역별 데이터 import
    import { usehfStore } from '@/store/hfStore'    
    import { storeToRefs } from 'pinia';
    import { watch } from 'vue';

    const hfStore = usehfStore()    

    const { navGroup, navText } = storeToRefs(hfStore)

    const navModalSt = ref(false)
    var mobVerIsShow = ref(false)

    const openStat = ref(false)
    
    // 해상도 1600px 이하일 시 
    if ( matchMedia("(max-width: 1600px)").matches ) {
        mobVerIsShow.value = true
    }

    const subOpen = ref(false);

    import { useRoute} from 'vue-router'
    import { library } from '@fortawesome/fontawesome-svg-core';
    import router from '../router';
    const route = useRoute()

    watch(route, (to, from) => {
        //페이지 이동시 메뉴팝업 닫기
        navModalSt.value = false
    })

    function loginNback() {
        sessionStorage.setItem("whatsNext", "nonScm")

        router.push('/login')
        console.log(localStorage.getItem('CVNAM'))
    }

    const loginUserName = reactive(localStorage.getItem('CVNAM'))

    function checks() {
        for(let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            console.log(key)
        }

        
    }

    checks()

</script>

<style lang="scss" scoped>
    header{
        @apply fixed top-0 w-full flex;

        height: 6.25rem;
        // height: 6.25rem;
        background-color: rgba(var(--white), .5);
        z-index: 9;

        > .common-inner {
            @apply flex items-center w-full;

            flex-direction: column;
        }

        &.nav-close {
            display: none;
        }
    }

    .main-adm-login {
        display: flex;
        gap: .5rem;
        align-items: center;
    }

    .header-bottom-line {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        height: 4.5rem;
    }

    .header-top-line {
        width: 100%;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: .75rem;
        margin-top: .5rem;

        a {
            display: flex;
            gap: .5rem;
            justify-content: flex-end;
            align-items: center;
            border-bottom: 1px solid rgba(var(--white), .35);
            padding-top: 0.25rem;
            padding-bottom: 0.45rem;
            width: 100%;
            font-size: var(--fontM);
            letter-spacing: 1px;

            &:hover p{
                opacity: .75;
            }
        }

        svg {
            color: rgba(var(--white), .5);
        }
    }

    .nav-sub-mass.nav-back-transp {
        background-color: rgba(var(--white), 0.15);
        color: rgb(var(--white));
    }
    header.nav-back-transp {
        background-color: rgba(var(--white), 0.35);
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
    }

    .nav-main-menu {
        @apply relative cursor-pointer;

        height: fit-content;
        padding: 1.5rem 0;
        width: 10rem;
        font-size: var(--fontST);
        font-weight: 800;

        p {
            text-align: right;
        }
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
        top: 0;
        opacity: 0;
        right: 50%;
        transform: translateX(50%);
        z-index: 99;
        background-color: rgba(var(--white), .85);
        // padding-top: 1rem;
        transition: all 1s;
        filter: drop-shadow(2px 2px 16px rgba(var(--black) .05));
        // border-bottom: 1px solid rgba(var(--black) .35);
        // padding-top: 2rem;

        &.nav-sub-open {

            top: 6rem;
            opacity: 1;
            animation-duration: .5s;
            animation-name: navOpenSlide;
        }

        @keyframes navOpenSlide {
            from {
                top: 3rem;
                opacity: 0;
            }

            to {
                top: 6rem;
                opacity: 1;
            }
        }
    }
    .nav-sub-list {
        @apply flex flex-col;

        width: 10rem;
        gap: .25rem;        

        li {
            padding: .5rem 0;
            user-select: none;
            display: flex;            
            justify-content: flex-end;

            &:hover {
                cursor: pointer;
                font-weight: 900;
            }
        }
    }

    // MODAL
    #navModal {
        overflow: scroll;
    }

    #navModalBtn {
        @apply flex-col cursor-pointer absolute;

        display: none;
        right: 3.25rem;
        bottom: 11px;
        gap: .31rem;
        padding: 1rem;
        margin-top: 1.25rem;

        span {
            width: 1.75rem;
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

    @media (max-width: 1480px) {
        header {
            > .common-inner {
                padding: 0 2rem;
            }
        }
    }
    
    @media (max-width: 1024px) {
        [data-nav-modal-head] {
            line-height: 1;
        }

        [data-nav-modal-list] {
            gap: 1rem;
        }
    }

    @media (max-width: 768px) {
        .header-bottom-line {
            height: 6.25rem;
        }
        .header-top-line {
            display: none;
        }

        header #navModalBtn {
            right: 1rem;
            bottom: 0;
            transform: translateY(-50%);
            display: flex;
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
                height: 75vh;
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