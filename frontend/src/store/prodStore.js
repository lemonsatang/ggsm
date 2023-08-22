//제품소개 데이터

import { defineStore } from 'pinia'

export const useProdStore = defineStore('prod', () => {


    const prodGroup = ref([
        {
            category: 'CR',
            index: '0',
            imgSrc: '/prod/img02_01.png',
            detailImg: '/prod/img02_01.png',
            title: '자동차 냉연강판(CR, GA, HGA, PO) 제품',
            subTitle: 'CAR CR PRODUCT',
        },
        {
            category: 'CR',
            index: '1',
            imgSrc: '/prod/img02_02.png',
            detailImg: '/prod/img02_02.png',
            title: '건자재용(GI) 제품',
            subTitle: 'GI PRODUCT',
        },

        {
            category: 'HRC',
            index: '2',
            imgSrc: '/prod/img01_01.png',
            detailImg: '/prod/img01_01.png',
            title: '자동차 열연강판(SPHC계열)',
            subTitle: 'SPHC PRODUCT',
        },
        {
            category: 'HRC',
            index: '3',
            imgSrc: '/prod/img01_03.png',
            detailImg: '/prod/img01_03.png',
            title: '일반유통향(SS400계열) 제품',
            subTitle: 'COMMON SS400 PRODUCT',
        },
  

        {
            category: 'HRP',
            index: '4',
            imgSrc: '/prod/image03.png',
            detailImg: '/prod/image03.png',
            title: '조선용 PLATE',
            subTitle: 'SHIPBUILDING PLATE',
        },
        {
            category: 'HRP',
            index: '5',
            imgSrc: '/prod/image04.png',
            detailImg: '/prod/image04.png',
            title: '일반유통향(GS400계열) 제품',
            subTitle: 'COMMON SS400 PRODUCT',
        },

    ])


    return { prodGroup }
})