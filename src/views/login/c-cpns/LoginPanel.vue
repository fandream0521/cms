<script setup lang='ts'>
import { ref, useTemplateRef } from 'vue';
import { UserFilled, Iphone } from '@element-plus/icons-vue';
import LoginAccount from './LoginAccount.vue';
import LoginPhone from './LoginPhone.vue';
import { useRoute, useRouter } from 'vue-router';
import { local } from '@/utils/cache';
import { CACHE_IS_REMEMBER_PWD } from '@/constants/login';

const accountRef = useTemplateRef("accountRef");
const type = ref("account")
const route = useRoute();
const router = useRouter();


const isRememberPassword = ref<boolean>(local.getItem(CACHE_IS_REMEMBER_PWD) ?? false);

const login = async () => {
  try {
    await accountRef.value?.doLogin(isRememberPassword.value);
    let redirect = "/";
    if (route.query && route.query.redirect) {
      const queryRedirect = route.query.redirect;
      if (queryRedirect instanceof Array) {
        redirect = queryRedirect.join("/");
      }
    }
    router.replace(redirect);
  } catch (err) {
    console.log("登录失败：", err);
  }
}

</script>

<template>
  <div class="panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs v-model="type" class="tabs" stretch type="border-card">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon :size="14">
              <UserFilled />
            </el-icon>
            <span class="text">账号登陆</span>
          </span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon :size="14">
              <Iphone />
            </el-icon>
            <span class="text">手机登录</span>
          </span>
        </template>
        <LoginPhone />
      </el-tab-pane>
    </el-tabs>

    <div class="pwd">
      <el-checkbox v-model="isRememberPassword" label="记住密码" size="large" />
      <router-link to="/forget">忘记密码</router-link>
    </div>
    <el-button class="btn" type="primary" size="large" @click="login">立即登录</el-button>
  </div>
</template>

<style lang="less" scoped>
.panel {
  width: 430px;

  .title {
    font-size: 46px;
    text-align: center;
    line-height: 60px;
  }


  .tabs {
    border: 1px solid #efefef;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .1);
    margin-top: 14px;
    margin-bottom: 5px;

    :deep(.el-tabs__header) {
      margin-bottom: 8px;
    }

    .custom-tabs-label {
      .text {
        margin-left: 5px;
        font-size: 16px;
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
