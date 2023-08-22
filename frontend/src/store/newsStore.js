//뉴스 데이터

import { defineStore } from 'pinia'

export const useNewsStore = defineStore('news', () => {

    const newsGroup = ref([
        {
            imgSrc: '/news/news_sample.jpg',
            reporter: 'abc통신',
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            linkTo: 'http://www.pineit.co.kr',
            subTexts: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et reiciendis voluptatibus neque molestias esse perspiciatis nihil corporis dolorem dolore. Minus amet nulla ducimus quaerat tempora? Ullam, quam iure. Delectus, repudiandae.`,
        },
        {
            imgSrc: '/news/news_sample.jpg',
            reporter: 'abc통신',
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            linkTo: 'http://www.pineit.co.kr',
            subTexts: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Et reiciendis voluptatibus neque molestias esse perspiciatis nihil corporis dolorem dolore. Minus amet nulla ducimus quaerat tempora? Ullam, quam iure. Delectus, repudiandae.`,
        },
    ])

    return { newsGroup }
})