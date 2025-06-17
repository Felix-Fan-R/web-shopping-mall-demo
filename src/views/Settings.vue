<template>
  <div class="settings-page">
    <div class="settings-header">
      <h1 class="page-title">系统设置</h1>
      <p class="page-desc">配置和管理系统的各项参数和功能</p>
    </div>
    
    <div class="settings-container">
      <!-- 左侧导航 -->
      <div class="settings-nav">
        <el-menu
          :default-active="activeMenu"
          class="settings-menu"
          @select="handleMenuSelect"
        >
          <el-menu-item index="general">
            <el-icon><Setting /></el-icon>
            <span>基本设置</span>
          </el-menu-item>
          <el-menu-item index="appearance">
            <el-icon><Brush /></el-icon>
            <span>外观与主题</span>
          </el-menu-item>
          <el-menu-item index="security">
            <el-icon><Lock /></el-icon>
            <span>安全与隐私</span>
          </el-menu-item>
          <el-menu-item index="notifications">
            <el-icon><Bell /></el-icon>
            <span>通知设置</span>
          </el-menu-item>
          <el-menu-item index="users">
            <el-icon><User /></el-icon>
            <span>用户与权限</span>
          </el-menu-item>
          <el-menu-item index="integrations">
            <el-icon><Connection /></el-icon>
            <span>集成与API</span>
          </el-menu-item>
          <el-menu-item index="backup">
            <el-icon><Upload /></el-icon>
            <span>备份与恢复</span>
          </el-menu-item>
          <el-menu-item index="logs">
            <el-icon><Document /></el-icon>
            <span>系统日志</span>
          </el-menu-item>
          <el-menu-item index="about">
            <el-icon><InfoFilled /></el-icon>
            <span>关于系统</span>
          </el-menu-item>
        </el-menu>
      </div>
      
      <!-- 右侧内容 -->
      <div class="settings-content">
        <!-- 基本设置 -->
        <div v-show="activeMenu === 'general'" class="settings-section">
          <h2 class="section-title">基本设置</h2>
          
          <el-form label-position="top" :model="generalSettings" class="settings-form">
            <el-form-item label="系统名称">
              <el-input v-model="generalSettings.systemName" placeholder="请输入系统名称" />
            </el-form-item>
            
            <el-form-item label="系统描述">
              <el-input v-model="generalSettings.systemDescription" type="textarea" :rows="3" placeholder="请输入系统描述" />
            </el-form-item>
            
            <el-form-item label="管理员邮箱">
              <el-input v-model="generalSettings.adminEmail" placeholder="请输入管理员邮箱" />
            </el-form-item>
            
            <el-form-item label="时区设置">
              <el-select v-model="generalSettings.timezone" placeholder="请选择时区" style="width: 100%;">
                <el-option label="(GMT+08:00) 北京时间" value="Asia/Shanghai" />
                <el-option label="(GMT+00:00) 格林威治标准时间" value="GMT" />
                <el-option label="(GMT-08:00) 太平洋标准时间" value="America/Los_Angeles" />
                <el-option label="(GMT-05:00) 东部标准时间" value="America/New_York" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="日期格式">
              <el-select v-model="generalSettings.dateFormat" placeholder="请选择日期格式" style="width: 100%;">
                <el-option label="YYYY-MM-DD" value="YYYY-MM-DD" />
                <el-option label="MM/DD/YYYY" value="MM/DD/YYYY" />
                <el-option label="DD/MM/YYYY" value="DD/MM/YYYY" />
                <el-option label="YYYY年MM月DD日" value="YYYY年MM月DD日" />
              </el-select>
            </el-form-item>
            
            <el-form-item label="语言设置">
              <el-select v-model="generalSettings.language" placeholder="请选择语言" style="width: 100%;">
                <el-option label="简体中文" value="zh-CN" />
                <el-option label="English" value="en-US" />
                <el-option label="日本語" value="ja-JP" />
                <el-option label="한국어" value="ko-KR" />
              </el-select>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary">保存设置</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <!-- 外观与主题 -->
        <div v-show="activeMenu === 'appearance'" class="settings-section">
          <h2 class="section-title">外观与主题</h2>
          
          <div class="theme-settings">
            <h3 class="subsection-title">主题模式</h3>
            <div class="theme-mode-selector">
              <div 
                class="theme-mode-item" 
                :class="{ active: appearanceSettings.themeMode === 'light' }"
                @click="appearanceSettings.themeMode = 'light'"
              >
                <div class="theme-preview light-theme">
                  <div class="preview-header"></div>
                  <div class="preview-sidebar"></div>
                  <div class="preview-content"></div>
                </div>
                <div class="theme-name">浅色模式</div>
              </div>
              
              <div 
                class="theme-mode-item" 
                :class="{ active: appearanceSettings.themeMode === 'dark' }"
                @click="appearanceSettings.themeMode = 'dark'"
              >
                <div class="theme-preview dark-theme">
                  <div class="preview-header"></div>
                  <div class="preview-sidebar"></div>
                  <div class="preview-content"></div>
                </div>
                <div class="theme-name">深色模式</div>
              </div>
              
              <div 
                class="theme-mode-item" 
                :class="{ active: appearanceSettings.themeMode === 'auto' }"
                @click="appearanceSettings.themeMode = 'auto'"
              >
                <div class="theme-preview auto-theme">
                  <div class="preview-header"></div>
                  <div class="preview-sidebar"></div>
                  <div class="preview-content"></div>
                </div>
                <div class="theme-name">跟随系统</div>
              </div>
            </div>
            
            <h3 class="subsection-title">主题颜色</h3>
            <div class="theme-color-selector">
              <div 
                v-for="(color, index) in themeColors" 
                :key="index"
                class="color-item"
                :class="{ active: appearanceSettings.primaryColor === color.value }"
                :style="{ backgroundColor: color.value }"
                @click="appearanceSettings.primaryColor = color.value"
              ></div>
              
              <div class="color-item custom">
                <el-color-picker v-model="appearanceSettings.customColor" size="small" />
              </div>
            </div>
            
            <h3 class="subsection-title">布局设置</h3>
            <el-form label-position="top" :model="appearanceSettings" class="settings-form">
              <el-form-item label="导航栏模式">
                <el-radio-group v-model="appearanceSettings.navMode">
                  <el-radio label="side">侧边导航</el-radio>
                  <el-radio label="top">顶部导航</el-radio>
                  <el-radio label="mix">混合导航</el-radio>
                </el-radio-group>
              </el-form-item>
              
              <el-form-item label="内容区域宽度">
                <el-radio-group v-model="appearanceSettings.contentWidth">
                  <el-radio label="fixed">固定宽度</el-radio>
                  <el-radio label="fluid">流式布局</el-radio>
                </el-radio-group>
              </el-form-item>
              
              <el-form-item label="固定头部">
                <el-switch v-model="appearanceSettings.fixedHeader" />
              </el-form-item>
              
              <el-form-item label="固定侧边栏">
                <el-switch v-model="appearanceSettings.fixedSidebar" />
              </el-form-item>
              
              <el-form-item label="多标签页模式">
                <el-switch v-model="appearanceSettings.tabsMode" />
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary">保存设置</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        
        <!-- 安全与隐私 -->
        <div v-show="activeMenu === 'security'" class="settings-section">
          <h2 class="section-title">安全与隐私</h2>
          
          <el-form label-position="top" :model="securitySettings" class="settings-form">
            <h3 class="subsection-title">密码策略</h3>
            
            <el-form-item label="最小密码长度">
              <el-input-number v-model="securitySettings.minPasswordLength" :min="6" :max="32" />
            </el-form-item>
            
            <el-form-item label="密码复杂度要求">
              <el-checkbox-group v-model="securitySettings.passwordRequirements">
                <el-checkbox label="uppercase">必须包含大写字母</el-checkbox>
                <el-checkbox label="lowercase">必须包含小写字母</el-checkbox>
                <el-checkbox label="numbers">必须包含数字</el-checkbox>
                <el-checkbox label="symbols">必须包含特殊字符</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            
            <el-form-item label="密码过期时间">
              <el-select v-model="securitySettings.passwordExpiration" placeholder="请选择密码过期时间" style="width: 100%;">
                <el-option label="永不过期" value="never" />
                <el-option label="30天" value="30days" />
                <el-option label="60天" value="60days" />
                <el-option label="90天" value="90days" />
                <el-option label="180天" value="180days" />
              </el-select>
            </el-form-item>
            
            <h3 class="subsection-title">登录安全</h3>
            
            <el-form-item label="启用两步验证">
              <el-switch v-model="securitySettings.twoFactorAuth" />
            </el-form-item>
            
            <el-form-item label="登录失败锁定">
              <div class="inline-form-item">
                <span>连续</span>
                <el-input-number v-model="securitySettings.loginAttempts" :min="3" :max="10" />
                <span>次失败后锁定账户</span>
                <el-input-number v-model="securitySettings.lockoutTime" :min="5" :max="60" />
                <span>分钟</span>
              </div>
            </el-form-item>
            
            <el-form-item label="记住登录状态">
              <el-select v-model="securitySettings.rememberLogin" placeholder="请选择记住登录时长" style="width: 100%;">
                <el-option label="不记住" value="never" />
                <el-option label="1天" value="1day" />
                <el-option label="7天" value="7days" />
                <el-option label="30天" value="30days" />
                <el-option label="永久" value="forever" />
              </el-select>
            </el-form-item>
            
            <h3 class="subsection-title">会话设置</h3>
            
            <el-form-item label="会话超时时间">
              <el-input-number v-model="securitySettings.sessionTimeout" :min="5" :max="1440" />
              <span class="form-text">分钟后自动退出登录</span>
            </el-form-item>
            
            <el-form-item label="强制单一会话">
              <el-switch v-model="securitySettings.singleSession" />
              <span class="form-text">启用后同一账户只能在一处登录</span>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary">保存设置</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <!-- 其他设置页面 -->
        <div v-show="activeMenu === 'notifications'" class="settings-section">
          <h2 class="section-title">通知设置</h2>
          <div class="placeholder-content">通知设置内容区域</div>
        </div>
        
        <div v-show="activeMenu === 'users'" class="settings-section">
          <h2 class="section-title">用户与权限</h2>
          <div class="placeholder-content">用户与权限设置内容区域</div>
        </div>
        
        <div v-show="activeMenu === 'integrations'" class="settings-section">
          <h2 class="section-title">集成与API</h2>
          <div class="placeholder-content">集成与API设置内容区域</div>
        </div>
        
        <div v-show="activeMenu === 'backup'" class="settings-section">
          <h2 class="section-title">备份与恢复</h2>
          <div class="placeholder-content">备份与恢复设置内容区域</div>
        </div>
        
        <div v-show="activeMenu === 'logs'" class="settings-section">
          <h2 class="section-title">系统日志</h2>
          <div class="placeholder-content">系统日志内容区域</div>
        </div>
        
        <div v-show="activeMenu === 'about'" class="settings-section">
          <h2 class="section-title">关于系统</h2>
          
          <div class="about-system">
            <div class="system-logo">
              <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/pie-simple.webp" alt="系统Logo" />
            </div>
            
            <h3 class="system-name">企业管理系统</h3>
            <div class="system-version">版本: v1.2.0</div>
            
            <div class="system-info">
              <div class="info-item">
                <div class="info-label">构建日期:</div>
                <div class="info-value">2023-06-15</div>
              </div>
              <div class="info-item">
                <div class="info-label">许可证:</div>
                <div class="info-value">商业授权</div>
              </div>
              <div class="info-item">
                <div class="info-label">技术支持:</div>
                <div class="info-value">support@example.com</div>
              </div>
            </div>
            
            <div class="system-actions">
              <el-button type="primary">检查更新</el-button>
              <el-button>查看文档</el-button>
              <el-button>联系支持</el-button>
            </div>
            
            <div class="system-copyright">
              © 2023 企业管理系统. 保留所有权利.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
    Bell,
    Brush,
    Connection,
    Document,
    InfoFilled,
    Lock,
    Setting,
    Upload,
    User
} from '@element-plus/icons-vue';
import { ref } from 'vue';

// 当前活动菜单
const activeMenu = ref('general');

// 处理菜单选择
const handleMenuSelect = (index) => {
  activeMenu.value = index;
};

// 基本设置表单
const generalSettings = ref({
  systemName: '企业管理系统',
  systemDescription: '现代化的企业级管理系统，提供全面的业务管理与数据分析功能。',
  adminEmail: 'admin@example.com',
  timezone: 'Asia/Shanghai',
  dateFormat: 'YYYY-MM-DD',
  language: 'zh-CN'
});

// 外观设置表单
const appearanceSettings = ref({
  themeMode: 'light',
  primaryColor: '#2563eb',
  customColor: '#2563eb',
  navMode: 'side',
  contentWidth: 'fixed',
  fixedHeader: true,
  fixedSidebar: true,
  tabsMode: true
});

// 主题颜色选项
const themeColors = [
  { name: '默认蓝', value: '#2563eb' },
  { name: '科技蓝', value: '#0ea5e9' },
  { name: '活力橙', value: '#f59e0b' },
  { name: '清新绿', value: '#10b981' },
  { name: '典雅紫', value: '#8b5cf6' },
  { name: '活力红', value: '#ef4444' }
];

// 安全设置表单
const securitySettings = ref({
  minPasswordLength: 8,
  passwordRequirements: ['uppercase', 'lowercase', 'numbers'],
  passwordExpiration: '90days',
  twoFactorAuth: false,
  loginAttempts: 5,
  lockoutTime: 30,
  rememberLogin: '7days',
  sessionTimeout: 60,
  singleSession: false
});
</script>

<style scoped>
.settings-page {
  padding-bottom: 24px;
}

.settings-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.page-desc {
  font-size: var(--text-base);
  color: var(--text-tertiary);
}

.settings-container {
  display: flex;
  gap: 24px;
  background-color: var(--bg-primary);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  min-height: 600px;
}

/* 左侧导航 */
.settings-nav {
  width: 240px;
  flex-shrink: 0;
  border-right: 1px solid var(--bg-quaternary);
}

.settings-menu {
  border-right: none;
}

/* 右侧内容 */
.settings-content {
  flex: 1;
  padding: 24px;
  min-width: 0;
}

.settings-section {
  max-width: 800px;
}

.section-title {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.subsection-title {
  font-size: var(--text-lg);
  font-weight: 500;
  margin-top: 32px;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.settings-form {
  max-width: 600px;
}

.form-text {
  margin-left: 8px;
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.inline-form-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 主题设置样式 */
.theme-mode-selector {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.theme-mode-item {
  cursor: pointer;
  border: 2px solid var(--bg-quaternary);
  border-radius: 8px;
  padding: 8px;
  transition: all var(--transition-fast);
}

.theme-mode-item.active {
  border-color: var(--primary-color);
}

.theme-preview {
  width: 160px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  margin-bottom: 8px;
}

.theme-preview.light-theme {
  background-color: #f9fafb;
}

.theme-preview.dark-theme {
  background-color: #1a1a2e;
}

.theme-preview.auto-theme {
  background: linear-gradient(to right, #f9fafb 50%, #1a1a2e 50%);
}

.preview-header {
  height: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.theme-preview.dark-theme .preview-header {
  background-color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.theme-preview.auto-theme .preview-header {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0.8) 50%);
  border-bottom: none;
}

.preview-sidebar {
  position: absolute;
  left: 0;
  top: 16px;
  bottom: 0;
  width: 30px;
  background-color: rgba(255, 255, 255, 0.95);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.theme-preview.dark-theme .preview-sidebar {
  background-color: rgba(0, 0, 0, 0.9);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.theme-preview.auto-theme .preview-sidebar {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.95) 50%, rgba(0, 0, 0, 0.9) 50%);
  border-right: none;
}

.preview-content {
  position: absolute;
  left: 30px;
  top: 16px;
  right: 0;
  bottom: 0;
}

.theme-name {
  text-align: center;
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.theme-color-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.color-item {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid var(--bg-quaternary);
  transition: all var(--transition-fast);
}

.color-item.active {
  transform: scale(1.1);
  border-color: var(--text-primary);
}

.color-item.custom {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-tertiary);
}

/* 关于系统样式 */
.about-system {
  text-align: center;
  padding: 32px 0;
}

.system-logo {
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.system-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.system-name {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.system-version {
  font-size: var(--text-base);
  color: var(--text-tertiary);
  margin-bottom: 24px;
}

.system-info {
  max-width: 400px;
  margin: 0 auto 32px;
  text-align: left;
}

.info-item {
  display: flex;
  margin-bottom: 12px;
}

.info-label {
  width: 100px;
  font-weight: 500;
  color: var(--text-secondary);
}

.info-value {
  flex: 1;
  color: var(--text-primary);
}

.system-actions {
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  gap: 16px;
}

.system-copyright {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.placeholder-content {
  padding: 32px;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  text-align: center;
  color: var(--text-tertiary);
  font-size: var(--text-lg);
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .settings-container {
    flex-direction: column;
  }
  
  .settings-nav {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--bg-quaternary);
  }
  
  .settings-menu {
    display: flex;
    overflow-x: auto;
    padding-bottom: 8px;
  }
  
  .settings-menu :deep(.el-menu-item) {
    border-bottom: none;
    margin-right: 8px;
  }
}

@media (max-width: 768px) {
  .theme-mode-selector {
    flex-direction: column;
  }
}
</style> 