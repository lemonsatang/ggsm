<template>
    <SubpHero />
    <section class="common-inner">
        <h1 data-common-head-title>뉴스</h1>
        <div id="newsTexts" class="ani_down">
            <div v-for="item in newsGroup" data-news-item>
                <a :href="item.linkTo" target="_blank">
                    <img :src="item.imgSrc" alt="">
                    <hgroup>
                        <p>{{ item.reporter }}</p>
                        <h2 class="common-ellipsis">{{ item.title }}</h2>
                    </hgroup>
                    <p data-news-link>{{ item.linkTo }}</p>
                    <p data-news-text>{{ item.subTexts }}</p>
                    <label data-news-item-showmore>
                        <font-awesome-icon icon="fa-link" />
                        go to see
                    </label>
                </a>
            </div>
        </div>

        <div class="filter-button-container web-common-button-container">
            <router-link :to="{name: 'NewsWr'}">
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
    import { useNewsStore } from '@/store/newsStore'
    import { storeToRefs } from 'pinia';

    const newsStore = useNewsStore()
    const { newsGroup } = storeToRefs(newsStore)
</script>

<style lang="scss" scoped>
    #newsTexts {
        @apply grid;

        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }

    [data-news-item] {
        @apply flex flex-col cursor-pointer;

        border: 1px solid rgba(var(--main-clr), 1);
        padding: 1rem 1rem 1.5rem;

        img {
            @apply w-full;

            max-height: 12rem;
            object-fit: cover;
        }

        p {
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            height: 1.25rem
        }

        [data-news-text] {
            color: rgba(var(--black) .6);
            -webkit-line-clamp: 2;
            margin-top: 2rem;
            height: 3rem;
        }

        [data-news-link] {
            font-size: var(--fontM);
        }
    }

    hgroup {
        @apply flex flex-col;

        h2 {
            font-size: var(--fontMT);
            font-weight: bold;
            -webkit-line-clamp: 1;
        }

        p {
            font-size: var(--fontM);
            color: rgba(var(--black) .6);
            line-height: 1.5;
            margin-top: 0.35rem;
        }
    }

    //item hover
    [data-news-item]:hover {
        background-color: rgba(var(--deepblue), 1);
        // border: 1px solid rgba(var(--deepblue), 1);
        // filter: drop-shadow(0 0 10px rgba(var(--deepblue), .5));

        hgroup {
            h2 {
                color: rgba(var(--white), 1);
            }

            p {
                color: rgba(var(--white), .6);
            }
        }

        label {
            color: rgba(var(--white), .6);
            border-bottom: 1px solid rgba(var(--white), .6);
        }

        [data-news-text], [data-news-link] {
            color: rgba(var(--white), .6);
        }
    }

    [data-news-item-showmore] {
        margin: 1.5rem 1rem 0 auto;
        color: rgba(var(--main-black), .5);
        border-bottom: 1px solid rgba(var(--main-black), .35);
        display: flex;
        align-items: center;
        width: fit-content;

        svg {
            padding-top: .15rem;
            font-size: 13px;
            margin-right: .5rem;
            opacity: .5;
        }
    }

    //mediaquery
    @media (max-width: 767px){
        #newsTexts {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 500px){
        #newsTexts {
            grid-template-columns: repeat(1, 1fr);
        }
    }


</style>