<!-- 折叠边栏按钮 -->
<template>
  <div :class="[{'is-active': isActive}]" @click="toggleClick">
    <svg-icon name="hamburger" font-size="20px" class="icon" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-click'])

const toggleClick = () => {
  emit('toggle-click')
}
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}

.is-active {
  transform: rotate(180deg);
}
</style>
