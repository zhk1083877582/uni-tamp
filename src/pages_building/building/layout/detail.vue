<template>
  <view class="page container">
    <view class="image">
      <image :src="info.houseTypeAnnex" mode="aspectFill" style="display: block; width: 100%; height: 100%;"></image>
    </view>
    
    <view class="dt-bg-color-white" style="margin-bottom: 16rpx; padding: 36rpx 32rpx 30rpx;">
      <view class="dt-text-size-40" style="color: #333; font-weight: 500; margin-bottom: 14rpx;">
        {{ info.title }}
      </view>
      <view v-if="info.type != 'stall'" style="margin-bottom: 16rpx;">
        <text class="dt-text-size-28" style="color: #999;">参考单价：</text>
        <text class="dt-text-size-32" style="color: #F75736;">{{ info.unitPrice ? `${info.unitPrice}元/㎡` : '待定' }}</text>
      </view>
      <view style="margin-bottom: 24rpx;">
        <text class="tag" :style="{ color: '#fff', backgroundColor: info.salesStatus == 'onSales' ? '#4A6DDB' : info.salesStatus == 'forSale' ? '#FF8242' : '#BBBBBB' }">
          {{ info.salesStatusName }}
        </text>
        <text class="tag" v-for="(tag, index) in info.tags">{{ tag }}</text>
      </view>
      <view class="dt-flex">
        <view class="dt-flex-1">
          <view class="dt-text-size-32" style="color: #333; font-weight: 500;">{{ info.floorArea ? `${info.floorArea}㎡` : '待定' }}</view>
          <view class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">参考建面</view>
        </view>
        <view class="dt-flex-1">
          <view class="dt-text-size-32 dt-flex dt-flex-vertical-center">
            <text v-if="info.totalPrice" class="dt-text-size-24" style="color: #999;">约</text>
            <text style="color: #F75736; font-weight: 500; margin-left: 6rpx;">
              {{ info.totalPrice ? `${info.totalPrice}万/${info.type == 'stall' ? '个' : '套'}` : '待定' }}
            </text>
          </view>
          <view class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">参考总价</view>
        </view>
        <view v-if="info.type == 'residence' && info.orientationName" class="dt-flex-1 dt-flex dt-flex-horizontal-center">
          <view class="dt-flex dt-flex-direction-column">
            <text class="dt-text-size-32" style="color: #333; font-weight: 500;">{{ info.orientationName }}</text>
            <text class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">朝向</text>
          </view>
        </view>
        <view v-if="info.type == 'stall' && info.carportTypeName" class="dt-flex-1 dt-flex dt-flex-horizontal-center">
          <view class="dt-flex dt-flex-direction-column">
            <text class="dt-text-size-32" style="color: #333; font-weight: 500;">{{ info.carportTypeName }}</text>
            <text class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">类型</text>
          </view>
        </view>
        <view v-if="info.type == 'shop'" class="dt-flex-1 dt-flex dt-flex-horizontal-center">
          <view class="dt-flex dt-flex-direction-column">
            <text class="dt-text-size-32" style="color: #333; font-weight: 500;">{{ info.facadeWidth ? `${info.facadeWidth}m` : '--' }}</text>
            <text class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">开间</text>
          </view>
        </view>
        <view v-if="info.type == 'office' && info.storyHeight" class="dt-flex-1 dt-flex dt-flex-horizontal-center">
          <view class="dt-flex dt-flex-direction-column">
            <text class="dt-text-size-32" style="color: #333; font-weight: 500;">{{ info.storyHeight }}m</text>
            <text class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">层高</text>
          </view>
        </view>
      </view>
    </view>
    
    <view v-if="info.houseTypeComment" class="dt-bg-color-white" style="margin-bottom: 16rpx; padding: 40rpx 32rpx 32rpx;">
      <view class="dt-text-size-32 dt-flex dt-flex-vertical-center dt-margin-b-20" style="color: #333; font-weight: 500;">
        <view class="title-line"></view>
        <view>户型点评</view>
      </view>
      <view class="dt-text-size-28" style="color: #666; line-height: 42rpx;">
        {{ info.houseTypeComment }}
      </view>
    </view>
    
    <view v-if="list.length" class="dt-bg-color-white" style="margin-bottom: 16rpx; padding: 40rpx 32rpx 0;">
      <view class="dt-text-size-32 dt-flex dt-flex-vertical-center" style="color: #333; font-weight: 500;">
        <view class="title-line"></view>
        <view>{{ otherTitle }}（{{ count }}）</view>
      </view>
      <view class="dt-bg-color-white">
        <view v-if="info.type == 'residence'" class="dt-bg-color-white dt-margin-t-30">
          <dt-tab :tabs="tabs" v-model="current" @change="(i) => onClick(i)" isScroll tab-class="dt-text-tab-class" tab-class-active="dt-text-tab-class dt-text-tab-active-class" line-style="display: none;" />
        </view>
        
        <template v-for="(layout, index) in list">
          <layout-item :key="index" :info="layout" :source="source" />
        </template>
      </view>
    </view>
    
    <view style="width: 140rpx; height: 140rpx; border-radius: 140rpx; position: fixed; right: 22rpx; bottom: 150rpx;">
      <image src="https://static.tospurfang.com/com/building/share.png" style="display: block; width: 100%; height: 100%;"></image>
    </view>
  </view>
</template>

<script>
  import layoutItem from './components/layout-item.vue'
  import buildMgr from '../biz/index.js'
  
  export default {
    components: {
      layoutItem
    },
    data() {
      return {
        info: {},
        current: 0,
        tabs: [],
        list: [],
        otherTitle: '',
        count: 0,
        source: []
      };
    },
    onLoad(opt) {
      let info = JSON.parse(opt.info),
          source = JSON.parse(opt.source)
      this.source = [...source]
      this.info = { ...info, tags: this.stallTags(info) }
      let data = source.filter(i => i.houseTypeId != info.houseTypeId)
      if (info.type == 'residence') {
        this.tabs = this.groupBy(data)
        this.list = this.tabs.length ? this.tabs[this.current].list : []
        this.count = this.tabs.length ? this.tabs[0].list.length : 0
      } else {
        this.list = data
        this.count = this.list.length
      }
      let name = this.$dt.dictInfo().__value('houseType', info.type)
      this.otherTitle = info.type == 'residence' ? `其他${name}户型` : `其他${name}`
      
      // this.detail()
    },
    onShareAppMessage(opt) {},
    methods: {
      detail() {
        buildMgr.detail({
          houseTypeId: this.info.houseTypeId,
          type: this.info.type
        }).then(res => {
          
        })
      },
      onClick(index) {
        this.list = this.tabs[index].list
      },
      stallTags(info) {
        let tags = []
        if (info.type == 'stall') {
          if (info.chargingPile && info.chargingPile == '1') tags.push('配备充电桩')
          if (info.decorationCarportName) tags.push(info.decorationCarportName)
        } else if (info.type == 'shop') {
          if (info.storyHeight) tags.push(`层高：${info.storyHeight}m`)
          if (info.layerTwo) tags.push(info.layerTwo == '1' ? '允许搭建二层' : '不允许搭建二层')
        } else {
          tags = info.tags
        }
        return tags
      },
      groupBy(data) {
        let list = data || [],
            groups = {},
            arr = []
        if (list.length) {
          for (let item of list) {
            let val = item.bedroom
            groups[val] = groups[val] || []
            groups[val].push(item)
          }
          for (let key in groups) {
            arr.push({
              title: `${key}居(${groups[key].length})`,
              bedroom: key,
              list: groups[key]
            })
          }
          arr.sort((a, b) => (b.bedroom - a.bedroom))
          arr.unshift({
            title: `全部(${list.length})`,
            list
          })
        }
        return arr
      },
    }
  };
</script>

<style lang="scss" scoped>
  .container {
    background-color: #F6F6F8;
  }
  
  .image {
    width: 100%;
    height: 500rpx;
  }
  
  .tag {
    padding: 0 6rpx;
    height: 32rpx;
    line-height: 32rpx;
    font-size: 20rpx;
    color: #666;
    background-color: #F6F6F8;
    border-radius: 4rpx;
    margin-right: 8rpx;
  }
  
  .title-line {
    width: 4rpx;
    height: 26rpx;
    background-color: #4A6DDB;
    margin-right: 12rpx;
  }
</style>
