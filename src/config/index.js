import './env'
import './server'
import '@dt/dt/uni'
import dt from '@dt/dt'

import formatter from '@/utils/formatter'
dt.tool = {
  formatter
}

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