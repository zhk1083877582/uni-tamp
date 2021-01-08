
const state = {
  loanDataV: {},
  // cityCode:'310100000',
  city:{
    code: "",
    pinyinInitial:"",
    title: ""
  },
  area:{
    code:'',
    title:''
  },
  userInfo:{
    Token:''
  },
  isShowHead:true,
  isLoading:false,
  IM:{
    msgList:'',
    detailList:''
  },
  IMDetailList:[],
  IMDetailNew:[],
  IMOwnMess:{},
  saveCollection:'',
  chatCenterIM:false,//存储  聊天列表 IM初始化的信息
  chatDetailIM:false,//存储  聊天详情 IM初始化的信息
};
export default state;
