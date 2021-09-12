<template>
  <div :class="{'has-logo': showLogo}">
    <SidebarLogo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="!isCollapse"
        :unique-opened="true"
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SidebarItem from './sidebar-item.vue'
import SidebarLogo from './sidebar-logo.vue'
import variables from '@/styles/variables.scss'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem,
    SidebarLogo
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })
    const routes = computed(() => {
      return store.state.permission.routes
    })
    const showLogo = computed(() => {
      return store.state.settings.showSidebarLogo
    })

    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta !== null || meta !== undefined) {
        if (meta.activeMenu) {
          return meta.activeMenu
        }
      }
      return path
    })

    const isCollapse = computed(() => {
      return sidebar.value.opened
    })

    return {
      sidebar,
      routes,
      showLogo,
      variables,
      activeMenu,
      isCollapse
    }
  }
})
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}

::v-deep(.el-menu-item) {
  font-size: 13px !important;
  height: 65px !important;
  line-height: 65px !important;
  &:hover {
    background-color: rgba(52, 78, 104, 0.5) !important;
  }
  &.is-active {
    border-left: 4px solid #39cedd !important;
  }
}

::v-deep(.el-sub-menu__title) {
  height: 65px !important;
  line-height: 65px !important;
  &:hover {
    background-color: rgba(52, 78, 104, 0.5) !important;
  }
}

::v-deep(.el-sub-menu .el-menu-item) {
  height: 60px !important;
  line-height: 60px !important;
}
</style>
