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