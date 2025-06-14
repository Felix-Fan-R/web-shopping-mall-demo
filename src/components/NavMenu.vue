<template>
  <div class="sidebar" :class="{ 'collapsed': isCollapsed, 'mobile': isMobile, 'dark': isDarkMode }">
    <!-- 侧边栏头部 -->
    <div class="sidebar-header">
      <div class="header-logo" @click="goHome">
        <div class="logo-icon">
          <el-icon><Monitor /></el-icon>
        </div>
        <h2 class="logo-text" v-show="!isCollapsed">企业管理系统</h2>
      </div>
      <div class="header-action">
        <el-icon class="action-icon" @click="toggleCollapse" v-if="!isMobile">
          <Fold v-if="!isCollapsed" />
          <Expand v-else />
        </el-icon>
        <el-icon class="action-icon" @click="closeMobileMenu" v-else>
          <Close />
        </el-icon>
      </div>
    </div>
    
    <!-- 用户信息 -->
    <div class="sidebar-user" v-if="!isCollapsed || isMobile">
      <div class="user-avatar">
        <el-avatar :size="48" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <div class="user-status online"></div>
      </div>
      <div class="user-info">
        <div class="user-name">管理员</div>
        <div class="user-role">超级管理员</div>
      </div>
      <el-dropdown trigger="click" class="user-dropdown">
        <el-icon class="dropdown-icon"><MoreFilled /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><User /></el-icon>个人资料
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Setting /></el-icon>账户设置
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><SwitchButton /></el-icon>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    
    <!-- 简洁用户头像 (折叠状态) -->
    <div class="sidebar-user-mini" v-if="isCollapsed && !isMobile">
      <el-avatar :size="36" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <div class="user-status online"></div>
    </div>
    
    <!-- 菜单搜索 -->
    <div class="sidebar-search" v-if="!isCollapsed || isMobile">
      <div class="search-input">
        <el-icon><Search /></el-icon>
        <input type="text" placeholder="搜索菜单..." />
      </div>
    </div>
    
    <!-- 导航菜单 -->
    <div class="sidebar-menu">
      <el-scrollbar>
        <div class="menu-section" v-if="!isCollapsed || isMobile">
          <div class="section-title">主导航</div>
        </div>
        
        <ul class="menu-list">
          <li class="menu-item" :class="{ 'active': activeMenu === '/' }" @click="navigateTo('/')">
            <div class="item-icon">
              <el-icon><HomeFilled /></el-icon>
            </div>
            <span class="item-title" v-if="!isCollapsed || isMobile">首页</span>
            <div class="active-indicator" v-if="activeMenu === '/'"></div>
          </li>
          
          <li class="menu-item" :class="{ 'active': activeMenu === '/dashboard' }" @click="navigateTo('/dashboard')">
            <div class="item-icon">
              <el-icon><DataBoard /></el-icon>
            </div>
            <span class="item-title" v-if="!isCollapsed || isMobile">仪表盘</span>
            <div class="active-indicator" v-if="activeMenu === '/dashboard'"></div>
          </li>
          
          <li class="menu-category" v-if="!isCollapsed || isMobile">
            <span class="category-title">业务管理</span>
          </li>
          
          <li class="menu-item" :class="{ 'active': activeMenu === '/user-management' }" @click="navigateTo('/user-management')">
            <div class="item-icon">
              <el-icon><User /></el-icon>
            </div>
            <span class="item-title" v-if="!isCollapsed || isMobile">用户管理</span>
            <div class="item-badge" v-if="!isCollapsed || isMobile">新</div>
            <div class="active-indicator" v-if="activeMenu === '/user-management'"></div>
          </li>
          
          <li class="menu-item" :class="{ 'active': activeMenu === '/services' }" @click="navigateTo('/services')">
            <div class="item-icon">
              <el-icon><Service /></el-icon>
            </div>
            <span class="item-title" v-if="!isCollapsed || isMobile">服务项目</span>
            <div class="active-indicator" v-if="activeMenu === '/services'"></div>
          </li>
          
          <li class="menu-item" :class="{ 'active': activeMenu === '/data-analysis' }" @click="navigateTo('/data-analysis')">
            <div class="item-icon">
              <el-icon><DataAnalysis /></el-icon>
            </div>
            <span class="item-title" v-if="!isCollapsed || isMobile">数据分析</span>
            <div class="active-indicator" v-if="activeMenu === '/data-analysis'"></div>
          </li>
          
          <li class="menu-category" v-if="!isCollapsed || isMobile">
            <span class="category-title">系统设置</span>
          </li>
          
          <li class="menu-item" :class="{ 'active': activeMenu === '/settings' }" @click="navigateTo('/settings')">
            <div class="item-icon">
              <el-icon><Setting /></el-icon>
            </div>
            <span class="item-title" v-if="!isCollapsed || isMobile">系统设置</span>
            <div class="active-indicator" v-if="activeMenu === '/settings'"></div>
          </li>
          
          <li class="menu-item" :class="{ 'active': activeMenu === '/about' }" @click="navigateTo('/about')">
            <div class="item-icon">
              <el-icon><InfoFilled /></el-icon>
            </div>
            <span class="item-title" v-if="!isCollapsed || isMobile">关于系统</span>
            <div class="active-indicator" v-if="activeMenu === '/about'"></div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    
    <!-- 侧边栏底部 -->
    <div class="sidebar-footer">
      <div class="footer-actions">
        <div class="action-button" @click="toggleTheme">
          <el-icon v-if="isDarkMode"><Sunny /></el-icon>
          <el-icon v-else><Moon /></el-icon>
          <span class="action-text" v-if="!isCollapsed || isMobile">{{ isDarkMode ? '浅色模式' : '深色模式' }}</span>
        </div>
        
        <div class="action-button" v-if="!isCollapsed || isMobile">
          <el-icon><Setting /></el-icon>
          <span class="action-text">设置</span>
        </div>
        
        <div class="action-button" v-if="!isCollapsed || isMobile">
          <el-icon><Help /></el-icon>
          <span class="action-text">帮助</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
    Close,
    DataAnalysis,
    DataBoard,
    Expand,
    Fold,
    Help,
    HomeFilled,
    InfoFilled,
    Monitor,
    Moon,
    MoreFilled,
    Search,
    Service,
    Setting,
    Sunny,
    SwitchButton,
    User
} from '@element-plus/icons-vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['toggle-collapse', 'close-mobile-menu']);

const route = useRoute();
const router = useRouter();
const isDarkMode = ref(false);

// 活动菜单
const activeMenu = computed(() => route.path);

// 本地折叠状态
const localCollapsed = ref(props.isCollapsed);

// 监听外部传入的折叠状态变化
watch(() => props.isCollapsed, (newVal) => {
  localCollapsed.value = newVal;
});

// 切换折叠状态
const toggleCollapse = () => {
  localCollapsed.value = !localCollapsed.value;
  emit('toggle-collapse', localCollapsed.value);
};

// 关闭移动端菜单
const closeMobileMenu = () => {
  emit('close-mobile-menu');
};

// 导航到指定路由
const navigateTo = (path) => {
  router.push(path);
  if (props.isMobile) {
    closeMobileMenu();
  }
};

// 返回首页
const goHome = () => {
  navigateTo('/');
};

// 切换主题
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', isDarkMode.value.toString());
  document.documentElement.classList.toggle('dark-theme', isDarkMode.value);
};

// 初始化主题状态
onMounted(() => {
  isDarkMode.value = localStorage.getItem('darkMode') === 'true';
  document.documentElement.classList.toggle('dark-theme', isDarkMode.value);
});
</script>

<style scoped>
.sidebar {
  height: 100%;
  width: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  border-right: 1px solid var(--bg-quaternary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
}

.sidebar.dark {
  background-color: #1a1a2e;
  border-color: rgba(255, 255, 255, 0.1);
}

/* 侧边栏头部 */
.sidebar-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--bg-quaternary);
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.sidebar.dark .sidebar-header {
  background-color: rgba(26, 26, 46, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.header-logo:hover {
  transform: translateY(-1px);
}

.logo-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  font-size: 18px;
}

.logo-text {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-action {
  display: flex;
  align-items: center;
}

.action-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.action-icon:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.sidebar.dark .action-icon {
  color: #b3b3b3;
}

.sidebar.dark .action-icon:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

/* 用户信息 */
.sidebar-user {
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--bg-quaternary);
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
}

.sidebar.dark .sidebar-user {
  background-color: rgba(26, 26, 46, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.user-avatar {
  position: relative;
}

.user-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--bg-primary);
}

.sidebar.dark .user-status {
  border-color: #1a1a2e;
}

.user-status.online {
  background-color: var(--success-color);
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar.dark .user-name {
  color: #ffffff;
}

.user-role {
  font-size: 12px;
  color: var(--text-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar.dark .user-role {
  color: #b3b3b3;
}

.user-dropdown {
  cursor: pointer;
}

.dropdown-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: var(--text-tertiary);
  transition: all 0.2s ease;
}

.dropdown-icon:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.sidebar.dark .dropdown-icon {
  color: #b3b3b3;
}

.sidebar.dark .dropdown-icon:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

/* 简洁用户头像 */
.sidebar-user-mini {
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--bg-quaternary);
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: relative;
}

.sidebar.dark .sidebar-user-mini {
  background-color: rgba(26, 26, 46, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

/* 菜单搜索 */
.sidebar-search {
  padding: 16px;
  border-bottom: 1px solid var(--bg-quaternary);
}

.sidebar.dark .sidebar-search {
  border-color: rgba(255, 255, 255, 0.1);
}

.search-input {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  height: 36px;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.sidebar.dark .search-input {
  background-color: rgba(255, 255, 255, 0.05);
}

.search-input:focus-within {
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
}

.search-input .el-icon {
  color: var(--text-tertiary);
  font-size: 16px;
}

.sidebar.dark .search-input .el-icon {
  color: #b3b3b3;
}

.search-input input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 14px;
}

.sidebar.dark .search-input input {
  color: #ffffff;
}

.search-input input::placeholder {
  color: var(--text-tertiary);
}

.sidebar.dark .search-input input::placeholder {
  color: #b3b3b3;
}

/* 导航菜单 */
.sidebar-menu {
  flex: 1;
  overflow: hidden;
}

.menu-section {
  padding: 16px 16px 8px;
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sidebar.dark .section-title {
  color: #b3b3b3;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-category {
  padding: 16px 16px 8px;
}

.category-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sidebar.dark .category-title {
  color: #b3b3b3;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  padding: 0 16px;
  margin: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background-color: var(--bg-tertiary);
}

.sidebar.dark .menu-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.menu-item.active {
  background-color: rgba(37, 99, 235, 0.1);
}

.sidebar.dark .menu-item.active {
  background-color: rgba(37, 99, 235, 0.2);
}

.item-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.sidebar.dark .item-icon {
  color: #b3b3b3;
}

.menu-item.active .item-icon {
  color: var(--primary-color);
}

.item-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.sidebar.dark .item-title {
  color: #b3b3b3;
}

.menu-item.active .item-title {
  color: var(--primary-color);
  font-weight: 500;
}

.item-badge {
  padding: 2px 6px;
  border-radius: 4px;
  background-color: var(--primary-color);
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.active-indicator {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 3px;
  height: 24px;
  background-color: var(--primary-color);
  border-radius: 3px 0 0 3px;
}

/* 侧边栏底部 */
.sidebar-footer {
  padding: 16px;
  border-top: 1px solid var(--bg-quaternary);
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.sidebar.dark .sidebar-footer {
  background-color: rgba(26, 26, 46, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.footer-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  background-color: var(--bg-tertiary);
}

.sidebar.dark .action-button:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.action-button .el-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.sidebar.dark .action-button .el-icon {
  color: #b3b3b3;
}

.action-text {
  font-size: 14px;
  color: var(--text-secondary);
}

.sidebar.dark .action-text {
  color: #b3b3b3;
}

/* 折叠状态 */
.sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
}

.sidebar.collapsed .menu-item {
  justify-content: center;
  padding: 0;
}

.sidebar.collapsed .item-icon {
  margin: 0;
}

.sidebar.collapsed .action-button {
  justify-content: center;
  padding: 8px 0;
}

/* 移动端样式 */
.sidebar.mobile {
  position: fixed;
  width: var(--sidebar-width);
  z-index: 1000;
  box-shadow: var(--shadow-lg);
}

/* 响应式布局 */
@media (max-width: 992px) {
  .sidebar {
    width: var(--sidebar-width);
  }

  .sidebar.collapsed {
    width: 0;
  }
}

/* 暗色主题适配 */
:deep(.el-dropdown-menu) {
  background-color: var(--bg-primary);
  border-color: var(--bg-quaternary);
}

:deep(.el-dropdown-menu__item) {
  color: var(--text-secondary);
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

:deep(.el-dropdown-menu__item i) {
  margin-right: 8px;
  color: var(--text-tertiary);
}

html.dark-theme :deep(.el-dropdown-menu) {
  background-color: #1a1a2e;
  border-color: rgba(255, 255, 255, 0.1);
}

html.dark-theme :deep(.el-dropdown-menu__item) {
  color: #b3b3b3;
}

html.dark-theme :deep(.el-dropdown-menu__item:hover) {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

html.dark-theme :deep(.el-dropdown-menu__item i) {
  color: #737373;
}
</style> 