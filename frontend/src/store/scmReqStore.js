// SCM 주문서 데이터

import { defineStore } from "pinia"

export const useScmReqStore = defineStore('req', () => {

    const scmReqGroup = ref([
        {
            CHK: 'false', //체크유무
            CATE: '이것', //구분
            WK_INFO: '힘든일', //작업사항
            ST_GRADE: '', //강종
            THICK: '', //두께
            WIDTH: '', //폭
            LENGTH: '', //길이
            CUT: '', //CUT
            EQ_DIV: '', //등분
            WK_DETAIL: '', //작업사항 두번째, 엑셀에 작업사항이 두개라 일단 두개 다 표기
            REQ: '', //요구사항  
            DATE: '', //작성일
            IS_VIEW: 'false', //확인유무
        },
        {
            CHK: 'false', //체크유무
            CATE: '저것', //구분
            WK_INFO: '많은일', //작업사항
            ST_GRADE: '', //강종
            THICK: '', //두께
            WIDTH: '', //폭
            LENGTH: '', //길이
            CUT: '', //CUT
            EQ_DIV: '', //등분
            WK_DETAIL: '', //작업사항 두번째, 엑셀에 작업사항이 두개라 일단 두개 다 표기
            REQ: '', //요구사항  
            DATE: '', //작성일
            IS_VIEW: 'false', //확인유무
        },
        {
            CHK: 'false', //체크유무
            CATE: '그것', //구분
            WK_INFO: '그런일', //작업사항
            ST_GRADE: '', //강종
            THICK: '', //두께
            WIDTH: '', //폭
            LENGTH: '', //길이
            CUT: '', //CUT
            EQ_DIV: '', //등분
            WK_DETAIL: '', //작업사항 두번째, 엑셀에 작업사항이 두개라 일단 두개 다 표기
            REQ: '', //요구사항  
            DATE: '', //작성일
            IS_VIEW: 'false', //확인유무
        },
    ])

    return { scmReqGroup }

})