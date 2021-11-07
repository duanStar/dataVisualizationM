import request from '../utils/request'

export function getScreenMobileData() {
  return request('/screen/mobile')
}
