import dt from '@dt/dt'
import server from '@dt/server/dt'

let api = {
  layouts: server.api().post('/dt-building/houseType/noToken/selectHouseTypeListOnLine'),
}

function layouts(info) {
  return api.layouts.fetch(info).then(res => {
    let data = res.map(i => {
      i.title = i.type == 'residence' ? `${i.pattern}（${i.houseTypeName}）`
              : i.type == 'stall' ? i.carportTypeName
              : i.type == 'shop' ? i.houseTypeName
              : i.type == 'office' ? i.houseTypeName
              : ''
      return i
    })
    return data
  })
}

export default {
  layouts
}