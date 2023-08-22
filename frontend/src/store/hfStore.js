// header + footer 데이터

import { defineStore } from "pinia"

export const usehfStore = defineStore('hdFt', () => {

    //Header

    const navText = ref([
        {
            navSubTexts: 'SUBTITLE',
            navTexts: '금강에스엠 DEFAULT',
        }
    ])

    const navGroup = ref([
        {
            navId: 0,
            linkTo: '',
            title: '회사소개',
            subT: 'COMPANY',
            childrens: [
                { subTo: '/greet', subTitle: '인사말' },
                { subTo: '/hist', subTitle: '연혁' },
                { subTo: '/cert', subTitle: '인증서' },
                { subTo: '/path', subTitle: '오시는길' },
            ]
        },
        {
            navId: 1,
            linkTo: '',
            title: '제품소개',
            subT: 'BUSINESS',
            childrens: [
                { subTo: '/prod', subTitle: '스티프너', category: 'stiffener' },
                { subTo: '/prod', subTitle: '도어 임팩트 빔', category: 'doorImpactBeam' },
                { subTo: '/prod', subTitle: '후방범퍼 빔', category: 'bumperBackBeam' },
            ]
        },
        {
            navId: 2,
            linkTo: '',
            title: '고객지원',
            subT: 'CUSTOMER',
            childrens: [
                { subTo: '/noti', subTitle: '공지사항' },
                { subTo: '/data', subTitle: '자료실' },
                { subTo: '/news', subTitle: '뉴스' },
                { subTo: '/cont', subTitle: '문의하기' },
            ]
        },
        {
            navId: 3,
            linkTo: '',
            title: 'SCM',
            subT: 'SCM SOLUTION',
            childrens: [
                { subTo: '/login', subTitle: 'SCM', category: 'loginMain' },
            ]
        },
    ])

    //Footer
    const ftGroup = ref([
        {
            ftLogo : '/CI_header_white.svg',
            compname: '(주)금강에스엠',
            address: '울산광역시 북구 송도길 60(효문동)',
            tel: '052.289.5426',
            fax: '052.289.5429',
            cpr: 'copyright ⓒ 2023 pineit all rights reserved.',
        }
    ])
    

    return { ftGroup, navGroup, navText }
})