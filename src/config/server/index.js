import server from '@dt/server/dt';
import DtDelegate from './DtDelegate.js'
import DtAuth from './DtAuth.js'

server.setAuth(new DtAuth()).setDelegate(new DtDelegate())

export default server