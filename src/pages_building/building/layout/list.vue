<template>
  <view class="container">
    <view class="dt-bg-color-white" style="padding: 16rpx 0 16rpx 32rpx; margin-bottom: 16rpx;">
      <dt-tab :tabs="typeOptions" v-model="typeIndex" @change="(i) => onChange(i, 'type')" isScroll tab-class="dt-btn-tab-class" tab-class-active="dt-btn-tab-class dt-btn-tab-active-class" />
    </view>
    
    <view class="dt-bg-color-white" style="padding: 40rpx 0 16rpx 32rpx;">
      <dt-tab :tabs="roomOptions" v-model="roomIndex" @change="(i) => onChange(i, 'layout')" isScroll tab-class="dt-text-tab-class" tab-class-active="dt-text-tab-class dt-text-tab-active-class" line-style="display: none;" />
    </view>
    
    <view class="dt-bg-color-white" style="padding: 0 32rpx;">
      <template v-for="(layout, index) in list">
        <layout-item :key="index" :info="layout" />
      </template>
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
        typeIndex: 'residence',
        typeOptions: [
          { title: '住宅', key: 'residence' },
          { title: '车位', key: 'stall' },
          { title: '商铺', key: 'shop' },
          { title: '办公楼', key: 'office' }
        ],
        roomIndex: 0,
        roomOptions: [
          { title: '全部', key: '1' },
          { title: '四居(2)', key: '2' },
          { title: '三居(2)', key: '3' },
          { title: '二居(2)', key: '4' }
        ],
        list: [
          {
            title: '4室2厅2卫（A户型）',
            price: '791',
            status: 1,
            area: '135',
            orientation: '南',
            floor: '2.83',
            tags: ['南北通透', '动静分离', '衣帽间']
          },
          {
            title: '4室2厅2卫（A户型）',
            price: '791',
            status: 2,
            area: '135',
            orientation: '南',
            floor: '2.83',
            tags: ['南北通透', '动静分离', '衣帽间']
          },
          {
            title: '4室2厅2卫（A户型）',
            price: '791',
            status: 3,
            area: '135',
            orientation: '南',
            floor: '2.83',
            tags: ['南北通透', '动静分离', '衣帽间']
          }
        ],
        housesId: null,
      }
    },
    watch: {},
    onLoad(opt) {
      this.housesId = opt.housesId
      this.getList()
    },
    onShareAppMessage(opt) {},
    methods: {
      getList() {
        buildMgr.layouts({
          housesId: this.housesId,
          type: this.typeIndex
        }).then(res => {
          
        })
      },
      onChange(index, flag) {
        switch (flag) {
          case 'type': break;
          case 'layout': break;
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
  
  ::v-deep .type-tab-class {
  	font-size: 26rpx;
  	color: #333;
    height: 56rpx;
    line-height: 56rpx;
    padding: 0 38rpx;
    background-color: #F6F6F8;
    border-radius: 56rpx;
    margin-right: 40rpx;
    transition: all 300ms;
  }
  
  ::v-deep .type-tab-active-class {
  	color: #fff;
    background-color: #4A6DDB;
  }
  
  ::v-deep .room-tab-class {
  	font-size: 32rpx;
  	color: #666;
    margin-right: 48rpx;
    font-weight: 400;
    transition: all 300ms;
  }
  
  ::v-deep .room-tab-active-class {
  	color: #4A6DDB;
    font-weight: 500;
  }
</style>
