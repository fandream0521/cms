import type { DynamicTableConfig } from '@/hooks/useDynamicTable'
import useRoleStore from '@/stores/system/role'
import type { ContentConfig, SearchConfig, ModalConfig } from '@/types'
import { offset8hours } from '@/utils/day'
export const searchConfig: SearchConfig = {
  fields: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称',
    },
    {
      type: 'input',
      label: '角色介绍',
      prop: 'intro',
      placeholder: '请输入角色介绍',
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
  name: '角色',
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
      label: '角色名称',
      minWidth: 200,
      align: 'center',
    },
    {
      type: 'default',
      prop: 'intro',
      label: '角色介绍',
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
  name: '角色',
  ignorePasswordWhenEdit: true,
  fields: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称',
    },
    {
      type: 'input',
      label: '角色介绍',
      prop: 'intro',
      placeholder: '请输入角色介绍',
    },
    {
      type: 'custom',
      prop: 'menuList',
      slotName: 'menuList',
    },
  ],
}

const roleStore = useRoleStore()
export const dynamicTableConfig: DynamicTableConfig = {
  fetchFn: roleStore.fetchRolePage,
}
