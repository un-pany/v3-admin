<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss">
.iconSvg {
  width: 1.2em;
  height: 1.2em;
  margin-right: 20px;
  font-size: 16px;
  fill: currentColor;
  overflow: hidden;
}
</style>
