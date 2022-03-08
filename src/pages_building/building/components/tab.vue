<template>
  <view>
    <!-- 不能横向滚动-->
    <view v-if="!isScroll" class="container">
    	<view class="content dt-box-sizing-contain">
    		<view class="tab" :class="[i == idx ? tabClassActive:tabClass]" :style="tabStyle"
					v-for="(item, i) in tabs" :key="i" @click="onClick(i)"
				>
					<view v-if="item.title" class="dt-display-inline-block dt-position-relative">
						{{item.title}}
					</view>
    		</view>
    	</view>
    	<view :style="{marginLeft: lineLeft + 'px', width: lineWidth + 'px'}">
				<view class="line" :style="lineStyle"></view>
			</view>
    </view>
    
    <!-- 能横向滚动-->
    <scroll-view v-if="isScroll" scroll-x :scroll-into-view="'item_'+value" scroll-with-animation="true" class="container">
       <view class="dt-flex dt-text-white-space-nowrap dt-width-100 dt-position-relative">
         <view v-for="(item, i) in tabs" :key="i" @click="onClick(i)" :id="`item_${i}`">
            <view v-if="item.title" :class="[i == idx ? tabClassActive:tabClass]">{{item.title}}</view>
         </view>
       </view>
    </scroll-view>
  </view>

</template>

<script>
	export default {
		props: {
			tabs: Array,
			value: Number,
      //是否能横向滚动
			isScroll:{
				type: Boolean,
				default:false
			},
      "tab-class":{
        type:String,
        default:"item" //可滚动 默认样式"dt-tab-scroll",
      },
      "tab-class-active":{
        type:String,
        default:"item dt-text-color-main" //可滚动 当前样式 "dt-tab-scroll-active",
      },
			tabStyle: {
				type: String,
				default: ''
			},
			lineStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				lineLeft: 0,
				lineWidth: 0,
				width: 0,
				idx: 0,
				contentWidth:750,
			}
		},
		watch: {
			value(i) {
				this.idx = i
				this.fixLineLeft()
			}
		},
		methods: {
			onClick(i) {
				this.idx = i
				this.fixLineLeft()
				this.$emit('change', i)
				this.$emit('input', i)
			},
			fixLineLeft() {
				this.lineLeft = this.width * this.idx+(this.width/(this.tabs.length+1))
			},
			getWidth() {
				return new Promise((resolve,reject)=>{
					uni.createSelectorQuery().in(this).select('.container').boundingClientRect().exec((res) => {
						this.contentWidth= res[0].width;
						resolve();
					});
				})
			},
			setLineWidth(){
				this.getWidth().then(()=>{
					this.idx = this.value;
					this.width = this.contentWidth / this.tabs.length;
					this.lineWidth = this.width - 2 * (this.width/(this.tabs.length+1));
					this.fixLineLeft();
				});
			}
		},
		mounted() {
			this.setLineWidth();
		}
	}
</script>

<style lang="scss" scoped>

	.content {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
    width: 100%;
	}

	.item {
		flex: 1;
		text-align: center;
		justify-content: center;
		height: 30px;
		transition: color 0.25s;
	}

	.line {
		width: 100%;
		height: 6rpx;
		margin: 0 auto;
		background-color: $dt-color-main;
		border-radius: 6rpx;
		transition: margin-left 0.25s;
	}
	::v-deep ::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}
</style>
