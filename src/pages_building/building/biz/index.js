import dt from '@dt/dt'
import server from '@dt/server/dt'

let api = {
  info: server.api().get('/dt-building/houses/info/noToken/getBuHousesInfo'),
  layouts: server.api().post('/dt-building/houseType/noToken/selectHouseTypeListOnLine'),
}

function info(housesId) {
  return api.info.fetch({ housesId }).then(res => {
    return res
  })
}

function layouts(info) {
  return api.layouts.fetch(info).then(res => {
    return res
  })
}

export default {
  info,
  layouts
}