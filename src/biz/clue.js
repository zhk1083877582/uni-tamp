import dt from '@dt/dt';
import server from '@dt/server/dt';

let api = {
  add: server.api().post("/dt-user/noToken/wx/addCustomerCl"),
}

function add(clueChannelId, userId, buildingId) {
  return dt.biz.auth.getInfo().then(info => {
    return api.add.fetch({
      userId,
      buildingId,
      clueChannelId,
      customerPhone: info.phone,
      wxUUID: info.openid,
      wxUserInfo: info.userInfo
    })
  })
}

export default {
  add
}