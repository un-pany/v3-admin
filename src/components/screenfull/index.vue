<!-- 全屏按钮 -->

<template>
  <div id="screenfull">
    <div v-if="state.isFullscreen" @click="state.click">
      <svg-icon name="exit-fullscreen" font-size="20px" />
    </div>
    <div @click="state.click" v-else>
      <svg-icon name="fullscreen" font-size="20px" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import screenfull from 'screenfull'
import { onBeforeUnmount, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const sf = screenfull

const state = reactive({
  isFullscreen: false,
  click: () => {
    if (!sf.isEnabled) {
      ElMessage.warning('您的浏览器无法工作')
      return false
    }
    sf.toggle()
  }
})
const change = () => {
  if (sf.isEnabled) {
    state.isFullscreen = sf.isFullscreen
  }
}
onMounted(() => {
  if (sf.isEnabled) {
    sf.on('change', change)
  }
})

onBeforeUnmount(() => {
  if (sf.isEnabled) {
    sf.off('change', change)
  }
})
</script>
