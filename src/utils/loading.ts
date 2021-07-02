/* 全局loading */

import { ElLoading } from 'element-plus'

export default function() {
  const loading = (title: string) => {
    return ElLoading.service({ text: title })
  }

  return {
    loading
  }
}
