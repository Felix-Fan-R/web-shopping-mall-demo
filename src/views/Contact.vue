<template>
  <div class="page-container">
    <div class="page-header">
      <h2 class="page-title">联系我们</h2>
    </div>
    
    <div class="page-content">
      <el-card shadow="hover" class="contact-card">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="contact-info">
              <h3 class="section-title">联系信息</h3>
              <div class="info-list">
                <div class="info-item">
                  <el-icon><Location /></el-icon>
                  <span><strong>地址：</strong>中国北京市朝阳区科技园123号</span>
                </div>
                <div class="info-item">
                  <el-icon><Phone /></el-icon>
                  <span><strong>电话：</strong>+86 10 12345678</span>
                </div>
                <div class="info-item">
                  <el-icon><Message /></el-icon>
                  <span><strong>邮箱：</strong>info@example.com</span>
                </div>
                <div class="info-item">
                  <el-icon><Clock /></el-icon>
                  <span><strong>工作时间：</strong>周一至周五，上午9点 - 下午5点</span>
                </div>
              </div>
              
              <div class="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.251330514067!2d116.40335!3d39.914132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35f052a72a39da87%3A0x56eab5c50a13a252!2z5pyd6Ziz5ZG96Zeo!5e0!3m2!1szh-CN!2scn!4v1652870450240!5m2!1szh-CN!2scn" 
                  width="100%" 
                  height="300" 
                  style="border:0;" 
                  allowfullscreen="" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade"
                  class="map-iframe">
                </iframe>
              </div>
            </div>
          </el-col>
          
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="contact-form">
              <h3 class="section-title">给我们留言</h3>
              <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="form.name" placeholder="请输入您的姓名" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form.email" placeholder="请输入您的邮箱" />
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                  <el-input v-model="form.phone" placeholder="请输入您的电话号码" />
                </el-form-item>
                <el-form-item label="留言" prop="message">
                  <el-input v-model="form.message" type="textarea" :rows="4" placeholder="请输入您的留言内容" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
                  <el-button @click="resetForm(formRef)">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { Clock, Location, Message, Phone } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';

const formRef = ref(null);

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});

const rules = reactive({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' }
  ],
  message: [
    { required: true, message: '请输入留言内容', trigger: 'blur' }
  ]
});

const submitForm = (formEl) => {
  if (!formEl) return;
  
  formEl.validate((valid) => {
    if (valid) {
      // 这里通常会发送表单数据到后端
      // 由于我们只实现前端，所以只显示成功消息
      ElMessage({
        message: '表单提交成功！',
        type: 'success'
      });
      // 清空表单
      resetForm(formEl);
    } else {
      ElMessage({
        message: '请完成表单填写！',
        type: 'error'
      });
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped>
.contact-card {
  margin-bottom: 20px;
}

.contact-info, .contact-form {
  padding: 10px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #EBEEF5;
}

.info-list {
  margin-bottom: 25px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.info-item .el-icon {
  margin-right: 10px;
  color: #409EFF;
  font-size: 18px;
}

.info-item span {
  font-size: 15px;
  color: #606266;
}

.map-container {
  margin-top: 20px;
  border: 1px solid var(--bg-quaternary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  height: 300px;
  background-color: var(--bg-tertiary);
  position: relative;
}

.map-iframe {
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

/* 地图加载时的替代内容 */
.map-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-tertiary);
  z-index: 0;
}

.map-container::after {
  content: "地图加载中...";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--text-tertiary);
  font-size: 14px;
  z-index: 0;
}

@media (max-width: 768px) {
  .contact-info, .contact-form {
    margin-bottom: 20px;
  }
  
  .section-title {
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  .info-item {
    margin-bottom: 12px;
  }
  
  .map-container {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .info-item span {
    font-size: 14px;
  }
  
  .map-container {
    height: 200px;
  }
}
</style> 