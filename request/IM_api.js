import {apiRequestList} from "./uniRequest"
const  browseInfoList= '/tospurWeb/api/pc/getPcBrowseInfoList';//浏览记录
const  collectionList = "/tospurWeb/api/pc/getPcBuildingCollection"//收藏记录
const  unloadVoice = "/tospurWeb/api/v1/vod/uploadVideo"//上传video
const  PlayInfo = "/tospurWeb/api/v1/vod/getPlayInfo"//获取播放地址
const  login = "/tospurWeb/login/appLogin/hideLogin"//运营平台Iframe 插入  不需要验证码登录
const  userInfo = "/tospurWeb/capp/chatroom/getUserInfo"//获取管家信息 
const  commonWord = "/base/pc/messageCommonWords/list"
const  appForpotential = "/customer/api/capp/potentialCustomersInfo/save"//app 线索  打电话
const insertUserCustomer = '/tospurWeb/api/capp/rongcloud/insertUserCustomer'//给管家绑定客户
export const getBrowseInfoList = (params)=>{
    return apiRequestList.$post(browseInfoList,params)
};
export const getCollectionList = (params)=>{
    return apiRequestList.$post(collectionList,params)
};
export const unloadVideo = (params)=>{
    return apiRequestList.$post(unloadVoice,params,"formData")
};
export const getPlayInfo = (params)=>{
    return apiRequestList.$post(PlayInfo,params)
};
export const noCodeLogin = (params)=>{
    return apiRequestList.$post(login,params)
}
export const getUserInfo = (params)=>{
    return apiRequestList.$post(userInfo,params)
}
export const getCommonWord = ()=>{
    return apiRequestList.$post(commonWord,{plant:2})
}
export const getDetail = (url,params,flag)=>{
    return apiRequestList.$post(url,params,flag)
};
export const saveAppForpotential = (params)=>{
    return apiRequestList.$post(appForpotential,params)
}
export const bindUserCustomer = (params)=>{
    return apiRequestList.$post(insertUserCustomer,params)
}