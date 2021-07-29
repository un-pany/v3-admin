<template>
  <div>
    <el-dropdown trigger="click">
      <svg-icon name="theme" font-size="20px" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in themeList"
            :key="item.name"
            :disabled="activeThemeName === item.name"
            @click="handleSetLanguage(item.name)"
          >
            <span>{{ t(`theme.${item.name}`) }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
import { SettingsActionTypes } from '@/store/modules/settings/action-types'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'ThemeList',
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const themeList = computed(() => {
      return store.state.settings.themeList
    })
    const activeThemeName = computed(() => {
      return store.state.settings.activeThemeName
    })
    const handleSetLanguage = (name: string) => {
      store.dispatch(SettingsActionTypes.ACTION_CHANGE_SETTING, {
        key: 'activeThemeName',
        value: name
      })
      ElMessage({
        message: '切换主题成功',
        type: 'success'
      })
    }
    return {
      t,
      themeList,
      activeThemeName,
      handleSetLanguage
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  color: #5a5e66;
}
</style>
