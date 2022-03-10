<template>
  <view class="dt-bg-color-white" style="margin-bottom: 16rpx; padding: 40rpx 32rpx 32rpx;">
    <view class="dt-flex dt-flex-horizontal-between dt-flex-vertical-center">
      <view class="dt-text-size-32 dt-flex dt-flex-vertical-center" style="color: #333; font-weight: 500;">
        <view class="title-line"></view>
        <view>户型介绍</view>
      </view>
      <view @click="onClick" class="dt-flex dt-flex-vertical-center">
        <text class="dt-text-size-24" style="color: #999;">全部户型</text>
        <image src="https://static.tospurfang.com/com/building/arrow.png" style="display: block; width: 12rpx; height: 20rpx; margin-left: 8rpx;"></image>
      </view>
    </view>
    
    <view class="dt-bg-color-white" style="margin: 30rpx 0 34rpx;">
      <dt-tab :tabs="layouts" v-model="current" isScroll tab-class="dt-text-tab-class" tab-class-active="dt-text-tab-class dt-text-tab-active-class" line-style="display: none;" />
    </view>
    
    <scroll-view scroll-x scroll-with-animation="true">
      <view class="dt-flex">
        <view v-for="(item, index) in layouts[current].list" :key="index" class="dt-margin-r-30">
          <view style="width: 400rpx; height: 300rpx; border: 1rpx dashed #999;">
            <image :src="item.houseTypeAnnex" mode="aspectFill" style="display: block; width: 100%; height: 100%;"></image>
          </view>
          <view class="dt-text-size-30 dt-margin-t-40" style="color: #333; font-weight: 500;">
            {{ item.bedroom }}室{{ item.hall }}厅{{ item.toilet }}卫
          </view>
          <view v-if="item.floorArea || item.orientation" class="dt-text-size-26" style="color: #666; margin: 10rpx 0;">
            <text v-if="item.floorArea" class="dt-margin-r-20">建面{{ item.floorArea }}㎡</text>
            <text v-if="item.orientation">朝向{{ item.orientation }}</text>
          </view>
          <view class="dt-text-size-30" style="color: #F75736; font-weight: 500;">
            {{ item.totalPrice ? `约${item.totalPrice}万/套` : '待定' }}
          </view>
        </view>
    	</view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        default: () => {}
      },
      type: String
    },
    data() {
      return {
        current: 0,
        layouts: [],
      }
    },
    mounted() {
      this.dealData()
    },
    watch: {
      type(n, o) {
        this.dealData()
      }
    },
    methods: {
      onClick() {
        this.$emit('jump')
      },
      dealData() {
        switch (this.type) {
          case 'residence':
            this.layouts = this.info && this.info.residence ? this.groupBy(this.info.residence) : [];
            break;
          case 'stall':
            this.layouts = this.info && this.info.stall ? this.groupBy(this.info.stall) : [];
            break;
          case 'shop':
            this.layouts = this.info && this.info.shop ? this.groupBy(this.info.shop) : [];
            break;
          case 'office':
            this.layouts = this.info && this.info.office ? this.groupBy(this.info.office) : [];
            break;
          default: break;
        }
      },
      groupBy(data) {
        let list = data.houseTypeList || [],
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
  .title-line {
    width: 4rpx;
    height: 26rpx;
    background-color: #4A6DDB;
    margin-right: 12rpx;
  }
</style>
