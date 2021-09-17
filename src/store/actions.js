
// action.js是对mutation的封装，
// 通过一个action同步调用mutations.js的多个方法
import * as types from './mutation-types';

export const saveLoanDataRtn = function ({commit, state}, obj) {
  commit(types.setLoanDataRtn, obj);
};
// export const saveCityCode = function ({commit, state}, str) {
//   commit(types.setCityCode, str);
// };
export const saveCity = function ({commit, state}, obj) {
  commit(types.setCity, obj);
};
export const saveArea = function ({commit, state}, obj) {
  commit(types.setArea, obj);
};
export const saveUserInfo = function ({commit, state}, obj) {
  commit(types.setUserInfo, obj);
};
export const saveIsShowHead = function ({commit, state}, bl) {
  commit(types.setIsShowHead, bl);
};
export const saveIsLoading = function ({commit, state}, flag) {
  commit(types.setIsLoading, flag);
};
export const saveIM = function ({commit, state}, flag) {
  commit(types.setIM, flag);
};

export const saveIMDetailList= function ({commit, state}, flag) {
  commit(types.setIMDetailList, flag);
};
export const saveIMDetailNew= function ({commit, state}, flag) {
  commit(types.setIMDetailNew, flag);
};
export const saveIMOwnMess= function ({commit, state}, flag) {
  commit(types.setIMOwnMess, flag);
};
export const saveCollection= function ({commit, state}, flag) {
  commit(types.saveCollection, flag);
};
export const saveIMCenter= function ({commit, state}, flag) {
  commit(types.SAVECHATCENTERIM, flag);
};
export const saveIMDetail= function ({commit, state}, flag) {
  commit(types.SAVECHATDETAILIM, flag);
};
