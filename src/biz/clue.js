import dt from '@dt/dt';
import server from '@dt/server/dt';

const api = {
  add: server.api().post("/dt-user/noToken/wx/addCustomerCl"),
  shortArticle: server.api().post('/dt-marketing/noToken/shortArticle/scanPicture')
}

function add(params) {
  return dt.biz.auth.getInfo().then(info => {
    return api.add.fetch({
      userId: params.userId,
      recommenderId: params.recommenderId || null,
      buildingId: params.buildingId,
      clueChannelId: params.clueChannelId,
      operationType: params.operationType || 1, // 1: 授权  2: 线上售楼处浏览
      startTime: params.startTime || null,
      endTime: params.endTime || null,
      reportId: params.reportId,   // 置业报告ID
      articleId: params.articleId, // 霸屏神器文章ID
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