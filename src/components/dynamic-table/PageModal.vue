<script setup lang='ts'>

import type { ModalConfig, SelectionOption } from '@/types';
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{ config: ModalConfig, editData: Record<string, unknown> | null }>();
const dialogVisible = defineModel<boolean>({ required: true })
defineEmits(["createOrEdit"])

const formData = ref<Record<string, string | number>>({});
const loadedOptions = ref<Record<string, SelectionOption[]>>({});


const resetUser = () => {
  formData.value = {} as Record<string, string | number>;
}

watch(() => props.editData, (editData) => {
  if (editData) {
    formData.value = editData as Record<string, string | number>;
  } else {
    formData.value = {};
  }
})


onMounted(async () => {
  for (const item of props.config.fields) {
    if (item.type === 'selection' && item.selectionLoader) {
      loadedOptions.value[item.prop] = await item.selectionLoader()
    }
  }
})
</script>

<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" :title="!editData ? `新增${config.name}` : `编辑${config.name}`" width="500" center
      @closed="resetUser">
      <el-form :model="formData" label-width="80px" size="large">
        <template v-for="(item, idx) in config.fields" :key="item.prop === ''? idx : item.prop">
          <template v-if="item.type === 'input'">
            <el-form-item :label="item.label" :prop="item.prop">
              <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" clearable />
            </el-form-item>
          </template>
          <template v-else-if="item.type === 'password'">
            <el-form-item :label="item.label" :prop="item.prop"
              v-if="config.ignorePasswordWhenEdit && editData ? false : true">
              <el-input v-model="formData[item.prop]" type="password" :placeholder="item.placeholder" clearable
                show-password />
            </el-form-item>
          </template>
          <template v-else-if="item.type === 'selection'">
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
          </template>
          <template v-else-if="item.type === 'date-time'">
            <el-form-item :label="item.label" :prop="item.prop">
              <el-date-picker v-model="formData[item.prop]" type="datetimerange" range-separator="-"
                start-placeholder="开始时间" end-placeholder="结束时间" />
            </el-form-item>
          </template>
        </template>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="$emit('createOrEdit', formData)">
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
