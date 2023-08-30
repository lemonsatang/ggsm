<template>
    <SubpHero />
        <section class="common-inner">
            <h1 data-common-head-title>
                오시는 길
                <span data-common-head-subtitle>Directions</span>
                <!-- <p>귀하의 방문을 환영합니다.</p> -->
            </h1>

            <div v-for="item in pathGroup" data-path-item>
                <iframe :src="item.mapUrl"></iframe>
                <div data-path-texts>
                    <h1>{{ item.title }}</h1>
                    <div data-path-subtexts>
                        <p>
                            <i class="ri-map-pin-add-line"></i>
                            <span>{{ item.locate }}</span>
                        </p>
                        <p>
                            <i class="ri-mail-line"></i>
                            <span>{{ item.mail }}</span>
                        </p>
                        <p>

                            <i class="ri-phone-line"></i>
                            <span>{{ item.call }}</span>
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

    import { RiPhoneLine } from "vue-remix-icons";

    const introStore = useIntroStore()
    const { pathGroup } = storeToRefs(introStore)

</script>

<style lang="scss" scoped>

    [data-common-head-title] {
        p {
                font-size: 1rem;
                font-weight: normal;
                margin-top: .5rem;
            }
    }

    [data-path-item] {
        margin-bottom: 2rem;
    }

    iframe {
        @apply w-full;

        height: 23.5rem;
        border-radius: .5rem;
    }

    [data-path-texts] {
        @apply flex justify-between items-center;

        margin-top: 2rem;
        border-bottom: 1px solid rgba(var(--deepblue), .25);
        padding-bottom: 1.5rem;

        h1 {
            font-size: 1.5rem;
            font-weight: bold;
            margin-left: 1.85rem;
            color: rgba(var(--black) 1);
            position: relative;

            &:after {
                position: absolute;
                bottom: -.5rem;
                left: 0;
                content: '';
                width: -webkit-fill-available;
                height: 5px;
                background-color: rgba(var(--deepblue), .5);
            }
        }
    }

    [data-path-subtexts] {
        @apply grid justify-between;

        margin-left: auto;
        gap: 6rem;
        max-width: 75%;
        grid-template-columns: 1.5fr 1fr 1fr;

        p {
            @apply flex items-center;

            gap: 1rem;            
        }

        i {
            @apply relative;

            color: transparent;
            font-size: 1.5rem;
            width: 2.5rem;
            height: 2.5rem;
            background-color: rgba(var(--deepblue), 1);
            border-radius: 50%;
            flex-shrink: 0;
            
            &:before {
                @apply absolute;

                color: rgba(var(--white), 1);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

        }
    }

    //mediaquery
    @media (max-width: 1279px){
        [data-path-texts] {
            @apply flex-col;
            
            align-items: flex-start;
            gap: 1.5rem;

            h1 {
                margin-left: 0;
            }
        }

        [data-path-subtexts] {
            max-width: 100%;
            margin-left: 1rem;
            gap: 2rem;
        }
    }

    @media (max-width: 767px){
        [data-path-texts] {
            
        }

        [data-path-subtexts] {
            grid-template-columns: 1fr;
        }
    }
</style>