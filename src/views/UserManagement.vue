<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-left">
        <el-button @click="goBack" :icon="Back" circle></el-button>
        <h2 class="page-title">用户管理</h2>
      </div>
      <div class="header-right">
        <el-input
          v-model="searchQuery"
          placeholder="搜索用户"
          :prefix-icon="Search"
          clearable
          @clear="handleSearchClear"
        />
        <el-button type="primary" @click="handleAddUser">
          <el-icon><Plus /></el-icon>添加用户
        </el-button>
      </div>
    </div>

    <div class="page-content">
      <!-- 统计卡片 -->
      <el-row :gutter="20" class="stats-row">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" v-for="(stat, index) in statsData" :key="index">
          <el-card shadow="hover" class="stats-card">
            <div class="stats-icon" :style="{ backgroundColor: stat.color }">
              <el-icon><component :is="stat.icon"></component></el-icon>
            </div>
            <div class="stats-info">
              <div class="stats-title">{{ stat.title }}</div>
              <div class="stats-value">{{ stat.value }}</div>
              <div class="stats-subtitle" v-if="stat.subtitle">{{ stat.subtitle }}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 用户表格 -->
      <el-card shadow="hover" class="table-card">
        <div class="table-header">
          <div class="table-title">
            <h3>用户列表</h3>
            <el-tag type="info">共 {{ totalUsers }} 条记录</el-tag>
          </div>
          <div class="table-actions">
            <el-button-group v-if="selectedUsers.length > 0">
              <el-button size="small" type="danger" @click="handleBatchDelete">
                批量删除({{ selectedUsers.length }})
              </el-button>
              <el-button size="small" type="warning" @click="handleBatchDisable">
                批量禁用({{ selectedUsers.length }})
              </el-button>
            </el-button-group>
            <el-button size="small" type="primary" @click="refreshUserList">
              <el-icon><Refresh /></el-icon>刷新
            </el-button>
          </div>
        </div>

        <div class="table-container">
          <el-table
            :data="filteredUserList"
            style="width: 100%"
            border
            stripe
            highlight-current-row
            @selection-change="handleSelectionChange"
            v-loading="tableLoading"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="name" label="姓名" width="120">
              <template #default="scope">
                <div class="user-info">
                  <el-avatar :size="32" :src="scope.row.avatar"></el-avatar>
                  <span>{{ scope.row.name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="role" label="角色" width="120">
              <template #default="scope">
                <el-tag :type="getRoleType(scope.row.role)">{{ scope.row.role }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="180" />
            <el-table-column prop="phone" label="电话" width="150" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-text="启用"
                  inactive-text="禁用"
                  @change="(val) => handleStatusChange(val, scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180" />
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="scope">
                <el-button-group>
                  <el-button size="small" type="primary" @click="handleEdit(scope.row)">
                    <el-icon><Edit /></el-icon>编辑
                  </el-button>
                  <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                    <el-icon><Delete /></el-icon>删除
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="table-footer">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalUsers"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>

    <!-- 用户表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '添加用户' : '编辑用户'"
      width="500px"
      destroy-on-close
    >
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userFormRules"
        label-width="80px"
        label-position="right"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择角色" style="width: 100%">
            <el-option label="管理员" value="管理员" />
            <el-option label="编辑" value="编辑" />
            <el-option label="用户" value="用户" />
            <el-option label="访客" value="访客" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="userForm.phone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="userForm.status"
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitUserForm">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
    Avatar,
    Back,
    CircleCloseFilled,
    Delete,
    Edit,
    Plus,
    Refresh,
    Search,
    User,
    UserFilled
} from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const totalUsers = ref(100);
const selectedUsers = ref([]);
const tableLoading = ref(false);
const dialogVisible = ref(false);
const dialogType = ref('add'); // 'add' 或 'edit'
const userFormRef = ref(null);

// 用户表单
const userForm = reactive({
  id: '',
  name: '',
  role: '',
  email: '',
  phone: '',
  status: true,
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
});

// 表单验证规则
const userFormRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
};

// 统计卡片数据
const statsData = ref([
  {
    title: '总用户',
    value: '1,254',
    icon: User,
    color: '#409EFF'
  },
  {
    title: '活跃用户',
    value: '856',
    icon: UserFilled,
    color: '#67C23A'
  },
  {
    title: '新增用户',
    value: '128',
    subtitle: '本月',
    icon: Avatar,
    color: '#E6A23C'
  },
  {
    title: '禁用用户',
    value: '24',
    icon: CircleCloseFilled,
    color: '#F56C6C'
  }
]);

// 模拟用户数据
const userList = ref([
  {
    id: 1,
    name: '张三',
    role: '管理员',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    status: true,
    createTime: '2023-01-15 08:30:00',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    id: 2,
    name: '李四',
    role: '编辑',
    email: 'lisi@example.com',
    phone: '13900139000',
    status: true,
    createTime: '2023-02-20 10:15:00',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    id: 3,
    name: '王五',
    role: '用户',
    email: 'wangwu@example.com',
    phone: '13700137000',
    status: false,
    createTime: '2023-03-10 14:20:00',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    id: 4,
    name: '赵六',
    role: '访客',
    email: 'zhaoliu@example.com',
    phone: '13600136000',
    status: true,
    createTime: '2023-04-05 09:45:00',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    id: 5,
    name: '钱七',
    role: '编辑',
    email: 'qianqi@example.com',
    phone: '13500135000',
    status: true,
    createTime: '2023-05-12 16:30:00',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  }
]);

// 过滤后的用户列表
const filteredUserList = computed(() => {
  if (!searchQuery.value) {
    return userList.value;
  }
  const query = searchQuery.value.toLowerCase();
  return userList.value.filter(
    user => 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query) ||
      user.phone.includes(query)
  );
});

// 获取角色类型
const getRoleType = (role) => {
  const roleMap = {
    '管理员': 'danger',
    '编辑': 'warning',
    '用户': 'success',
    '访客': 'info'
  };
  return roleMap[role] || 'info';
};

// 返回上一页
const goBack = () => {
  const fromRoute = router.currentRoute.value.query.from;
  if (fromRoute) {
    router.push(`/${fromRoute === 'home' ? '' : fromRoute}`);
  } else {
    router.push('/');
  }
};

// 清空搜索
const handleSearchClear = () => {
  searchQuery.value = '';
};

// 选择变化
const handleSelectionChange = (selection) => {
  selectedUsers.value = selection;
};

// 改变每页显示数量
const handleSizeChange = (val) => {
  pageSize.value = val;
  // 在实际应用中，这里应该重新请求数据
  console.log('每页显示数量变更为:', val);
};

// 改变页码
const handleCurrentChange = (val) => {
  currentPage.value = val;
  // 在实际应用中，这里应该重新请求数据
  console.log('当前页变更为:', val);
};

// 刷新用户列表
const refreshUserList = () => {
  tableLoading.value = true;
  setTimeout(() => {
    tableLoading.value = false;
    ElMessage({
      message: '用户列表已刷新',
      type: 'success'
    });
  }, 800);
};

// 添加用户
const handleAddUser = () => {
  dialogType.value = 'add';
  Object.keys(userForm).forEach(key => {
    if (key !== 'status' && key !== 'avatar') {
      userForm[key] = '';
    }
  });
  userForm.status = true;
  dialogVisible.value = true;
};

// 编辑用户
const handleEdit = (row) => {
  dialogType.value = 'edit';
  Object.keys(userForm).forEach(key => {
    userForm[key] = row[key];
  });
  dialogVisible.value = true;
};

// 提交用户表单
const submitUserForm = () => {
  userFormRef.value?.validate((valid) => {
    if (valid) {
      if (dialogType.value === 'add') {
        // 添加用户
        const newUser = {
          ...userForm,
          id: userList.value.length + 1,
          createTime: new Date().toLocaleString()
        };
        userList.value.unshift(newUser);
        ElMessage({
          message: '用户添加成功',
          type: 'success'
        });
      } else {
        // 编辑用户
        const index = userList.value.findIndex(user => user.id === userForm.id);
        if (index !== -1) {
          userList.value[index] = { ...userForm };
          ElMessage({
            message: `用户 ${userForm.name} 已更新`,
            type: 'success'
          });
        }
      }
      dialogVisible.value = false;
    } else {
      return false;
    }
  });
};

// 删除用户
const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除用户 ${row.name} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 在实际应用中，这里应该调用API删除用户
    userList.value = userList.value.filter(user => user.id !== row.id);
    ElMessage({
      type: 'success',
      message: '删除成功!'
    });
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除'
    });
  });
};

// 批量删除
const handleBatchDelete = () => {
  if (selectedUsers.value.length === 0) return;
  
  ElMessageBox.confirm(
    `确定要删除选中的 ${selectedUsers.value.length} 个用户吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 在实际应用中，这里应该调用API批量删除用户
    const selectedIds = selectedUsers.value.map(user => user.id);
    userList.value = userList.value.filter(user => !selectedIds.includes(user.id));
    ElMessage({
      type: 'success',
      message: '批量删除成功!'
    });
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除'
    });
  });
};

// 批量禁用
const handleBatchDisable = () => {
  if (selectedUsers.value.length === 0) return;
  
  ElMessageBox.confirm(
    `确定要禁用选中的 ${selectedUsers.value.length} 个用户吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 在实际应用中，这里应该调用API批量禁用用户
    const selectedIds = selectedUsers.value.map(user => user.id);
    userList.value = userList.value.map(user => {
      if (selectedIds.includes(user.id)) {
        return { ...user, status: false };
      }
      return user;
    });
    ElMessage({
      type: 'success',
      message: '批量禁用成功!'
    });
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消操作'
    });
  });
};

// 状态变更
const handleStatusChange = (val, row) => {
  const status = val ? '启用' : '禁用';
  ElMessage({
    message: `用户 ${row.name} 已${status}`,
    type: 'success'
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-3);
  flex-wrap: wrap;
  gap: var(--spacing-3);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.header-right {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

/* 统计卡片 */
.stats-row {
  margin-bottom: var(--spacing-3);
}

.stats-card {
  display: flex;
  align-items: center;
  padding: var(--spacing-3);
  margin-bottom: var(--spacing-3);
  transition: all 0.3s;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.stats-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.stats-icon .el-icon {
  font-size: 24px;
  color: white;
}

.stats-info {
  flex: 1;
}

.stats-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;
}

.stats-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.stats-subtitle {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

/* 表格卡片 */
.table-card {
  margin-bottom: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 15px;
}

.table-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.table-title h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.table-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.table-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

/* 对话框样式 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* 响应式布局调整 */
@media (max-width: 1200px) {
  .stats-card {
    padding: 12px;
  }
  
  .stats-value {
    font-size: 22px;
  }
}

@media (max-width: 992px) {
  .stats-value {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-right {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
  
  .stats-card {
    padding: 10px;
  }
  
  .stats-icon {
    width: 40px;
    height: 40px;
  }
  
  .stats-value {
    font-size: 18px;
  }
  
  .table-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .table-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .table-footer {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .stats-icon {
    width: 36px;
    height: 36px;
  }
  
  .stats-icon .el-icon {
    font-size: 18px;
  }
  
  .el-pagination {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style> 