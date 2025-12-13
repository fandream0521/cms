<script setup lang='ts'>
import { type FormRules } from 'element-plus';
import { reactive, useTemplateRef } from 'vue';
import { ElMessage } from 'element-plus'
interface PhoneLoginOption {
  phone: string,
  verifyCode: string
}

const ruleForm = reactive<PhoneLoginOption>({
  phone: '',
  verifyCode: ''
})

const ruleFormRef = useTemplateRef("ruleFormRef");

const rules = reactive<FormRules<PhoneLoginOption>>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 5, message: '手机号不少于5个字符', trigger: 'blur' },
  ],
  verifyCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, message: '验证码不能少于6个', trigger: 'blur' },
  ],
})

const doLogin = async () => {
  const formEl = ruleFormRef.value;
  if (!formEl) {
    return;
  }
  await formEl.validate((isValid, invalidFields) => {
    if (isValid) {
      console.log("do login: ", ruleForm);
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
  <div class="phone">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" label-width="65px" label-position="right"
      :rules="rules" status-icon>
      <el-form-item label="手机号" prop="phone" size="large" class="item">
        <el-input v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode" size="large" class="item">
        <div class="verify-code">
          <el-input v-model="ruleForm.verifyCode" />
          <el-button type="primary" class="verify">获取验证码</el-button>
        </div>
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

  .item {
    .verify-code {
      display: flex;
      flex-flow: nowrap;
    }


    .verify {
      margin-left: 6px;
    }
  }
}
</style>
