<template>
  <div>
    <el-dropdown trigger="click">
      <svg-icon name="theme" font-size="20px" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(theme, index) in themeList"
            :key="index"
            :disabled="activeThemeName === theme.name"
            @click="handleSetTheme(theme.name)"
          >
            <span>{{ theme.title }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { computed } from 'vue'
import { AppMutationTypes } from '@/store/modules/app/mutation-types'

const store = useStore()
const themeList = computed(() => {
  return store.state.app.themeList
})
const activeThemeName = computed(() => {
  return store.state.app.activeThemeName
})
const handleSetTheme = (name: string) => {
  store.commit(AppMutationTypes.SET_THEME, name)
}

</script>

<style lang="scss" scoped>
</style>
