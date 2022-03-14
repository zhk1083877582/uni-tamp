import dt from '@dt/dt'
import server from '@dt/server/dt'

let api = {
  info: server.api().get('/dt-building/houses/info/noToken/getBuHousesInfo'),
  layouts: server.api().post('/dt-building/houseType/noToken/selectHouseTypeListOnLine'),
  detail: server.api().post('/dt-building/houseType/noToken/selectHouseTypeInfo'),
}

function info(housesId) {
  return api.info.fetch({ housesId }).then(res => {
    res.addr = `${res.areaName || ''}${res.areaName && res.streetName ? '-' : ''}${res.streetName || ''} ${res.signAddress}`
    return res
  })
}

function layouts(info) {
  return api.layouts.fetch(info).then(res => {
    let data = res.map(i => {
      i.title = i.type == 'residence' ? `${i.pattern}（${i.houseTypeName}）`
              : i.type == 'stall' ? i.carportTypeName
              : i.type == 'shop' ? i.houseTypeName
              : i.type == 'office' ? i.houseTypeName
              : ''
      i.tags = dealTags(i)
      return i
    })
    return data
  })
}

function detail(info) {
  return api.detail.fetch(info).then(res => {
    res.title = res.type == 'residence' ? `${res.pattern}（${res.houseTypeName}）`
            : res.type == 'stall' ? res.carportTypeName
            : res.type == 'shop' ? res.houseTypeName
            : res.type == 'office' ? res.houseTypeName
            : ''
    res.tags = dealTags(res)
    return data
  })
}

function dealTags(data) {
  let tags = []
  switch (data.type) {
    case 'residence': {
      if (data.decorationName) tags.push(data.decorationName)
      if (data.tag && data.tag.length) tags = [...tags, ...data.tag]
      break
    }
    case 'stall': {
      if (data.carportTypeName) tags.push(data.carportTypeName)
      if (data.chargingPile && data.chargingPile == '1') tags.push('配备充电桩')
      if (data.decorationCarportName) tags.push(data.decorationCarportName)
      break
    }
    case 'office': {
      if (data.floorName) tags.push(data.floorName)
      if (data.decorationName) tags.push(data.decorationName)
      if (data.orientationName) tags.push(data.orientationName)
      if (data.partitionIf) tags.push(data.partitionIf == '1' ? '可分割' : '不可分割')
      break
    }
    default: break;
  }
  return tags
}

export default {
  info,
  layouts,
  detail
}