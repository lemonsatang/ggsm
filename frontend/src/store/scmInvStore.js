// SCM 주문서 데이터

import { defineStore } from "pinia"

export const useScmInvStore = defineStore('inv', () => {

    const scmInvGroup = ref([
        {
            CATE: '원소재',
            ITEM: '좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '30 * 30',//치수
            QUANTITY: '20000',//수량
            WEIGHT: '85',//중량
            WARE: '',//창고
            RCVDATE: '2023-08-10',//입고일자
            PRODNO: 'TEST012345',//제품번호
            COILNO: 'COIL012345',//코일번호
            NOTE: '귀중',//비고            
        },
        {
            CATE: '제품',
            ITEM: '그러한품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '50 * 40',//치수
            QUANTITY: '1200',//수량
            WEIGHT: '35',//중량
            WARE: '',//창고
            RCVDATE: '2023-08-08',//입고일자
            PRODNO: 'TEST012584',//제품번호
            COILNO: 'COIL012445',//코일번호
            NOTE: '귀중',//비고            
        },
        {
            CATE: '보관품',
            ITEM: '덜좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 45',//치수
            QUANTITY: '120',//수량
            WEIGHT: '45',//중량
            WARE: '',//창고
            RCVDATE: '2023-08-07',//입고일자
            PRODNO: 'TEST059545',//제품번호
            COILNO: 'COIL045845',//코일번호
            NOTE: '상대적으로 덜 귀중',//비고            
        },
        {
            CATE: '원소재',
            ITEM: '이것은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '35 * 55',//치수
            QUANTITY: '1520',//수량
            WEIGHT: '70',//중량
            WARE: '',//창고
            RCVDATE: '2023-08-10',//입고일자
            PRODNO: 'TEST012448',//제품번호
            COILNO: 'COIL019854',//코일번호
            NOTE: '귀중',//비고            
        },
        {
            CATE: '제품',
            ITEM: '오늘의품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '55 * 75',//치수
            QUANTITY: '15000',//수량
            WEIGHT: '75',//중량
            WARE: '',//창고
            RCVDATE: '2023-08-05',//입고일자
            PRODNO: 'TEST058599',//제품번호
            COILNO: 'COIL045872',//코일번호
            NOTE: '귀중',//비고            
        },
        
    ])

    return { scmInvGroup }

})