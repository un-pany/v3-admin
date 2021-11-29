<!-- 页面权限测试页 -->

<template>
  <div class="app-container">
    <SwitchRoles @change="handleRolesChange" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import SwitchRoles from './components/switch-roles.vue'

const router = useRouter()
const handleRolesChange = () => {
  router.push({ path: '/401' }).catch((err) => {
    console.warn(err)
  })
}
</script>
