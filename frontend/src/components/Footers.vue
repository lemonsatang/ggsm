<template>
    <footer v-if="useRoute().path !== '/' && useRoute().path !== '/login'" v-for="item in ftGroup" :class="{'scm-min-width': useRoute().name == 'Scm'}">
        <div class="common-inner">
            <img data-ft-logo :src="item.ftLogo" alt="logo-footer">
            <section>
                <ul data-ft-menus>
                    <li>
                        <router-link :to="{ name: 'Greet' }">
                            회사소개
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Notice' }">
                            공지사항
                        </router-link>
                    </li>
                </ul>
                <article>
                    <p>{{ item.compname }}</p>
                    <p>{{ item.address }}</p>
                    <p>TEL : {{ item.tel }} / FAX : {{ item.fax }}</p>
                </article>
                <p>{{ item.cpr }}</p>
            </section>
        </div>
        
    </footer>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    //store에서 영역별 데이터 import
    import { usehfStore } from '@/store/hfStore'
    import { storeToRefs } from 'pinia';

    const hfStore = usehfStore()
    const { ftGroup } = storeToRefs(hfStore)

</script>

<style lang="scss" scoped>
    footer {
        @apply w-full flex;

        padding: 1rem 0 1rem;
        // background-color: rgba(var(--black) .753);
        background-color: rgba(var(--main-black), .5);
        color: rgb(var(--white));
        font-weight: 100;
        height: 13rem;

        > .common-inner {
            @apply flex w-full;

            gap: 3rem;

            img {
                width: 5rem;
            }
        }

        section {
            @apply flex flex-col;

            gap: 1rem;

            p {
                user-select: none;
                line-height: 1.7;
            }
        }
    }

    [data-ft-menus] {
        @apply flex;

        gap: 1.25rem;

        li {
            @apply cursor-pointer;

            &+li:before {
                content: '';
                display: inline-block;
                width: 1px;
                height: .75rem;
                background-color: rgb(var(--white));
                margin-right: 1.25rem;
            }

            &:hover {
                font-weight: 500;
            }
        }
    }

    [data-ft-logo] {
        @apply object-contain;

        user-select: none;
        pointer-events: none;
    }

    //mediaquery
    @media screen and (max-width: 767px) {
        footer {

            font-size: var(--fontM);
            > .common-inner {
                @apply flex-col;

                [data-ft-logo] {
                    margin: 0 auto;
                }
            }
        }

        
    }


</style>