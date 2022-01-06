import storage from '../utils/storage'
const initUser = storage.get('user')||{
  isLogin: false,
  role:undefined,
  username:'',
  fullName:'',
  balance:0
}
export const user = (now, state) => ({
  ...initUser,
  updateUser(payload){
    const cur = storage.get('user')
    storage.set('user', {...cur, ...payload})
    now({...cur, ...payload})
  },
  login(payload){
    storage.set('user', {isLogin:payload.isLogin, role:payload.role, username:payload.username, fullName:payload.fullName, balance:payload.balance})
    now({isLogin:payload.isLogin, role:payload.role, username:payload.username, fullName:payload.fullName, balance:payload.balance})
  },
  logout(){
    now({isLogin:false, role:undefined, username:undefined, fullName:undefined, balance: 0})
  }
});
/**
 * update dict
 * @param now
 */
export const dictModel =(now) => ({
  dict:[],
  dictMap:{},
  updateDict(payload){
    const {dict=[], dictMap={}} = payload
    now({
      dict:[...dict],
      dictMap:{...dictMap}
    })
  }
}
)
export const filter =(now) => ({
  subject:undefined,
  lecturer:undefined,
  date:[undefined, undefined],
  search:undefined,
  updateFilter(payload){
    const {subject, lecturer, date, search} = now()
    now({
      subject,
      lecturer,
      date,
      search,
      ...payload
    })
  }
}
)