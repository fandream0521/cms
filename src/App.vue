<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="app">
      <RouterView />
    </div>
  </el-config-provider>

</template>

<style scoped lang="less">
.app {
  height: 100vh;
  width: 100vw;
}

.test {
  color: green;

  :deep(.inner) {
    color: yellow;
  }
}
</style>
