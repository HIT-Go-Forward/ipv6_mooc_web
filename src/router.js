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
          component: ()=>import('./views/Course/CourseHomepage')
      },
      {
          path: '/course/:courseId/courseEdit',
          name: 'courseEdit',
          component: ()=>import('./views/Course/CourseEdit')
      },
      {
          path: '/course/:courseId/learn',
          name: 'courseEntity',
          component: ()=>import('./views/Course/CourseEntity'),
      }
  ]
})
