<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  }
})
</script>
<style lang="scss">
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
