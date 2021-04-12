import { assign, map } from 'lodash'
import { request } from './service'

const files = require.context('./modules', true, /\.ts$/)

const generators = files.keys().map(key => files(key).default)

export default assign({}, ...map(generators, generator => generator(request)))
