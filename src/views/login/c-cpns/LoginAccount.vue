<script setup lang='ts'>
import { type FormRules, } from 'element-plus';
import { reactive, useTemplateRef } from 'vue';
import { ElMessage } from 'element-plus'
import type { AccountLoginDto } from '@/types';
import useLoginStore from '@/stores/login';
import { storeToRefs } from 'pinia';
import { local } from '@/utils/cache';
import { CACHE_NAME, CACHE_PWD, CACHE_IS_REMEMBER_PWD } from '@/constants/login';


const ruleFormRef = useTemplateRef("ruleFormRef");
const ruleForm = reactive<AccountLoginDto>({
  name: local.getItem(CACHE_NAME) ?? '',
  password: local.getItem(CACHE_PWD) ?? ''
});

const rules = reactive<FormRules<AccountLoginDto>>({
  name: [
    { required: true, message: '请输入账户', trigger: 'blur' },
    { min: 5, message: '账户不少于5个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不能少于6个', trigger: 'blur' },
  ],
})

const loginStore = useLoginStore();
const { token } = storeToRefs(loginStore);
const { accountLoginAction } = loginStore;

const doLogin = async (isRememberPassword: boolean) => {
  const formEl = ruleFormRef.value;
  if (!formEl) {
    return;
  }
  await formEl.validate(async (isValid, invalidFields) => {
    if (isValid) {
      await accountLoginAction({ ...ruleForm });

      if (isRememberPassword) {
        local.setItem(CACHE_NAME, ruleForm.name);
        local.setItem(CACHE_PWD, ruleForm.password)
        local.setItem(CACHE_IS_REMEMBER_PWD, true)
      } else {
        local.setItem(CACHE_NAME, null);
        local.setItem(CACHE_PWD, null)
        local.setItem(CACHE_IS_REMEMBER_PWD, null)
      }

      ElMessage.success("登录成功")
    } else {
      console.log("error field: ", invalidFields);
      ElMessage.error("请输入正确的信息！")
    }
  })
}

defineExpose({
  doLogin
})
</script>

<template>
  <div class="password">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" label-width="65px" label-position="right"
      :rules="rules" status-icon>
      <el-form-item label="账号" prop="name" size="large" class="item">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password" size="large" class="item">
        <el-input v-model="ruleForm.password" show-password />
      </el-form-item>
    </el-form>
  </div>
  {{ token }}
</template>

<style lang="less" scoped>
.password {
  padding: 0 20px;

  .item:first-child {
    margin: 15px 0 37px 0;
  }
}
</style>
