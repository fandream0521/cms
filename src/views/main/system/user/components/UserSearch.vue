<script setup lang='ts'>
import { Search, RefreshRight } from '@element-plus/icons-vue'
import type { UserSearchDto } from '@/types'
import { reactive, useTemplateRef } from 'vue'
import type { FormInstance } from 'element-plus'
import { getUserList } from '@/services/user'

const searchForm = reactive<UserSearchDto>({
  offset: 0,
  size: 10
})

const formRef = useTemplateRef<FormInstance>('formRef');


const handleQueryClick = async () => {
  const list = await getUserList(searchForm);
  console.log(list);
}

const resetForm = (formEl: FormInstance | null | undefined) => {
  console.log(formEl)
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="user-search">
    <el-form :model="searchForm" class="demo-form-inline" label-position="right" label-width="100px" size="large"
      ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入查询的用户名" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="searchForm.realname" placeholder="请输入查询的真实姓名" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone" placeholder="请输入查询的手机号码" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="searchForm.enable" placeholder="请选择查询的状态" clearable>
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker v-model="searchForm.createAt" type="datetimerange" range-separator="-"
              start-placeholder="开始时间" end-placeholder="结束时间" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="btns">
        <el-button @click="resetForm(formRef)" :icon="RefreshRight">重置</el-button>
        <el-button type="primary" @click="handleQueryClick" :icon="Search">搜索</el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.user-search {
  background-color: white;
  border-radius: 10px;
  padding: 10px 0;

  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 20px;

    .el-button {
      height: 36px;
    }
  }
}
</style>
