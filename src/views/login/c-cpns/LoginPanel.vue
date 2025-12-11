<script setup lang='ts'>
import { ref } from 'vue';
import { UserFilled, Iphone } from '@element-plus/icons-vue';
import LoginPassword from './LoginPassword.vue';
import LoginPhone from './LoginPhone.vue';

const loginInfo = ref<LoginOption>({
  type: 'password',
  account: '',
  phone: '',
  password: '',
  checkCode: '',
  isRememberPassword: false
});

const login = () => {
  console.log(loginInfo.value);
}

</script>

<template>
  <div class="panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs v-model="loginInfo.type" class="tabs" stretch>
      <el-tab-pane name="password">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon :size="10">
              <UserFilled />
            </el-icon>
            <span class="text">账号登陆</span>
          </span>
        </template>
        <LoginPassword v-model="loginInfo" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon :size="10">
              <Iphone />
            </el-icon>
            <span class="text">手机登录</span>
          </span>
        </template>
        <LoginPhone v-model="loginInfo" />
      </el-tab-pane>
    </el-tabs>

    <div class="pwd">
      <el-checkbox v-model="loginInfo.isRememberPassword" label="记住密码" size="large" />
      <router-link to="/forget">忘记密码</router-link>
    </div>
    <el-button class="btn" type="primary" size="large" @click="login">立即登录</el-button>
  </div>
</template>

<style lang="less" scoped>
.panel {
  width: 330px;

  .title {
    font-size: 46px;
    text-align: center;
    line-height: 60px;
  }


  .tabs {
    border: 1px solid #eee;
    margin-top: 14px;
    margin-bottom: 5px;

    :deep(.el-tabs__header) {
      margin-bottom: 4px;
    }

    .custom-tabs-label {

      .text {
        margin-left: 5px;
      }
    }
  }

  .pwd {
    display: flex;
    justify-content: space-between;
    align-items: center;


    a {
      font-size: 14px;
      color: var(--el-color-primary);
    }
  }

  .btn {
    width: 100%;
  }
}
</style>
