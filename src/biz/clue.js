import dt from '@dt/dt';
import server from '@dt/server/dt';

const api = {
  add: server.api().post('/dt-marketing/promote/noToken/createPromoteAccessLog'), // 线索(授权、浏览、分享)
  shortArticle: server.api().post('/dt-marketing/noToken/shortArticle/scanPicture')
}

function add(params) {
  return dt.biz.auth.getInfo().then(info => {
    return api.add.fetch({
      action: params.action, // 动作 1:浏览 2:分享 3:授权
      browsingTime: params.browsingTime, // 浏览时间（毫秒）
      promoteSn: params.promoteSn, // 推广sn码
      pageType: params.pageType, // 页面类型（同线索渠道ID）
      userCustomerId: info.login ? info.login.customerInfo.customerId : null, // dt系统客户ID
      customerPhone: info.phone,
      wxNum: '',
      wxOpenId: info.openid,
      wxUserInfo: info.userInfo,
      wxUuid: info.openid
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