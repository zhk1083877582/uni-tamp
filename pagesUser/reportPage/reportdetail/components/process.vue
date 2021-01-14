<!-- 流程 -->
<template>
	<view class='process'>
		<view class="process">
			<image src="https://m.tongcehaofang.com/img/pic_about@2x.png" class="picAbout"></image>
			<view class="his">
				<view class="hisBox">
					<view class="span tR"><text class="em">在家找房</text>全城楼盘让您在家躺着看</view>
					<view class="hisImg"><image src="https://m.tongcehaofang.com/img/pic1.png" class="pic"></view>
				</view>
				<view class="hisBox">
					<view class="hisImg"><image src="https://m.tongcehaofang.com/img/pic2.png" class="pic"></image></view>
					<view class="span tL"><text class="em">在线答疑</text>线上也有专业的咨询和讲解</view>
				</view>
				<view class="hisBox">
					<view class="span tR"><text class="em">直播看房</text>直播看房为您解决后顾之忧</view>
					<view class="hisImg"><image src="https://m.tongcehaofang.com/img/pic3.png" class="pic"></image></view>
				</view>
				<view class="hisBox">
					<view class="hisImg"><image src="https://m.tongcehaofang.com/img/pic4.png" class="pic"></image></view>
					<view class="span tL"><text class="em">专业建议</text>给您更客观的参考建议</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	components: {},
	data() {
		return {

		};
	},
	computed: {},
	watch: {},
	methods: {

	},
	created() {

	},
	mounted() {

	},
}
</script>
<style lang='scss' scoped>
.process {
    background-color: #3b383a;
    border-radius: 20rpx;
    margin-top: 50rpx;
}

.picAbout {
    display: block;
    width: 100%;
	height: 237rpx;
	img{
		width: 100%;
	}
}

.his {
    padding-top: 40rpx;
    position: relative;
    padding-bottom: 100rpx;
}

.his::before {
    content: '';
    width: 6rpx;
    height: 950rpx;
    opacity: 0.7;
    background: linear-gradient(180deg, #fff1db 76%, rgba(255, 241, 219, 0));
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
}

.hisBox {
    display: flex;
    flex-direction: row;
}

.hisImg {
    width: 50%;
    text-align: center;
}

.hisBox .span {
    width: 50%;
    font-size: 24rpx;
    line-height: 34rpx;
    color: #FFF2E0;
}

.hisBox .span .em {
    font-size: 32rpx;
    line-height: 32rpx;
    display: block;
    color: #DCBB85;
    font-style: normal;
    margin: 60rpx 0 20rpx;
    position: relative;
}

.hisBox .tL .em::before {
    content: '';
    width: 20rpx;
    height: 20rpx;
    background: #ffffff;
    border: 3px solid #8e785e;
    border-radius: 50%;
    position: absolute;
    left: -28px;
    top: 0;
}

.hisBox .tR .em::before {
    content: '';
    width: 20rpx;
    height: 20rpx;
    background: #ffffff;
    border: 6rpx solid #8e785e;
    border-radius: 50%;
    position: absolute;
    right: -56rpx;
    top: 0;
}

.hisBox .pic {
    display: block;
    width: 240rpx;
	height: 216rpx;
    margin: 0 auto;
}

.tL {
    text-align: left;
    padding-left: 40rpx;
}

.tR {
    text-align: right;
    padding-right: 20px;
}
</style>
