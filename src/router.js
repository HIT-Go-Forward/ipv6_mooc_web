import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Homepage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          name: 'homepage',
          component: () => import('./views/Homepage')
      },
      {
          path: '/user/homepage',
          name: 'userHomepage',
          component: () => import('./views/UserHomepage')
      },
      {
          path: '/user/setting',
          name: 'userSetting',
          component: () => import('./views/UserSetting')
      },
      {
          path: '/course/:courseId/homepage',
          name: 'courseHomepage',
          component: ()=>import('./views/CourseHomepage')
      }
  ]
})
