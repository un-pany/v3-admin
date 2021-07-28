<!-- 右侧悬浮设置面板 -->

<template>
  <div
    class="handle-button"
    :style="{top: buttonTop + 'px', 'background-color': '#1890ff'}"
    @click="show = true"
  >
    <i class="el-icon-setting" />
  </div>
  <el-drawer title="设置" v-model="show" size="300px" destroy-on-close>
    <slot />
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'RightPanel',
  props: {
    buttonTop: {
      type: Number,
      default: 250
    }
  },
  setup() {
    const show = ref(false)
    return {
      show
    }
  }
})
</script>

<style lang="scss" scoped>
.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  right: 0px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 10;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  line-height: 48px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
