<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">关于我们</h2>
    </div>
    
    <div class="page-content">
      <el-card class="about-card" shadow="hover">
        <div class="section">
          <h3 class="section-title">公司简介</h3>
          <div class="section-divider"></div>
          <p class="section-text">这是我们管理系统的关于页面。在这里您通常可以找到有关公司、团队或项目的信息。</p>
        </div>
        
        <div class="section">
          <h3 class="section-title">我们的使命</h3>
          <div class="section-divider"></div>
          <p class="section-text">我们的使命是通过直观的网络应用程序提供高效的管理解决方案。</p>
        </div>
        
        <div class="section">
          <h3 class="section-title">我们的团队</h3>
          <div class="section-divider"></div>
          <p class="section-text">我们拥有一支致力于改进管理系统的专业团队。</p>
          
          <el-row :gutter="20" class="team-grid">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-for="(member, index) in teamMembers" :key="index">
              <el-card shadow="hover" class="member-card">
                <div class="member-avatar">
                  <el-avatar :size="80" :src="member.avatar"></el-avatar>
                </div>
                <h4 class="member-name">{{ member.name }}</h4>
                <p class="member-position">{{ member.position }}</p>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const teamMembers = ref([
  {
    name: '张三',
    position: '技术总监',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    name: '李四',
    position: '产品经理',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    name: '王五',
    position: '首席设计师',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  }
]);
</script>

<style scoped>
.page-container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.page-content {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.about-card {
  margin-bottom: 20px;
}

.section {
  margin-bottom: var(--spacing-4);
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-3);
}

.section-divider {
  height: 1px;
  background-color: #EBEEF5;
  margin-bottom: 15px;
}

.section-text {
  font-size: 16px;
  line-height: 1.6;
  color: #606266;
  margin-bottom: 20px;
}

.team-grid {
  margin-top: var(--spacing-4);
}

.member-card {
  text-align: center;
  padding: 20px;
  transition: all 0.3s;
  height: 100%;
}

.member-card:hover {
  transform: translateY(-5px);
}

.member-avatar {
  margin-bottom: 15px;
}

.member-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #303133;
}

.member-position {
  color: #909399;
  font-size: 14px;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 18px;
  }
  
  .section-text {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .member-card {
    padding: 15px;
  }
  
  .member-name {
    font-size: 16px;
  }
}
</style> 