<template>
    <ScmHeaders />
    <div id="scmNtcDtBody" class="ani_down common-inner board-detail-inner">
        <h1 data-common-head-title>공지사항</h1>
        <div v-for="item in getThisData" id="scmNtcDtText" class="ani_down common-inner">
            <div class="board-title-line">
                <p data-board-detail-title>{{ item.TITLE }}</p>
                <P data-board-detail-title-bottom>
                    <span>{{ item.WRITER }}</span>
                    <span>{{ item.DATE }}</span>
                </P>
            </div>
            
            <div class="board-texts-body">
                <img :src="item.IMG_URL">
                <div v-html="item.TEXTS" >                
                </div>
                <div class="wr-upload-location">
                    <div class="wr-up-list-location">
                        <p class="up-list-title">Uploaded files list</p>

                        <ul v-for="subItem in item.UPLOADED" class="wr-uploaded-list">
                            <li>
                                <router-link :to="subItem.FILE_URL">
                                    <font-awesome-icon icon="fa-regular fa-file" />
                                    <p>{{ subItem.FILE_NAME }}</p>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="common-board-button-line">
                <router-link :to="{ name: 'Scm', params: { category: 'scmNoti' }}">
                    <button type="button" class="common-board-button">
                        목록
                    </button>
                </router-link>
            </div>
        </div>
    </div>

</template>
<script setup>
    import ScmHeaders from '@/components/ScmHeaders.vue';
    import { useRoute } from 'vue-router'

    //store에서 영역별 데이터 import
    import { useScmNoticeStore } from '@/store/scmNoticeStore'
    import { storeToRefs } from 'pinia';

    const scmNoticeStore = useScmNoticeStore()
    const { scmNoticeGroup } = storeToRefs(scmNoticeStore)

    const getParams = useRoute();
    const getId = parseInt(getParams.params.id)

    console.log(getId)

    console.log(useRoute().name)

    //Front에서 사용하기위하여 가져온 데이터를 별도의 배열로 복사
    const copyOfData = [...scmNoticeGroup.value]

    // const getThisData = copyOfData.find((f) => f.NO = getId)
    const getThisData = copyOfData.filter((f) => f.NO == getId)
    console.log(getThisData)
    console.log(copyOfData)
</script>
<style lang="scss" scoped>
    #scmNtcDtBody {
        min-height: 40vh;   
    }
    .common-board-button {
        background-color: rgb(var(--deepblue), 1);
        color: rgb(var(--white));
    }

    .wr-upload-location {
        flex-direction: row;
    }

    .wr-uploaded-list {
        li {
            a {
                display: flex;
                align-items: center;
                gap: .5rem;

                &:hover {
                    font-weight: 700;
                }
            }
        }
    }
</style>