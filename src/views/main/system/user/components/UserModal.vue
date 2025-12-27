<script setup lang='ts'>
import { getAllDepartmentList } from '@/services/department';
import { getAllRoleList } from '@/services/role';
import type { UserCreateOrUpdateDto } from '@/types';
import type { DepartmentListDto } from '@/types/department.type';
import type { RoleListDto } from '@/types/role.type';
import { onMounted, ref, watch } from 'vue'
const props = defineProps<{ user: UserCreateOrUpdateDto }>();
const dialogVisible = defineModel<boolean>({ required: true })
defineEmits(["createOrEditUser"])

const userInfo = ref(props.user);
const roleList = ref<RoleListDto[]>([]);
const departmentList = ref<DepartmentListDto[]>([])


const getAllRole = async () => {
  const res = await getAllRoleList();
  roleList.value = res.list;
}
const getAllDepartment = async () => {
  const res = await getAllDepartmentList();
  departmentList.value = res.list;
}
const resetUser = () => {
  userInfo.value = {} as unknown as UserCreateOrUpdateDto;
}
watch(() => props.user, (user) => {
  userInfo.value = user;
})

onMounted(() => {
  getAllDepartment();
  getAllRole();
})
</script>

<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" :title="!userInfo.id ? '新增用户' : '编辑用户'" width="500" center @closed="resetUser">
      <el-form :model="userInfo" label-width="80px" size="large">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userInfo.name" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="userInfo.realname" placeholder="请输入真实姓名" clearable />
        </el-form-item>
        <el-form-item label="密码" v-if="!userInfo.id">
          <el-input v-model="userInfo.password" type="password" placeholder="请输入密码" clearable show-password />
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="userInfo.cellphone" placeholder="请输入真实姓名" clearable />
        </el-form-item>
        <el-form-item label="选择角色">
          <el-select v-model="userInfo.roleId" placeholder="请选择角色">
            <el-option v-for="role in roleList" :label="role.name" :value="role.id" :key="role.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门">
          <el-select v-model="userInfo.departmentId" placeholder="请选择部门">
            <el-option v-for="department in departmentList" :label="department.name" :value="department.id"
              :key="department.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="$emit('createOrEditUser', userInfo)">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.modal {
  .el-form {
    margin-top: 20px;
  }
}
</style>
