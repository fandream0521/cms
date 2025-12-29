import type { DynamicTableConfig } from '@/hooks/useDynamicTable'
import { getAllDepartmentList } from '@/services/department'
import useMenuStore from '@/stores/system/menu'
import type { ContentConfig, ModalConfig } from '@/types'
import { offset8hours } from '@/utils/day'

export const contentConfig: ContentConfig = {
  name: '菜单',
  fields: [
    {
      type: 'default',
      prop: 'name',
      label: '菜单名称',
      minWidth: 200,
      align: 'center',
    },
    {
      type: 'default',
      prop: 'type',
      label: '级别',
      minWidth: 200,
      align: 'center',
    },
    {
      type: 'default',
      prop: 'url',
      label: '菜单url',
      minWidth: 200,
      align: 'center',
    },
    {
      type: 'default',
      prop: 'icon',
      label: '菜单icon',
      minWidth: 200,
      align: 'center',
    },
    {
      type: 'default',
      prop: 'sort',
      label: '排序',
      minWidth: 200,
      align: 'center',
    },
    {
      type: 'default',
      prop: 'auth',
      label: '权限',
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
  name: '菜单',
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

const menuStore = useMenuStore()
export const dynamicTableConfig: DynamicTableConfig = {
  fetchFn: menuStore.fetchMenuTree,
}
