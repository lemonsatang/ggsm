<template>
    <h1 data-common-head-title class="scm-common-board-inner">공지사항</h1>

    <div class="common-filter-body scm-common-board-inner">
        <div class="filter-board-total">
            <p>TOTAL</p>
            <p data-board-count>{{ copyOfData.length }}</p>
        </div>
        <div class="each-filter">
            <!-- <h2 class="ft-header">통합검색</h2> -->
            <input placeholder="검색어를 입력해주세요..." type="text">
            <div class="filter-button-container">
                <button class="common-filter-button" id="scmSearchBtn" type="button">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    <p>Search</p>
                </button>
            </div>
        </div>
        
    </div>

    <div id="scmTexts" class="ani_down scm-common-board-inner">
        <div class="scm-common-table">
            <div class="scm-table-header">
                <ul class="scm-table-line bg-bid-blue" data-scm-table-header>
                    <li>작성일</li>
                    <li>제목</li>
                    <li>파일</li>
                </ul>
            </div>
            <div class="board-table-body">
                <router-link v-for="item in dataPerPage[recentPage]" :to="{ name: 'ScmDetail', params: { id: item.NO } }">
                    <ul class="scm-table-line">
                        <li data-list-date>
                            <p data-list-date-year>{{ item.DATE.substr(0, 4) }}</p>
                            <p data-list-date-day>{{ item.DATE.substr(5,5) }}</p>
                        </li>
                        <!-- <li>{{ item.NO }}</li> -->
                        <li data-list-texts>
                            <p data-list-texts-title>{{ item.TITLE }}</p>
                            <div data-list-texts-body v-html="item.TEXTS"></div>
                        </li>
                        
                        <li data-list-file-yn v-if="item.FILE_YN == 'Y'">
                            <a :href="item.FILE_URL">
                                <font-awesome-icon icon="fa-regular fa-file" />
                            </a>
                        </li>
                        <li v-else>-</li>
                    </ul>
                </router-link>
            </div>
        </div>
        <div class="common-board-button-line">
            <router-link :to="{ name: 'ScmNotiWr'}">
                <button type="button" class="common-board-button">
                    <font-awesome-icon icon="fa-pen" />
                    글쓰기
                </button>
            </router-link>
        </div>
        <!-- common pager -->
        <div class="scm-common-pager">
            <ul class="scm-pager-list">
                <li @click="recentPage = recentPage > 1 ? recentPage - 1 : recentPage = 0"><font-awesome-icon icon="fa-solid fa-angle-left" /></li>
                <li v-for="pageNumber in totalPages" @click="recentPage = pageNumber-1" :class="{ 'pager-recent-page': pageNumber == recentPage }">
                    {{ pageNumber }}
                </li>
                <li @click="recentPage = recentPage < totalPageNum - 1 ? recentPage + 1 : recentPage = totalPageNum - 1"><font-awesome-icon icon="fa-solid fa-angle-right" /></li>
            </ul>
        </div>
    </div>
</template>

<script setup>

    //store에서 영역별 데이터 import
    import { useScmNoticeStore } from '@/store/scmNoticeStore'
    import { storeToRefs } from 'pinia';

    const scmNoticeStore = useScmNoticeStore()
    const { scmNoticeGroup } = storeToRefs(scmNoticeStore)

    //Front에서 사용하기위하여 가져온 데이터를 별도의 배열로 복사
    const copyOfData = [...scmNoticeGroup.value]
    
    function chkChk() {
        console.log(copyOfData)
    }

    const perPage = 5 //페이지 당 글 갯수
    const totalPageNum = Math.ceil(copyOfData.length / perPage) // 페이지가 총 몇 페이지 나와야하는지 계산

    const totalPages = Array.from({ length: totalPageNum }, (v, i) => i+1); // 모든 페이지 구하기(1페이지~마지막 페이지까지) -> 예시) <  1 2 3 4 5  >
    console.log(totalPages)

    //각 페이지마다 들어가야할 데이터들 분류하기( pagesDivide() + dataPerPage )
    function pagesDivide(data = [], size = 1) {
        const arr = [];

        for (let i = 0; i < data.length; i += size) {
            arr.push(data.slice(i, i + size));
        }

        return arr;
    }

    const dataPerPage = pagesDivide(copyOfData, perPage)

    console.log(dataPerPage)

    const recentPage = ref(0)  // 현재페이지

    function chkPage() {
        console.log(recentPage.value)
    }

    watch(recentPage, () => {
        
    })
    
</script>

<style lang="scss" scoped>
    // table
    #scmTexts .scm-table-header .scm-table-line {
        padding: .75rem 1rem;
        background-color: rgba(var(--deepblue), 1);
        font-size: var(--fontMT);

        &:hover {
            background-color: rgba(var(--deepblue), 1);
        }
    }

    #scmTexts .scm-table-line {
        grid-template-columns: 9rem 1fr 5rem;
        padding: 1.5rem 1.5rem;
        border-bottom: 1px solid rgba(var(--black) .1);

        &:hover {
            background-color: rgba(var(--main-black), .05);
        }

        [data-list-file-yn] {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .board-table-body {
        background-color: transparent;
        
        li:nth-child(2) {
            text-align: start;
            padding: 0 1rem;
        }        

        a:nth-child(odd) {
            display: block;
            background-color: rgba(var(--white), 1);
        }

        a:nth-child(even) {
            background-color: transparent;
        }
    }

    .scm-common-table {
        filter: none;
        background-color: transparent;
    }

    .common-filter-body {
        justify-content: flex-end;
        background-color: transparent;
        margin-bottom: 0.5rem;
        padding: 1rem 0;
        align-items: flex-end;
    }
    
    [data-common-head-title] {
        margin: 3rem auto 1rem auto;
    }

    .each-filter {
        border-bottom: 1px solid rgba(var(--main-black), 1);

        input[type=text] {
            background-color: transparent;
        }
    }

</style>