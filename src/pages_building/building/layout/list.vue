<template>
  <view class="page container">
    <view class="dt-bg-color-white" style="padding: 16rpx 0 16rpx 32rpx; margin-bottom: 16rpx;">
      <dt-tab :tabs="tabs" v-model="curTab" @change="(i) => onClick(i, 'type')" isScroll tab-class="dt-btn-tab-class" tab-class-active="dt-btn-tab-class dt-btn-tab-active-class" />
    </view>
    
    <view v-if="type == 'residence'" class="dt-bg-color-white" style="padding: 40rpx 32rpx 0;">
      <dt-tab :tabs="roomTabs" v-model="curRoom" @change="(i) => onClick(i, 'room')" isScroll tab-class="dt-text-tab-class" tab-class-active="dt-text-tab-class dt-text-tab-active-class" line-style="display: none;" />
    </view>
    
    <view class="dt-bg-color-white" style="padding: 0 32rpx;">
      <template v-for="(layout, index) in list">
        <layout-item :key="index" :info="layout" :source="source" />
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
        roomTabs: [],
        list: [],
        housesId: null,
        source: []
      }
    },
    onLoad(opt) {
      this.housesId = opt.housesId
      this.getList()
    },
    methods: {
      getList() {
        buildMgr.layouts({
          // housesId: this.housesId,
          housesId: 18531,
          type: this.type
        }).then(res => {
          this.source = [...res]
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
</style>
