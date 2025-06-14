<template>
  <div class="home-page">
    <!-- 顶部概览卡片 -->
    <div class="overview-cards">
      <div class="overview-card" v-for="(card, index) in overviewCards" :key="index" @click="navigateTo(card.route)">
        <div class="card-icon" :style="{ backgroundColor: card.bgColor }">
          <el-icon><component :is="card.icon" /></el-icon>
        </div>
        <div class="card-content">
          <div class="card-title">{{ card.title }}</div>
          <div class="card-value">{{ card.value }}</div>
          <div class="card-trend" :class="card.trend">
            <el-icon v-if="card.trend === 'up'"><ArrowUp /></el-icon>
            <el-icon v-else-if="card.trend === 'down'"><ArrowDown /></el-icon>
            <el-icon v-else><InfoFilled /></el-icon>
            <span>{{ card.change }}</span>
          </div>
        </div>
        <div class="card-chart">
          <div class="sparkline" :id="`sparkline-${index}`"></div>
        </div>
      </div>
    </div>

    <!-- 中间内容区 -->
    <div class="main-content">
      <!-- 左侧图表 -->
      <div class="chart-section">
        <div class="chart-card">
          <div class="chart-header">
            <h3>业务趋势分析</h3>
            <div class="chart-actions">
              <el-radio-group v-model="trendTimeRange" size="small">
                <el-radio-button label="week">周</el-radio-button>
                <el-radio-button label="month">月</el-radio-button>
                <el-radio-button label="year">年</el-radio-button>
              </el-radio-group>
              <el-dropdown>
                <el-button size="small" type="primary" plain>
                  <el-icon><MoreFilled /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>导出数据</el-dropdown-item>
                    <el-dropdown-item>打印报表</el-dropdown-item>
                    <el-dropdown-item>刷新</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div class="chart-body">
            <div class="trend-chart-placeholder">
              <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/line-gradient.webp" alt="业务趋势图" />
            </div>
            <div class="chart-metrics">
              <div class="metric" v-for="(metric, index) in trendMetrics" :key="index">
                <div class="metric-title">{{ metric.title }}</div>
                <div class="metric-value" :style="{ color: metric.color }">{{ metric.value }}</div>
                <div class="metric-change" :class="metric.trend">
                  <el-icon v-if="metric.trend === 'up'"><ArrowUp /></el-icon>
                  <el-icon v-else><ArrowDown /></el-icon>
                  {{ metric.change }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3>销售数据分析</h3>
            <div class="chart-actions">
              <el-select v-model="salesRegion" size="small" placeholder="选择区域">
                <el-option label="全部区域" value="all" />
                <el-option label="华东" value="east" />
                <el-option label="华北" value="north" />
                <el-option label="华南" value="south" />
                <el-option label="西部" value="west" />
              </el-select>
            </div>
          </div>
          <div class="chart-body">
            <div class="sales-chart-placeholder">
              <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/bar-gradient.webp" alt="销售数据图" />
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧信息 -->
      <div class="info-section">
        <div class="info-card">
          <div class="info-header">
            <h3>待办事项</h3>
            <el-button text type="primary" @click="navigateTo('/tasks')">查看全部</el-button>
          </div>
          <div class="task-list">
            <div class="task-item" v-for="(task, index) in tasks" :key="index" @click="handleTaskClick(task)">
              <el-checkbox v-model="task.completed" @change="updateTaskStatus(index)" />
              <div class="task-content" :class="{ 'completed': task.completed }">
                <div class="task-title">{{ task.title }}</div>
                <div class="task-meta">
                  <el-tag size="small" :type="task.priority">{{ task.priorityText }}</el-tag>
                  <span class="task-deadline">{{ task.deadline }}</span>
                </div>
              </div>
              <div class="task-actions">
                <el-button text circle><el-icon><Edit /></el-icon></el-button>
                <el-button text circle><el-icon><Delete /></el-icon></el-button>
              </div>
            </div>
          </div>
          <div class="add-task">
            <el-input v-model="newTask" placeholder="添加新任务..." @keyup.enter="addTask">
              <template #append>
                <el-button @click="addTask"><el-icon><Plus /></el-icon></el-button>
              </template>
            </el-input>
          </div>
        </div>

        <div class="info-card">
          <div class="info-header">
            <h3>最新动态</h3>
            <el-button text type="primary" @click="navigateTo('/activities')">查看全部</el-button>
          </div>
          <div class="activity-list">
            <div class="activity-item" v-for="(activity, index) in activities" :key="index" @click="navigateTo(activity.route)">
              <div class="activity-icon" :style="{ backgroundColor: activity.color }">
                <el-icon><component :is="activity.icon" /></el-icon>
              </div>
              <div class="activity-content">
                <div class="activity-title">{{ activity.title }}</div>
                <div class="activity-desc">{{ activity.description }}</div>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部区域 -->
    <div class="bottom-section">
      <div class="project-card">
        <div class="project-header">
          <h3>项目进度</h3>
          <el-button text type="primary" @click="navigateTo('/projects')">管理项目</el-button>
        </div>
        <el-table :data="projects" style="width: 100%" :show-header="false">
          <el-table-column width="50">
            <template #default="scope">
              <div class="project-icon" :style="{ backgroundColor: scope.row.color }">
                <el-icon><component :is="scope.row.icon" /></el-icon>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name">
            <template #default="scope">
              <div class="project-name">{{ scope.row.name }}</div>
              <div class="project-desc">{{ scope.row.description }}</div>
            </template>
          </el-table-column>
          <el-table-column width="200">
            <template #default="scope">
              <div class="project-progress">
                <div class="progress-text">{{ scope.row.progress }}%</div>
                <el-progress :percentage="scope.row.progress" :color="scope.row.color" :stroke-width="8" />
              </div>
            </template>
          </el-table-column>
          <el-table-column width="120">
            <template #default="scope">
              <div class="project-members">
                <el-avatar v-for="(member, i) in scope.row.members.slice(0, 3)" :key="i" :size="28" :src="member.avatar" />
                <div class="more-members" v-if="scope.row.members.length > 3">+{{ scope.row.members.length - 3 }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="80">
            <template #default="scope">
              <el-dropdown>
                <el-button text><el-icon><MoreFilled /></el-icon></el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>查看详情</el-dropdown-item>
                    <el-dropdown-item>编辑项目</el-dropdown-item>
                    <el-dropdown-item>分享</el-dropdown-item>
                    <el-dropdown-item divided type="danger">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowDown,
  ArrowUp,
  Delete,
  Edit,
  InfoFilled,
  MoreFilled,
  Plus
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const trendTimeRange = ref('month');
const salesRegion = ref('all');
const newTask = ref('');

// 顶部概览卡片数据
const overviewCards = ref([
  {
    title: '总用户数',
    value: '24,568',
    change: '12% 较上月',
    trend: 'up',
    icon: 'User',
    bgColor: 'rgba(64, 158, 255, 0.1)',
    route: '/user-management',
    data: [28, 40, 36, 52, 38, 60, 55]
  },
  {
    title: '总收入',
    value: '¥126,560',
    change: '8% 较上月',
    trend: 'up',
    icon: 'Money',
    bgColor: 'rgba(103, 194, 58, 0.1)',
    route: '/finance',
    data: [40, 48, 50, 48, 60, 58, 66]
  },
  {
    title: '订单数',
    value: '1,286',
    change: '5% 较上月',
    trend: 'down',
    icon: 'Goods',
    bgColor: 'rgba(230, 162, 60, 0.1)',
    route: '/orders',
    data: [50, 48, 40, 42, 38, 40, 35]
  },
  {
    title: '客户满意度',
    value: '96%',
    change: '2% 较上月',
    trend: 'up',
    icon: 'View',
    bgColor: 'rgba(245, 108, 108, 0.1)',
    route: '/feedback',
    data: [88, 92, 90, 95, 89, 96, 96]
  }
]);

// 趋势图指标
const trendMetrics = ref([
  { title: '总访问量', value: '12,846', change: '12%', trend: 'up', color: '#409EFF' },
  { title: '转化率', value: '32.8%', change: '5%', trend: 'down', color: '#E6A23C' },
  { title: '平均停留', value: '8分36秒', change: '16%', trend: 'up', color: '#67C23A' }
]);

// 任务列表
const tasks = ref([
  {
    title: '完成首页设计稿',
    completed: false,
    priority: 'danger',
    priorityText: '紧急',
    deadline: '今天 18:00'
  },
  {
    title: '准备周会演示文档',
    completed: false,
    priority: 'warning',
    priorityText: '重要',
    deadline: '明天 10:00'
  },
  {
    title: '审核新用户申请',
    completed: true,
    priority: 'success',
    priorityText: '普通',
    deadline: '已完成'
  },
  {
    title: '更新系统文档',
    completed: false,
    priority: 'info',
    priorityText: '低优',
    deadline: '本周五'
  },
  {
    title: '回复客户邮件',
    completed: false,
    priority: 'warning',
    priorityText: '重要',
    deadline: '今天 15:00'
  }
]);

// 活动列表
const activities = ref([
  {
    title: '系统更新',
    description: '系统已更新至 v2.3.0 版本',
    time: '10分钟前',
    icon: 'Setting',
    color: '#409EFF',
    route: '/system/update'
  },
  {
    title: '新用户注册',
    description: '张三（ID: 10086）完成注册',
    time: '30分钟前',
    icon: 'User',
    color: '#67C23A',
    route: '/user-management'
  },
  {
    title: '安全警告',
    description: '检测到异常登录尝试',
    time: '2小时前',
    icon: 'Bell',
    color: '#E6A23C',
    route: '/security'
  },
  {
    title: '数据备份',
    description: '系统数据备份已完成',
    time: '今天 08:30',
    icon: 'Document',
    color: '#909399',
    route: '/backup'
  }
]);

// 项目列表
const projects = ref([
  {
    name: '企业官网改版',
    description: '优化用户体验与响应式设计',
    progress: 75,
    color: '#409EFF',
    icon: 'Monitor',
    members: [
      { avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
      { avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' },
      { avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' },
      { avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' }
    ]
  },
  {
    name: '移动端应用开发',
    description: 'iOS与Android双平台应用',
    progress: 32,
    color: '#67C23A',
    icon: 'Folder',
    members: [
      { avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
      { avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' }
    ]
  },
  {
    name: '数据中心升级',
    description: '服务器硬件与软件升级',
    progress: 51,
    color: '#E6A23C',
    icon: 'TrendCharts',
    members: [
      { avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
      { avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' },
      { avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' }
    ]
  }
]);

// 处理任务点击
const handleTaskClick = (task) => {
  ElMessage.info(`查看任务: ${task.title}`);
};

// 更新任务状态
const updateTaskStatus = (index) => {
  const task = tasks.value[index];
  if (task.completed) {
    ElMessage.success(`任务"${task.title}"已完成`);
    task.deadline = '已完成';
  } else {
    task.deadline = task.deadline === '已完成' ? '今天' : task.deadline;
  }
};

// 添加新任务
const addTask = () => {
  if (!newTask.value.trim()) {
    ElMessage.warning('任务内容不能为空');
    return;
  }
  
  tasks.value.unshift({
    title: newTask.value,
    completed: false,
    priority: 'info',
    priorityText: '低优',
    deadline: '待定'
  });
  
  ElMessage.success('添加任务成功');
  newTask.value = '';
};

// 导航到指定路由
const navigateTo = (route) => {
  if (route) {
    router.push(route);
  }
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 24px;
}

/* 顶部概览卡片 */
.overview-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.overview-card {
  background-color: var(--bg-primary);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
  display: flex;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.overview-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
}

.card-icon .el-icon {
  font-size: 24px;
  color: var(--primary-color);
}

.card-content {
  flex: 1;
}

.card-title {
  color: var(--text-tertiary);
  font-size: var(--text-sm);
  margin-bottom: 4px;
}

.card-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.card-trend {
  display: flex;
  align-items: center;
  font-size: var(--text-xs);
  gap: 4px;
}

.card-trend.up {
  color: var(--success-color);
}

.card-trend.down {
  color: var(--danger-color);
}

.card-chart {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 40px;
  opacity: 0.5;
}

/* 中间内容区 */
.main-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

/* 图表区域 */
.chart-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart-card {
  background-color: var(--bg-primary);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.chart-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--bg-quaternary);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-header h3 {
  margin: 0;
  font-size: var(--text-lg);
  font-weight: 600;
}

.chart-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.chart-body {
  padding: 20px;
}

.trend-chart-placeholder,
.sales-chart-placeholder {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
}

.trend-chart-placeholder img,
.sales-chart-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chart-metrics {
  display: flex;
  margin-top: 16px;
  gap: 20px;
}

.metric {
  flex: 1;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  background-color: var(--bg-secondary);
}

.metric-title {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  margin-bottom: 4px;
}

.metric-value {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.metric-change {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xs);
  gap: 4px;
}

.metric-change.up {
  color: var(--success-color);
}

.metric-change.down {
  color: var(--danger-color);
}

/* 信息区域 */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  background-color: var(--bg-primary);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.info-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--bg-quaternary);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-header h3 {
  margin: 0;
  font-size: var(--text-lg);
  font-weight: 600;
}

/* 任务列表 */
.task-list {
  padding: 8px 0;
}

.task-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.task-item:hover {
  background-color: var(--bg-secondary);
}

.task-content {
  flex: 1;
  min-width: 0;
}

.task-title {
  font-size: var(--text-sm);
  margin-bottom: 4px;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-content.completed .task-title {
  text-decoration: line-through;
  color: var(--text-tertiary);
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-deadline {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.task-actions {
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.task-item:hover .task-actions {
  opacity: 1;
}

.add-task {
  padding: 12px 20px 20px;
}

/* 活动列表 */
.activity-list {
  padding: 8px 0;
}

.activity-item {
  padding: 12px 20px;
  display: flex;
  gap: 12px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.activity-item:hover {
  background-color: var(--bg-secondary);
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon .el-icon {
  font-size: 18px;
  color: white;
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-title {
  font-size: var(--text-sm);
  font-weight: 500;
  margin-bottom: 2px;
  color: var(--text-primary);
}

.activity-desc {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-time {
  font-size: var(--text-xs);
  color: var(--text-quaternary);
}

/* 底部区域 */
.bottom-section {
  margin-top: 4px;
}

.project-card {
  background-color: var(--bg-primary);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.project-header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--bg-quaternary);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-header h3 {
  margin: 0;
  font-size: var(--text-lg);
  font-weight: 600;
}

.project-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-icon .el-icon {
  font-size: 16px;
  color: white;
}

.project-name {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.project-desc {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.project-progress {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.progress-text {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  text-align: right;
}

.project-members {
  display: flex;
  align-items: center;
}

.project-members .el-avatar {
  margin-left: -8px;
  border: 2px solid var(--bg-primary);
}

.project-members .el-avatar:first-child {
  margin-left: 0;
}

.more-members {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--bg-quaternary);
  color: var(--text-tertiary);
  font-size: var(--text-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -8px;
  border: 2px solid var(--bg-primary);
}

/* 响应式调整 */
@media (max-width: 1280px) {
  .overview-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .main-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .overview-cards {
    grid-template-columns: 1fr;
  }
  
  .chart-metrics {
    flex-direction: column;
  }
}
</style> 