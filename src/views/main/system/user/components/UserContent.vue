<script setup lang='ts'>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </main>
    <div class="pagination">
      分页
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
}
</style>
