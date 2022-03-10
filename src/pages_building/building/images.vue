<template>
  <view class="page">
    <view class="dt-width-100 dt-line-b">
      <dt-tab v-model="activeTab" :tabs="tabs" @input="onTabCLick" isScroll tab-class="dt-line-tab-class" tab-class-active="dt-line-tab-class dt-line-tab-active-class"
        lineStyle="display: block; width: 60rpx; background-color: #4A6DDB;"></dt-tab>
    </view>
    
    <scroll-view class="dt-margin-t-30" style="height: calc(100vh - 130rpx);" @scroll="onScroll" scroll-y
      :scroll-into-view="'item_' + activeTab" scroll-with-animation="true">
      <view @touchmove="onTouchmove" v-for="(item, index) in tabs" :key="index" :id="`item_${index}`" :ref="`item_${index}`" class="dt-margin-b-40 dt-padding-l-30 dt-padding-r-30">
        <view class="dt-text-size-30" style="color: #000;">{{ item.title }}</view>
        <view class="image-item">
          <view v-for="(img, idx) in item.images" :key="item.attachId" class="dt-border-radius-10 dt-overflow-hidden dt-bg-color-grey-higherlight" style="height: 158rpx;">
            <image :src="img.attachAddress" mode="aspectFill" style="display: block; width: 100%; height: 100%;"></image>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import buildMgr from './biz/index.js'
  
  export default {
    data() {
      return {
        activeTab: 0,
        tabs: [],
        isclickTab: false,
        list: []
      }
    },
    watch: {},
    onLoad(opt) {
      // this.list = JSON.parse(opt.data)
      this.getInfo()
    },
    onShareAppMessage(opt) {},
    methods: {
      getInfo() {
        buildMgr.info(18531).then(res => {
          this.list = res.annexList || []
          this.groupBy()
        })
      },
      groupBy() {
        let groups = {}
        for (let item of this.list) {
          let val = item.attachType
          groups[val] = groups[val] || []
          groups[val].push(item)
        }
        let annexTypes = this.$dt.dictInfo().buildingAnnexType,
            tabs = []
        for (let item of annexTypes) {
          if (groups[item.key]) {
            tabs.push({
              title: item.value,
              images: groups[item.key]
            })
          }
        }
        this.tabs = tabs
      },
      onTabCLick(index) {
      	this.activeTab = index
      	this.isclickTab = true
      },
      onTouchmove() {
      	this.isclickTab = false
      },
      onScroll(res) {
       //  console.log(res)
      	// let _this = this;
      	// if (this.isclickTab) {
      	// 	return
      	// }
      	// let scrollTop = res.detail.scrollTop
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
</style>
