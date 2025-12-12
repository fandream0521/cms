<script setup lang='ts'>
import { type FormRules } from 'element-plus';
import { reactive } from 'vue';

const loginInfo = defineModel<LoginOption>({ required: true });

const rules = reactive<FormRules<LoginOption>>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 5, message: '手机号不少于5个字符', trigger: 'blur' },
  ],
  checkCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, message: '验证码不能少于6个', trigger: 'blur' },
  ],
})
</script>

<template>
  <div class="phone">
    <el-form style="max-width: 600px" :model="loginInfo" label-width="65px" label-position="right" :rules="rules">
      <el-form-item label="手机号" prop="phone" size="large" class="item">
        <el-input v-model="loginInfo.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="checkCode" size="large" class="item">
        <el-input v-model="loginInfo.checkCode" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.phone {
  padding: 0 20px;

  .item:first-child {
    margin: 15px 0 37px 0;
  }
}
</style>
