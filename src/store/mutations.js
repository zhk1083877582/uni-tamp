
// mutations.js定义对数据修改的逻辑
// 在定义mutations需定义mutation-types
// 定义了mutation-types后，就可以用 types.[mutation-types定义的action名] 定义函数
// 函数接收两个值 第一个：state.js定义的state数据对象  第二个:修改的对象

import * as types from './mutation-types';

const mutations = {
    [types.setLoanDataRtn](state, obj) {
        state.loanDataRtn = obj;
    },
    // [types.setCityCode](state, str) {
    //     state.cityCode = str;
    // },
    [types.setCity](state, obj) {
        state.city = obj;
    },
    [types.setArea](state,obj){
        state.area = obj
    },
    [types.setUserInfo](state,obj){
        state.userInfo = obj
    },
    [types.setIsShowHead](state,bl){
        state.isShowHead = bl
    },
    [types.setIsLoading](state,flag){
        state.isLoading = flag
    },
    [types.setIM](state,flag){
        state.IM = JSON.parse(JSON.stringify(flag))
    },
    [types.setIMDetailList](state,flag){
        state.IMDetailList= JSON.parse(JSON.stringify(flag))
    },
    [types.setIMDetailNew](state,flag){
        state.IMDetailNew= JSON.parse(JSON.stringify(flag))
    },   
    [types.setIMOwnMess](state,flag){
        state.IMOwnMess= JSON.parse(JSON.stringify(flag))
    },   
    [types.saveCollection](state,flag){
        state.saveCollection= flag;
    },   
    [types.SAVECHATCENTERIM](state,flag){
        state.chatCenterIM= flag;
    },   
    [types.SAVECHATDETAILIM](state,flag){
        state.chatDetailIM= flag;
    },   
};

export default mutations;
