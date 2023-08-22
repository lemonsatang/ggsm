<template>
    <SubpHero />
    <section class="common-inner">
        <h1 data-common-head-title>인사말</h1>
        <div id="grtGroup" v-for="item in grtGroup" class="ani_down">
            <img :src="item.img" alt="ceo-image">
            <div data-right-div>
                <h1 data-grt-title>{{ item.title }}</h1>
                <p data-grt-subt>{{ item.subT }}</p>
                <div data-grt-texts>
                    <p v-for="subItem in item.children">{{ subItem.texts }}</p>
                    <p data-grt-sign-line>
                        <span>{{ item.position }}</span>
                        <span>{{ item.name }}</span>
                    </p>
                </div>
                
            </div>
        </div>
    </section>
    
    
</template>

<script setup>
    import SubpHero from '@/components/SubpHero.vue';
    //store에서 영역별 데이터 import
    import { useIntroStore } from '@/store/introsStore'
    import { storeToRefs } from 'pinia';

    const introStore = useIntroStore()
    const { grtGroup } = storeToRefs(introStore)

</script>

<style lang="scss" scoped>
    #grtGroup {
        @apply flex;

        gap: 4rem;
        overflow: hidden;

        > img {
            width: 25%;
            min-width: 20rem;
            max-height: 30rem;
            object-fit: cover;
            object-position: top;
            flex-shrink: 0;
        }

    }

    [data-grt-title] {
        
        font-weight: 700;
        color: rgba(var(--deepblue), 1);
        font-size:2rem;
    }

    [data-grt-subt] {
        color: rgba(var(--deepblue), .75);
        font-size:1.25rem;
        margin-top: 1rem;
    }

    [data-grt-texts] {
        @apply flex flex-col; 

        margin-top: 5rem;
        gap: 1.5rem;

        p {
            line-height: 1.75;
        }
        
    }

    [data-grt-sign-line] {
        @apply flex justify-end items-end;

        margin-top: 6rem;

        span {
            &:first-child {
                font-size: 1.25rem;
                margin-right: 1rem;
                word-break: keep-all;
            }

            &:last-child {
                font-size: 2rem;
                margin-right: 2rem;
                font-weight: 700;
            }
        }

    }

    //mediaquery
    @media (max-width: 1280px){


        [data-grt-texts] p {
            font-size: var(--fontM);
        }

        [data-grt-sign-line] {
            span:first-child {
                font-size: var(--fontBase);
            }

            span:last-child {
                font-size: 1.5rem;
                flex-shrink: 0;
            }
        }
    }

    @media (max-width: 767px){
        #grtGroup {
            @apply flex-col;

            > img {
                @apply w-full;

                max-height: 30vh;
            }
        }

        [data-grt-subt] {
            font-size: var(--fontMT);
            line-height: 1.6;
        }
    }


</style>