<template>
    <SubpHero />
    <section class="common-inner">
        <h1 data-common-head-title>자료실<span data-common-head-subtitle>DataRoom</span></h1>
        <div id="dataTexts" class="ani_down">
            <div data-dataroom-item v-for="item in dataGroup">
                <img :src="item.imgSrc" alt="">
                <div data-dataroom-texts>
                    <hgroup>
                        <p data-dataroom-date>{{ item.date }}</p>
                        <h2>{{ item.title }}</h2>
                    </hgroup>
                    <p>{{ item.texts }}</p>
                    <a :href="item.download">
                        <button class="common-button-style">
                            <font-awesome-icon icon="fa-regular fa-circle-down" />
                            <p>다운로드</p>
                        </button>
                    </a>
                </div>
            </div>
        </div>

        <div class="filter-button-container web-common-button-container">
            <router-link :to="{name: 'DataRoomWr'}">
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
    import { useDataStore } from '@/store/dataStore'
    import { storeToRefs } from 'pinia';

    const dataStore = useDataStore()
    const { dataGroup } = storeToRefs(dataStore)


</script>

<style lang="scss" scoped>
    #dataTexts {
        @apply grid;

        gap: 1rem;     
        grid-template-columns: repeat(2, 1fr);
    }

    button.common-button-style {                

        p {
            margin-bottom: 0;            
        }
    }
   
    [data-dataroom-item] {
        @apply flex relative;

        padding: 1.8rem;
        gap: 2rem;
        background-color: rgba(var(--black) 0.025);
        border-radius: 0.25rem;
        // border: 1px solid rgba(var(--black) .1);

        img {
            @apply w-full h-full;

            max-width: 30%;
            aspect-ratio: 1/1.2;
            filter: drop-shadow(0 4px 4px rgba(var(--black) 0.25));
            user-select: none;
            // max-height: 16.5rem;
            object-fit: cover;
        }

    }

    [data-dataRoom-texts] {
        @apply flex flex-col;

        hgroup {
            @apply flex flex-col;

            margin: 1.5rem 0 1rem 0;
            user-select: none;

            [data-dataroom-date] {
                font-weight: bold;
                margin-bottom: 0;
            }

            h2 { 
                font-size: 1.25rem;
                font-weight: bold;
                margin-top: .15rem;
            }
        }

        p {
            user-select: none;
            margin-bottom: 3rem;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 10;
            max-height: 15rem;
        }
    }

    //mediaquery
    @media (max-width: 1280px) {

    }

    @media (max-width: 1024px) {
        #dataTexts {
            grid-template-columns: repeat(1, 1fr);

            p {
                font-size: var(--fontM);
            }
        }
    }
    

    @media (max-width: 768px) {

        [data-dataroom-item] {
            gap: 1rem;

            img {
                width: 8rem;
                max-width: 50%;
            }
        }
    }

    @media (max-width: 500px){
        [data-dataroom-item] {
            @apply flex-col;
        }
    }


</style>