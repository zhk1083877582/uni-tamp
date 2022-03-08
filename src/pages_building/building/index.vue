<template>
  <view class="page container">
    <image-item @jump="onJump('image')" />
    
    <view class="dt-bg-color-white dt-flex" style="margin-bottom: 16rpx; height: 132rpx;">
      <view @click="onClick(index)" v-for="(item, index) in tabs" :key="index" :class="['dt-flex-1 dt-flex dt-flex-direction-column dt-flex-horizontal-center dt-flex-vertical-center tab-item', { 'tab-item-check': curTab == index }]">
        <view style="width: 48rpx; height: 48rpx; margin-top: 10rpx;">
          <image :src="curTab == index ? item.checkIcon : item.icon" style="display: block; width: 100%; height: 100%;"></image>
        </view>
        <view class="tab-title">{{ item.title }}</view>
      </view>
    </view>
    
    <info-item />
    
    <layout-item />
    
    <surround-item />
    
    <view style="width: 140rpx; height: 140rpx; border-radius: 140rpx; position: fixed; right: 22rpx; bottom: 150rpx;">
      <image src="./images/share.png" style="display: block; width: 100%; height: 100%;"></image>
    </view>
  </view>
</template>

<script>
  import imageItem from './components/image-item.vue'
  import infoItem from './components/info-item.vue'
  import layoutItem from './components/layout-item.vue'
  import surroundItem from './components/surround-item.vue'
  import buildMgr from './biz/index.js'
  
  export default {
    components: {
      imageItem,
      infoItem,
      layoutItem,
      surroundItem
    },
    data() {
      return {
        curTab: 0,
        tabs: [{
          title: '住宅',
          icon: require('./images/house.png'),
          checkIcon: require('./images/house_check.png'),
        }, {
          title: '车位',
          icon: require('./images/stall.png'),
          checkIcon: require('./images/stall_check.png'),
        }, {
          title: '商铺',
          icon: require('./images/shop.png'),
          checkIcon: require('./images/shop_check.png'),
        }, {
          title: '办公楼',
          icon: require('./images/office.png'),
          checkIcon: require('./images/office_check.png'),
        }]
      }
    },
    watch: {},
    onLoad(opt) {
      this.getInfo()
    },
    onShareAppMessage(opt) {},
    methods: {
      getInfo() {
        buildMgr.info().then(res => {
          
        })
      },
      onClick(index) {
        this.curTab = index
      },
      onJump(type) {
        switch (type) {
          case 'image':
            console.log('go to images')
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
