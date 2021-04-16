import { getData } from '@/request/api';
export default{
    data(){
        return {
			//设置默认买点参数
			buryingPoint:{
				customerId:'',//客户Id
				userId:'',
				operationType:'',//1.发送置业报告,2.打开置业报告,3.关闭置业报告,5.返回首页，6.用户点击楼盘，7.联系管家，8.管家名片点击，9.管家名片分享
				modelType:'',//模块(1.首页 2.楼盘详情 3.置业报告)
				reportId:'',//置业报告Id
				beginTime:'',//打开时间
				endTime:'',//关闭时间
				buildingId:'',
			},
			//客户足迹埋点
			CustomerTrack:{
				buildingId:'',//楼盘ID
				createrId:'',//创建人
				userId:'',//顾问ID
				customerId:'',//客户id
				dataId:'',//业务id(名片/置业报告ID/素材id)
				stayTime:'',//	停留时长
				operateType:'',//操作类型(1:查看置业报告 2:浏览楼盘 3:查看名片 4:查看素材 )
				shareType:'',//分享类型(1:分享置业报告 2:分享楼盘 3:分享名片 4:分享素材
				operateCanal:'',//查看渠道(1:来源名片  2:来源置业计划书 3:来源客户转发)
			},
            //设置默认的分享参数
            share:{
                title:'置业笔记',
                path:'',
                imageUrl:'',
            }
        }
    },
	methods:{
		//埋点
		/* 
		 *  埋点调用
		 *	this.ReportLog({reportId:111,reportA:222})
		*/
		ReportLog(data){
			let params = Object.assign({},this.buryingPoint,data);
			console.log('大数据埋点数据',params)
			getData('/dt-business/noToken/report/reportLog',params).then((res)=>{
				// console.log('埋点接口',res)
			}).catch((err)=>{
				console.log('埋点接口',err)
			})
		},
		/* 
		 * 客户足迹埋点
		 */
		addCustomerTrack(data){
			let params = Object.assign({},this.CustomerTrack,data);
			params.stayTime = params.stayTime?this.formatDuring(params.stayTime):''
			console.log('客户足迹埋点',params)
			getData('/dt-business/customerTrack/shareCard',params).then((res)=>{
				// console.log('埋点接口',res)
			}).catch((err)=>{
				console.log('埋点接口',err)
			})
		},
		//时间戳转时分秒
		formatDuring (mss) {
			var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			
			var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
			
			var seconds = parseInt((mss % (1000 * 60)) / 1000);
			
			hours = hours < 10 ? ('0' + hours) : hours;
			
			minutes = minutes < 10 ? ('0' + minutes) : minutes;
			
			seconds = seconds < 10 ? ('0' + seconds) : seconds;
			
			return hours + ":" + minutes + ":" + seconds;
		
		},
		//重新获取customerId
		getAppletsCustomerIdByPhone(){
			if(this.$cache.getCache('M-Token')){
				let params={
					phone:this.$cache.getCache('Login-Data').customerInfo.phone,
				}
				let api = '/dt-business/customer/manager/getAppletsCustomerIdByPhone'
				getData(api,params).then((res)=>{
					if(res.customerInfo.phone){
						this.$cache.setCache('Login-Data', res);
					}
				}).catch(error=>{
					console.log(error,'小程序使用根据手机号码查询客户id')
				})
			}
		}
	},
	mounted(){
		
	},
    onShareAppMessage(res) {
		let buryingPointShareType = '',CustomerTrackShareType='',CustomerOperateCanal = ''
		//大数据
		if(this.buryingPoint.modelType=='3'||this.buryingPoint.modelType == '4'){
			if(this.buryingPoint.modelType == '3'){
				this.buryingPoint.operationType = ''//清空操作类型
				buryingPointShareType = '1'
			}
			if(this.buryingPoint.modelType == '4'){
				this.buryingPoint.operationType = ''//清空操作类型
				buryingPointShareType = '2'
			}
			this.ReportLog({shareType:buryingPointShareType})
		}
		
		//客户足迹
		if(this.CustomerTrack.operateType == '1'){
			CustomerTrackShareType = '1'
		}
		if(this.CustomerTrack.operateType == '2'){
			CustomerTrackShareType = '2'
		}
		if(this.CustomerTrack.operateType == '3'){
			CustomerTrackShareType = '3'
		}
		if(this.CustomerTrack.operateType == '4'){
			CustomerTrackShareType = '4'
		}
		if(this.CustomerTrack.operateType == '5'){
			CustomerTrackShareType = '5'
		}
		
		this.addCustomerTrack({shareType:CustomerTrackShareType,operateCanal:CustomerOperateCanal})
        return {
            title:this.share.title,
            path:this.share.path,
            imageUrl:this.share.imageUrl,
            success(res){
                // uni.showToast({
                //     title:'分享成功'
                // })
            },
            fail(res){
                // uni.showToast({
                //     title:'分享失败',
                //     icon:'none'
                // })
            }
        }
    }
}