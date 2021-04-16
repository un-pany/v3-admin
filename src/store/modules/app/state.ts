import { getSidebarStatus } from '@/utils/cookies'
import { getLocale } from '@/locales'

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface AppState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: string
}

export const state: AppState = {
  device: DeviceType.Desktop,
  sidebar: {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  },
  language: getLocale()
}
