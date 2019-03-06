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
      },
      {
          path: '/user/Homepage',
          name: 'userHomepage',
          component: () => import('./views/UserHomepage'),
      },
      {
          path: '/user/setting',
          name: 'userSetting',
          component: () => import('./views/UserSetting'),
      },
      {
          path: '/course/:courseId/Homepage',
          name: 'courseHomepage',
          component: ()=>import('./views/Course/CourseHomepage'),
      },
      {
          path: '/course/:courseId/addLesson',
          name: 'addLesson',
          component: ()=>import('./views/Course/Lesson/addLesson'),
      },
      {
          path: '/course/:courseId/courseEdit',
          name: 'courseEdit',
          component: ()=>import('./views/Course/CourseEdit'),
      },
      {
          path:'/course/:courseId/:lessonId/lessonEdit',
          name: 'lessonEdit',
          component: ()=>import('./views/Course/Lesson/lessonEdit'),
      },
      {
          path: '/course/:courseId/learn',
          name: 'courseEntity',
          component: ()=>import('./views/Course/CourseEntity'),
      },
      {
          path: '/lesson/:lessonId',
          name: 'lessonPlay',
          component: ()=>import('./views/Course/LessonPlay'),
      }
  ]
})
