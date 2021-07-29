<template>
  <component :is="currentRole" />
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import AdminDashboard from './admin/index.vue'
import EditorDashboard from './editor/index.vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    AdminDashboard,
    EditorDashboard
  },
  setup() {
    const store = useStore()
    const currentRole = ref('admin-dashboard')
    const roles = computed(() => {
      return store.state.user.roles
    })
    onBeforeMount(() => {
      if (!roles.value.includes('admin')) {
        currentRole.value = 'editor-dashboard'
      }
    })

    return {
      currentRole
    }
  }
})
</script>
