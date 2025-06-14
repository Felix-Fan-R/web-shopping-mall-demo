<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppFooter from './components/AppFooter.vue';
import NavMenu from './components/NavMenu.vue';

// 侧边栏折叠状态
const isCollapsed = ref(false);
const isMobile = ref(window.innerWidth <= 992);
const showMobileMenu = ref(false);
const route = useRoute();
const router = useRouter();
const pageLoading = ref(true);
const pageTransition = ref(false);

// 切换侧边栏折叠状态
const toggleSidebar = (collapsed) => {
  isCollapsed.value = collapsed;
};

// 切换移动端菜单
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

// 监听窗口大小变化
const handleResize = () => {
  isMobile.value = window.innerWidth <= 992;
  if (!isMobile.value) {
    showMobileMenu.value = false;
  }
};

// 路由变化时的过渡效果
const handleRouteChange = async () => {
  pageTransition.value = true;
  await nextTick();
  pageTransition.value = false;
};

// 初始化页面主题
const initTheme = () => {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.documentElement.classList.add('dark-theme');
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  pageLoading.value = false;
  initTheme();
  
  // 添加路由监听
  router.beforeEach(() => {
    pageLoading.value = true;
  });
  
  router.afterEach(() => {
    setTimeout(() => {
      pageLoading.value = false;
    }, 100);
  });
});
</script>

<template>
  <div class="app-wrapper">
    <!-- 页面加载动画 -->
    <div class="page-loading" v-if="pageLoading">
      <div class="loading-spinner"></div>
    </div>
    
    <!-- 顶部导航栏 -->
    <header class="app-header">
      <div class="header-content">
        <!-- 移动端菜单按钮 -->
        <button v-if="isMobile" class="menu-toggle" @click="toggleMobileMenu">
          <span class="menu-icon"></span>
        </button>
        
        <div class="header-left">
          <div class="logo">
            <span class="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4L4 8l8 4 8-4-8-4zm0 8v8m-8-4v-8l8 4"></path>
              </svg>
            </span>
            <h1 class="logo-text">管理系统</h1>
          </div>
        </div>
        
        <div class="header-right">
          <div class="header-search">
            <input type="text" placeholder="搜索..." />
            <button class="search-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 17a7 7 0 100-14 7 7 0 000 14zm7 4l-4-4"></path>
              </svg>
            </button>
          </div>
          
          <div class="header-actions">
            <button class="action-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span class="badge">3</span>
            </button>
            
            <div class="user-dropdown">
              <div class="user-avatar">
                <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="用户头像" />
              </div>
              <span class="user-name">管理员</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    <div class="app-container">
      <!-- 侧边导航 -->
      <aside :class="['app-sidebar', { 'collapsed': isCollapsed, 'mobile': isMobile, 'show': showMobileMenu }]">
        <NavMenu 
          @toggle-collapse="toggleSidebar" 
          :is-collapsed="isCollapsed" 
          :is-mobile="isMobile"
          @close-mobile-menu="showMobileMenu = false"
        />
      </aside>
      
      <!-- 遮罩层 -->
      <div 
        v-if="isMobile && showMobileMenu" 
        class="sidebar-overlay" 
        @click="showMobileMenu = false"
      ></div>
      
      <!-- 主内容区 -->
      <main :class="['app-main', { 'sidebar-collapsed': isCollapsed }]">
        <div :class="['main-content', { 'page-transition': pageTransition }]">
          <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
              <keep-alive :include="['home', 'about', 'services']">
                <component :is="Component" class="route-component" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
        
        <!-- 页脚 -->
        <AppFooter />
      </main>
    </div>
  </div>
</template>

<style>
/* 重置样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.5;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  overflow: hidden;
}

#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

/* 应用外层容器 */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-secondary);
}

/* 顶部导航栏 */
.app-header {
  height: var(--header-height);
  width: 100%;
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-sm);
  z-index: 1000;
  position: sticky;
  top: 0;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--bg-quaternary);
}

.header-content {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing-6);
  max-width: 1920px;
  margin: 0 auto;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  transition: all var(--transition-normal);
}

.logo:hover {
  transform: translateY(-1px);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  width: 32px;
  height: 32px;
}

.logo-text {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-6);
}

.header-search {
  position: relative;
  width: 280px;
}

.header-search input {
  width: 100%;
  height: 40px;
  padding: 0 var(--spacing-4);
  padding-right: 40px;
  border: 1px solid var(--bg-quaternary);
  border-radius: var(--radius-full);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-size: var(--text-sm);
  transition: all var(--transition-fast);
}

.header-search input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  color: var(--text-tertiary);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.search-btn:hover {
  color: var(--primary-color);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.action-btn {
  position: relative;
  background: none;
  border: none;
  padding: var(--spacing-2);
  color: var(--text-tertiary);
  cursor: pointer;
  transition: all var(--transition-fast);
  border-radius: var(--radius-full);
}

.action-btn:hover {
  color: var(--primary-color);
  background-color: var(--bg-tertiary);
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: var(--radius-full);
  background-color: var(--danger-color);
  color: white;
  font-size: var(--text-xs);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.user-dropdown:hover {
  background-color: var(--bg-tertiary);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 2px solid var(--bg-quaternary);
  transition: all var(--transition-fast);
}

.user-dropdown:hover .user-avatar {
  border-color: var(--primary-color);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
}

/* 移动端菜单按钮 */
.menu-toggle {
  display: none;
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  padding: var(--spacing-2);
  margin-right: var(--spacing-2);
  border-radius: var(--radius-md);
  cursor: pointer;
  position: relative;
}

.menu-toggle:hover {
  background-color: var(--bg-tertiary);
}

.menu-icon {
  position: relative;
  display: inline-block;
  width: 22px;
  height: 2px;
  background-color: var(--text-primary);
  transition: all var(--transition-fast);
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 2px;
  background-color: var(--text-primary);
  transition: all var(--transition-fast);
}

.menu-icon::before {
  top: -6px;
}

.menu-icon::after {
  bottom: -6px;
}

.menu-toggle.active .menu-icon {
  background-color: transparent;
}

.menu-toggle.active .menu-icon::before {
  transform: rotate(45deg);
  top: 0;
}

.menu-toggle.active .menu-icon::after {
  transform: rotate(-45deg);
  bottom: 0;
}

/* 应用主容器 */
.app-container {
  display: flex;
  flex: 1;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  position: relative;
  overflow: hidden;
  width: 100%;
}

/* 侧边栏 */
.app-sidebar {
  width: var(--sidebar-width);
  height: 100%;
  position: sticky;
  top: var(--header-height);
  left: 0;
  z-index: 100;
  transition: all var(--transition-normal);
  flex-shrink: 0;
  background-color: var(--bg-primary);
  border-right: 1px solid var(--bg-quaternary);
}

.app-sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
}

.app-sidebar.mobile {
  position: fixed;
  top: var(--header-height);
  left: -100%;
  height: calc(100vh - var(--header-height));
  box-shadow: var(--shadow-lg);
}

.app-sidebar.mobile.show {
  left: 0;
}

/* 主内容区 */
.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: all var(--transition-normal);
  background-color: var(--bg-secondary);
}

.app-main.sidebar-collapsed {
  margin-left: 0;
}

.main-content {
  flex: 1;
  padding: var(--spacing-6);
  overflow-y: auto;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
}

/* 遮罩层 */
.sidebar-overlay {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
}

.sidebar-overlay.show {
  opacity: 1;
  visibility: visible;
}

/* 响应式布局 */
@media (max-width: 1280px) {
  .header-search {
    width: 240px;
  }
  
  .main-content {
    padding: var(--spacing-4);
  }
}

@media (max-width: 992px) {
  .app-main {
    margin-left: 0;
  }
  
  .app-main.sidebar-collapsed {
    margin-left: 0;
  }
  
  .header-search {
    display: none;
  }
  
  .user-name {
    display: none;
  }
  
  .app-sidebar {
    transform: translateX(-100%);
  }
  
  .app-sidebar.show {
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 var(--spacing-4);
  }
  
  .main-content {
    padding: var(--spacing-3);
  }
}

/* 页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 加载动画 */
.page-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--bg-tertiary);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 暗色主题 */
html.dark-theme {
  --bg-primary: #1a1a1a;
  --bg-secondary: #242424;
  --bg-tertiary: #2a2a2a;
  --bg-quaternary: #333333;
  
  --text-primary: #ffffff;
  --text-secondary: #e5e5e5;
  --text-tertiary: #a3a3a3;
  --text-quaternary: #737373;
}

html.dark-theme .app-header,
html.dark-theme .app-sidebar {
  background-color: var(--bg-primary);
  border-color: var(--bg-quaternary);
}

html.dark-theme .page-loading {
  background-color: rgba(0, 0, 0, 0.8);
}

html.dark-theme .sidebar-overlay {
  background-color: rgba(0, 0, 0, 0.7);
}

html.dark-theme .app-main {
  background-color: var(--bg-secondary);
}
</style>
