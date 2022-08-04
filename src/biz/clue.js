import dt from '@dt/dt';
import server from '@dt/server/dt';

const api = {
  shortArticle: server.api().post('/dt-marketing/noToken/shortArticle/scanPicture')
}

function shortArticle(shortArticleId, consultantName, buildName) {
  return api.shortArticle.fetch({
    shortArticleId,
    consultantName,
    buildName,
  })
}

export default {
  shortArticle
}