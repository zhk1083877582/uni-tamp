import dt from '@dt/dt'
import server from '@dt/server/dt'

let api = {
  info: server.api().get('/dt-building/houses/info/getBuHousesInfo'),
}

function info(housesId) {
  return api.info.fetch({ housesId }).then(res => {
    return res
  })
}

export default {
  info
}