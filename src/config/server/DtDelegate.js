import Delegate from '@dt/server/base/Delegate';

class DtDelegate extends Delegate {

  auth() {
    return Promise.reject(new Error('暂未登录'))
  }

  onSuccess(data, api) {
    console.info('server-success: ---------------')
    console.info('server-success:', api.method, api.reqUrl)
    console.info('server-success:', api.data)
    console.info('server-success:', data)
  }

  onError(err, api) {
    console.warn('server-err: ---------------')
    console.warn('server-err:', api.method, api.reqUrl)
    console.warn('server-err:', api.data)
    console.warn('server-err:', err.message, err.status, err.code)
  }
}

export default DtDelegate