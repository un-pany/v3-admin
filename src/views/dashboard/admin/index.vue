<!-- admin 权限主页 -->
<template>
  <div class="dashboard-editor-container">
    <filter-container v-if="defer(2)" />
  </div>
</template>

<script lang='ts'>
import { ref, onMounted } from 'vue'
export default {
  name: 'Admin',
  components: {},
  setup() {
    const displayPriority = ref<number>(0)
    const count = 10

    const runDisplayPriority = function() {
      const step = () => {
        requestAnimationFrame(() => {
          displayPriority.value++
          if (displayPriority.value < count) {
            step()
          }
        })
      }
      step()
    }

    const defer = (priority: number): boolean => {
      return displayPriority.value >= priority
    }

    onMounted(() => {
      runDisplayPriority()
    })

    return {
      displayPriority,
      defer
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

}
</style>
