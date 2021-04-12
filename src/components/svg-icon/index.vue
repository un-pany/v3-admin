<template>
  <svg aria-hidden="true">
    <use :xlink:href="icon" />
  </svg>
</template>

<script>
export default {
  name: 'D2IconSvg',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    icon() {
      return `#d2-${this.name}`
    }
  }
}
</script>
