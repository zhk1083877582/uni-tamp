<template>
  <view class="building-card">
    <view class="building_title_name">
      <view class="build_name">
        {{building.housesName}}
      </view>
      <view class="build_stickers">
        {{building.salesStatus == 'forSale'?'待售':building.salesStatus == 'onSales'?'在售':building.salesStatus == 'sellOut'?'售罄':''}}
      </view>
    </view>
    <!-- 图片 -->
    <view class="img-container">
      <view class="img"
        :style="{'background-image':`url(${building.realImgPath||'https://images.tospurfang.com/B8A86CAEE12C4158AA9CBE9C7C1E57C3-6-2.jpg'})`}">
      </view>
      <view class="play-flag" v-if="building.mp4Picture||building.vrPicture">
        <view class="triangle"></view>
      </view>
      <view class="img-flag">
        <text class="flag-item" v-if="building.vrPicture"
          :class="building.vrPicture?'flag-item-active':''">VR</text>
        <text class="flag-item" v-if="building.mp4Picture"
          :class="!building.vrPicture?'flag-item-active':''">视频</text>
        <text class="flag-item" v-if="building.imgPicture"
          :class="!building.vrPicture&&!building.mp4Picture?'flag-item-active':''">图片</text>
      </view>
    </view>
    <building-info :info='building' :userId="userId" :sn="sn" isCard />
  </view>
</template>

<script>
  import { getData } from '@/request/api'
  import buildingInfo from '__com/building/info.vue'

  export default {
    components: {
      buildingInfo
    },
    props: {
      building: Object,
      userId: String,
      sn: String
    },
    data() {
      return {}
    },
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .building-card {
    width: 100%;
    // height:842rpx ;
    // background-color: #FFFFFF;
    border-radius: 16rpx;

    .building_title_name {
      height: 166rpx;
      background: #324877;
      position: relative;
      overflow: hidden;
      text-align: center;
      padding: 34rpx 0;

      .build_name {
        background: linear-gradient(270deg, #e2cca8 97%, #f4e6cf);
        -webkit-background-clip: text;
        font-size: 56rpx;
        font-weight: 600;
        text-align: center;
        color: transparent;
        line-height: 56rpx;
        text-shadow: 0px 2rpx 14rpx 0px rgba(0, 0, 0, 0.09);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .building_bright_spot {
        margin-top: 18rpx;
        background: linear-gradient(270deg, #ddceb5, #f4e6cf 2%);
        -webkit-background-clip: text;
        font-size: 24rpx;
        text-align: center;
        color: transparent;
        line-height: 24rpx;
        text-shadow: 0px 2rpx 14rpx 0px rgba(0, 0, 0, 0.09);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 30rpx;
      }

      .build_stickers {
        font-size: 24rpx;
        text-align: center;
        color: #4c3612;
        line-height: 50rpx;
        width: 220rpx;
        opacity: 1;
        background: #f1e3cb;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        position: absolute;
        top: 10rpx;
        left: -70rpx;
      }
    }

    //图片
    .img-container {
      width: 100%;
      height: 426rpx;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;

      .img {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        // border: 1px solid red;
      }

      //播放标识
      .play-flag {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50% 50%;
        background-color: #1b1b1b;
        opacity: 0.6;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .triangle {
        width: 40rpx;
        height: 45rpx;
        background-image: url(../../../static/house/triangle.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      //图片类型
      .img-flag {
        width: 100%;
        position: absolute;
        bottom: 24rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .flag-item {
        display: inline-block;
        width: 100rpx;
        height: 44rpx;
        line-height: 44rpx;
        text-align: center;
        margin-right: 10rpx;
        font-size: 22rpx;
        font-weight: 500;
        color: #666666;
        background: #ffffff;
        border-radius: 22rpx;
      }

      .flag-item-active {
        background: #324877;
        color: #ffffff;
      }
    }

  }
</style>
