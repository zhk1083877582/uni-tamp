export default{
	methods:{
		createImg(){
			this.$nextTick(async ()=>{
					let self = this
			    // 初始化
			    await this.$refs.rCanvas.init({
			        canvas_id:"rCanvas",
					canvas_width:375,
					canvas_height:437,
					// background_color:'#22ac38'
					hidden:true
			    })
						
			    // 画头像
			    await this.$refs.rCanvas.drawImage({
			        url:self.adviserInfo.avatarUrl,
			        x:25,
			        y:26,
			        w:113,
			        h:113,
					border_radius:53
			    }).catch(err_msg=>{
			        uni.showToast({
			            title:err_msg,
			            icon:"none"
			        })
			    })
				// 名字
				await this.$refs.rCanvas.drawText({
				    text:self.adviserInfo.userName,
				    max_width:0,
				    x:152,
				    y:56,
				    font_color:"rgba(0,0,0,1)",
				    font_size:23
				}).catch(err_msg=>{
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})
				// 画手机图标
				await this.$refs.rCanvas.drawImage({
				    url:'https://media.tongcehaofang.com/image/default/E9075F2FFABC4ADEB12819FDBAF9C970-6-2.jpg',
				    x:152,
				    y:77,
				    w:17,
				    h:17,
				}).catch(err_msg=>{
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})	
				// 手机号
				await this.$refs.rCanvas.drawText({
				    text:self.adviserInfo.phone,
				    max_width:0,
				    x:179,
				    y:93,
				    font_color:"rgba(0,0,0,1)",
				    font_size:15
				}).catch(err_msg=>{
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})
				// 画微信图标
				await this.$refs.rCanvas.drawImage({
				    url:'https://media.tongcehaofang.com/image/default/74AB4837022B47C3B50B5AE126D4B43E-6-2.jpg',
				    x:152,
				    y:115,
				    w:20,
				    h:16,
				}).catch(err_msg=>{
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})	
				// 微信
				await this.$refs.rCanvas.drawText({
				    text:self.adviserInfo.wechat,
				    max_width:0,
				    x:179,
				    y:128,
				    font_color:"rgba(102,102,102,1)",
				    font_size:15
				}).catch(err_msg=>{
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})
				// 画楼盘图标
				await this.$refs.rCanvas.drawImage({
				    url:'https://media.tongcehaofang.com/image/default/F49BC314D29E426F9C73662F83481CBE-6-2.jpg',
				    x:32,
				    y:167,
				    w:23,
				    h:22,
				}).catch(err_msg=>{
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})	
				// 画楼盘名称
				await this.$refs.rCanvas.drawText({
				    text:self.adviserInfo.buildingInfos[0].buildingAlias,
				    max_width:0,
				    x:61,
				    y:186,
				    font_color:"rgba(6,36,113,1)",
				    font_size:19,
					font_weight:600
				}).catch(err_msg=>{
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})
				// 画楼盘亮点
				await this.$refs.rCanvas.drawText({
				    text:self.adviserInfo.buildingInfos[0].buildingBrightSpot,
				    max_width:0,
				    x:32,
				    y:217,
				    font_color:"rgba(102,102,102,1)",
				    font_size:16
				}).catch(err_msg=>{
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})
				//楼盘亮点下的横线
				await this.$refs.rCanvas.fillRoundRect({
					x:0,
					y:241,
					w:375,
					h:3,
					radius:1,
					fill_color:'rgba(243,243,243,1)'
				})
				//楼盘亮点下的第二横线
				await this.$refs.rCanvas.fillRoundRect({
					x:0,
					y:330,
					w:375,
					h:3,
					radius:1,
					fill_color:'rgba(243,243,243,1)'
				})
				//楼盘亮点下的竖线
				await this.$refs.rCanvas.fillRoundRect({
					x:0,
					y:330,
					w:375,
					h:3,
					radius:1,
					fill_color:'rgba(243,243,243,1)'
				})
				//楼盘亮点下的竖线
				await this.$refs.rCanvas.fillRoundRect({
					x:125,
					y:241,
					w:3,
					h:90,
					radius:1,
					fill_color:'rgba(243,243,243,1)'
				})
				//楼盘亮点下的竖线
				await this.$refs.rCanvas.fillRoundRect({
					x:250,
					y:241,
					w:3,
					h:90,
					radius:1,
					fill_color:'rgba(243,243,243,1)'
				})
				//服务客户
				await this.$refs.rCanvas.drawSpecialText({
				    general:{
				        x:45,
				        y:285,
				    },
				    list:[
				        {
				            text:self.adviserInfo.servedPeopleNum,
				            font_color:'rgba(0,0,0,1)',
				            font_size:20
				        },
				        {
				            text:'人',
				            font_color:'rgba(0,0,0,1)',
				            font_size:10
				        },
				    ]
				}).catch(err=>{
				    this.error(err)
				})
				await this.$refs.rCanvas.drawText({
				    text:'服务人数',
				    max_width:133,
				    x:40,
				    y:310,
				    font_color:"rgba(102,102,102,1)",
				    font_size:12
				}).catch(err_msg=>{
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})
				//客户满意度
				await this.$refs.rCanvas.drawSpecialText({
				    general:{
				        x:176,
				        y:285,
				    },
				    list:[
				        {
				            text:'5',
				            font_color:'rgba(0,0,0,1)',
				            font_size:20
				        },
				        {
				            text:'分',
				            font_color:'rgba(0,0,0,1)',
				            font_size:10
				        },
				    ]
				}).catch(err=>{
				    this.error(err)
				})
				await this.$refs.rCanvas.drawText({
				    text:'客户满意度',
				    max_width:133,
				    x:158,
				    y:310,
				    font_color:"rgba(102,102,102,1)",
				    font_size:12
				}).catch(err_msg=>{
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})
				//从业年限
				await this.$refs.rCanvas.drawSpecialText({
				    general:{
				        x:300,
				        y:285,
				    },
				    list:[
				        {
				            text:self.adviserInfo.workExperience,
				            font_color:'rgba(0,0,0,1)',
				            font_size:20
				        },
				        {
				            text:'年',
				            font_color:'rgba(0,0,0,1)',
				            font_size:10
				        },
				    ]
				}).catch(err=>{
				    this.error(err)
				})
				await this.$refs.rCanvas.drawText({
				    text:'从业年限',
				    max_width:133,
				    x:288,
				    y:310,
				    font_color:"rgba(102,102,102,1)",
				    font_size:12
				}).catch(err_msg=>{
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})
			    //底部小程序二维码
				await this.$refs.rCanvas.drawText({
				    text:'扫一扫或长按识别二维码',
				    max_width:0,
				    x:59,
				    y:370,
				    font_color:"rgba(153,153,153,1)",
				    font_size:15
				}).catch(err_msg=>{
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})
				await this.$refs.rCanvas.drawText({
				    text:'期待您的咨询',
				    max_width:0,
				    x:100,
				    y:400,
				    font_color:"rgba(153,153,153,1)",
				    font_size:15
				}).catch(err_msg=>{
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})
				// 画微信二维码
				await this.$refs.rCanvas.drawImage({
				    url:'data:image/jpeg;base64,'+self.wxcodeCard,
				    x:258,
				    y:343,
				    w:72,
				    h:72,
				}).catch(err_msg=>{
					console.log(err_msg,2222)
				    uni.showToast({
				        title:err_msg,
				        icon:"none"
				    })
				})	
				
			    // 生成海报
			    await this.$refs.rCanvas.draw((res)=>{
					this.canvasImg = res.tempFilePath
					console.log(res,11111)
			        //res.tempFilePath：生成成功，返回base64图片
			        // 保存图片
					// uni.saveImageToPhotosAlbum({
					// 	filePath:res.tempFilePath,
					// 	success:(res)=>{
					// 		console.log(res)
					// 	},
					// 	fail:(err)=>{
					// 		console.log(err)
					// 	}
					// })
			    })
			})
		},
	}
}