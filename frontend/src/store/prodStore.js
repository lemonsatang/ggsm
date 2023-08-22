//제품소개 데이터

import { defineStore } from 'pinia'

export const useProdStore = defineStore('prod', () => {


    const prodGroup = ref([
        {
            category: 'stiffener',
            index: '0',
            imgSrc: '/prod/prod_sample01.png',
            detailImg: '/prod/prod_detail_sample01.png',
            title: '스티프너 01',
            subTitle: 'Stiffener',
        },
        {
            category: 'stiffener',
            index: '1',
            imgSrc: '/prod/prod_sample01.png',
            detailImg: '/prod/prod_detail_sample01.png',
            title: '스티프너 02',
            subTitle: 'Stiffener',
        },
        {
            category: 'stiffener',
            index: '2',
            imgSrc: '/prod/prod_sample01.png',
            detailImg: '/prod/prod_detail_sample01.png',
            title: '스티프너 03',
            subTitle: 'Stiffener',
        },

        {
            category: 'doorImpactBeam',
            index: '3',
            imgSrc: '/prod/prod_sample02.png',
            detailImg: '/prod/prod_detail_sample02.png',
            title: '도어 임팩트 빔 01',
            subTitle: 'Door Impact Beam',
        },
        {
            category: 'doorImpactBeam',
            index: '4',
            imgSrc: '/prod/prod_sample02.png',
            detailImg: '/prod/prod_detail_sample02.png',
            title: '도어 임팩트 빔 02',
            subTitle: 'Door Impact Beam',
        },
  

        {
            category: 'bumperBackBeam',
            index: '5',
            imgSrc: '/prod/prod_sample03.png',
            detailImg: '/prod/prod_detail_sample03.png',
            title: '후방범퍼 빔 01',
            subTitle: 'Bumper Back Beam',
        },
        {
            category: 'bumperBackBeam',
            index: '6',
            imgSrc: '/prod/prod_sample03.png',
            detailImg: '/prod/prod_detail_sample03.png',
            title: '후방범퍼 빔 02',
            subTitle: 'Bumper Back Beam',
        },
        {
            category: 'bumperBackBeam',
            index: '7',
            imgSrc: '/prod/prod_sample03.png',
            detailImg: '/prod/prod_detail_sample03.png',
            title: '후방범퍼 빔 03',
            subTitle: 'Bumper Back Beam',
        },
    ])


    return { prodGroup }
})