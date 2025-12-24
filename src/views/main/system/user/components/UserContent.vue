<script setup lang='ts'>
import useUserStore from '@/stores/system/user';
import { Edit, Delete } from '@element-plus/icons-vue';
import type { UserSearchDto } from '@/types';
import { storeToRefs } from 'pinia';

const searchForm = defineModel<UserSearchDto>({ required: true })

const userStore = useUserStore();
const { userPage } = storeToRefs(userStore);

const curPageChangeHandle = async () => {
  await userStore.fetchUserList(searchForm.value)
}
</script>

<template>
  <div class="content">
    <header>
      <h3 class="title">
        用户列表
      </h3>
      <el-button type="primary">新建用户</el-button>
    </header>
    <main class="table">
      <el-table :data="userPage.list" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" label="名称" :min-width="200" align="center" />
        <el-table-column prop="realname" label="真实名称" :min-width="200" align="center" />
        <el-table-column prop="cellphone" label="电话" :min-width="200" align="center" />
        <el-table-column prop="enable" label="状态"
          :formatter="(_row, _column, cellVal) => { return cellVal === 1 ? '开启' : '禁用'; }" :min-width="200"
          align="center" />
        <el-table-column prop="createAt" label="创建时间" :min-width="200" align="center" />
        <el-table-column prop="updateAt" label="更新时间" :min-width="200" align="center" />
        <el-table-column fixed="right" label="操作" min-width="120" align="center">
          <template #default>
            <el-button link type="primary" size="small" :icon="Edit">编辑</el-button>
            <el-button link type="danger" size="small" :icon="Delete">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next, sizes" v-model:page-size="searchForm.size"
        v-model:current-page="searchForm.curPage" :total="userPage?.totalCount" @current-change="curPageChangeHandle"
        @size-change="curPageChangeHandle" />
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
