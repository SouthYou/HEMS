import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  }
]

/**
 * adminRoutes
 * 系统管理员特有权限
 */
export const adminRoutes = [
  {
    path: '/news',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'News',
        component: () => import('@/views/news/index'),
        meta: { title: '考试新闻管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Permission',
        component: () => import('@/views/permission/index'),
        meta: { title: '角色权限', icon: 'form' }
      }
    ]
  },

  {
    path: '/system-msg',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'SystemMessage',
        component: () => import('@/views/sysmsg/index'),
        meta: { title: '发布系统信息', icon: 'form' }
      }
    ]
  },

  {
    path: '/logging',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Logging',
        component: () => import('@/views/logging/index'),
        meta: { title: '日志管理', icon: 'form' }
      }
    ]
  }
]

/**
 * eduAdminRoutes
 * 教务特有权限
 */
export const eduAdminRoutes = [
  {
    path: '/enroll',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Enroll',
        component: () => import('@/views/enroll/index'),
        meta: { title: '报名管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/exam',
    component: Layout,
    meta: { title: '考试管理', icon: 'form' },
    children: [
      {
        path: 'site',
        name: 'Site',
        component: () => import('@/views/exam/site/index'),
        meta: { title: '考点管理', icon: 'form' }
      },
      {
        path: 'time',
        name: 'Time',
        component: () => import('@/views/exam/time/index'),
        meta: { title: '场次管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/score',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Score',
        component: () => import('@/views/score/index'),
        meta: { title: '成绩管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/exam-msg',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ExamMsg',
        component: () => import('@/views/exammsg/index'),
        meta: { title: '发布考试信息', icon: 'form' }
      }
    ]
  }
]

// 404 page must be placed at the end !!!
export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
