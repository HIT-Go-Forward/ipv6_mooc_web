import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          name: 'Homepage',
          component: () => import('./views/Homepage/Homepage'),
          meta:{
              IsLogin:false
          }
      },
      {
          path: '/user/Homepage',
          name: 'userHomepage',
          component: () => import('./views/UserHomepage'),
          meta:{
              IsLogin:true
          }
      },
      {
          path: '/user/setting',
          name: 'userSetting',
          component: () => import('./views/UserSetting'),
          meta:{
              IsLogin:true
          }
      },
      {
          path: '/course/:courseId/Homepage',
          name: 'courseHomepage',
          component: ()=>import('./views/Course/CourseHomepage'),
          meta:{
              IsLogin:false
          }
      },
      {
          path: '/course/:courseId/addLesson',
          name: 'addLesson',
          component: ()=>import('./views/Course/Lesson/addLesson'),
          meta:{
              IsLogin:true
          }
      },
      {
          path: '/course/:courseId/courseEdit',
          name: 'courseEdit',
          component: ()=>import('./views/Course/CourseEdit'),
          meta:{
              IsLogin:true
          }
      },
      {
          path:'/course/:courseId/:lessonId/lessonEdit',
          name: 'lessonEdit',
          component: ()=>import('./views/Course/Lesson/lessonEdit'),
          meta:{
              IsLogin:true
          }
      },
      {
          path: '/course/:courseId/learn',
          name: 'courseEntity',
          component: ()=>import('./views/Course/CourseEntity'),
          meta:{
              IsLogin:true
          }
      },
      {
          path: '/lesson/:lessonId',
          name: 'lessonPlay',
          component: ()=>import('./views/Course/LessonPlay'),
          meta:{
              IsLogin:false
          }
      }
  ]
})
