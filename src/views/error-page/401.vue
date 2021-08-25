<template>
  <div class="error-page-container">
    <el-row>
      <el-col :span="12" class="text">
        <el-button icon="el-icon-arrow-left" class="back-btn" @click="back">
          返回
        </el-button>
        <h1 class="text-jumbo">
          哎呀！
        </h1>
        <h2>你没有权限去该页面。</h2>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" class="some-gif" width="313" height="428">
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import errGif from '@/assets/error-page/error.gif'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: '401',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const data = reactive({
      errGif: errGif + '?' + +new Date(),
      dialogVisible: false,
      back() {
        if (route.query.noGoBack) {
          router.push({ path: '/dashboard' }).catch((err) => {
            console.warn(err)
          })
        } else {
          router.go(-1)
        }
      }
    })

    return { ...toRefs(data) }
  }
})
</script>

<style lang="scss" scoped>
.error-page-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .some-gif {
    margin: 0 auto;
    display: block;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
}
</style>
