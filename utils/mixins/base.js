import { getData } from '@/request/api';
export default{
    data(){
        return {
                       //设置默认的分享参数
            share:{
                title:'同策好房',
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
			let params = Object.assign({},data);
			getData('/business/report/reportLog',params).then((res)=>{
				console.log('埋点接口',res)
			}).catch((err)=>{
				console.log(err)
			})
		},
	},
    onShareAppMessage(res) {
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