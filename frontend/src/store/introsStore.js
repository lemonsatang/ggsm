// 회사소개 메뉴 내 모든 서브메뉴 데이터

import { defineStore } from "pinia"

export const useIntroStore = defineStore('intro', () => {

    //인사말
    const grtGroup = ref([
        {
            img: '/ceo_sample.jpg',
            title: '성실, 근면, 창조',
            subT: "테스트용 테스트용 테스트용",
            children: [
                {texts: "테스트용 문구 작성"},
                {texts: "lorem"},
                {texts: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam atque delectus sint. Corrupti unde, aspernatur ducimus quod, tempore debitis, maiores excepturi dolore tenetur totam ex quia reprehenderit officia magni? Nemo."},
                {texts: "감사합니다."}
            ],
            position: '우리회사 (주) 대표이사',
            name: '아무개',
        },
    ])

    const hsGroup = ref([
        {
            years: '21',
            hists: [
                { text: '회사설립' }
            ]
        },
        {
            years: '22',
            hists: [
                { text: '산업통상자원부 지원 연구개발사업자 선정' },
                { text: '국내최초 `친환경 자원 순환형(재활용성) 드라이아이스 포장재` 개발 출시' },
                { text: '국내최초 녹색기술인증 `재생수지 사용 친환경 농업용 멀칭필름` 개발 출시' },
                { text: '국내최초 녹색기술인증 `재생수지 사용 친환경 아이스팩 포장재` 개발 출시' },
                { text: '국내최초 `마스크용 친환경 재활용성 코팅종이 포장재` 개발 출시' },
                { text: '환경부 지원 연구개발사업자 선정(폐비닐 재생이용 친환경 포장재 및 자동차부품용 소재 개발 및 사업화)' },
            ]
        },
        {
            years: '23',
            hists: [
                { text: '국내최초 녹색기술인증 `전자레인지 사용 가능 친환경 재활용성 컵라면 종이용기` 개발 출시' },
                { text: '농업진흥청 지원 연구개발사업자 선정(폐비닐 유래 재생수지 60wt% 사용 친환경 고강인성 멀칭필름 개발)' },
            ]
        },
    ])

    const certGroup = ref([
        {
            thumImg: '/img/iso_logo.png',
            title: '품질경영시스템 인증서',
            subTitle: 'ISO 9001:2015',
            detailImg: '/img/iso.jpg',
            detailView: false
            
        },
        {
            thumImg: '/img/logo_gs.jpg',
            title: '소프트웨어 품질인증서',
            subTitle: '스마트가드레일 시스템 모니터링',
            detailImg: '/img/gs.jpg',
            detailView: false
        },
    ])

    const pathGroup = ref([
        {
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.6097521447805!2d129.03095927715802!3d35.141410972766344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568ebb40a6cf031%3A0xf255b7423a881690!2zKOyjvCnshozrgpjrrLTsoJXrs7TquLDsiKA!5e0!3m2!1sko!2skr!4v1683783864134!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
            title: '본사',
            locate: '부산광역시 부산진구 가야동 467번지 산학협력관 331호',
            mail: 'support@pineit.co.kr',
            call: '051-714-0034',
        },
    ])


    return { grtGroup, hsGroup, certGroup, pathGroup }
})