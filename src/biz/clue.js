import dt from '@dt/dt';
import server from '@dt/server/dt';

const api = {
  add: server.api().post("/dt-user/noToken/wx/addCustomerCl"),
  shortArticle: server.api().post('/dt-marketing/noToken/shortArticle/scanPicture')
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