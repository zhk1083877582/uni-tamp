/*
 * @Descripttion: Do not Edit
 * @version: 
 * @Author: mmzhang
 * @Date: 2021-09-02 16:03:15
 * @LastEditTime: 2021-09-03 10:21:48
 */
import Auth from '@dt/server/base/Auth.js';
import dt from '@dt/dt';

class DtAuth extends Auth {
  constructor(delegate) {
    super('dt_auth', delegate)
    this.info = dt.session.get(this.authKey)
  }

  setInfo(info) {
    this.info = info
    dt.session.set(this.authKey, info)
  }

  clear() {
    this.info = null
    dt.session.remove(this.authKey)
  }

  header(path, need) {
    return this.info || {}
  }

  need(path, need) {
    return !this.info && path.indexOf('/noToken/') < 0 && need
  }
}

export default DtAuth