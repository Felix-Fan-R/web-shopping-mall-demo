<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">服务项目</h2>
    </div>
    
    <div class="page-content">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-for="(service, index) in services" :key="index">
          <el-card shadow="hover" class="service-card">
            <div class="service-icon" :style="{ backgroundColor: service.color + '15' }">
              <el-icon :size="40" :color="service.color">
                <component :is="service.icon"></component>
              </el-icon>
            </div>
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>
            <el-button type="primary" size="small" class="service-button">了解更多</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { Connection, Document, Monitor, Promotion, Setting, TrendCharts } from '@element-plus/icons-vue';
import { ref } from 'vue';

const services = ref([
  {
    title: '系统管理',
    description: '提供完整的系统管理功能，包括用户管理、权限设置、日志查询等。',
    icon: Setting,
    color: '#409EFF'
  },
  {
    title: '数据监控',
    description: '实时监控系统数据流量、服务器状态、应用性能等关键指标。',
    icon: Monitor,
    color: '#67C23A'
  },
  {
    title: '营销管理',
    description: '管理营销活动、客户关系、销售渠道，提高业务转化率。',
    icon: Promotion,
    color: '#E6A23C'
  },
  {
    title: '网络服务',
    description: '提供高速、稳定的网络连接服务，支持多种网络协议。',
    icon: Connection,
    color: '#F56C6C'
  },
  {
    title: '文档管理',
    description: '集中管理企业文档，支持在线编辑、版本控制、权限管理等功能。',
    icon: Document,
    color: '#909399'
  },
  {
    title: '数据分析',
    description: '强大的数据分析工具，帮助企业挖掘数据价值，辅助决策。',
    icon: TrendCharts,
    color: '#9A67EA'
  }
]);
</script>

<style scoped>
.service-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 20px;
  text-align: center;
  transition: all 0.3s;
  margin-bottom: 20px;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.service-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.service-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 15px;
}

.service-description {
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.service-button {
  align-self: center;
}

@media (max-width: 768px) {
  .service-card {
    padding: 20px 15px;
  }
  
  .service-icon {
    width: 70px;
    height: 70px;
  }
  
  .service-title {
    font-size: 16px;
    margin-bottom: 10px;
  }
}

@media (max-width: 480px) {
  .service-icon {
    width: 60px;
    height: 60px;
  }
  
  .service-description {
    font-size: 13px;
  }
}
</style> 