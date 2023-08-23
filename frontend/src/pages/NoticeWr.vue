<template>
    <SubpHero />

    <section class="common-inner">
        <h1 data-common-head-title><span data-common-head-title-add>공지사항</span>글쓰기</h1>

        <div id="scmNotiWr" class="ani_down">
            <div class="wr-top-inputs">
                <div class="top-input-line">
                    <h2 class="wr-input-title">제목</h2>
                    <div class="wr-input-container">
                        <font-awesome-icon icon="fa-heading" />
                        <input type="text" class="wr-input">
                    </div>
                    
                </div>
            </div>
            <div class="wr-body">
                <QuillEditor :options="editorOption" theme="snow" />
                <div class="wr-upload-container">
                    <h2 class="wr-input-title">이미지 첨부</h2>
                    <div class="wr-upload-body wr-img-upload-body">
                        <!-- 이미지 드래그 영역 -->
                        <div class="wr-upload-location wr-img-upload-location" @drop.prevent="dragToUpload" @dragenter.prevent @dragover.prevent>
                            <div class="drag-img-container">
                                <div class="wr-img-upload-plus">
                                    <span></span>
                                    <span></span>
                                </div>
                                <font-awesome-icon class="wr-upload-for-img" icon="fa-regular fa-image" />
                            </div>
                            <p data-drag-here-note>Drag to image</p>
                            <p>or</p>
                            <!-- input 버튼 -->
                            <label class="wr-upload-label" for="wrImgUploadOrigin">
                                <font-awesome-icon icon="fa-folder-open" />
                                Browse
                            </label>
                            <input id="wrImgUploadOrigin" @change="inputToUpload" type="file"/>        
                            <!-- 업로드된 파일명 -->
                            <div class="wr-img-upload-note">
                                <h3>현재 선택된 파일명</h3>
                                <h4>{{ selectedFile.name }} {{ selectedFile.size }}</h4>
                            </div>
                        </div>
                        
                    </div>

                    <div v-if="imgUpAlert" class="wr-common-alert-back">
                        <div class="wr-common-alert-inner">
                            <font-awesome-icon icon="fa-exclamation" />
                            <div class="wr-alert-texts">
                                <p>업로드할 수 없는 형식의 파일입니다.</p>
                                <p>사용 가능한 이미지파일 형식 : </p>
                                <p>jpg, jpeg, png, gif</p>
                            </div>
                            
                            <div class="common-board-button-line">
                                <button @click="imgUpAlert = false" type="button" class="common-board-button">
                                    닫기
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>
            <div class="common-board-button-line">
                <router-link :to="{ name: 'Notice'}">
                    <button type="button" class="common-board-button">
                        <font-awesome-icon icon="fa-pen" />
                        작성
                    </button>
                </router-link>
            </div>
        </div>
        
    </section>
    
</template>
<script setup>
    import SubpHero from '@/components/SubpHero.vue';

    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';

    import { useRoute } from 'vue-router'

    const imgUpAlert = ref(false)

    //드래그로 업로드하는 파일 정보 가져오기
    let recentFile = {}
    const recentFileList = reactive([])
    const selectedFile = reactive({})
        
    let dragToUpload = (e) => {
        const datas = ref(e.dataTransfer.files)
        let getExt = datas.value[0].name.slice(-3).toLowerCase();

        selectedFile.name = ''
        selectedFile.size = ''

        if(getExt == 'jpg' || getExt == 'jpeg' || getExt == 'png' || getExt == 'bmp' || getExt == 'gif') {
            selectedFile.name = datas.value[0].name;
            selectedFile.size = '(' + Math.floor(datas.value[0].size / 1024) + 'kb)';    
        } else {
            imgUpAlert.value = true

            return false
        }
    }

    //input type="file"로 업로드 파일 정보 가져오기
    const inputToUpload = (e) => {
        const inputDatas = ref(e.currentTarget.files)
        let getExt = inputDatas.value[0].name.slice(-3).toLowerCase();

        selectedFile.name = ''
        selectedFile.size = ''

        if(getExt == 'jpg' || getExt == 'jpeg' || getExt == 'png' || getExt == 'bmp' || getExt == 'gif') {
            selectedFile.name = inputDatas.value[0].name;
            selectedFile.size = '(' + Math.floor(inputDatas.value[0].size / 1024) + 'kb)';    
        } else {
            imgUpAlert.value = true

            return false
        }

    }
    //

    // function fileTypeCheck(e) {
    //     let getData = e.currentTarget.files
    //     let getExt = getData[0].name.slice(-3).toLowerCase();



    //     console.log(getExt)
    // }




    //Quill editor 옵션(바인드 되어있음)
    const editorOption = ref({
        placeholder: '저작권 문제가 발생할 우려가 있는 관계로 기사의 본문은 두 줄까지만 작성해주세요.',
        modules: {
            toolbar: [
                ["bold", "italic", "underline", "strike"], // <strong>, <em>, <u>, <s>
                ["blockquote", "code-block"], // <blockquote>, <pre class="ql-syntax" spellcheck="false">
                [{ header: 1 }, { header: 2 }], // <h1>, <h2>
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }], // <sub>, <sup>
                [{ indent: "-1" }, { indent: "+1" }], // class제어
                [{ direction: "rtl" }], //class 제어
                [{ size: ["small", false, "large", "huge"] }], //class 제어 - html로 되도록 확인
                [{ header: [1, 2, 3, 4, 5, 6, false] }], // <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, normal
                [{ font: [] }], // 글꼴 class로 제어
                [{ color: [] }, { background: [] }], //style="color: rgb(230, 0, 0);", style="background-color: rgb(230, 0, 0);"
                [{ align: [] }], // class
                // ["link", "image", "video"],
            ]
        }
    }) 


</script>
<style lang="scss" scoped>
    #scmNotiWr {
        display: flex;
        flex-direction: column;
    }

    .wr-input-container {
        border: 1px solid rgba(var(--main-black), .15);
        border-radius: .5rem;
        padding: .5rem .75rem;
        position: relative;

        svg {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 1rem;
            font-size: var(--fontM);
            color: rgba(var(--deepblue), 1);
        }

        .wr-input {
            padding: .5rem .75rem .5rem 2.25rem;
            width: 100%;
            outline: 0;
        }
    }

    .wr-input {

    }
    .wr-body {
        margin-top: 1rem;
    }

</style>