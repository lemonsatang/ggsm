// SCM 주문서 데이터

import { defineStore } from "pinia"

export const useScmFwdStore = defineStore('fwd', () => {

    const scmFwdGroup = ref([
        // {
        //     CHK: false, //체크유무
        //     CATE: '이것', //구분
        //     WK_INFO: '힘든일', //작업사항
        //     ST_GRADE: '', //강종
        //     THICK: '두꺼움', //두께
        //     WIDTH: '', //폭
        //     LENGTH: '', //길이
        //     CUT: '', //CUT
        //     EQ_DIV: '', //등분
        //     WK_DETAIL: '', //작업사항 두번째, 엑셀에 작업사항이 두개라 일단 두개 다 표기
        //     REQ: '', //요구사항  
        //     DATE: '', //작성일
        //     IS_VIEW: 'false', //확인유무
        // },
        // {
        //     CHK: true, //체크유무
        //     CATE: '저것', //구분
        //     WK_INFO: '많은일', //작업사항
        //     ST_GRADE: '', //강종
        //     THICK: '너무나도두꺼운', //두께
        //     WIDTH: '', //폭
        //     LENGTH: '', //길이
        //     CUT: '', //CUT
        //     EQ_DIV: '', //등분
        //     WK_DETAIL: '', //작업사항 두번째, 엑셀에 작업사항이 두개라 일단 두개 다 표기
        //     REQ: '', //요구사항  
        //     DATE: '', //작성일
        //     IS_VIEW: 'false', //확인유무
        // },
        // {
        //     CHK: false, //체크유무
        //     CATE: '그것', //구분
        //     WK_INFO: '그런일', //작업사항
        //     ST_GRADE: '', //강종
        //     THICK: '얇음', //두께
        //     WIDTH: '', //폭
        //     LENGTH: '', //길이
        //     CUT: '', //CUT
        //     EQ_DIV: '', //등분
        //     WK_DETAIL: '', //작업사항 두번째, 엑셀에 작업사항이 두개라 일단 두개 다 표기
        //     REQ: '', //요구사항  
        //     DATE: '', //작성일
        //     IS_VIEW: 'false', //확인유무
        // },
        {
            CATE: '원소재',
            FWDDATE: '2023-08-10',//출고일자
            STNO: '50000',//전표번호
            ITEM: '좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '30 * 30',//치수
            QUANTITY: '20000',//수량
            WEIGHT: '85',//중량
            WARE: '',//창고
            PRODNO: 'TEST012345',//제품번호
            COILNO: 'COIL012345',//코일번호
            REQNO: '1234-5678-91011',//의뢰번호
            NOTE: '귀중',//비고
        },
        {
            CATE: '보관품',
            FWDDATE: '2023-08-11',//출고일자
            STNO: '50001',//전표번호
            ITEM: '더좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '35 * 35',//치수
            QUANTITY: '2000',//수량
            WEIGHT: '150',//중량
            WARE: '',//창고
            PRODNO: 'TEST067890',//제품번호
            COILNO: 'COIL067890',//코일번호
            REQNO: '2234-5678-91011',//의뢰번호
            NOTE: '무거움',//비고
        },
        {
            CATE: '원소재',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        //
        {
            CATE: '제품',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '보관품',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '원소재',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '제품',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '보관품',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '원소재',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '원소재',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '제품',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '보관품',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '원소재',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '제품',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '원소재',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '보관품',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '원소재',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        {
            CATE: '제품',
            FWDDATE: '2023-08-12',//출고일자
            STNO: '50002',//전표번호
            ITEM: '매우좋은품목',//품목
            STGRADE: '', //강종
            MATERIAL: '',//재질
            MOP: '',//도금량
            SIZE: '40 * 40',//치수
            QUANTITY: '1500',//수량
            WEIGHT: '350',//중량
            WARE: '',//창고
            PRODNO: 'TEST012346',//제품번호
            COILNO: 'COIL012346',//코일번호
            REQNO: '3234-5678-91011',//의뢰번호
            NOTE: '-',//비고
        },
        
    ])

    return { scmFwdGroup }

})