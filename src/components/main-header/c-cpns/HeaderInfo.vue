<script setup lang='ts'>
import useLoginStore from '@/stores/login';
import { ChatDotRound, Message, Search, SwitchButton, InfoFilled, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const loginStore = useLoginStore();
const { clearLogin } = loginStore;
const router = useRouter();
function handleExitClick() {
  clearLogin();
  router.push('/login')
}
</script>

<template>
  <div class="head-info">
    <div class="operations">
      <span>
        <el-icon>
          <Message />
        </el-icon>
      </span>
      <span>
        <el-icon class="dot">
          <ChatDotRound />
        </el-icon>
      </span>
      <span>
        <el-icon>
          <Search />
        </el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="24" />
          <span class="text">
            fandream
          </span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon>
                <SwitchButton />
              </el-icon>
              <span>退出登录</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon>
                <InfoFilled />
              </el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon>
                <Lock />
              </el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.head-info {

  display: flex;
  align-items: center;
  padding: 0 10px;

  .operations {
    margin: 0 20px;

    span {
      position: relative;
      margin: 0 8px;

      .el-icon {
        font-size: 18px;
        vertical-align: bottom;
      }
    }

    .dot {

      &::after {
        content: "";
        position: absolute;
        height: 4px;
        width: 4px;
        border-radius: 50%;

        background-color: red;

        z-index: 10;

        top: -2px;
        right: -2px;
      }

    }
  }

  .info {
    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;

      .text {
        margin-left: 5px;
        font-size: 16px;
      }
    }
  }
}
</style>
