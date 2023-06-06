import Auth from '@zhaohuakui/server/base/Auth.js'
import dt from '@dt/dt'

class DtAuth extends Auth {
  constructor(delegate) {
    super('dt_auth', delegate)
    this.info = dt.storage.get(this.authKey)
  }

  setInfo(info) {
    this.info = info
    dt.storage.set(this.authKey, info)
  }

  clear() {
    this.info = null
    dt.storage.remove(this.authKey)
  }

  header(path, need) {
    return this.info || {}
  }

  need(path, need) {
    return !this.info && path.indexOf('/noToken/') < 0 && need
  }
}

export default DtAuth
