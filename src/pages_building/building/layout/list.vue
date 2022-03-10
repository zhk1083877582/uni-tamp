<template>
  <view class="container">
    <view class="dt-bg-color-white" style="padding: 16rpx 0 16rpx 32rpx; margin-bottom: 16rpx;">
      <dt-tab :tabs="tabs" v-model="curTab" @change="(i) => onClick(i, 'type')" isScroll tab-class="dt-btn-tab-class" tab-class-active="dt-btn-tab-class dt-btn-tab-active-class" />
    </view>
    
    <view v-if="type == 'residence'" class="dt-bg-color-white" style="padding: 40rpx 32rpx 0;">
      <dt-tab :tabs="roomTabs" v-model="curRoom" @change="(i) => onClick(i, 'room')" isScroll tab-class="dt-text-tab-class" tab-class-active="dt-text-tab-class dt-text-tab-active-class" line-style="display: none;" />
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
        curTab: 0,
        type: 'residence',
        tabs: [
          { title: '住宅', key: 'residence' },
          { title: '车位', key: 'stall' },
          { title: '商铺', key: 'shop' },
          { title: '办公楼', key: 'office' }
        ],
        curRoom: 0,
        roomTabs: [
          { title: '全部', key: '1' },
          { title: '四居(2)', key: '2' },
          { title: '三居(2)', key: '3' },
          { title: '二居(2)', key: '4' }
        ],
        list: [],
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
          // housesId: this.housesId,
          housesId: 18531,
          type: this.type
        }).then(res => {
          if (this.type == 'residence') {
            this.roomTabs = this.groupBy(res)
            this.list = this.roomTabs[this.curRoom].list
          } else {
            this.list = res
          }
        })
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
      onClick(index, flag) {
        switch (flag) {
          case 'type':
            this.type = this.tabs[index].key;
            this.getList();
            break;
          case 'room':
            this.list = this.roomTabs[index].list
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
