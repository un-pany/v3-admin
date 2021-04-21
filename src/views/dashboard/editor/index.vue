<!-- editor 权限主页 -->

<template>
  <div class="dashboard-editor-container">
    editor 权限可见：{{ name }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  name: 'Editor',
  components: {
  },
  setup() {
    const store = useStore()
    const name = computed(() => {
      return store.state.user.name
    })

    return {
      name
    }
  }
})
</script>

<style lang="scss" scoped>

.dashboard-editor-container {
  // background-color: #e3e3e3;
  padding: 50px 60px 0px;
}
</style>
