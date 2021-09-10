<!-- 侧边栏item -->

<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      isCollapse ? 'simple-mode' : 'full-mode',
      {'first-level': isFirstLevel}
    ]"
  >
    <template
      v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
    >
      <SidebarItemLink
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{'submenu-title-noDropdown': isFirstLevel}"
        >
          <svg-icon
            v-if="theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
            font-size="17px"
          />
          <span v-if="theOnlyOneChild.meta.title">{{
            theOnlyOneChild.meta.title
          }}</span>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <svg-icon
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
          font-size="16px"
        />
        <span v-if="item.meta && item.meta.title">{{
          item.meta.title
        }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { computed, defineComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './sidebar-item-link.vue'
export default defineComponent({
  name: 'SidebarItem',
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    isCollapse: {
      type: Boolean,
      required: false
    },
    isFirstLevel: {
      type: Boolean,
      required: false
    },
    basePath: {
      type: String,
      required: true
    }
  },
  components: {
    SidebarItemLink
  },
  setup(props) {
    const alwaysShowRootMenu = computed(() => {
      return !!(props.item.meta && props.item.meta.alwaysShow)
    })

    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item) => {
          return !(item.meta && item.meta.hidden)
        })
        return showingChildren.length
      }
      return 0
    })

    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) {
        return null
      }
      if (props.item.children) {
        for (const child of props.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // If there is no children, return itself with path removed,
      // because this.basePath already contains item's path information
      return { ...props.item, path: '' }
    })

    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return path.resolve(props.basePath, routePath)
    }

    return {
      alwaysShowRootMenu,
      showingChildNumber,
      theOnlyOneChild,
      resolvePath
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep(.el-sub-menu__title) {
  font-size: 13px !important;
}

.full-mode {
  .el-menu-item {
    & > span {
      display: inline-block;
    }
  }
  ::v-deep(.el-sub-menu) {
    overflow: hidden !important;
    & > .el-sub-menu__title {
      .el-sub-menu__icon-arrow {
        display: none !important;
      }
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-sub-menu {
      overflow: hidden;

      & > .el-sub-menu__title {
        padding: 0 !important;

        .el-sub-menu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
svg {
  margin-right: 20px;
}

.simple-mode {
  svg {
    margin-left: 0;
  }
}
</style>
