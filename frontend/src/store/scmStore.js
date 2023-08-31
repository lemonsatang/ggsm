// SCM 데이터

import { defineStore } from "pinia"

export const useScmStore = defineStore('scm', () => {

    const scmGroup = ref([
        {
            name: '출고관리',
            category: 'fwd',
            path: '/scm/fwd'
        },
        {
            name: '재고현황',
            category: 'invCs',
            path: '/scm/invCs'
        },
        {
            name: '주문의뢰서 접수',
            category: 'reqReg',
            path: '/scm/reqReg',
        },

        // {
        //     name: '공지사항',
        //     category: 'scmNoti',
        // }
    ])

    const cvcodData = localStorage.getItem('CVCOD') // 거래처 코드
    const cvnamData = localStorage.getItem('CVNAM') // 거래처 명
    const sanoData = localStorage.getItem('SANO') // ?
    const ownamData = localStorage.getItem('OWNAM') // 대표자명
    const uptaeData = localStorage.getItem('UPTAE') // 업태
    const jongkData = localStorage.getItem('JONGK') // 종목
    const zipcdData = localStorage.getItem('ZIPCD') // 우편번호
    const addr1Data = localStorage.getItem('ADDR1') // 기본주소
    const addr2Data = localStorage.getItem('ADDR2') // 상세주소    

    const scmUsr = ref(
        {
            CVCOD: cvcodData,
            NAME: cvnamData,
            SANO: sanoData,
            OWNAM: ownamData,
            UPTAE: uptaeData,
            JONGK: jongkData,
            ZIPCD: zipcdData,
            ADDR1: addr1Data,
            ADDR2: addr2Data
            
        },
    )

    return { scmGroup, scmUsr }

})