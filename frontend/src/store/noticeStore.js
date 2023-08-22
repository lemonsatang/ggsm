// 공지사항 데이터

import { defineStore } from 'pinia'

export const useNoticeStore = defineStore('notice', () => {

    // 리스트
    const noticeGroup = ref([
        {
            index: 0,
            title: '01. Lorem ipsum dolor sit amet consectetur adipisicing elit',
            regMonth: '10',
            regDay: '11',
            year: '2022',
            modals: false,
            img: '',
            text: [
                { 
                    texts: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`
                },
            ]
        },
        {
            index: 1,
            title: '02. Lorem ipsum dolor sit amet consectetur adipisicing elit',
            regMonth: '12',
            regDay: '25',
            year: '2022',
            modals: false,
            img: '',
            text: [
                { 
                    texts: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, hic sit! Quos veritatis delectus similique exercitationem, atque quaerat fugiat accusamus quisquam, officiis perspiciatis voluptatem? Saepe dolorum blanditiis voluptatum ad deserunt.` 
                },
            ]
        },
        {
            index: 2,
            title: '03. Lorem ipsum dolor sit amet consectetur adipisicing elit',
            regMonth: '01',
            regDay: '01',
            year: '2023',
            modals: false,
            img: '/subp_back.jpg',
            text: [
                { 
                    texts: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, hic sit! Quos veritatis delectus similique exercitationem, atque quaerat fugiat accusamus quisquam, officiis perspiciatis voluptatem? Saepe dolorum blanditiis voluptatum ad deserunt.` 
                },
            ]
        },
        {
            index: 3,
            title: '04. Lorem ipsum dolor sit amet consectetur adipisicing elit',
            regMonth: '04',
            regDay: '01',
            year: '2023',
            modals: false,
            img: '/ceo_sample.jpg',
            text: [
                { 
                    texts: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, hic sit! Quos veritatis delectus similique exercitationem, atque quaerat fugiat accusamus quisquam, officiis perspiciatis voluptatem? Saepe dolorum blanditiis voluptatum ad deserunt.` 
                },
            ]
        },
    ])

    // 상세

    return { noticeGroup }

})