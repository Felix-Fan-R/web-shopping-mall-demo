<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">系统概览</h2>
      <div class="page-actions">
        <el-button-group>
          <el-button type="primary" @click="goToUserManagement" :icon="User">
            用户管理
          </el-button>
          <el-button type="success" @click="goToDataAnalysis" :icon="DataAnalysis">
            数据分析
          </el-button>
        </el-button-group>
      </div>
    </div>
    
    <div class="page-content">
      <!-- 欢迎横幅 -->
      <div class="welcome-section">
        <div class="welcome-content">
          <h2 class="welcome-title">欢迎使用管理系统</h2>
          <p class="welcome-subtitle">高效、直观、专业的企业级管理平台</p>
          <div class="welcome-actions">
            <el-button type="primary" size="large">
              <el-icon><Document /></el-icon>查看文档
            </el-button>
            <el-button size="large">
              <el-icon><VideoPlay /></el-icon>观看教程
            </el-button>
          </div>
        </div>
        <div class="welcome-image">
          <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/area-stack-gradient.webp" alt="系统概览" />
        </div>
      </div>
      
      <!-- 统计数据 -->
      <div class="stats-section">
        <h3 class="section-title">
          <el-icon><TrendCharts /></el-icon>
          <span>关键指标</span>
        </h3>
        <el-row :gutter="20" class="stats-row">
          <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" v-for="(stat, index) in statistics" :key="index">
            <div class="stat-card" :class="`stat-card-${index + 1}`" data-aos="fade-up" :data-aos-delay="index * 100">
              <div class="stat-icon">
                <el-icon><component :is="stat.icon"></component></el-icon>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-title">{{ stat.title }}</div>
                <div class="stat-trend">
                  <span :class="stat.trend === 'up' ? 'trend-up' : 'trend-down'">
                    <el-icon v-if="stat.trend === 'up'"><ArrowUp /></el-icon>
                    <el-icon v-else><ArrowDown /></el-icon>
                    {{ stat.change }}
                  </span>
                  <span class="trend-period">较上周</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      
      <!-- 图表和操作区域 -->
      <el-row :gutter="24" class="chart-row">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <div class="card chart-card" data-aos="fade-right">
            <div class="card-header">
              <h3 class="card-title">
                <el-icon><Histogram /></el-icon>
                <span>业务趋势</span>
              </h3>
              <el-radio-group v-model="chartTimeRange" size="small">
                <el-radio-button label="week">本周</el-radio-button>
                <el-radio-button label="month">本月</el-radio-button>
                <el-radio-button label="year">全年</el-radio-button>
              </el-radio-group>
            </div>
            <div class="chart-container">
              <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/line-simple.webp" 
                   alt="趋势图" class="chart-image" />
            </div>
          </div>
        </el-col>
        
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <!-- 快捷操作 -->
          <div class="card action-card" data-aos="fade-left" data-aos-delay="100">
            <div class="card-header">
              <h3 class="card-title">
                <el-icon><Operation /></el-icon>
                <span>快捷操作</span>
              </h3>
            </div>
            <div class="action-grid">
              <div class="action-item" v-for="(action, index) in quickActions" :key="index">
                <el-button :icon="action.icon" circle :type="action.type"></el-button>
                <span>{{ action.title }}</span>
              </div>
            </div>
          </div>
          
          <!-- 系统通知 -->
          <div class="card notification-card" data-aos="fade-left" data-aos-delay="200">
            <div class="card-header">
              <h3 class="card-title">
                <el-icon><Bell /></el-icon>
                <span>系统通知</span>
              </h3>
              <el-link type="primary">查看全部</el-link>
            </div>
            <div class="notification-list">
              <div class="notification-item" v-for="(notification, index) in notifications" :key="index">
                <el-badge :type="notification.type" dot class="notification-badge"></el-badge>
                <div class="notification-content">
                  <div class="notification-text">{{ notification.content }}</div>
                  <div class="notification-time">{{ notification.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      
      <!-- 最近活动 -->
      <div class="activity-section" data-aos="fade-up">
        <h3 class="section-title">
          <el-icon><Clock /></el-icon>
          <span>最近活动</span>
        </h3>
        <div class="timeline">
          <div class="timeline-item" v-for="(activity, index) in recentActivities" :key="index">
            <div class="timeline-icon" :style="{ backgroundColor: activity.color }">
              <el-icon><component :is="activity.icon"></component></el-icon>
            </div>
            <div class="timeline-content">
              <div class="timeline-title">{{ activity.title }}</div>
              <div class="timeline-desc">{{ activity.description }}</div>
              <div class="timeline-time">{{ activity.time }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
    ArrowDown,
    ArrowUp,
    Bell,
    Clock,
    DataAnalysis,
    Delete,
    Document,
    Edit,
    Histogram,
    Operation,
    Plus,
    Setting,
    TrendCharts,
    User,
    VideoPlay
} from '@element-plus/icons-vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const chartTimeRange = ref('month');

// 初始化AOS动画库
onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
});

const statistics = ref([
  {
    title: '用户总数',
    value: '1,254',
    icon: 'User',
    color: 'var(--primary-color)',
    trend: 'up',
    change: '12%'
  },
  {
    title: '今日访问',
    value: '128',
    icon: 'View',
    color: 'var(--success-color)',
    trend: 'up',
    change: '8%'
  },
  {
    title: '待办任务',
    value: '24',
    icon: 'Tickets',
    color: 'var(--warning-color)',
    trend: 'down',
    change: '5%'
  },
  {
    title: '系统消息',
    value: '6',
    icon: 'Bell',
    color: 'var(--danger-color)',
    trend: 'up',
    change: '15%'
  }
]);

const quickActions = ref([
  { title: '新增', icon: Plus, type: 'primary' },
  { title: '编辑', icon: Edit, type: 'success' },
  { title: '删除', icon: Delete, type: 'danger' },
  { title: '设置', icon: Setting, type: 'warning' }
]);

const notifications = ref([
  { content: '系统更新完成，新版本已发布', time: '10分钟前', type: 'success' },
  { content: '有2条待审批的申请', time: '1小时前', type: 'warning' },
  { content: '服务器CPU使用率超过80%', time: '2小时前', type: 'danger' },
  { content: '今日数据备份已完成', time: '5小时前', type: 'info' }
]);

const recentActivities = ref([
  {
    title: '系统更新',
    description: '系统已更新到最新版本 v2.1.0',
    time: '今天 10:30',
    icon: 'Setting',
    color: 'var(--primary-color)'
  },
  {
    title: '新用户注册',
    description: '新增用户：张三（ID: 10086）',
    time: '今天 09:15',
    icon: 'User',
    color: 'var(--success-color)'
  },
  {
    title: '数据备份',
    description: '系统数据已成功备份',
    time: '昨天 23:00',
    icon: 'Document',
    color: 'var(--info-color)'
  },
  {
    title: '安全警告',
    description: '检测到异常登录尝试',
    time: '昨天 18:42',
    icon: 'Warning',
    color: 'var(--danger-color)'
  }
]);

const goToUserManagement = () => {
  router.push({
    path: '/user-management',
    query: { from: 'home' }
  });
};

const goToDataAnalysis = () => {
  router.push({
    path: '/data-analysis',
    query: { from: 'home' }
  });
};
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

.page-header {
  margin-bottom: var(--spacing-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.page-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  position: relative;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: var(--radius-full);
}

.section-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-3);
}

.section-title .el-icon {
  color: var(--primary-color);
}

/* 欢迎区域 */
.welcome-section {
  display: flex;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--spacing-4);
  box-shadow: var(--shadow-lg);
  position: relative;
}

.welcome-content {
  flex: 1;
  padding: var(--spacing-5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.welcome-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-2);
}

.welcome-subtitle {
  font-size: var(--text-lg);
  opacity: 0.9;
  margin-bottom: var(--spacing-4);
}

.welcome-actions {
  display: flex;
  gap: var(--spacing-4);
  margin-top: var(--spacing-2);
}

.welcome-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.welcome-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

/* 统计卡片样式 */
.stats-section {
  margin-bottom: var(--spacing-4);
}

.stats-row {
  margin-bottom: var(--spacing-3);
}

.stat-card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-5);
  height: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--primary-color);
}

.stat-card-1::before {
  background-color: var(--primary-color);
}

.stat-card-2::before {
  background-color: var(--success-color);
}

.stat-card-3::before {
  background-color: var(--warning-color);
}

.stat-card-4::before {
  background-color: var(--danger-color);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-tertiary);
}

.stat-icon .el-icon {
  font-size: 24px;
  color: var(--primary-color);
}

.stat-card-1 .stat-icon .el-icon {
  color: var(--primary-color);
}

.stat-card-2 .stat-icon .el-icon {
  color: var(--success-color);
}

.stat-card-3 .stat-icon .el-icon {
  color: var(--warning-color);
}

.stat-card-4 .stat-icon .el-icon {
  color: var(--danger-color);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-1);
}

.stat-title {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  margin-bottom: var(--spacing-2);
}

.stat-trend {
  font-size: var(--text-xs);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.trend-up {
  color: var(--success-color);
  display: flex;
  align-items: center;
  gap: 2px;
}

.trend-down {
  color: var(--danger-color);
  display: flex;
  align-items: center;
  gap: 2px;
}

.trend-period {
  color: var(--text-quaternary);
}

/* 卡片通用样式 */
.card {
  background-color: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  overflow: hidden;
  height: 100%;
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--bg-quaternary);
}

.card-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--text-lg);
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.card-title .el-icon {
  color: var(--primary-color);
}

/* 图表区域 */
.chart-row {
  margin-bottom: var(--spacing-4);
}

.chart-card {
  margin-bottom: var(--spacing-4);
}

.chart-container {
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
}

.chart-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* 快捷操作 */
.action-card {
  margin-bottom: var(--spacing-4);
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
  padding: var(--spacing-4);
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
}

.action-item span {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

/* 通知列表 */
.notification-card {
  margin-bottom: var(--spacing-4);
}

.notification-list {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-4);
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-3) 0;
  border-bottom: 1px solid var(--bg-quaternary);
}

.notification-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.notification-content {
  flex: 1;
}

.notification-text {
  font-size: var(--text-sm);
  margin-bottom: var(--spacing-1);
  color: var(--text-secondary);
}

.notification-time {
  font-size: var(--text-xs);
  color: var(--text-quaternary);
}

/* 时间线 */
.activity-section {
  margin-bottom: var(--spacing-4);
}

.timeline {
  position: relative;
  padding-left: var(--spacing-6);
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 12px;
  width: 2px;
  background-color: var(--bg-quaternary);
}

.timeline-item {
  position: relative;
  padding-bottom: var(--spacing-5);
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-icon {
  position: absolute;
  left: -24px;
  top: 0;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.timeline-icon .el-icon {
  font-size: 14px;
  color: white;
}

.timeline-content {
  background-color: var(--bg-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-sm);
}

.timeline-title {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-1);
}

.timeline-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-2);
}

.timeline-time {
  font-size: var(--text-xs);
  color: var(--text-quaternary);
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .welcome-section {
    flex-direction: column;
  }
  
  .welcome-image {
    height: 200px;
  }
  
  .stat-value {
    font-size: var(--text-2xl);
  }
  
  .chart-container {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .welcome-content {
    padding: var(--spacing-6);
  }
  
  .welcome-title {
    font-size: var(--text-2xl);
  }
  
  .welcome-subtitle {
    font-size: var(--text-base);
  }
  
  .welcome-actions {
    flex-direction: column;
    gap: var(--spacing-2);
    width: 100%;
  }
  
  .action-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .page-actions {
    margin-top: var(--spacing-2);
  }
  
  .stat-card {
    padding: var(--spacing-4);
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
  }
  
  .stat-value {
    font-size: var(--text-xl);
  }
  
  .chart-container {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-2);
  }
  
  .welcome-content {
    padding: var(--spacing-4);
  }
  
  .welcome-title {
    font-size: var(--text-xl);
  }
  
  .welcome-image {
    height: 150px;
  }
  
  .stat-card {
    padding: var(--spacing-3);
    gap: var(--spacing-2);
  }
  
  .stat-icon {
    width: 40px;
    height: 40px;
  }
  
  .stat-value {
    font-size: var(--text-lg);
  }
  
  .chart-container {
    height: 200px;
  }
  
  .timeline {
    padding-left: var(--spacing-4);
  }
  
  .timeline-icon {
    width: 20px;
    height: 20px;
    left: -20px;
  }
  
  .timeline-content {
    padding: var(--spacing-3);
  }
}
</style> 