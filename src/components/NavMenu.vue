<template>
  <div class="sidebar-container" :class="{ 'collapsed': isCollapsed }">
    <!-- 侧边栏头部 -->
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <el-icon class="logo-icon"><Monitor /></el-icon>
        <span class="logo-text" v-show="!isCollapsed">导航菜单</span>
      </div>
      <el-icon 
        class="collapse-icon" 
        @click="toggleCollapse"
        v-if="!isMobile"
      >
        <Fold v-if="!isCollapsed" />
        <Expand v-else />
      </el-icon>
      <el-icon 
        class="close-icon" 
        @click="closeMobileMenu"
        v-else
      >
        <Close />
      </el-icon>
    </div>
    
    <!-- 用户信息 -->
    <div class="sidebar-user" v-show="!isCollapsed">
      <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <div class="user-info">
        <div class="user-name">管理员</div>
        <div class="user-role">超级管理员</div>
      </div>
    </div>
    
    <!-- 导航菜单 -->
    <el-menu
      :default-active="activeIndex"
      class="sidebar-menu"
      :collapse="isCollapsed"
      router
      :background-color="isDarkMode ? '#1a1a2e' : 'var(--bg-primary)'"
      :text-color="isDarkMode ? '#b3b3b3' : 'var(--text-secondary)'"
      :active-text-color="isDarkMode ? '#ffffff' : 'var(--primary-color)'"
    >
      <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        <template #title>
          <span>首页</span>
        </template>
      </el-menu-item>
      
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Grid /></el-icon>
          <span>业务管理</span>
        </template>
        <el-menu-item index="/services">
          <el-icon><Service /></el-icon>
          <span>服务项目</span>
        </el-menu-item>
        <el-menu-item index="/user-management">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
      </el-sub-menu>
      
      <el-menu-item index="/data-analysis">
        <el-icon><DataAnalysis /></el-icon>
        <template #title>
          <span>数据分析</span>
        </template>
      </el-menu-item>
      
      <el-menu-item index="/about">
        <el-icon><InfoFilled /></el-icon>
        <template #title>
          <span>关于我们</span>
        </template>
      </el-menu-item>
      
      <el-menu-item index="/contact">
        <el-icon><Phone /></el-icon>
        <template #title>
          <span>联系我们</span>
        </template>
      </el-menu-item>
    </el-menu>
    
    <!-- 主题切换 -->
    <div class="sidebar-footer">
      <div class="theme-switch" @click="toggleTheme">
        <el-icon v-if="isDarkMode"><Sunny /></el-icon>
        <el-icon v-else><Moon /></el-icon>
        <span v-show="!isCollapsed">{{ isDarkMode ? '浅色模式' : '深色模式' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
    Close,
    DataAnalysis,
    Expand,
    Fold,
    Grid,
    HomeFilled,
    InfoFilled,
    Monitor,
    Moon,
    Phone,
    Service,
    Sunny,
    User
} from '@element-plus/icons-vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

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
const activeIndex = computed(() => route.path);
const isDarkMode = ref(false);

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

// 切换主题
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  
  // 保存主题设置到本地存储
  localStorage.setItem('darkMode', isDarkMode.value.toString());
  
  // 修改全局主题
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-theme');
  } else {
    document.documentElement.classList.remove('dark-theme');
  }
};

// 初始化主题状态
const initTheme = () => {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  isDarkMode.value = darkMode;
};

// 组件挂载时检查主题
onMounted(() => {
  initTheme();
});
</script>

<style scoped>
.sidebar-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: v-bind("isDarkMode ? '#1a1a2e' : 'var(--bg-primary)'");
  color: v-bind("isDarkMode ? '#b3b3b3' : 'var(--text-secondary)'");
  transition: all var(--transition-normal);
}

/* 侧边栏头部 */
.sidebar-header {
  height: var(--header-height);
  padding: 0 var(--spacing-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'var(--bg-quaternary)'");
}

.sidebar-logo {
  display: flex;
  align-items: center;
  color: v-bind("isDarkMode ? '#ffffff' : 'var(--text-primary)'");
  font-weight: 600;
  font-size: var(--text-lg);
  overflow: hidden;
}

.logo-icon {
  font-size: 22px;
  min-width: 22px;
  width: 22px;
  height: 22px;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  margin-left: var(--spacing-3);
  white-space: nowrap;
}

.collapse-icon, .close-icon {
  cursor: pointer;
  font-size: 20px;
  color: v-bind("isDarkMode ? '#b3b3b3' : 'var(--text-tertiary)'");
  transition: all var(--transition-fast);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
}

.collapse-icon:hover, .close-icon:hover {
  color: v-bind("isDarkMode ? '#ffffff' : 'var(--text-primary)'");
  background-color: v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'var(--bg-tertiary)'");
}

/* 用户信息区 */
.sidebar-user {
  padding: var(--spacing-5) var(--spacing-4);
  display: flex;
  align-items: center;
  border-bottom: 1px solid v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'var(--bg-quaternary)'");
}

.user-info {
  margin-left: var(--spacing-3);
  overflow: hidden;
}

.user-name {
  color: v-bind("isDarkMode ? '#ffffff' : 'var(--text-primary)'");
  font-size: var(--text-base);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  color: v-bind("isDarkMode ? '#b3b3b3' : 'var(--text-tertiary)'");
  font-size: var(--text-xs);
  margin-top: var(--spacing-1);
}

/* 侧边栏菜单 */
.sidebar-menu {
  flex: 1;
  border-right: none;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar-menu::-webkit-scrollbar {
  width: 6px;
}

.sidebar-menu::-webkit-scrollbar-thumb {
  background: v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-quaternary)'");
  border-radius: var(--radius-full);
}

.sidebar-menu::-webkit-scrollbar-thumb:hover {
  background: v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'var(--text-quaternary)'");
}

/* 侧边栏底部 */
.sidebar-footer {
  padding: var(--spacing-4);
  border-top: 1px solid v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'var(--bg-quaternary)'");
}

.theme-switch {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: v-bind("isDarkMode ? '#b3b3b3' : 'var(--text-tertiary)'");
}

.theme-switch:hover {
  background-color: v-bind("isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'var(--bg-tertiary)'");
  color: v-bind("isDarkMode ? '#ffffff' : 'var(--text-primary)'");
}

.theme-switch .el-icon {
  font-size: 18px;
}

/* 响应式布局 */
@media (max-width: 992px) {
  .sidebar-container {
    box-shadow: var(--shadow-lg);
  }
}

@media (max-width: 768px) {
  .sidebar-header {
    height: 56px;
  }
}

@media (max-width: 480px) {
  .sidebar-user {
    padding: var(--spacing-4) var(--spacing-3);
  }
  
  .sidebar-footer {
    padding: var(--spacing-3);
  }
}

/* 折叠时的导航栏标题样式 */
.sidebar-container.collapsed .sidebar-logo {
  justify-content: center;
}

/* 确保菜单图标在折叠状态下正确显示 */
:deep(.el-menu--collapse) .el-menu-item .el-icon,
:deep(.el-menu--collapse) .el-sub-menu .el-icon {
  margin: 0;
  width: 24px;
  text-align: center;
}

:deep(.el-menu--collapse) {
  width: 64px;
}

/* 修复折叠导航栏图标显示问题 */
:deep(.el-menu--collapse) .el-sub-menu__title span,
:deep(.el-menu--collapse) .el-menu-item span {
  display: none;
}

:deep(.el-menu--collapse) .el-sub-menu__icon-arrow {
  display: none;
}

/* 确保折叠菜单项高度和间距正确 */
:deep(.el-menu--collapse) .el-menu-item,
:deep(.el-menu--collapse) .el-sub-menu__title {
  height: 50px;
  line-height: 50px;
  padding: 0 !important;
  text-align: center;
}

:deep(.el-menu--collapse) .el-icon {
  margin: 0 auto;
}

/* 调整折叠图标的位置和显示 */
.sidebar-container.collapsed .collapse-icon {
  justify-content: center;
  margin-right: 0;
}
</style> 