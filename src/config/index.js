import './env'
import './server'
import '@dt/dt/uni'
import dt from '@dt/dt'

function init(Vue) {
  const updateManager = uni.getUpdateManager()
  if (updateManager) {
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate()
    })
  }
}

export default {
  init
}
