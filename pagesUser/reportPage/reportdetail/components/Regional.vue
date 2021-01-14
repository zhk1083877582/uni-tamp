<!-- 关注区域分析 -->
<template>
	<view class='Regional_warp'>
		<view class="Regional conlumn1">
			<view class="du">
				<view class="title"><text class="text">关注区域分析</text></view>
				<view class="conBox Regional_conBox">
					<view v-for="(itemW,indexW) in RegionData" :key='indexW'>
						<view class="littleTit">
							<view><text class="span">{{itemW.regionName}}</text></view>
						</view>
						<view v-for="(item,index) in itemW.contents" :key='index'>
							<view class="my Regional_little_title">
								{{item.regionTitle}}
								<text class="span"> </text>
							</view>
							<view class="conBox1">
								<jyf-parser :html="item.regionContent" ref="article"></jyf-parser>
							</view>
							<!-- <rich-text :nodes="item.regionContent"></rich-text> -->
							<!-- <view class="pText" v-html="item.regionContent"></view> -->
						</view>
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
	components: {
		jyfParser
	},
	data() {
		return {
			RegionData:[]
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
		ReportRegion() {
		    let params = {
		        businessReportId: this.businessReportId
		    }
		    getData('/customer/capp/businessReport/businessReportRegionPreview', params).then(res=> {
		        console.log('关注区域', res)
		        if (res.result) {
					this.RegionData = res.result
		        }
		    })
		}	
	},
	created() {

	},
	mounted() {
		setTimeout(()=>{
			this.ReportRegion()
		},400)
	},
}
</script>
<style lang='scss' scoped>
.Regional_warp{
	.Regional_little_title {
	    color: #000000;
	    font-weight: 700;
	    margin-top: 20px;
	    font-size: 14px;
		.span{
			width: 100%;
		}
	}
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
	.du {
	    border-radius: 0 0 20px 20px;
	    overflow: hidden;
	}
	.conBox {
	    background: #fff9ea;
	    padding: 0 20px 35px;
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
}
</style>
<style lang='scss'>

		
</style>
