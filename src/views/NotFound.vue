<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">页面不存在</h1>
      <p class="error-message">抱歉，您访问的页面已被移动或不存在</p>
      <div class="error-actions">
        <el-button type="primary" @click="goHome" size="large">
          <el-icon class="el-icon--left"><HomeFilled /></el-icon>返回首页
        </el-button>
        <el-button @click="goBack" size="large">
          <el-icon class="el-icon--left"><Back /></el-icon>返回上一页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Back, HomeFilled } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: var(--spacing-6);
  text-align: center;
  background-color: var(--bg-secondary);
  flex: 1;
}

.not-found-content {
  max-width: 500px;
  padding: var(--spacing-8);
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  animation: fadeInUp 0.6s ease;
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  line-height: 1;
  color: var(--primary-color);
  margin-bottom: var(--spacing-4);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.error-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-4);
}

.error-message {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-6);
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .error-code {
    font-size: 100px;
  }
  
  .error-title {
    font-size: var(--text-xl);
  }
  
  .error-message {
    font-size: var(--text-base);
  }
  
  .not-found-content {
    padding: var(--spacing-6);
  }
}

@media (max-width: 480px) {
  .error-code {
    font-size: 80px;
  }
  
  .error-actions {
    flex-direction: column;
    gap: var(--spacing-2);
  }
  
  .not-found-content {
    padding: var(--spacing-4);
  }
}
</style> 