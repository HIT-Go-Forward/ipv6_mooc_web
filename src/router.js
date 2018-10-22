import Vue from 'vue'
import Router from 'vue-router'

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
          path: '/userHomepage',
          name: 'userHomepage',
          component: () => import('./views/UserHomepage')
      },
      {
          path: '/userSetting',
          name: 'userSetting',
          component: () => import('./views/UserSetting')
      },
      {
          path: '/course/courseEdit',
          name: 'courseEdit',
          component: ()=>import('./views/Course/CourseEdit')
      }
  ]
})
