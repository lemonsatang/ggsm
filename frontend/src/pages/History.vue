<template>
    <SubpHero />
        <section id="histBody" class="common-inner">
            <h1 data-common-head-title>연혁<span data-common-head-subtitle>History</span></h1>
            <div id="histTexts" class="ani_down">
                <div data-hist-line v-for="item in hsGroup">
                    <article data-hist-years>
                        <section>
                            <p data-hist-year-top>20</p>
                            <p data-hist-year-bottom>{{ item.years }}</p>
                            <div data-hist-years-back>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </section>
                        
                    </article>
                    <div data-hist-items>
                        <div data-hist-inner-line></div>
                        <ul>
                            <li v-for="subItem in item.hists">{{ subItem.text }}</li>
                        </ul>
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
    const { hsGroup } = storeToRefs(introStore)

</script>

<style lang="scss" scoped>
    #histBody {
        @apply flex flex-col items-end;
    }

    #histTexts {
        @apply w-full flex flex-col;

        max-width: 1300px;
    }

    [data-hist-line] {
        @apply flex;

        padding: 2rem 0;
        border-bottom: 1px solid rgba(var(--deepblue), .15);

        &:last-child {
            border-bottom: 0;
        }

        &:nth-child(even) [data-hist-years] {
            background-color: rgb(var(--deepblue));

            section p {
                color: rgb(var(--white));
            }
        }

        [data-hist-years] {
            @apply flex flex-col items-end relative;

            width: 9rem;
            height: 8rem;
            background-color: rgba(var(--black) .05);
            margin-right: 4rem;
            flex-shrink: 0;
            border-radius: 50%;
            user-select: none;
            
            section {
                @apply relative;

                padding: 1.5rem 2rem 40px 0;
                overflow-y: clip;
            }

            p {
                font-size: 1.75rem;
            }
        }

        [data-hist-year-top] {
            padding-right: 1rem;
        }

        [data-hist-year-bottom] {
            padding-left: 1rem;
        }

        // &:nth-child(even) {
        //     background-color: rgba(var(--main-black), .05);
        // }
    }

    [data-hist-years-back] {
        @apply flex flex-col absolute;

        gap: 1rem;
        top: 73px;
        right: -90px;

        span {
            @apply absolute;

            display: block;
            background-color: rgb(var(--deepblue), .5);
            height: 2px;
            width: 11rem;
            transform: rotate(135deg);

            &:nth-child(1) {
                top: 20px;
                right: 23px;
            }

            &:nth-child(2) {
                top: 18px;
                right: 0;
            }

            &:nth-child(3) {
                @apply absolute;

                top: 68px;
                right: 28px;
            }
        }
    }

    [data-hist-items] {
        @apply flex flex-col w-full;

        [data-hist-inner-line] {
            @apply w-full relative;

            height: 2px;
            margin-top: 1.8rem;
            background-color: rgb(var(--deepblue), .5);

            &:after {
                @apply absolute;

                content: '';
                display: block;
                background-color: rgb(var(--deepblue));
                width: .7rem;
                height: .7rem;
                border-radius: 1rem;
                top: -.25rem;
                left: -.35rem;

            }

        }

        ul {
            @apply flex flex-col;

            margin-left: 2rem;
            margin-top: 2rem;
            user-select: none;

            li {
                line-height: 1.75;
                padding: 0 .5rem;

                &:nth-child(even) {
                    background-color: rgba(var(--main-black), .075);
                }
            }
        }
    }

    //mediaquery
    @media (max-width: 767px){
        [data-hist-line] {
            @apply flex-col;
        }

        [data-hist-items] {
            ul {
                margin-left: 1.5rem;
                margin-top: 1.5rem;

                li {
                    font-size: var(--fontM);
                    line-height: 2;
                }
            }
            
        }
    }
</style>