<script setup lang='ts'>
import { Search, RefreshRight } from '@element-plus/icons-vue'
import type { SearchConfig, SelectionOption } from '@/types'
import { ref, useTemplateRef, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'

const props = defineProps<{ config: SearchConfig }>();
const emit = defineEmits(["search", "reset"])


const formData = ref<Record<string, string>>({});
const loadedOptions = ref<Record<string, SelectionOption[]>>({});

const formRef = useTemplateRef<FormInstance>('formRef');

const resetForm = (formEl: FormInstance | null | undefined) => {
  console.log(formEl)
  if (!formEl) return
  formEl.resetFields()
  emit('reset')
}

onMounted(async () => {
  for (const item of props.config.fields) {
    if (item.type === 'selection' && item.selectionLoader) {
      loadedOptions.value[item.prop] = await item.selectionLoader()
    }
  }
})
</script>

<template>
  <div class="search">
    <el-form :model="formData" class="demo-form-inline" label-position="right" label-width="100px" size="large"
      ref="formRef">
      <el-row :gutter="20">
        <template v-for="(item, idx) in config.fields" :key="item.prop === ''? idx : item.prop">
          <template v-if="item.type === 'input'">
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" clearable />
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'password'">
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input v-model="formData[item.prop]" type="password" :placeholder="item.placeholder" clearable
                  show-password />
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'selection'">
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-select v-model="formData[item.prop]" :placeholder="item.placeholder" clearable>
                  <template v-if="item.selectionOptions && item.selectionOptions.length > 0">
                    <el-option v-for="option in item.selectionOptions" :label="option.label" :value="option.value"
                      :key="option.value" />
                  </template>
                  <template v-else-if="loadedOptions[item.prop]">
                    <el-option v-for="option in loadedOptions[item.prop]" :label="option.label" :value="option.value"
                      :key="option.value" />
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'date-time'">
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-date-picker v-model="formData[item.prop]" type="datetimerange" range-separator="-"
                  start-placeholder="开始时间" end-placeholder="结束时间" />
              </el-form-item>
            </el-col>
          </template>
        </template>
      </el-row>
      <div class="btns">
        <el-button @click="resetForm(formRef)" :icon="RefreshRight">重置</el-button>
        <el-button type="primary" @click="$emit('search', formData)" :icon="Search">搜索</el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.search {
  background-color: white;
  border-radius: 10px;
  padding: 10px 0;

  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 20px;

    .el-button {
      height: 36px;
    }
  }
}
</style>
