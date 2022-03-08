<template>
  <view class="page">
    <view class="dt-width-100 dt-line-b">
      <dt-tab v-model="activeTab" :tabs="tabs" @input="onTabCLick" isScroll tab-class="item tab-class" tab-class-active="item tab-class tab-class-active"
        lineStyle="width: 60rpx; background-color: #4A6DDB;"></dt-tab>
    </view>
    
    <scroll-view class="dt-margin-t-30" style="height: calc(100vh - 130rpx);" @scroll="onScroll" scroll-y
      :scroll-into-view="'item_' + activeTab" scroll-with-animation="true">
      <view @touchmove="onTouchmove" v-for="(item, index) in tabs" :key="index" :id="`item_${index}`" :ref="`item_${index}`" class="dt-margin-b-40 dt-padding-l-30 dt-padding-r-30">
        <view class="dt-text-size-30" style="color: #000;">{{ item.title }}</view>
        <view class="image-item">
          <view v-for="(img,imgIndex) in item.images" :key="imgIndex" class="dt-border-radius-10 dt-overflow-hidden dt-bg-color-grey-higherlight" style="height: 158rpx;">
            <image src="./images/layout.png" mode="aspectFill" style="display: block; width: 100%; height: 100%;"></image>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        activeTab: 0,
        tabs: [
        	{
        		title: '效果图',
        		images: [{}, {}, {}, {}, {}]
        	},
          {
          	title: '样板间',
          	images: [{}, {}, {}, {}, {}]
          },
          {
          	title: '环境规划图',
          	images: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
          },
          {
          	title: '配套实景图',
          	images: [{}, {}, {}, {}, {}, {}, {}]
          },
          {
          	title: '楼盘实景图',
          	images: [{}, {}, {}, {}, {}, {}, {}, {}, {}]
          },
        ],
        isclickTab: false,
      }
    },
    watch: {},
    onLoad(opt) {},
    onShareAppMessage(opt) {},
    methods: {
      onTabCLick(index) {
      	this.activeTab = index
      	this.isclickTab = true
      },
      onTouchmove() {
      	this.isclickTab = false
      },
      onScroll(res) {
        console.log(res)
      	let _this = this;
      	if (this.isclickTab) {
      		return
      	}
      	let scrollTop = res.detail.scrollTop
      	// for (let index = 0; index <= _this.tabs.length - 1; index++) {
      	// 	let idx = (index + 1) >= _this.tabs.length ? index : index + 1
       //    console.log(index, scrollTop, _this.$refs['item_' + index][0].$el.offsetTop, _this.$refs['item_' + idx][0].$el.offsetTop)
       //    if (scrollTop > _this.$refs['item_' + index][0].$el.offsetTop && scrollTop < _this.$refs['item_' + idx][0].$el.offsetTop) {
       //      _this.activeTab = index
       //      break
       //    }
      	// }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .image-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 28rpx;
    grid-row-gap: 20rpx;
    margin-top: 20rpx;
  }
  
  ::v-deep .tab-class {
  	font-size: 30upx;
  	color: #666;
    font-weight: 400;
    height: 74rpx;
    line-height: 74rpx;
    margin: 0 24rpx;
  }
  
  ::v-deep .tab-class-active {
  	color: #4A6DDB;
    font-weight: 500;
  }
</style>
