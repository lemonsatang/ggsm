//회원 로그인 데이터

import { defineStore } from "pinia"

export const loginDataStore = defineStore('userst', () => {

    const userGroup = ref([
        {
            'CVCOD': '',
            'CVNAM': ''
        }
    ])

    return { userGroup }
})