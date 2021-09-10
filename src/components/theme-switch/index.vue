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
            @click="handleSetTheme(themeName)"
          >
            <span>{{ themeName }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'
import { AppMutationTypes } from '@/store/modules/app/mutation-types'

export default defineComponent({
  name: 'ThemeList',
  setup() {
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
    return {
      themeList,
      activeThemeName,
      handleSetTheme
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  color: #5a5e66;
}
</style>
