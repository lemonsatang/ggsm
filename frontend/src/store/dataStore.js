//자료실 데이터

import { defineStore } from "pinia"

export const useDataStore = defineStore('dataRoom', () => {

    const dataGroup = ref([
        {
            imgSrc: '/img/sample_01.jpg',
            date: '2023',
            title: '소나무정보기술 제품소개 카달로그',
            texts: `신기술 챗GPT를 이용한 고객응대 프로그램과 
                    자동채팅기능 페이지 추가!
                    
                    2023 버전의 카달로그를 다운받아 보세요.`,
            download: '/data/sample_download.txt',
        },
        {
            imgSrc: '/img/sample_02.jpg',
            date: '2023',
            title: '고객용 원격지원 설치파일',
            texts: `exe 파일을 다운받아서 설치하시면 됩니다.`, 
            download: '/data/sample_download.txt',
        },
    ])

    return { dataGroup }
})