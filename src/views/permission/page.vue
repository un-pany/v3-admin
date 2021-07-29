<!-- 权限测试（页面权限、指令权限、角色权限）Demo，勿删 -->

<template>
  <div class="app-container">
    <SwitchRoles @change="handleRolesChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import SwitchRoles from './components/switch-roles.vue'

export default defineComponent({
  name: 'PagePermission',
  components: {
    SwitchRoles
  },
  setup() {
    const router = useRouter()
    const handleRolesChange = () => {
      router.push({ path: '/401' }).catch((err) => {
        console.warn(err)
      })
    }

    return {
      handleRolesChange
    }
  }
})
</script>
