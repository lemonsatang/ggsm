<template>
    <SubpHero />
    <section class="common-inner">
        <div v-for="nvItem in navGroup">
            <hgroup v-for="subNvItem in nvItem.childrens.filter((f) => f.category == getCate)">
                <h1 data-common-head-title>{{ subNvItem.subTitle }}</h1>
            </hgroup>
        </div>
        
        <div id="prodTexts" class="ani_down">
            <div v-for="item in prodGroup.filter((c) => c.category == getCate)" data-prod-item>
                <router-link :to="{ name: 'ProdDetail', params: { id: item.index } }">
                    <div data-item-img>
                        <img :src="item.imgSrc" alt="">
                    </div>
                    <hgroup>
                        <h2 class="common-ellipsis">{{ item.title }}</h2>
                        <p class="common-ellipsis">{{ item.subTitle }}</p>
                    </hgroup>
                </router-link>
            </div>
        </div>
   
    </section>
</template>

<script setup>
    import SubpHero from '@/components/SubpHero.vue';
    import { useRoute } from 'vue-router'

    //store에서 영역별 데이터 import
    import { useProdStore } from '@/store/prodStore'
    import { storeToRefs } from 'pinia';
    const prodStore = useProdStore()
    const { prodGroup } = storeToRefs(prodStore)
    

    import { usehfStore } from '@/store/hfStore'
    const hfStore = usehfStore()
    const { navGroup } = storeToRefs(hfStore)


    const getParams = useRoute();
    const getCate = getParams.params.category

    console.log(getCate)
    console.log('!!')
</script>

<style lang="scss" scoped>
    #prodTexts {
        @apply grid;

        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
    }

    [data-prod-item] {
        @apply flex flex-col cursor-pointer;

        gap: .5rem;        

        hgroup {
            @apply flex;

            user-select: none;
            margin-top: .75rem;
        }

        &:hover {

            [data-item-img] {
                // border: 1px solid rgba(var(--deepblue), 1); 
                filter: drop-shadow(0 0 10px rgba(var(--black) .15));
            }
        }

    }

    [data-item-img] {
        border: 1px solid rgba(var(--main-clr), 1);
        aspect-ratio: 1/1;

        img {
            @apply w-full h-full;
            
            object-fit: cover;
        }
    }

    hgroup {
        @apply flex items-end;
        
        gap: .5rem;
        -webkit-line-clamp: 1;

        .common-ellipsis {
            -webkit-line-clamp: 1;
        }

        h2 {
            font-size: var(--fontMT);
            font-weight: bold;
        }

        p {
            font-size: var(--fontM);
            min-width: 8rem;
        }
    }

        //mediaquery
        @media (max-width: 767px) {
            #prodTexts {
                grid-template-columns: repeat(2, 1fr);
                gap: 2.5rem 1.5rem;
            }

            [data-prod-item] {
                hgroup {
                    @apply flex-col;
                }
            }
        }
</style>