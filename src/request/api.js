import Vue from 'vue'
import {apiRequestList} from "@/request/uniRequest.js"
export const getData = (url,params)=>{
    return apiRequestList.$post(url,params)
};
export const getList = (url,params)=>{
    return apiRequestList.$post(url,params)
};

export const getFormdata = (url,params)=>{
    return apiRequestList.$postForm(url,params)
};

export const getDataGet = (url,params)=>{
    return apiRequestList.$get(url)
};




//楼盘详情
export const getBuildingBaseInfo = (url,params)=>{
	url=url||'/dt-business/noToken/building/info';
    return apiRequestList.$post(url,params)
};
// 图片视频vr 附件
export const getBuildingAnnex = (url,params)=>{
	url=url||'/dt-building/v1/annex/noToken/list';
    return apiRequestList.$post(url,params)
};


//根据楼盘ID查询优惠券列表
export const getBuildingCouponInfo = (url,params)=>{
	url=url||'/base/preferential/act/index/getBuildingPreferentialActCouponDetailList';
    return apiRequestList.$post(url,params)
};
//专车带看
export const getCarPhone = (url,params)=>{
	url=url||'/tospurWeb/capp/v2/user/getThroughCarPhoneByBuildingId';
    return apiRequestList.$post(url,params)
};
//优惠券-领取
export const receiveCoupon = (url,params)=>{
	url=url||'/base/preferential/coupon/gain';
    return apiRequestList.$post(url,params)
};
//户型-tabs
export const getBuildingTypeCount = (url,params)=>{
	url=url||'/building/buildingHouseType/count';
    return apiRequestList.$post(url,params)
};
//户型-list
export const getBuildingTypeList = (url,params)=>{
	url=url||'/building/buildingHouseType/list';
    return apiRequestList.$post(url,params)
};
//楼盘介绍
export const getBuildingDescription = (url,params)=>{
	url= url||'/building/capp/buildingDescription';
    return apiRequestList.$post(url,params)
};
//楼盘亮点
export const getBuildingBrightSpotListByBuildingId = (url,params)=>{
	url= url||'/building/getBrightSpotListByBuildingId';
    return apiRequestList.$post(url,params)
};

// 楼盘动态
export const getBuildingDynamicAndDate = (url,params)=>{
	url= url||'/building/capp/buildingDynamic/buildingDynamicAndDate';
    return apiRequestList.$post(url,params)
};

//楼栋分布
export const getBuildingUnitList = (url,params)=>{
	url= url||'/building/capp/buildingUnit/buildingUnitList';
    return apiRequestList.$post(url,params)
};

//选择管家
export const getHousekeeperList = (url,params)=>{
	url= url||'/tospurWeb/v1/capp/rongcloud/new/getHousekeeperList';
    return apiRequestList.$post(url,params)
};
//好房为你推荐
export const getBuildingRecommend = (url,params)=>{
	url= url||'/building/capp/building/buildingRecommend';
    return apiRequestList.$post(url,params)
};
//添加浏览记录
export const saveCustomerTrack = (url,params)=>{
	url= '/customer/api/capp/userCustomer/saveCustomerTrack';
    return apiRequestList.$post(url,params)
};
//创建线索
export const potentialCustomersInfo = (url,params)=>{
	url=url||'/customer/api/capp/potentialCustomersInfo/save';
    return apiRequestList.$post(url,params)
};

//根据工号获取电话号码
export const getMoorInfoByWorkNo = (url,params)=>{
	// console.log('--------url',url);
	url= url||'/user/capp/user/getImAndSevenMoorInfoByWorkNo';
    return apiRequestList.$post(url,params)
};