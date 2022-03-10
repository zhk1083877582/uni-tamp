<template>
  <view class="page container">
    <image-module v-if="info.annexList.length" :list="info.annexList" @jump="onJump('image')" />
    
    <view class="dt-bg-color-white dt-flex" style="margin-bottom: 16rpx; height: 132rpx;">
      <view @click="onClick(item.key)" v-for="item in tabs" :key="item.key" :class="['dt-flex-1 dt-flex dt-flex-direction-column dt-flex-horizontal-center dt-flex-vertical-center tab-item', { 'tab-item-check': current == item.key }]">
        <view style="width: 48rpx; height: 48rpx; margin-top: 10rpx;">
          <image :src="current == item.key ? item.checkIcon : item.icon" style="display: block; width: 100%; height: 100%;"></image>
        </view>
        <view class="tab-title">{{ item.title }}</view>
      </view>
    </view>
    
    <view class="dt-bg-color-white" style="margin-bottom: 16rpx; padding: 36rpx 32rpx 30rpx;">
      <view class="dt-flex dt-flex-vertical-center">
        <view class="dt-text-size-40" style="color: #333; font-weight: 500; margin-right: 24rpx;">
          {{ info.housesName }}
        </view>
        <view class="tag" v-if="info && info.salesStatus">{{ $dt.dictInfo().__value('buSalesStatus', info.salesStatus) }}</view>
      </view>
      <view v-if="info.housesLightSpot" class="dt-text-size-28" style="color: #999999; margin-top: 14rpx;">
        <text>{{ info.housesLightSpot }}</text>
      </view>
      <info-module :type="current" :info="info" />
    </view>
    
    <layout-module :type="current" :info="info" @jump="onJump('layout')" />
    
    <surround-module />
    
    <view style="width: 140rpx; height: 140rpx; border-radius: 140rpx; position: fixed; right: 22rpx; bottom: 150rpx;">
      <image src="https://static.tospurfang.com/com/building/share.png" style="display: block; width: 100%; height: 100%;"></image>
    </view>
  </view>
</template>

<script>
  import imageModule from './components/image-module.vue'
  import infoModule from './components/info-module.vue'
  import layoutModule from './components/layout-module.vue'
  import surroundModule from './components/surround-module.vue'
  import buildMgr from './biz/index.js'
  
  export default {
    components: {
      imageModule,
      infoModule,
      layoutModule,
      surroundModule
    },
    data() {
      return {
        current: 'residence',
        tabs: [{
          key: 'residence',
          title: '住宅',
          icon: 'https://static.tospurfang.com/com/building/residence.png',
          checkIcon: 'https://static.tospurfang.com/com/building/residence_check.png',
        }, {
          key: 'stall',
          title: '车位',
          icon: 'https://static.tospurfang.com/com/building/stall.png',
          checkIcon: 'https://static.tospurfang.com/com/building/stall_check.png',
        }, {
          key: 'shop',
          title: '商铺',
          icon: 'https://static.tospurfang.com/com/building/shop.png',
          checkIcon: 'https://static.tospurfang.com/com/building/shop_check.png',
        }, {
          key: 'office',
          title: '办公楼',
          icon: 'https://static.tospurfang.com/com/building/office.png',
          checkIcon: 'https://static.tospurfang.com/com/building/office_check.png',
        }],
        housesId: null,
        info: null,
      }
    },
    watch: {},
    onLoad(opt) {
      console.log(this.$dt.dictInfo())
      // this.housesId = opt.housesId
      this.housesId = 18531
      this.getInfo()
    },
    onShareAppMessage(opt) {},
    methods: {
      getInfo() {
        buildMgr.info(this.housesId).then(res => {
          // 修改页面标题为楼盘名称
          uni.setNavigationBarTitle({
          	title: res.housesName
          })
          let addr = []
          if (res.areaName) addr.push(res.areaName)
          if (res.streetName) addr.push(res.streetName)
          this.info = {
            ...res,
            addr: addr.join('-') + ' ' + res.signAddress
          }
        })
      },
      onClick(key) {
        this.current = key
      },
      onJump(type) {
        switch (type) {
          case 'image':
            uni.navigateTo({
              url: './images?data=' + JSON.stringify(this.info.annexList)
            })
            break;
          case 'layout':
            uni.navigateTo({
              url: `./layout/list?housesId=${this.housesId}`
            })
            break;
          default: break;
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .container {
    background-color: #F6F6F8;
  }
  
  .tag {
    padding: 0 6rpx;
    height: 32rpx;
    line-height: 32rpx;
    font-size: 20rpx;
    color: #fff;
    background-color: #FF8242;
    border-radius: 4rpx;
  }
  
  .tab-item {
    border-bottom: 6rpx solid #fff;
    .tab-title {
      font-size: 26rpx;
      color: #999DAA;
      margin-top: 4rpx;
    }
  }
  .tab-item-check {
    background-color: rgba(74, 109, 219, 0.06);
    border-bottom: 6rpx solid #7492EF;
    .tab-title {
      color: #4A6DDB;
    }
  }
</style>
