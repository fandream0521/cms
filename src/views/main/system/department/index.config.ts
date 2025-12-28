import type { DynamicTableConfig } from '@/hooks/useDynamicTable'
import { getAllDepartmentList } from '@/services/department'
import useDepartmentStore from '@/stores/system/department'
import type { ContentConfig, SearchConfig, ModalConfig } from '@/types'
import { offset8hours } from '@/utils/day'
export const searchConfig: SearchConfig = {
  fields: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入部门名称',
    },
    {
      type: 'selection',
      label: '部门领导',
      prop: 'leader',
      placeholder: '请选择部门领导',
      selectionLoader: async () => {
        const departments = await getAllDepartmentList()
        return departments.list.map((department) => ({
          label: department.leader,
          value: department.id,
        }))
      },
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
  name: '部门',
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
      prop: 'leader',
      label: '部门领导',
      minWidth: 200,
      align: 'center',
    },
    {
      type: 'default',
      prop: 'parentId',
      label: '上级部门',
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
      label: '选择上级部门',
      prop: 'departmentId',
      placeholder: '请选择上级部门',
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

const departmentStore = useDepartmentStore()
export const dynamicTableConfig: DynamicTableConfig = {
  fetchFn: departmentStore.fetchDepartmentList,
}
