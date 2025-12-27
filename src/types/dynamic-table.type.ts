export type SearchFieldType = 'input' | 'password' | 'selection' | 'time' | 'date-time' | 'date'

export interface SelectionOption {
  label: string
  value: string | number
}

export interface FormField {
  type: SearchFieldType
  label: string
  prop: string
  placeholder: string
  selectionOptions?: SelectionOption[]
  selectionLoader?: () => Promise<SelectionOption[]>
}

export interface SearchConfig {
  fields: FormField[]
}

export type ContentFieldType = 'default' | 'index' | 'selection' | 'button'
export type ContentButtonType = 'success' | 'danger'
export interface ButtonConfig {
  typeConvert: Record<string, ContentButtonType>
  valueConverter?: Record<string, unknown>
}

export interface ContentField {
  type: ContentFieldType
  label?: string
  prop: string
  width?: string
  minWidth?: number
  align?: string
  buttonConfig?: ButtonConfig
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
