import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createRouter, createWebHistory } from 'vue-router';

// 配置NProgress进度条
NProgress.configure({ 
  easing: 'ease', 
  speed: 500, 
  showSpinner: false, 
  trickleSpeed: 200, 
  minimum: 0.3
});

// Define route components
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
      requiresAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {
      title: '关于我们',
      requiresAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../views/Services.vue'),
    meta: {
      title: '服务项目',
      requiresAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue'),
    meta: {
      title: '联系我们',
      requiresAuth: false
    }
  },
  {
    path: '/user-management',
    name: 'user-management',
    component: () => import('../views/UserManagement.vue'),
    meta: {
      title: '用户管理',
      requiresAuth: true,
      permissions: ['admin', 'editor']
    }
  },
  {
    path: '/data-analysis',
    name: 'data-analysis',
    component: () => import('../views/DataAnalysis.vue'),
    meta: {
      title: '数据分析',
      requiresAuth: true,
      permissions: ['admin', 'editor']
    }
  },
  {
    // 404页面
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '页面不存在',
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 平滑滚动
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 开始进度条
  NProgress.start();
  
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 企业管理系统` : '企业管理系统';
  
  // 移除移动端菜单的蒙版
  const overlay = document.querySelector('.sidebar-overlay');
  if (overlay) {
    overlay.remove();
  }

  // 在实际应用中，这里应该添加权限验证逻辑
  const isAuthenticated = true; // 模拟已登录状态
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 需要认证但未登录，重定向到登录页
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

// 全局后置钩子
router.afterEach(() => {
  // 结束进度条
  NProgress.done();
});

export default router 