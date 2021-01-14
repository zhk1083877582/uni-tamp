<!-- 市场解读 -->
<template>
	<view class='market'>
		<view class="du conlumn3">
			<view class="title"><text class="span">市场情况解读</text></view>
			<view class="duList">
				<view class="conBox" v-for="(item,index) in marketData" :key='index'>
					<view class="littleTit"><text class="span">{{item.marketTitle}}</text></view>
					<view class="conBox1">
						<jyf-parser :html="item.marketContent" ref="article"></jyf-parser>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getData } from '@/request/api';
import jyfParser from "@/components/jyf-parser/jyf-parser";
export default {
	components: {},
	data() {
		return {
			marketData:[]
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
		marketpreview() {
		    let params = {
		        businessReportId: this.businessReportId
		    }
		    getData('/customer/capp/businessReport/businessReportMarketPreview', params).then(res=> {
		        console.log('市场解读', res)
		        if (res.result) {
					this.marketData = res.result
		        }
		    }).catch(err=>{
				console.log('市场解读报错',err)
			})
		}	
	},
	created() {

	},
	mounted() {
		setTimeout(()=>{
			this.marketpreview()
		},400)
	},
}
</script>
<style lang='scss' scoped>
.market{
	.du {
	    border-radius: 0 0 20px 20px;
	    overflow: hidden;
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
		}
		
		.title .span {
		    background: linear-gradient(135deg, #f2e1b5, #fff3d6 33%, #e8ce91);
		    -webkit-background-clip: text;
		    color: transparent;
		}
		.conBox {
			background: #fff9ea;
			padding: 0 20px 35px;
			.littleTit {
			    padding-top: 25px;
			    display: flex;
			    justify-content: center;
			}
			
			.littleTit .span {
			    display: block;
			    font-size: 14px;
			    color: #000;
			    font-weight: bold;
			    text-align: center;
			    position: relative;
			    /* background: url(../img/title_left.png) no-repeat left center, url(../img/title_right.png) no-repeat right center; */
			    padding: 0 60px;
			    position: relative;
			}
			
			.littleTit .span::before {
			    content: ' ';
			    width: 47px;
			    height: 16px;
			    background: url(../../static/title_left.png) no-repeat;
			    /* background-size: 500px 375px;
			    background-position: -135px -47px; */
			    background-size: 100% 100%;
			    position: absolute;
			    top: 50%;
			    left: 0;
			    transform: translateY(-50%);
			}
			
			.littleTit .span::after {
			    content: ' ';
			    width: 47px;
			    height: 16px;
			    background: url(../../static/title_right.png) no-repeat;
			    /* background-size: 500px 375px;
			    background-position: -193px -47px; */
			    background-size: 100% 100%;
			    position: absolute;
			    top: 50%;
			    right: 0;
			    transform: translateY(-50%);
			}
			.conBox1{
				font-size: 28rpx;
				line-height: 44rpx;
				padding: 50rpx 0 40rpx;
				background: #fff9ea !important;
			}
		}
	}
	/deep/video {
	    width: 100% !important;
	    display: block;
	}
	/deep/img {
	    width: 100% !important;
	    display: block;
	}
	/deep/video {
	    width: 100% !important;
	    display: block;
	}
	/deep/img {
	    width: 100% !important;
	    display: block;
	}
	/deep/iframe{
		width: 100% !important;
		height: 100% !important;
	}
	/deep/.conBox1 div{
		background: #fff9ea !important;
	}
	/deep/.conBox1 p{
		background: #fff9ea !important;
	}
	/deep/.conBox1 span{
		background: #fff9ea !important;
	}
	/deep/rich-text{
		background: #fff9ea !important;
	}
	/deep/.interlayer{
		background: #fff9ea !important;
	}
}
</style>
