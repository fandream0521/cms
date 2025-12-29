export type SearchFieldType =
  | 'input'
  | 'password'
  | 'selection'
  | 'time'
  | 'date-time'
  | 'date'
  | 'custom'

export interface SelectionOption {
  label: string
  value: string | number
}

export interface FormField {
  type: SearchFieldType
  label?: string
  prop: string
  placeholder?: string
  selectionOptions?: SelectionOption[]
  selectionLoader?: () => Promise<SelectionOption[]>
  slotName?: string
}

export interface SearchConfig {
  fields: FormField[]
}

export type ContentFieldType = 'default' | 'index' | 'selection' | 'custom' | 'handler'

export interface ContentField {
  type: ContentFieldType
  label?: string
  slotName?: string
  prop: string
  width?: string
  minWidth?: number
  align?: string
  fixed?: string
  formatter?: (val: string) => string
}

export interface ContentConfig {
  name: string
  style?: string
  fields: ContentField[]
}
export interface ModalConfig {
  name: string
  ignorePasswordWhenEdit: boolean
  fields: FormField[]
}
