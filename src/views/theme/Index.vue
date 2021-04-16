<!-- 更改 element 的主题 Demo -->

<template>
  <div class="app-container">
    <span class="field-label">{{ t('theme.change') }} : </span>
    <el-switch v-model="theme" />
    <div class="block">
      <el-button type="primary">
        Primary
      </el-button>
      <el-button type="success">
        Success
      </el-button>
      <el-button type="info">
        Info
      </el-button>
      <el-button type="warning">
        Warning
      </el-button>
      <el-button type="danger">
        Danger
      </el-button>
    </div>
    <div class="block">
      <el-radio-group v-model="radio">
        <el-radio :label="3">
          Option A
        </el-radio>
        <el-radio :label="6">
          Option B
        </el-radio>
      </el-radio-group>
    </div>
    <div class="block">
      <el-slider v-model="slideValue" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { toggleClass } from '@/utils'
import '@/assets/custom-theme/index.css' // the theme changed version element-ui css
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'Theme',
  setup() {
    const { t } = useI18n()
    const dataMap = reactive({
      theme: false,
      slideValue: 50,
      radio: 3
    })

    watch(() => dataMap.theme, () => {
      toggleClass(document.body, 'custom-theme')
    })

    return { t, ...toRefs(dataMap) }
  }
})
</script>

<style lang="scss" scoped>
.field-label {
  vertical-align: middle;
}
.block {
  padding: 30px 24px;
}
</style>
