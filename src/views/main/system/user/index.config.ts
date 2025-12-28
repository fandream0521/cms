import type { DynamicTableConfig } from '@/hooks/useDynamicTable'
import { getAllDepartmentList } from '@/services/department'
import { getAllRoleList } from '@/services/role'
import useUserStore from '@/stores/system/user'
import type { ContentConfig, ModalConfig, SearchConfig } from '@/types'
import { offset8hours } from '@/utils/day'
export const searchConfig: SearchConfig = {
  fields: [
    {
      type: 'input',
      label: '用户名',
      prop: 'name',
      placeholder: '请输入用户名',
    },
    {
      type: 'input',
      label: '真实姓名',
      prop: 'realname',
      placeholder: '请输入真实姓名',
    },
    {
      type: 'input',
      label: '手机号',
      prop: 'cellphone',
      placeholder: '请输入手机号',
    },
    {
      type: 'selection',
      label: '状态',
      prop: 'enable',
      placeholder: '请选择查询的状态',
      selectionOptions: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
    {
      type: 'date-time',
      label: '创建时间',
      prop: 'createAt',
      placeholder: '',
    },
  ],
}

export const contentConfig: ContentConfig = {
  name: '用户',
  fields: [
    {
      type: 'selection',
      prop: '',
      width: '55',
    },
    {
      type: 'index',
      prop: '',
      label: '序号',
      width: '60',
      align: 'center',
    },
    {
      type: 'default',
      prop: 'name',
      label: '名称',
      minWidth: 200,
      align: 'center',
    },
    {
      type: 'default',
      prop: 'realname',
      label: '真实名称',
      minWidth: 200,
      align: 'center',
    },
    {
      type: 'default',
      prop: 'cellphone',
      label: '电话',
      minWidth: 200,
      align: 'center',
    },
    {
      type: 'custom',
      prop: 'enable',
      slotName: 'enable',
      label: '状态',
      minWidth: 200,
      align: 'center',
    },
    {
      type: 'default',
      prop: 'createAt',
      label: '创建时间',
      minWidth: 200,
      align: 'center',
      formatter: (row) => offset8hours(row),
    },
    {
      type: 'default',
      prop: 'updateAt',
      label: '更新时间',
      minWidth: 200,
      align: 'center',
      formatter: (row) => offset8hours(row),
    },
    {
      type: 'handler',
      prop: '',
      label: '操作',
      minWidth: 120,
      align: 'center',
      fixed: 'right',
      slotName: 'handler',
    },
  ],
}

export const modalConfig: ModalConfig = {
  name: '用户',
  ignorePasswordWhenEdit: true,
  fields: [
    {
      type: 'input',
      label: '用户名',
      prop: 'name',
      placeholder: '请输入用户名',
    },
    {
      type: 'input',
      label: '真实姓名',
      prop: 'realname',
      placeholder: '请输入真实姓名',
    },
    {
      type: 'input',
      label: '手机号',
      prop: 'cellphone',
      placeholder: '请输入手机号',
    },
    {
      type: 'password',
      label: '密码',
      prop: 'password',
      placeholder: '请输入手机号',
    },
    {
      type: 'selection',
      label: '状态',
      prop: 'enable',
      placeholder: '请选择查询的状态',
      selectionOptions: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
    {
      type: 'selection',
      label: '选择角色',
      prop: 'roleId',
      placeholder: '请选择角色',
      selectionLoader: async () => {
        const roleList = await getAllRoleList()
        return roleList.list.map((role) => ({
          label: role.name,
          value: role.id,
        }))
      },
    },
    {
      type: 'selection',
      label: '选择部门',
      prop: 'departmentId',
      placeholder: '请选择部门',
      selectionLoader: async () => {
        const departments = await getAllDepartmentList()
        return departments.list.map((department) => ({
          label: department.name,
          value: department.id,
        }))
      },
    },
  ],
}

const userStore = useUserStore()
export const dynamicTableConfig: DynamicTableConfig = {
  fetchFn: userStore.fetchUserList,
  createFn: userStore.createUserInfo as unknown as (dto: Record<string, unknown>) => Promise<void>,
  updateFn: userStore.updateUserInfo as unknown as (dto: Record<string, unknown>) => Promise<void>,
  deleteFn: userStore.deleteUserInfo,
}
