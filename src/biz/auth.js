import dt from '@dt/dt';
import server from '@dt/server/dt';

let api = {
  phone: server.api().post("/dt-user/noToken/wx/wxLogin"),
  login: server.api().post("/dt-user/noToken/wx/wxAuth")
}

let infoKey = 'dt_wx_auth'
let info = dt.storage.get(infoKey)

function phone(iv, encryData) {
  if (!info) {
    return login().then(res => {
      return phone(iv, encryData)
    })
  } else {
    return api.phone.fetch({
      iv,
      encryData,
      sessionKey: info.session_key,
      openId: info.openid,
      loginType: 0
    }).then(res => {
      info.phone = res.customerInfo.phone
      dt.storage.set(infoKey, info)
      return res
    })
  }
}

function login() {
  return new Promise((resolve, reject) => {
    uni.login({
      success: (res) => {
        if (res.code) {
          api.login.fetch({ jsCode: res.code }).then((res) => {
            if (info) {
              Object.assign(info, res)
            } else {
              info = res
            }
            dt.storage.set(infoKey, info) //openid session_key
            resolve(info)
          }, reject)
        } else { 
          reject(res.errMsg)
        }
      }
    })
  })
}

function getInfo() {
  if (info) {
    return Promise.resolve(info)
  } else {
    return login()
  }
}

export default {
  phone,
  login,
  getInfo
}
