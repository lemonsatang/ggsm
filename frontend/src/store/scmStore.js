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

    const scmUsr = ref([
        {
            NAME: '농심',
            SANO: '735-86-01813',
            PASSWORD: '12345678',
        },
    ])

    return { scmGroup, scmUsr }

})