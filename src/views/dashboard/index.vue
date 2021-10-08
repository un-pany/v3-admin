<template>
  <component :is="currentRole === 'admin' ? AdminDashboard : EditorDashboard" />
</template>

<script lang="ts" setup>
import { store } from '@/store'
import { computed, onBeforeMount, ref } from 'vue'
import AdminDashboard from './admin/index.vue'
import EditorDashboard from './editor/index.vue'

const currentRole = ref('admin')
const roles = computed(() => {
  return store.state.user.roles
})
onBeforeMount(() => {
  if (!roles.value.includes('admin')) {
    currentRole.value = 'editor'
  }
})
</script>
