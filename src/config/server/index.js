import server from '@dt/server/dt';
import DtDelegate from './DtDelegate.js'

server.setDelegate(new DtDelegate())

export default server