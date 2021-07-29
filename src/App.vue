<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
<style lang="scss">
// 注册主题
@import '~@/styles/theme/register.scss';
</style>
