<script setup lang='ts'>
import { Expand, Fold } from '@element-plus/icons-vue';
import HeaderInfo from './c-cpns/HeaderInfo.vue';

defineProps({
  collapse: {
    type: Boolean
  }
})

defineEmits(["collapseClick"])

</script>

<template>
  <div class="main-header">
    <div class="menu-icon">
      <el-icon :size="34" color="#000" class="icon" @click="$emit('collapseClick')">
        <Fold v-if="collapse" />
        <Expand v-else />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumbs">
        系统
      </div>
      <div class="info">
        <HeaderInfo />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;

  background-color: #eee;

  height: 100%;

  .menu-icon {
    margin: 0 8px;
  }

  .icon {
    vertical-align: bottom;
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
