<!-- 前端监控测试页 -->
<template>
  <div class="app-container monitor">
    <el-card shadow="never">
      <span type="info">Count: {{ count }}</span>
    </el-card>
    <el-card shadow="never">
      <el-button type="primary" @click="add">
        Count 加 +
      </el-button>
      <el-button @click="sub">
        Count 减 -
      </el-button>
    </el-card>
    <el-card shadow="never">
      <el-button type="danger" @click="onUnhandledrejection">
        触发 unhandledrejection
      </el-button>
      <el-button type="danger" @click="onClickCodeError">
        触发代码错误
      </el-button>
      <el-button type="primary" @click="onClickGoodRequest">
        触发正常 xhr
      </el-button>
      <el-button type="danger" @click="onClickBadRequest">
        触发异常 xhr
      </el-button>
      <el-button type="primary" @click="onClickGoodFetch">
        触发正常 fetch
      </el-button>
      <el-button type="danger" @click="onClickBadFetch">
        触发异常 fetch
      </el-button>
      <el-button type="success" @click="onClickMitoLog">
        手动上报
      </el-button>
    </el-card>
    <IframeBreadcurmb />
  </div>
</template>

<script lang='ts' setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import IframeBreadcurmb from './components/iframe-breadcurmb.vue'

const count = ref(0)

const add = () => {
  count.value++
}

const sub = () => {
  count.value--
}

const onUnhandledrejection = () => {
  const rejectPromise = () => new Promise((resolve, reject) => reject(new Error('this is promise reject')))
  rejectPromise().then((res) => {
    console.log(res)
  })
}

const onClickCodeError = () => {
  throw new Error('vue error')
}

const onClickGoodRequest = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('get', 'https://dict-mobile.iciba.com/interface/index.php?c=word&m=getsuggest&word=hello')
  xhr.setRequestHeader('content-type', 'application/json')
  xhr.send()
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      ElMessage.success('request success')
    }
  }
}

const onClickBadRequest = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('get', 'https://bad/request')
  xhr.setRequestHeader('content-type', 'application/json')
  xhr.send()
  xhr.onreadystatechange = function() {
    console.log('xhr', xhr)
    if (xhr.readyState === 4 && !xhr.response) {
      ElMessage.error('request error')
    }
  }
}

const onClickGoodFetch = () => {
  fetch('https://dict-mobile.iciba.com/interface/index.php?c=word&m=getsuggest&word=hello', {
    method: 'GET'
  }).then(
    () => {
      ElMessage.success('fetch success')
    },
    (err) => {
      console.log('err', err)
    }
  )
}

const onClickBadFetch = () => {
  fetch('http://bad/fetch', {
    method: 'GET'
  }).then(
    () => { return 0 },
    (err) => {
      console.log('err', err)
      ElMessage.error('fetch error')
    }
  )
}

const onClickMitoLog = () => {
  (window as any).MitoInstance.log({
    message: '手动上报',
    tag: '手动上报'
  })
}
</script>

<style lang="scss" scoped>
.monitor {
  height: calc(100vh - 84px);
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
}
iframe {
  flex: 1;
}
.el-card {
  margin-bottom: 10px;
}
</style>
