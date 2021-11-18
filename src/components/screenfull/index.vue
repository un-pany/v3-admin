<template>
  <div @click="state.click">
    <svg-icon :name="state.isFullscreen ? 'exit-fullscreen' : 'fullscreen'" font-size="20px" />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'

const state = reactive({
  isFullscreen: false,
  click: () => {
    if (!screenfull.isEnabled) {
      ElMessage.warning('您的浏览器无法工作')
      return
    }
    screenfull.toggle()
  },
  change: () => {
    if (screenfull.isEnabled) {
      state.isFullscreen = screenfull.isFullscreen
    }
  }
})
onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on('change', state.change)
  }
})
onBeforeUnmount(() => {
  if (screenfull.isEnabled) {
    screenfull.off('change', state.change)
  }
})
</script>
