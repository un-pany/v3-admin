/* 导出自定义配置 */

import { NetworkConfig } from './default/net.config'
import { Theme } from './default/theme.config'
import { Settings } from './default/setting.config'

type CustomConfig = NetworkConfig  & Theme & Settings & any

const customConfig: CustomConfig = {

}

export default customConfig
