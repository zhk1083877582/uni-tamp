import { getData } from '@/request/api';
export default{
    data(){
        return {
			//设置默认买点参数
			buryingPoint:{
				customerId:'',//客户Id
				userId:'',
				operationType:'',//1.发送置业报告,2.打开置业报告,3.关闭置业报告,4.分享置业报告，5.返回首页，6.用户点击楼盘，7.联系管家，8.管家名片点击，9.管家名片分享
				modelType:'',//模块(1.首页 2.楼盘详情 3.置业报告)
				reportId:'',//置业报告Id
				beginTime:'',//打开时间
				endTime:'',//关闭时间
			},
            //设置默认的分享参数
            share:{
                title:'海鸥飞翔',
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
			let params = this.buryingPoint;
			console.log('埋点数据',params)
			getData('/business/report/reportLog',params).then((res)=>{
				console.log('埋点接口',res)
			}).catch((err)=>{
				console.log(err)
			})
		},
	},
	mounted(){
		this.buryingPoint.customerId = this.$tool.getStorage('Login-Data').customerInfo?this.$tool.getStorage('Login-Data').customerInfo.customerId:''
	},
    onShareAppMessage(res) {
		console.log(123123)
		this.ReportLog()
		console.log(this.share.path,'pathpathpathpath')
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