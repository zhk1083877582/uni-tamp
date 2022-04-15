import dt from '@dt/dt';
import server from '@dt/server/dt';

const api = {
  add: server.api().post("/dt-user/noToken/wx/addCustomerCl"),
  shortArticle: server.api().post('/dt-marketing/noToken/shortArticle/scanPicture')
}

function add(clueChannelId, userId, buildingId, operationType = 1, startTime, endTime) {
  return dt.biz.auth.getInfo().then(info => {
    return api.add.fetch({
      userId,
      buildingId,
      clueChannelId,
      operationType, // 1: 授权  2: 线上售楼处浏览
      startTime: startTime || null,
      endTime: endTime || null,
      customerPhone: info.phone,
      wxUUID: info.openid,
      wxUserInfo: info.userInfo
    })
  })
}

function shortArticle(shortArticleId, consultantName, buildName) {
  return api.shortArticle.fetch({
    shortArticleId,
    consultantName,
    buildName,
  })
}

export default {
  add,
  shortArticle
}