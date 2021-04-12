<template>
  <component :is="currentRole" />
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import AdminDashboard from './admin/Index.vue'
import EditorDashboard from './editor/Index.vue'
export default defineComponent({
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
