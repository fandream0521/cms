<script setup lang='ts'>
import { Expand, Fold, ArrowRight } from '@element-plus/icons-vue';
import HeaderInfo from './c-cpns/HeaderInfo.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
defineProps({
  collapse: {
    type: Boolean
  }
})

defineEmits(["collapseClick"])
const route = useRoute();

const matchedRoutes = computed(() => {
  return route.matched.slice(1);
})

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
        <el-breadcrumb :separator-icon="ArrowRight">
          <template v-for="route in matchedRoutes" :key="route.path">
            <el-breadcrumb-item :to="route.path">{{ route.name }}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
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
