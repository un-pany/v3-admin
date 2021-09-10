<!-- 设置页面 -->
<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">
        系统布局配置
      </h3>
      <div class="drawer-item">
        <span>显示 Tags-View</span>
        <el-switch v-model="showTagsView" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示侧边栏 Logo</span>
        <el-switch v-model="showSidebarLogo" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>固定 Header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示换肤按钮</span>
        <el-switch v-model="showThemeSwitch" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示全屏按钮</span>
        <el-switch v-model="showScreenfull" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { SettingsActionTypes } from '@/store/modules/settings/action-types'
import { defineComponent, reactive, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'Settings',
  setup() {
    const store = useStore()
    const state = reactive({
      fixedHeader: store.state.settings.fixedHeader,
      showTagsView: store.state.settings.showTagsView,
      showSidebarLogo: store.state.settings.showSidebarLogo,
      showThemeSwitch: store.state.settings.showThemeSwitch,
      showScreenfull: store.state.settings.showScreenfull
    })

    watch(
      () => state.fixedHeader,
      (value) => {
        store.dispatch(SettingsActionTypes.ACTION_CHANGE_SETTING, {
          key: 'fixedHeader',
          value
        })
      }
    )

    watch(
      () => state.showTagsView,
      (value) => {
        store.dispatch(SettingsActionTypes.ACTION_CHANGE_SETTING, {
          key: 'showTagsView',
          value
        })
      }
    )

    watch(
      () => state.showSidebarLogo,
      (value) => {
        store.dispatch(SettingsActionTypes.ACTION_CHANGE_SETTING, {
          key: 'showSidebarLogo',
          value
        })
      }
    )

    watch(
      () => state.showThemeSwitch,
      (value) => {
        store.dispatch(SettingsActionTypes.ACTION_CHANGE_SETTING, {
          key: 'showThemeSwitch',
          value
        })
      }
    )

    watch(
      () => state.showScreenfull,
      (value) => {
        store.dispatch(SettingsActionTypes.ACTION_CHANGE_SETTING, {
          key: 'showScreenfull',
          value
        })
      }
    )

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
