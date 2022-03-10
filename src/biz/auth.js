import dt from '@dt/dt';
import server from '@dt/server/dt';

const api = {
  phone: server.api().post("/dt-user/noToken/wx/wxLogin"),
  login: server.api().post("/dt-user/noToken/wx/wxAuth"),
  clue: server.api().post("/dt-user/noToken/wx/addCustomerCl"), // 线索
  authPhone: server.api().get(
  "/dt-customer/customer/xcxClue/noToken/findByUserIdAndCustomerPhone"), // 顾问是否授权手机号
}

const infoKey = 'dt_wx_auth'

function phone(iv, encryData, userId, buildingId) {
  let info = getInfoSync()
  console.log('phone start')
  if (!info) {
    return login().then(res => {
      return phone(iv, encryData)
    })
  } else {
    console.log('发起请求 wxLogin')
    return api.phone.fetch({
      buildingId,
      userId,
      iv,
      encryData,
      sessionKey: info.session_key,
      openId: info.openid,
      loginType: 0
    }).then(res => {
      info.phone = res.customerInfo.phone
      info.login = res
      dt.storage.set(infoKey, info)
      return info
    })
  }
}

function login() {
  let info = getInfoSync()
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
          }).catch(err => {
            uni.showToast({
              icon: 'none',
              title: '登录失败'
            })
            reject(err)
          })
        } else {
          reject(res.errMsg)
        }
      }
    })
  })
}

function update() {
  let info = getInfoSync()
  if (!info) {
    return login().then(res => {
      return update()
    })
  } else {
    return new Promise((resolve, reject) => {
      uni.getUserProfile({
        desc: '用于个性化展示',
        success: (res) => {
          info.userInfo = res.userInfo
          dt.storage.set(infoKey, info)
          resolve(info)
        },
      })
    })
  }
}

function getInfoSync() {
  return dt.storage.get(infoKey)
}

function getInfo() {
  let info = getInfoSync()
  console.log(info)
  if (info) {
    return Promise.resolve(info)
  } else {
    return login()
  }
}

function authPhone(userId, buildingId) {
  return getInfo().then(res => {
    let customerPhone = res.phone
    if (customerPhone) {
      return api.authPhone.fetch({
        userId,
        buildingId,
        customerPhone
      })
    } else {
      return false
    }
  })
}

export default {
  phone,
  login,
  getInfo,
  getInfoSync,
  update,
  authPhone
}
