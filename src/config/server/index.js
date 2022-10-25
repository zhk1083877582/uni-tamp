import settle from 'axios/lib/core/settle'
import buildURL from 'axios/lib/helpers/buildURL'
import axios from 'axios'
axios.defaults.adapter = function(config) {
  return new Promise((resolve, reject) => {
    uni.request({
      method: config.method.toUpperCase(),
      url: config.baseURL + buildURL(config.url, config.params, config
        .paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          request: response.data,
          errMsg: response.errMsg,
          header: response.header,
          config: config
        };
        settle(resolve, reject, response);
      }
    })
  })
}


import server from '@dt/server/dt';
import DtDelegate from './DtDelegate.js'
import dt from '@dt/dt'
import Fly from 'flyio/dist/npm/wx'
server.handle.setupFly(Fly)
server.setDelegate(new DtDelegate())
dt.server = server
export default server

