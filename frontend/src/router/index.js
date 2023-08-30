import { createRouter, createWebHistory, useRoute } from 'vue-router'
import Main from '@/pages/Main.vue'

const routes = [
  { 
    path: '/',
    name: 'Main',
    component: Main,
  },
  //회사소개
  {  
      path: '/greet',
      name: 'Greet',
      component: () => import( /* webpackChunkName: 'Greet' */ '@/pages/Greet.vue')
  },
  {  
    path: '/hist',
    name: 'History',
    component: () => import( /* webpackChunkName: 'History' */ '@/pages/History.vue')
  },
  {  
    path: '/cert',
    name: 'Certificate',
    component: () => import( /* webpackChunkName: 'Certificate' */ '@/pages/Certificate.vue')
  },
  {  
    path: '/path',
    name: 'Path',
    component: () => import( /* webpackChunkName: 'Path' */ '@/pages/Path.vue')
  },

  //제품소개
  {  
    path: '/prod/:category',
    name: 'Prod',
    component: () => import( /* webpackChunkName: 'Prod' */ '@/pages/Prod.vue')
  },

  //제품소개 카테고리 내 상세
  {  
    path: '/prodDetail/:category/:id',
    name: 'ProdDetail',
    component: () => import( /* webpackChunkName: 'ProdDetail' */ '@/pages/ProdDetail.vue')
  },


  //고객지원
  {  
    path: '/noti',
    name: 'Notice',
    component: () => import( /* webpackChunkName: 'Notice' */ '@/pages/Notice.vue')
  },
  {  
    path: '/notiWr',
    name: 'NoticeWr',
    component: () => import( /* webpackChunkName: 'NoticeWr' */ '@/pages/NoticeWr.vue')
  },
  {  
    path: '/data',
    name: 'DataRoom',
    component: () => import( /* webpackChunkName: 'DataRoom' */ '@/pages/DataRoom.vue')
  },
  {  
    path: '/dataWr',
    name: 'DataRoomWr',
    component: () => import( /* webpackChunkName: 'DataRoomWr' */ '@/pages/DataRoomWr.vue')
  },
  {  
    path: '/news',
    name: 'News',
    component: () => import( /* webpackChunkName: 'News' */ '@/pages/News.vue')
  },
  {  
    path: '/newsWr',
    name: 'NewsWr',
    component: () => import( /* webpackChunkName: 'NewsWr' */ '@/pages/NewsWr.vue')
  },
  {  
    path: '/cont',
    name: 'Contact',
    component: () => import( /* webpackChunkName: 'Contact' */ '@/pages/ContactUs.vue')
  },

  //SCM
  {  
    path: '/login',
    name: 'ScmLogin',
    component: () => import( /* webpackChunkName: 'ScmLogin' */ '@/scm/ScmLogin.vue'),

    // beforeEnter: fromUrlPass()
  },
  {  
    path: '/scm/:category',
    name: 'Scm',
    component: () => import( /* webpackChunkName: 'ScmMain' */ '@/scm/ScmMain.vue')
  },

  {  
    path: '/scm/fwd',
    name: 'ScmFwd',
    component: () => import( /* webpackChunkName: 'ScmFwd' */ '@/scm/ScmFwd.vue')
  },
  {  
    path: '/scm/invCs',
    name: 'ScmInvCs',
    component: () => import( /* webpackChunkName: 'ScmInvCs' */ '@/scm/ScmInvCs.vue')
  },
  {  
    path: '/scm/reqReg',
    name: 'ScmReqReg',
    component: () => import( /* webpackChunkName: 'ScmReqReg' */ '@/scm/ScmReqReg.vue')
  },

  {  
    path: '/scm/scmNoti/:id',
    name: 'ScmDetail',
    component: () => import( /* webpackChunkName: 'ScmDetail' */ '@/scm/ScmNotiDetail.vue')
  },
  { 
    path: '/scm/scmNotiWr',
    name: 'ScmNotiWr',
    component: () => import( /* webpackChunkName: 'ScmNotiWr' */ '@/scm/ScmNotiWr.vue')
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const route = useRoute()
  const loginUserData = localStorage.getItem('CVCOD')
  const loginUserName = localStorage.getItem('CVNAM')
  const userName = ref()

  console.log(loginUserName)

  if (to.path.includes('scm')) {
    if (loginUserData === null) {
      return 'login'
    }
  }

  if (to.name === 'ScmLogin') {
    if (loginUserData !== null) {
      return '/scm/fwd'
    }
  }
})

export default router



//webpackChunkName 방식으로 별도의 js로 분리하여 해당 페이지 방문할때 데이터를 불러옴