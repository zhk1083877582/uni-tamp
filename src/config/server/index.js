import server from '@zhaohuakui/server/index'
import DtDelegate from './DtDelegate.js'
import dt from '@dt/dt'
import Fly from 'flyio/dist/npm/wx'
server.handle.setupFly(Fly)
server.setDelegate(new DtDelegate())
dt.server = server
export default server
