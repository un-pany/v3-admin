<template>
  <el-dropdown trigger="click" @command="handleSetTheme">
    <el-tooltip effect="dark" content="主题模式" placement="bottom">
      <el-icon :size="20">
        <magic-stick />
      </el-icon>
    </el-tooltip>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(theme, index) in themeList"
          :key="index"
          :disabled="activeThemeName === theme.name"
          :command="theme.name"
        >
          <span>{{ theme.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { MagicStick } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { store } from '@/store'

const themeList = computed(() => {
  return store.state.app.themeList
})
const activeThemeName = computed(() => {
  return store.state.app.activeThemeName
})
const handleSetTheme = (name: string) => {
  store.commit('app/SET_THEME', name)
}
</script>
