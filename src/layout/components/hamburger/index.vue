<!-- 折叠边栏按钮 -->

<template>
  <div :class="[{'is-active': isActive}]" @click="toggleClick">
    <svg
      class="icon"
      font-size="20px"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path
        d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
      />
    </svg>
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
