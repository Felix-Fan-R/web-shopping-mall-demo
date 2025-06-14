<template>
  <div class="dashboard-page">
    <!-- 过滤器和时间范围选择 -->
    <div class="filter-bar">
      <div class="filter-left">
        <el-select v-model="selectedDepartment" placeholder="选择部门" size="large">
          <el-option label="全部部门" value="all" />
          <el-option label="销售部" value="sales" />
          <el-option label="技术部" value="tech" />
          <el-option label="市场部" value="marketing" />
          <el-option label="客服部" value="support" />
        </el-select>
        
        <el-select v-model="selectedRegion" placeholder="选择区域" size="large">
          <el-option label="全部区域" value="all" />
          <el-option label="华东" value="east" />
          <el-option label="华北" value="north" />
          <el-option label="华南" value="south" />
          <el-option label="西部" value="west" />
        </el-select>
      </div>
      
      <div class="filter-right">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="large"
          :shortcuts="dateShortcuts"
        />
        
        <el-button type="primary" size="large">
          <el-icon><RefreshRight /></el-icon>刷新数据
        </el-button>
        
        <el-dropdown>
          <el-button type="primary" plain size="large">
            <el-icon><Download /></el-icon>导出
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>导出为Excel</el-dropdown-item>
              <el-dropdown-item>导出为PDF</el-dropdown-item>
              <el-dropdown-item>导出为图片</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    
    <!-- 关键指标卡片 -->
    <div class="kpi-cards">
      <div v-for="(kpi, index) in kpiData" :key="index" class="kpi-card">
        <div class="kpi-header">
          <div class="kpi-title">{{ kpi.title }}</div>
          <el-dropdown>
            <el-icon class="more-icon"><MoreFilled /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>查看详情</el-dropdown-item>
                <el-dropdown-item>设置目标</el-dropdown-item>
                <el-dropdown-item>添加到收藏</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        
        <div class="kpi-value">{{ kpi.value }}</div>
        
        <div class="kpi-footer">
          <div class="kpi-trend" :class="kpi.trend">
            <el-icon v-if="kpi.trend === 'up'"><ArrowUp /></el-icon>
            <el-icon v-else-if="kpi.trend === 'down'"><ArrowDown /></el-icon>
            <span>{{ kpi.change }}</span>
          </div>
          <div class="kpi-period">{{ kpi.period }}</div>
        </div>
        
        <div class="kpi-chart">
          <img :src="kpi.chartImg" alt="趋势图" />
        </div>
      </div>
    </div>
    
    <!-- 图表区域 -->
    <div class="chart-grid">
      <!-- 销售趋势图 -->
      <div class="chart-card large">
        <div class="chart-header">
          <h3>销售趋势分析</h3>
          <div class="chart-actions">
            <el-radio-group v-model="salesChartType" size="small">
              <el-radio-button label="line">折线图</el-radio-button>
              <el-radio-button label="bar">柱状图</el-radio-button>
              <el-radio-button label="area">面积图</el-radio-button>
            </el-radio-group>
            <el-dropdown>
              <el-button text><el-icon><MoreFilled /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>下载数据</el-dropdown-item>
                  <el-dropdown-item>全屏查看</el-dropdown-item>
                  <el-dropdown-item>添加到仪表盘</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="chart-body">
          <div class="chart-placeholder">
            <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/line-stack.webp" alt="销售趋势图" />
          </div>
          <div class="chart-legend">
            <div v-for="(item, index) in salesLegend" :key="index" class="legend-item">
              <div class="legend-color" :style="{ backgroundColor: item.color }"></div>
              <div class="legend-text">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 用户分布图 -->
      <div class="chart-card medium">
        <div class="chart-header">
          <h3>用户地域分布</h3>
          <el-dropdown>
            <el-button text><el-icon><MoreFilled /></el-icon></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>查看详情</el-dropdown-item>
                <el-dropdown-item>导出数据</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="chart-body">
          <div class="chart-placeholder">
            <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/map-china.webp" alt="用户分布图" />
          </div>
        </div>
      </div>
      
      <!-- 渠道分析 -->
      <div class="chart-card medium">
        <div class="chart-header">
          <h3>流量来源分析</h3>
          <el-dropdown>
            <el-button text><el-icon><MoreFilled /></el-icon></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>查看详情</el-dropdown-item>
                <el-dropdown-item>导出数据</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="chart-body">
          <div class="chart-placeholder">
            <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/pie-doughnut.webp" alt="流量来源分析" />
          </div>
          <div class="chart-legend">
            <div v-for="(item, index) in channelLegend" :key="index" class="legend-item">
              <div class="legend-color" :style="{ backgroundColor: item.color }"></div>
              <div class="legend-text">{{ item.text }}</div>
              <div class="legend-value">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 产品销售排行 -->
      <div class="chart-card medium">
        <div class="chart-header">
          <h3>产品销售排行</h3>
          <el-select v-model="productTimeRange" size="small" placeholder="时间范围">
            <el-option label="本周" value="week" />
            <el-option label="本月" value="month" />
            <el-option label="本季度" value="quarter" />
            <el-option label="本年" value="year" />
          </el-select>
        </div>
        <div class="chart-body">
          <div class="product-list">
            <div v-for="(product, index) in topProducts" :key="index" class="product-item">
              <div class="product-rank">{{ index + 1 }}</div>
              <div class="product-info">
                <div class="product-name">{{ product.name }}</div>
                <div class="product-category">{{ product.category }}</div>
              </div>
              <div class="product-progress">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: `${product.percentage}%`, backgroundColor: product.color }"></div>
                </div>
                <div class="progress-value">{{ product.sales }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 用户活跃度 -->
      <div class="chart-card medium">
        <div class="chart-header">
          <h3>用户活跃度分析</h3>
          <el-radio-group v-model="userActiveType" size="small">
            <el-radio-button label="daily">日</el-radio-button>
            <el-radio-button label="weekly">周</el-radio-button>
            <el-radio-button label="monthly">月</el-radio-button>
          </el-radio-group>
        </div>
        <div class="chart-body">
          <div class="chart-placeholder">
            <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/bar-label-rotation.webp" alt="用户活跃度" />
          </div>
        </div>
      </div>
      
      <!-- 实时监控 -->
      <div class="chart-card large">
        <div class="chart-header">
          <h3>系统实时监控</h3>
          <div class="chart-actions">
            <el-tag type="success">正常运行中</el-tag>
            <el-button text><el-icon><MoreFilled /></el-icon></el-button>
          </div>
        </div>
        <div class="chart-body">
          <div class="monitor-grid">
            <div class="monitor-card">
              <div class="monitor-title">CPU使用率</div>
              <div class="monitor-gauge">
                <el-progress type="dashboard" :percentage="cpuUsage" :color="cpuColor" />
              </div>
              <div class="monitor-value">{{ cpuUsage }}%</div>
            </div>
            
            <div class="monitor-card">
              <div class="monitor-title">内存使用率</div>
              <div class="monitor-gauge">
                <el-progress type="dashboard" :percentage="memoryUsage" :color="memoryColor" />
              </div>
              <div class="monitor-value">{{ memoryUsage }}%</div>
            </div>
            
            <div class="monitor-card">
              <div class="monitor-title">磁盘空间</div>
              <div class="monitor-gauge">
                <el-progress type="dashboard" :percentage="diskUsage" :color="diskColor" />
              </div>
              <div class="monitor-value">{{ diskUsage }}%</div>
            </div>
            
            <div class="monitor-card">
              <div class="monitor-title">网络流量</div>
              <div class="monitor-chart">
                <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/line-marker.webp" alt="网络流量" />
              </div>
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
    Download,
    MoreFilled,
    RefreshRight
} from '@element-plus/icons-vue';
import { ref } from 'vue';

// 过滤器状态
const selectedDepartment = ref('all');
const selectedRegion = ref('all');
const dateRange = ref([new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()]);
const dateShortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

// KPI数据
const kpiData = ref([
  {
    title: '总销售额',
    value: '¥ 126,560',
    change: '12%',
    trend: 'up',
    period: '较上月',
    chartImg: 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/line-simple.webp'
  },
  {
    title: '订单量',
    value: '1,286',
    change: '8%',
    trend: 'up',
    period: '较上月',
    chartImg: 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/bar-simple.webp'
  },
  {
    title: '新增用户',
    value: '128',
    change: '5%',
    trend: 'down',
    period: '较上月',
    chartImg: 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/line-smooth.webp'
  },
  {
    title: '转化率',
    value: '32.8%',
    change: '3%',
    trend: 'up',
    period: '较上月',
    chartImg: 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/line-marker.webp'
  }
]);

// 销售趋势图
const salesChartType = ref('line');
const salesLegend = ref([
  { text: '华东区域', color: '#409EFF' },
  { text: '华南区域', color: '#67C23A' },
  { text: '华北区域', color: '#E6A23C' },
  { text: '西部区域', color: '#F56C6C' }
]);

// 渠道分析
const channelLegend = ref([
  { text: '直接访问', value: '40%', color: '#409EFF' },
  { text: '搜索引擎', value: '32%', color: '#67C23A' },
  { text: '社交媒体', value: '18%', color: '#E6A23C' },
  { text: '电子邮件', value: '10%', color: '#F56C6C' }
]);

// 产品销售排行
const productTimeRange = ref('month');
const topProducts = ref([
  { name: '高级企业套餐', category: '企业服务', sales: '¥68,500', percentage: 100, color: '#409EFF' },
  { name: '标准商业方案', category: '企业服务', sales: '¥45,620', percentage: 66, color: '#67C23A' },
  { name: '基础应用授权', category: '软件授权', sales: '¥32,840', percentage: 48, color: '#E6A23C' },
  { name: '定制开发服务', category: '技术服务', sales: '¥28,350', percentage: 41, color: '#F56C6C' },
  { name: '云存储升级包', category: '云服务', sales: '¥21,480', percentage: 31, color: '#909399' }
]);

// 用户活跃度
const userActiveType = ref('weekly');

// 系统监控
const cpuUsage = ref(65);
const memoryUsage = ref(78);
const diskUsage = ref(42);

const cpuColor = (percentage) => {
  if (percentage < 70) return '#67C23A';
  if (percentage < 90) return '#E6A23C';
  return '#F56C6C';
};

const memoryColor = (percentage) => {
  if (percentage < 70) return '#67C23A';
  if (percentage < 90) return '#E6A23C';
  return '#F56C6C';
};

const diskColor = (percentage) => {
  if (percentage < 70) return '#67C23A';
  if (percentage < 90) return '#E6A23C';
  return '#F56C6C';
};
</script>

<style scoped>
.dashboard-page {
  padding-bottom: 24px;
}

/* 过滤器栏 */
.filter-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  background-color: var(--bg-primary);
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
}

.filter-left,
.filter-right {
  display: flex;
  gap: 16px;
  align-items: center;
}

/* KPI卡片 */
.kpi-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.kpi-card {
  background-color: var(--bg-primary);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.kpi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.kpi-title {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.more-icon {
  cursor: pointer;
  color: var(--text-tertiary);
  transition: all var(--transition-fast);
}

.more-icon:hover {
  color: var(--text-primary);
}

.kpi-value {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.kpi-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.kpi-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-sm);
}

.kpi-trend.up {
  color: var(--success-color);
}

.kpi-trend.down {
  color: var(--danger-color);
}

.kpi-period {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.kpi-chart {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 120px;
  height: 60px;
  opacity: 0.5;
}

.kpi-chart img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 图表网格 */
.chart-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-card {
  background-color: var(--bg-primary);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.chart-card.large {
  grid-column: span 2;
}

.chart-card.medium {
  grid-column: span 1;
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

.chart-placeholder {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.chart-placeholder img {
  width: 100%;
  object-fit: cover;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.legend-value {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
}

/* 产品列表 */
.product-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-rank {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  font-weight: 600;
}

.product-item:nth-child(1) .product-rank {
  background-color: #f5bf4f;
  color: white;
}

.product-item:nth-child(2) .product-rank {
  background-color: #a0a0a0;
  color: white;
}

.product-item:nth-child(3) .product-rank {
  background-color: #cd7f32;
  color: white;
}

.product-info {
  flex: 1;
  min-width: 0;
}

.product-name {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-category {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.product-progress {
  width: 160px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background-color: var(--bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
}

.progress-value {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
}

/* 监控网格 */
.monitor-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.monitor-card {
  background-color: var(--bg-secondary);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.monitor-title {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  margin-bottom: 12px;
}

.monitor-gauge {
  margin-bottom: 8px;
}

.monitor-value {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.monitor-chart {
  height: 120px;
  overflow: hidden;
}

.monitor-chart img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 响应式调整 */
@media (max-width: 1280px) {
  .kpi-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .chart-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-card.large,
  .chart-card.medium {
    grid-column: span 1;
  }
  
  .monitor-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    gap: 16px;
  }
  
  .filter-left,
  .filter-right {
    width: 100%;
    flex-wrap: wrap;
  }
  
  .kpi-cards {
    grid-template-columns: 1fr;
  }
  
  .monitor-grid {
    grid-template-columns: 1fr;
  }
}
</style> 