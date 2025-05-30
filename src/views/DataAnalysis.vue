<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-left">
        <el-button @click="goBack" :icon="Back" circle></el-button>
        <h2 class="page-title">数据分析</h2>
      </div>
      <div class="header-right">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="dateShortcuts"
          @change="handleDateChange"
        />
        <el-button type="primary" @click="refreshData">
          <el-icon><Refresh /></el-icon>刷新数据
        </el-button>
        <el-button @click="exportData">
          <el-icon><Download /></el-icon>导出报表
        </el-button>
      </div>
    </div>

    <div class="page-content">
      <!-- 数据概览卡片 -->
      <el-row :gutter="20" class="overview-row">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" v-for="(item, index) in overviewData" :key="index">
          <el-card shadow="hover" class="overview-card">
            <div class="overview-icon" :style="{ backgroundColor: item.color }">
              <el-icon><component :is="item.icon"></component></el-icon>
            </div>
            <div class="overview-content">
              <div class="overview-title">{{ item.title }}</div>
              <div class="overview-value">{{ item.value }}</div>
              <div class="overview-trend">
                <span :class="item.trend === 'up' ? 'trend-up' : 'trend-down'">
                  <el-icon v-if="item.trend === 'up'"><ArrowUp /></el-icon>
                  <el-icon v-else><ArrowDown /></el-icon>
                  {{ item.change }}
                </span>
                <span class="trend-period">较上月</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 销售趋势图 -->
      <el-card shadow="hover" class="chart-card">
        <template #header>
          <div class="card-header">
            <h3>销售趋势分析</h3>
            <el-radio-group v-model="salesTimeUnit" size="small">
              <el-radio-button label="day">日</el-radio-button>
              <el-radio-button label="week">周</el-radio-button>
              <el-radio-button label="month">月</el-radio-button>
            </el-radio-group>
          </div>
        </template>
        <div class="chart-container">
          <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/line-stack.webp" 
               alt="销售趋势图" class="chart-image" />
        </div>
      </el-card>

      <!-- 用户分布和产品销售排名 -->
      <el-row :gutter="20" class="chart-row">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <div class="card-header">
                <h3>用户分布</h3>
                <el-select v-model="userDistributionType" size="small">
                  <el-option label="地区分布" value="region" />
                  <el-option label="年龄分布" value="age" />
                  <el-option label="性别分布" value="gender" />
                </el-select>
              </div>
            </template>
            <div class="chart-container">
              <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/pie-doughnut.webp" 
                   alt="用户分布图" class="chart-image" />
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <div class="card-header">
                <h3>产品销售排名</h3>
                <el-select v-model="productRankingLimit" size="small">
                  <el-option label="前5名" :value="5" />
                  <el-option label="前10名" :value="10" />
                  <el-option label="前15名" :value="15" />
                </el-select>
              </div>
            </template>
            <div class="chart-container">
              <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/bar-y-category.webp" 
                   alt="产品销售排名图" class="chart-image" />
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 访问来源和转化漏斗 -->
      <el-row :gutter="20" class="chart-row">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <div class="card-header">
                <h3>访问来源分析</h3>
              </div>
            </template>
            <div class="chart-container">
              <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/pie-simple.webp" 
                   alt="访问来源分析图" class="chart-image" />
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <div class="card-header">
                <h3>转化漏斗</h3>
              </div>
            </template>
            <div class="chart-container">
              <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/funnel.webp" 
                   alt="转化漏斗图" class="chart-image" />
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 数据明细表格 -->
      <el-card shadow="hover" class="data-table-card">
        <template #header>
          <div class="card-header">
            <h3>数据明细</h3>
            <div class="header-actions">
              <el-input
                v-model="tableSearchQuery"
                placeholder="搜索数据"
                :prefix-icon="Search"
                clearable
                style="width: 200px"
              />
              <el-button type="primary" @click="handleSearch">搜索</el-button>
            </div>
          </div>
        </template>
        <div class="table-responsive">
          <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column prop="date" label="日期" width="120" />
            <el-table-column prop="region" label="地区" width="120" />
            <el-table-column prop="sales" label="销售额" width="120">
              <template #default="scope">
                ¥ {{ scope.row.sales.toLocaleString() }}
              </template>
            </el-table-column>
            <el-table-column prop="orders" label="订单量" width="120" />
            <el-table-column prop="users" label="用户数" width="120" />
            <el-table-column prop="conversion" label="转化率" width="120">
              <template #default="scope">
                {{ scope.row.conversion }}%
              </template>
            </el-table-column>
            <el-table-column prop="avgValue" label="客单价" width="120">
              <template #default="scope">
                ¥ {{ scope.row.avgValue.toLocaleString() }}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table-pagination">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalItems"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {
    ArrowDown,
    ArrowUp,
    Back,
    DataAnalysis,
    Download,
    Money,
    Refresh,
    Search,
    ShoppingCart,
    User
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const dateRange = ref([new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date()]);
const salesTimeUnit = ref('month');
const userDistributionType = ref('region');
const productRankingLimit = ref(10);
const tableSearchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(100);

// 概览数据
const overviewData = ref([
  {
    title: '总销售额',
    value: '¥ 126,560',
    icon: Money,
    color: '#409EFF',
    trend: 'up',
    change: '12%'
  },
  {
    title: '订单量',
    value: '1,846',
    icon: ShoppingCart,
    color: '#67C23A',
    trend: 'up',
    change: '8%'
  },
  {
    title: '用户数',
    value: '8,546',
    icon: User,
    color: '#E6A23C',
    trend: 'up',
    change: '15%'
  },
  {
    title: '转化率',
    value: '28.5%',
    icon: DataAnalysis,
    color: '#F56C6C',
    trend: 'down',
    change: '3%'
  }
]);

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
      start.setMonth(start.getMonth() - 1);
      return [start, end];
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 3);
      return [start, end];
    },
  },
];

// 模拟表格数据
const tableData = ref([
  {
    date: '2023-06-01',
    region: '华东',
    sales: 12680,
    orders: 235,
    users: 1245,
    conversion: 28.5,
    avgValue: 53.96
  },
  {
    date: '2023-06-02',
    region: '华北',
    sales: 15890,
    orders: 312,
    users: 1456,
    conversion: 32.1,
    avgValue: 50.93
  },
  {
    date: '2023-06-03',
    region: '华南',
    sales: 10560,
    orders: 198,
    users: 1024,
    conversion: 26.8,
    avgValue: 53.33
  },
  {
    date: '2023-06-04',
    region: '西北',
    sales: 8750,
    orders: 165,
    users: 876,
    conversion: 24.5,
    avgValue: 53.03
  },
  {
    date: '2023-06-05',
    region: '西南',
    sales: 9860,
    orders: 187,
    users: 956,
    conversion: 25.3,
    avgValue: 52.73
  }
]);

const handleDateChange = (val) => {
  // 处理日期范围变化
  console.log('日期范围变化:', val);
};

const refreshData = () => {
  ElMessage.success('数据已刷新');
};

const exportData = () => {
  ElMessage.success('报表导出中...');
};

const handleSearch = () => {
  // 处理表格搜索
  console.log('搜索关键词:', tableSearchQuery.value);
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  // 在实际应用中，这里应该重新获取数据
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
  // 在实际应用中，这里应该重新获取数据
};

const goBack = () => {
  const fromRoute = router.currentRoute.value.query.from;
  if (fromRoute) {
    router.push(`/${fromRoute === 'home' ? '' : fromRoute}`);
  } else {
    router.push('/');
  }
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-3);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.header-right {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
  align-items: center;
}

/* 数据概览卡片 */
.overview-row {
  margin-bottom: var(--spacing-3);
}

.overview-card {
  display: flex;
  align-items: center;
  padding: var(--spacing-3);
  margin-bottom: var(--spacing-3);
  transition: all 0.3s;
}

.overview-card:hover {
  transform: translateY(-5px);
}

.overview-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.overview-icon .el-icon {
  font-size: 24px;
  color: white;
}

.overview-content {
  flex: 1;
}

.overview-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;
}

.overview-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.overview-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
}

.trend-up {
  color: #67C23A;
  display: flex;
  align-items: center;
}

.trend-down {
  color: #F56C6C;
  display: flex;
  align-items: center;
}

.trend-period {
  color: #909399;
}

/* 图表卡片 */
.chart-row {
  margin-bottom: 20px;
}

.chart-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* 数据表格 */
.data-table-card {
  margin-bottom: 20px;
}

.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.table-responsive {
  overflow-x: auto;
}

.table-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .overview-card {
    padding: 12px;
  }
  
  .overview-value {
    font-size: 22px;
  }
  
  .chart-container {
    height: 250px;
  }
}

@media (max-width: 992px) {
  .overview-value {
    font-size: 20px;
  }
  
  .chart-container {
    height: 220px;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .header-right {
    width: 100%;
  }
  
  .overview-card {
    padding: 10px;
  }
  
  .overview-icon {
    width: 40px;
    height: 40px;
  }
  
  .overview-value {
    font-size: 18px;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .chart-container {
    height: 200px;
  }
  
  .header-actions {
    width: 100%;
    flex-wrap: wrap;
  }
  
  .table-pagination {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .overview-icon {
    width: 36px;
    height: 36px;
  }
  
  .overview-icon .el-icon {
    font-size: 18px;
  }
  
  .chart-container {
    height: 180px;
  }
}
</style> 