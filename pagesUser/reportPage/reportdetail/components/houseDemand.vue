<!-- 当前购房需求 -->
<template>
	<view class='house_demand'>
		<view class="conlumn0">
			<view class="title"><text class="text">当前购房需求</text></view>
			<view class="conBox">
				<view class="ul">
					<view class="li" v-for="(item,index) in HouseDemandData" :key="index">
						<view class="num_index">0{{ index + 1 }}</view> 
						<view>{{item}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getData } from '@/request/api';
export default {
	components: {},
	data() {
		return {
			HouseDemandData:[]
		};
	},
	props:{
		businessReportId:{
			type:String,
			default:''
		}
	},
	computed: {},
	watch: {},
	methods: {
		HouseDemand() {
		    let params = {
		        businessReportId: this.businessReportId
		    }
		    getData('/customer/capp/businessReport/businessReportDemandPreview', params).then(res =>{
		        console.log('购房需求', res)
		        let HouseDemandArr = []
		        Object.keys(res).forEach((key) => {
		                // console.log(key); //我是key
		                // console.log(res[key]); //我是值
		                //购房用途
		                if (key == 'useFor') {
		                    let itemStr = this.getStrByArr(res[key], 'paraValue', '购房用途')
		                    if (itemStr != '') HouseDemandArr.push(itemStr)
		                }
		                //意向面积
		                if (key == 'spaces') {
		                    let itemStr = this.getStrByArr(res[key], 'paraValue', '意向面积')
		                    if (itemStr != '') HouseDemandArr.push(itemStr)
		                }
		                //意向房型
		                if (key == 'purposeTypes') {
		                    let itemStr = this.getStrByArr(res[key], 'paraValue', '意向房型')
		                    if (itemStr != '') HouseDemandArr.push(itemStr)
		                }
		                //关注因素
		                if (key == 'focusElements') {
		                    let itemStr = this.getStrByArr(res[key], 'paraValue', '关注因素')
		                    if (itemStr != '') HouseDemandArr.push(itemStr)
		                }
		                //意向区域
		                if (key == 'purposeAreas') {
		                    let itemStr = this.getStrByArr(res[key], 'title', '意向区域')
		                    if (itemStr != '') HouseDemandArr.push(itemStr)
		                }
						//意向楼盘
						if (key == 'buildings') {
						    let itemStr = this.getStrByArr(res[key], 'buildingAlias', '意向楼盘')
						    if (itemStr != '') HouseDemandArr.push(itemStr)
						}
		            })
		            //购房预算
		        if (res.expensesMin != null || res.expensesMax != null) {
		            let expensesStr = ''
		            if (res.expensesMin != null) {
		                if (res.expensesMax != null) {
		                    expensesStr = `购房预算：${res.expensesMin}万-${res.expensesMax}万`
		                } else {
		                    expensesStr = `购房预算：${res.expensesMin}万`
		                }
		            } else {
		                if (res.expensesMax != null) {
		                    expensesStr = `购房预算：${res.expensesMax}万`
		                } else {
		                    expensesStr = ''
		                }
		            }
		            if (expensesStr != '') HouseDemandArr.push(expensesStr)
		        }
		        console.log(HouseDemandArr, '购房需求购房需求购房需求购房需求购房需求')
				this.HouseDemandData = HouseDemandArr
		    }).catch(err => {
				console.log("购房需求请求结果报错", err);
			});
		},
		getStrByArr(Arr, Mkey, Mtitle) {
		    var str = "";
		    if (Arr.length > 0) {
		        for (var i = 0; i < Arr.length; i++) {
		            if (Arr[i][Mkey] != '') {
		                str += Arr[i][Mkey] + ",";
		            }
		        }
		        let NewStr = str != '' ? `${Mtitle}：${str}` : ''
		            //去掉最后一个逗号(如果不需要去掉，就不用写)
		        if (NewStr.length > 0) {
		            NewStr = NewStr.substr(0, NewStr.length - 1);
		        }
		        return NewStr;
		    } else {
		        return '';
		    }
		}
	},
	created() {
		
	},
	mounted() {
		setTimeout(()=>{
			this.HouseDemand()
		},400)
		
	},
}
</script>
<style lang='scss' scoped>
	.house_demand{
		overflow: hidden;
		border-radius: 0 0 20px 20px;
		 .ul {
		    padding-top: 36rpx;
			.li {
			    display: flex;
			    padding-top: 34rpx;
			    font-size: 28rpx;
			    text-align: left;
			    color: #000000;
			    line-height: 40rpx;
				.num_index {
				    height: 42rpx;
				    padding: 0 6rpx;
				    background: #a28c71;
				    border-radius: 50%;
				    text-align: center;
				    line-height: 42rpx;
				    margin-right: 20rpx;
				}
			}
		}
		.title {
		    font-size: 20px;
		    line-height: 20px;
		    font-weight: bold;
		    text-align: center;
		    color: #fff9ea;
		    background: url(../../static/bg_title.png) no-repeat;
		    width: 100%;
		    height: 60px;
		    background-size: 100% 100%;
		    line-height: 60px;
		    margin-top: 35px;
			.text {
			    background: linear-gradient(135deg, #f2e1b5, #fff3d6 33%, #e8ce91);
			    -webkit-background-clip: text;
			    color: transparent;
			}
		}
		.conBox {
		    background: #fff9ea;
		    padding: 0 20px 35px;
		}
	}
</style>
