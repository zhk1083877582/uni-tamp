import './env'
import './server'
import '@dt/dt/uni'
import dt from '@dt/dt'

// import tool from './request/tool'
// import switchFormatter from './utils/formatter'
console.log(dt)

function init(Vue) {
  const updateManager = uni.getUpdateManager()
  if (updateManager) {
    updateManager.onUpdateReady(function() {
      updateManager.applyUpdate()
    })
  }
}

export default {
  init
}