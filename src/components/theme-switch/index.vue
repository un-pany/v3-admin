<template>
  <div>
    <el-dropdown trigger="click">
      <svg-icon name="theme" font-size="20px" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(themeName, index) in themeList"
            :key="index"
            :disabled="activeThemeName === themeName"
            @click="handleSetLanguage(themeName)"
          >
            <span>{{ t(`theme.${themeName}`) }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'
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
