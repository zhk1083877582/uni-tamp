import dt from '@dt/dt';
import auth from './auth.js'
import clue from './clue.js'

auth.login()

dt.biz = {
  auth,
  clue
}
