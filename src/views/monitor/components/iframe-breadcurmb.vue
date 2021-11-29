<template>
  <iframe
    ref="iframeRef"
    class="iframeWrapper"
    src="https://mitojs.github.io/mito-admin-demo/#/breadcrumbDemo"
    frameborder="0"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const iframeRef = ref<HTMLIFrameElement>()
let timer = null as any

onMounted(() => {
  let lastLength = -1
  timer = setInterval(() => {
    const breadcrumb = (window as any).MitoInstance.breadcrumb
    const length = breadcrumb.getStack().length
    if (length !== lastLength) {
      lastLength = length
      iframeRef?.value?.contentWindow &&
        iframeRef.value.contentWindow.postMessage(
          {
            type: 'breadcrumb',
            data: JSON.parse(JSON.stringify(breadcrumb.getStack()))
          },
          'https://mitojs.github.io/mito-admin-demo/#/breadcrumbDemo'
        )
    }
  }, 1000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
