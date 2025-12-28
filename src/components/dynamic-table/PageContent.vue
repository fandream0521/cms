<script setup lang='ts'>
import { Edit, Delete } from '@element-plus/icons-vue';
import type { ContentConfig } from '@/types';
import { ref } from 'vue';
defineProps<{ config: ContentConfig, list: Record<string, unknown>[], total: number }>();
defineEmits(["save", "edit", "delete", "pageChange", "sizeChange"]);

const curPage = ref(1);
const pageSize = ref(10);

</script>

<template>
  <div class="content">
    <header>
      <h3 class="title">
        {{ config.name }}列表
      </h3>
      <el-button type="primary" @click="$emit('save')">新建{{ config.name }}</el-button>
    </header>
    <main class="table">
      <el-table :data="list" style="width: 100%" :style="config.style">
        <template v-for="(item, idx) in config.fields" :key="item.prop === '' ? idx : item.prop">
          <template v-if="item.type === 'custom'">
            <el-table-column v-bind="item">
              <template #default="{ row }">
                <slot :name="item.slotName" :data="row" :prop="item.prop" :val="row[item.prop]">
                  {{ row[item.prop] }}
                </slot>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item">
              <template #default="{ row }">
                <slot :name="item.slotName" :data="row" :prop="item.prop" :val="row[item.prop]">
                  <el-button link type="primary" size="small" :icon="Edit" @click="$emit('save', row)">编辑</el-button>
                  <el-button link type="danger" size="small" :icon="Delete" @click="$emit('delete', row.id)">
                    删除
                  </el-button>
                </slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item" :formatter="row => {
              if (item.formatter) {
                return item.formatter(row[item.prop])
              }
              return row[item.prop];
            }" />
          </template>
        </template>
      </el-table>
    </main>
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next, sizes" v-model:page-size="pageSize"
        v-model:current-page="curPage" :total="total" @current-change="$emit('pageChange', curPage)"
        @size-change="$emit('sizeChange', pageSize)" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 0 20px;
  border-radius: 10px;
  background-color: white;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;

    .title {
      font-size: 26px;
    }
  }

  .table {
    :deep(.el-table__cell) {
      padding: 12px 0;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;

    .el-pagination {
      margin: 20px;
    }
  }
}
</style>
