<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-left">
        <p class="copyright">
          <span class="copyright-symbol">&copy;</span>
          {{ new Date().getFullYear() }} 管理系统. 版权所有.
        </p>
        <p class="version">Version 1.2.0 by Felix-Fan-R</p>
      </div>
      
      <div class="footer-right">
        <div class="footer-links">
          <a href="#" class="footer-link">
            <el-icon><Document /></el-icon>
            <span>隐私政策</span>
          </a>
          <a href="#" class="footer-link">
            <el-icon><Notebook /></el-icon>
            <span>使用条款</span>
          </a>
          <a href="#" class="footer-link">
            <el-icon><Message /></el-icon>
            <span>联系我们</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Document, Message, Notebook } from '@element-plus/icons-vue';
</script>

<style scoped>
.app-footer {
  background-color: var(--bg-primary);
  padding: var(--spacing-4);
  border-top: 1px solid var(--bg-quaternary);
  width: 100%;
  flex-shrink: 0;
  z-index: 1;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.8);
  position: sticky;
  bottom: 0;
}

html.dark-theme .app-footer {
  background-color: rgba(26, 26, 46, 0.8);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
  gap: var(--spacing-4);
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  min-width: 0;
}

.copyright {
  color: var(--text-tertiary);
  font-size: var(--text-sm);
  margin: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copyright-symbol {
  margin-right: var(--spacing-1);
  color: var(--primary-color);
  font-weight: 600;
  flex-shrink: 0;
}

.version {
  color: var(--text-quaternary);
  font-size: var(--text-xs);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer-right {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  flex-wrap: wrap;
}

.footer-link {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  text-decoration: none;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-md);
  white-space: nowrap;
}

.footer-link:hover {
  color: var(--primary-color);
  background-color: var(--bg-tertiary);
  transform: translateY(-1px);
}

.footer-link .el-icon {
  font-size: 16px;
  flex-shrink: 0;
}

/* 响应式布局 */
@media (max-width: 1280px) {
  .footer-content {
    padding: 0 var(--spacing-3);
  }
}

@media (max-width: 992px) {
  .footer-content {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-3);
  }
  
  .footer-right {
    width: 100%;
  }
  
  .footer-links {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .app-footer {
    padding: var(--spacing-3);
  }
  
  .footer-content {
    padding: 0;
  }
  
  .footer-links {
    gap: var(--spacing-2);
  }
  
  .footer-link {
    font-size: var(--text-xs);
    padding: var(--spacing-1);
  }
  
  .footer-link .el-icon {
    font-size: 14px;
  }
  
  .copyright, .version {
    font-size: var(--text-xs);
  }
}

@media (max-width: 480px) {
  .app-footer {
    padding: var(--spacing-2);
  }
  
  .footer-links {
    justify-content: space-between;
    width: 100%;
  }
  
  .footer-link {
    flex: 1;
    justify-content: center;
  }
}
</style> 