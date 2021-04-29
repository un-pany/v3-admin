/**
* api-inject
* 实现：采用全局注入的方式
* 优点：使用时只需 "import $api from '@/api-inject'" 或者 const $api = inject('$api') 即可方便的通过 $api 调用所有api
* 缺点：丢失了 TypeScript 类型提示
* @see：'@/store/modules/user/actions.ts'
* @see：'@/views/login/index.vue'
*/

import { assign, map } from 'lodash'
import { request } from '@/utils/service'

const files = require.context('./modules', true, /\.ts$/)

const generators = files.keys().map(key => files(key).default)

export default assign({}, ...map(generators, generator => generator(request)))
