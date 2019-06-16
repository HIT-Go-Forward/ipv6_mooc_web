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
          component: () => import('./views/CourseSystem/Homepage'),
      },
      {
          path: '/course/classify/:type',
          name: 'courseClassify',
          component: () => import('./views/CourseSystem/CourseClassify'),
      },
      {
          path: '/user/Homepage',
          name: 'userHomepage',
          component: () => import('./views/UserSystem/UserHomepage'),
      },
      {
          path: '/user/setting',
          name: 'userSetting',
          component: () => import('./views/UserSystem/UserSetting'),
      },
      {
          path: '/course/:courseId/Homepage',
          name: 'courseHomepage',
          component: ()=>import('./views/CourseSystem/Course/CourseHomepage'),
      },
      {
          path: '/course/:courseId/addLesson',
          name: 'addLesson',
          component: ()=>import('./views/CourseSystem/Lesson/addLesson'),
      },
      {
          path: '/course/:courseId/courseEdit',
          name: 'courseEdit',
          component: ()=>import('./views/CourseSystem/Course/CourseEdit'),
      },
      {
          path:'/course/:courseId/:lessonId/lessonEdit',
          name: 'lessonEdit',
          component: ()=>import('./views/CourseSystem/Lesson/lessonEdit'),
      },
      {
          path: '/course/:courseId/learn',
          name: 'courseEntity',
          component: ()=>import('./views/CourseSystem/Course/CourseEntity'),
      },
      {
          path: '/lesson/:lessonId',
          name: 'lessonPlay',
          component: ()=>import('./views/CourseSystem/Lesson/LessonPlay'),
      },
      {
          path: '/blog/homepage',
          name: 'blogHomepage',
          component:()=>import('./views/BlogSystem/BlogHomepage'),
      },
      {
          path: '/blog/myblog',
          name: 'myBlog',
          component:()=>import('./views/BlogSystem/MyBlog'),
      },
      {
          path: '/blog/releaseblog',
          name: 'releaseBlog',
          component:()=>import('./views/BlogSystem/ReleaseBlog.vue'),
      },
      {
        path: '/blog/blogEdit/:blogId',
        name: 'editBlog',
        component:()=>import('./views/BlogSystem/ReleaseBlog.vue'),
      },
      {
          path:'/blog/:blogId',
          name: 'blogDetail',
          component:()=>import('./views/BlogSystem/BlogDetail.vue'),
      }
  ]
})
