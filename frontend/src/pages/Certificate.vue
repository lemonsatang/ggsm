<template>
    <SubpHero />
        <section class="common-inner">
            <h1 data-common-head-title>인증서<span data-common-head-subtitle>Certificate</span></h1>
            <div id="cerTexts" class="ani_down">
                <div @click="item.detailView = !item.detailView" v-for="item in certGroup" data-cert-item>
                    <article>
                        <img data-cert-thumnail :src="item.thumImg" alt="">
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.subTitle }}</p>
                    </article>
                    <div data-cert-detail-view v-if="item.detailView">
                        <div data-cert-detail-body>
                            <img :src="item.detailImg" alt="인증서 상세보기 이미지">
                            <button class="common-button-style" data-cert-detail-close>
                                <font-awesome-icon icon="fa-regular fa-circle-xmark" />
                                
                            </button>
                            
                        </div>
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
    const { certGroup } = storeToRefs(introStore)
    


    

</script>

<style lang="scss" scoped>
    #cerTexts {
        @apply grid;

        gap: 1.75rem;
        grid-template-columns: repeat(4, 1fr);
        
    }

    [data-cert-item] {
        background-color: rgba(var(--black) .025);
        aspect-ratio: 1/1;
        padding: 2rem;
        border-radius: 1rem;

        [data-cert-thumnail] {
            border-radius: 50%;
            width: 9.5rem;
            aspect-ratio: 1/1;
            object-fit: cover;
            margin-bottom: 1.75rem;
            filter: drop-shadow(0 0 16px rgba(var(--main-black), .15));
        }

        h3 {
            font-size: var(--fontMT);
            font-weight: bold;
            margin-bottom:.75rem;
            width: 100%;
            border-bottom: 2px solid rgba(var(--main-black), .2);
            text-align: center;
            padding-bottom: .5rem;
        }

        p {
            font-size: 1.125rem;
        }

        > article {
            @apply flex flex-col justify-center items-center cursor-pointer;

            height: -webkit-fill-available;

            &:hover {
                opacity: .75;
            }
        }
    }

    [data-cert-detail-view] {
        @apply fixed top-0 left-0;

        width: 100vw;
        height: 100vh;
        background-color: rgba(var(--black) .85);
        z-index: 9;

        [data-cert-detail-body] {
            @apply absolute;

            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(var(--white), 1);
            padding: .25rem;
            border-radius: .5rem;

            img {
                @apply w-full;

                object-fit: cover;
                max-height: 80vh;
            }

        }

    }

    //mediaquery
    @media (max-width: 1279px){
        #cerTexts {
            gap: 1rem;
            grid-template-columns: repeat(3, 1fr);
        }

        [data-cert-item] > article {
            padding: 1rem;

            [data-cert-thumnail] {
                width: 40%;
                margin-bottom: 1rem;
            }

            h3, p {
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                font-size: var(--fontM);
            }
        }

    }

    @media (max-width: 767px){
        #cerTexts {
            grid-template-columns: repeat(2, 1fr);
        }

        [data-cert-item] > article {
            
        }

        [data-cert-detail-view] {
            [data-cert-detail-body] {
                @apply w-full;
                
                max-width: 90vw;
            }
        }
    }
</style>