import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue' // 최상위 App.vue 컴포넌트 지정
import router from './router/index.js'
import 'vue-global-api'
import Vue3Toastify from 'vue3-toastify'

import '/public/assets/scss/style.css'
import 'vue3-toastify/dist/index.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Vue3Toastify)
app.mount('#app') // 렌더링 시작점

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome 컴포넌트 */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* 원하는 아이콘을 개별적으로 import */
import { faXmark, faPlus, faPrint, faCheck, faUserGear, faLocationDot, faArrowRightFromBracket, faUser, faLock, faMagnifyingGlass, faAngleLeft, faAngleRight, faFloppyDisk, faEye, faEyeSlash, faPen, faHeading, faFileImport, faFolderOpen, faTrashCan, faLink, faExclamation, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { faImage, faFileExcel, faCircleXmark, faCircleDown, faShareFromSquare, faCalendar, faFile } from '@fortawesome/free-regular-svg-icons'




/* 위에서 import한 아이콘들을 Core library에 등록 */
library.add(faXmark, faPlus, faImage, faUpLong, faExclamation, faLink, faTrashCan, faFolderOpen, faFileImport, faHeading, faPen, faEyeSlash, faEye, faFloppyDisk, faCircleXmark, faCircleDown, faShareFromSquare, faLocationDot, faUser, faLock, faMagnifyingGlass, faCalendar, faFile, faAngleLeft, faAngleRight, faArrowRightFromBracket, faUserGear, faCheck, faFileExcel, faPrint )

/* font awesome 컴포넌트를 전역으로 등록 */
app.component('font-awesome-icon', FontAwesomeIcon)

// VCalendar

import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

// Use plugin defaults (optional)
app.use(setupCalendar, {})

// Use the components
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)
