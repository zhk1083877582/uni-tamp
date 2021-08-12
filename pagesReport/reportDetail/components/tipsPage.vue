<!-- 置业小贴士 -->
<template>
  <view class='tips_warp'>
    <card title="置业小贴士">
      <view class="tips">
        <u-avatar class="avatarTou" :src="headPortrait" size='88' mode="circle"></u-avatar>
        <view class="list">
          <view class="list_item" v-for="(item,index) in list" :key="index">
            <text class="yuan"></text> <text class="text">{{item.text}}</text>
          </view>
        </view>
      </view>
    </card>
  </view>
</template>

<script>
import card from '@/components/card/card.vue'
export default {
  components: {
    card,
  },
  data() {
    return {
      headPortrait:
        'https://images.xique51.com/BA7EDA2214C144AD9C94228999EEB579-6-2.png',
      list: [
        {
          text: '建议您先了解房源再做决策，多看看房子，多听听购房建议，有利无害；',
        },
        {
          text: '建议您按照购房需求的优先级来选择楼盘：总房款>项目品质>配套设置>个人喜好；',
        },
        {
          text: '建议您可以选择性带一些资金，以防您遇到喜欢的房源，可以做小定；',
        },
        {
          text: '建议您如果出来看房，可以带上家人一起看房，共同决策；',
        },
        {
          text: '最后，祝您选到合适的房源。',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
}
</script>
<style lang='scss' scoped>
.tips_warp {
  margin-bottom: 40rpx;
  .tips {
    display: flex;
    .list {
      .list_item {
        display: flex;
        margin: 20rpx 0;
        .yuan {
          display: block;
          background-color: #999999;
          width: 12rpx;
          height: 12rpx;
          border-radius: 50%;
          vertical-align: baseline;
          margin: 0 20rpx;
          margin-top: 12rpx;
        }
        .text {
          font-size: 24rpx;
          color: #999999;
          line-height: 36rpx;
          flex: 1;
        }
      }
    }
  }
}
</style>
