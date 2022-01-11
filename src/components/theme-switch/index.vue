<template>
  <el-dropdown trigger="click" @command="handleSetTheme">
    <svg-icon name="theme" font-size="20px" />
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
import { store } from '@/store'
import { computed } from 'vue'

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
