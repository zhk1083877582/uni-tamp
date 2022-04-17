import './env'
import './server'
import '@dt/dt/uni'
import dt from '@dt/dt'

function init(Vue) {
  dt._mixin(Vue)
  Vue.prototype.$dt = dt
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