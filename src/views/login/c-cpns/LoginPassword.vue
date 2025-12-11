<script setup lang='ts'>
import { type FormRules } from 'element-plus';
import { reactive } from 'vue';

const loginInfo = defineModel<LoginOption>({ required: true });

const rules = reactive<FormRules<LoginOption>>({
  account: [
    { required: true, message: '请输入账户', trigger: 'blur' },
    { min: 5, message: '账户不少于5个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不能少于6个', trigger: 'blur' },
  ],
})
</script>

<template>
  <div class="password">
    <el-form style="max-width: 600px" :model="loginInfo" label-width="auto" label-position="left" :rules="rules">
      <el-form-item label="账号" prop="account" size="large" class="item">
        <el-input v-model="loginInfo.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password" size="large" class="item">
        <el-input v-model="loginInfo.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.password {
  padding: 0 20px;

  .item {
    margin: 20px 0;
  }
}
</style>
