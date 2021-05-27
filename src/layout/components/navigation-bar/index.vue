<!-- 导航栏 -->
<template>
  <div class="navbar">
    <Hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />
    <BreadCrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <Screenfull class="right-menu-item hover-effect" />
        <LangSelect class="right-menu-item hover-effect" v-if="langSelect" />
      </template>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            :src="require('@/assets/layout/avatar.gif')"
            class="user-avatar"
          >
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>
                {{ t('navbar.dashboard') }}
              </el-dropdown-item>
            </router-link>
            <a
              target="_blank"
              href="https://juejin.cn/post/6963876125428678693"
            >
              <el-dropdown-item>
                {{ t('navbar.docs') }}
              </el-dropdown-item>
            </a>
            <a target="_blank" href="https://github.com/v3-projects/v3-admin">
              <el-dropdown-item>
                {{ t('navbar.github') }}
              </el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">
                {{ t('navbar.logOut') }}
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/bread-crumb/index.vue'
import Hamburger from '@/components/hamburger/index.vue'
import Screenfull from '@/components/screenfull/index.vue'
import LangSelect from '@/components/lang-select/index.vue'
import { computed, reactive, toRefs, defineComponent } from 'vue'
import { useStore } from '@/store'
import { AppActionTypes } from '@/store/modules/app/action-types'
import { useI18n } from 'vue-i18n'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'NavigationBar',
  components: {
    BreadCrumb,
    Hamburger,
    Screenfull,
    LangSelect
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const { t } = useI18n()
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })
    const device = computed(() => {
      return store.state.app.device.toString()
    })
    const langSelect = computed(() => {
      return store.state.settings.langSelect
    })
    const state = reactive({
      toggleSideBar: () => {
        store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, false)
      },
      logout: () => {
        useStore().dispatch(UserActionTypes.ACTION_LOGIN_OUT)
        router.push(`/login?redirect=${route.fullPath}`).catch((err) => {
          console.warn(err)
        })
      }
    })
    return {
      sidebar,
      device,
      langSelect,
      ...toRefs(state),
      t
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        margin-top: 5px;
        margin-right: 16px;
        margin-left: 16px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
