<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-left">
        <p class="copyright">
          <span class="copyright-symbol">&copy;</span>
          {{ new Date().getFullYear() }} 管理系统. 版权所有.
        </p>
      </div>
      
      <div class="footer-right">
        <div class="footer-links">
          <a href="#" class="footer-link">隐私政策</a>
          <span class="divider">|</span>
          <a href="#" class="footer-link">使用条款</a>
          <span class="divider">|</span>
          <a href="#" class="footer-link">联系我们</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 页脚组件
</script>

<style scoped>
.app-footer {
  background-color: var(--bg-primary);
  padding: var(--spacing-4);
  border-top: 1px solid var(--bg-quaternary);
  width: 100%;
  flex-shrink: 0;
  z-index: 1;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
}

.footer-left {
  display: flex;
  align-items: center;
}

.copyright {
  color: var(--text-tertiary);
  font-size: var(--text-sm);
  margin: 0;
}

.copyright-symbol {
  margin-right: var(--spacing-1);
  color: var(--primary-color);
}

.footer-right {
  display: flex;
  align-items: center;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.footer-link {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer-link:hover {
  color: var(--primary-color);
}

.divider {
  color: var(--text-quaternary);
  font-size: var(--text-sm);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: var(--spacing-2);
    text-align: center;
  }
}

@media (max-width: 480px) {
  .app-footer {
    padding: var(--spacing-3) var(--spacing-2);
  }
  
  .footer-links {
    gap: var(--spacing-2);
  }
  
  .footer-link, .copyright, .divider {
    font-size: var(--text-xs);
  }
}
</style> 