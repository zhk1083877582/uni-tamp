<template>
  <view>
    <view class="dt-flex dt-flex-horizontal-between dt-line-b" style="padding: 28rpx 0 24rpx;">
      <template v-for="(item, index) in detail.info1">
        <view v-if="item.flag" :key="index">
          <view class="dt-text-size-32 dt-flex dt-flex-vertical-center">
            <text v-if="item.content != '待定'" class="dt-text-size-24" style="color: #999; margin-right: 6rpx;">约</text>
            <text style="font-weight: 500;">{{ item.content }}</text>
          </view>
          <view class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">{{ item.label }}</view>
        </view>
        <view v-else :key="index">
          <view class="dt-text-size-32" style="color: #333; font-weight: 500;">{{ item.content }}</view>
          <view class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">{{ item.label }}</view>
        </view>
      </template>
    </view>
    
    <view class="dt-text-size-28" style="padding-top: 24rpx;">
      <template v-for="(item, index) in detail.info2">
        <view :key="index" class="dt-flex dt-flex-horizontal-between" style="margin-top: 12rpx;">
          <view v-for="(it, idx) in item" :key="idx">
            <text style="color: #999;">{{ it.label }}：</text>
            <text :style="{ color: it.unitPrice ? '#F75736' : '#333' }">{{ it.content }}</text>
          </view>
        </view>
      </template>
      
      <view class="dt-flex dt-flex-horizontal-between dt-flex-vertical-start" style="margin-top: 24rpx;">
        <view>
          <text style="color: #999;">地址：</text>
          <text style="color: #333;">{{ info.addr }}</text>
        </view>
        <view class="dt-flex dt-flex-vertical-center" style="width: 80rpx; margin-top: 4rpx;">
          <text class="dt-text-size-24" style="color: #4A6DDB;">周边</text>
          <image src="https://static.tospurfang.com/com/building/arrow_blue.png" style="display: block; width: 12rpx; height: 20rpx; margin-left: 8rpx;"></image>
        </view>
      </view>
    </view>
    
    <view @click="onClick" class="dt-text-size-28 dt-text-align-center" style="color: #4A6DDB; line-height: 80rpx; background-color: #F1F5FD; border-radius: 16rpx; margin-top: 36rpx;">
      查看楼盘完整信息
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      info: Object,
      type: String
    },
    data() {
      return {
        detail: null
      }
    },
    mounted() {
      this.setDetail()
    },
    watch: {
      type(n, o) {
        this.setDetail()
      }
    },
    methods: {
      onClick() {
        uni.navigateTo({
          url: './info?data=' + JSON.stringify(this.info)
        })
      },
      setDetail() {
        this.detail = this.info && this.info[this.type] ? { ...this.info[this.type] } : {},
        this.detail.info1 = [{
          label: '参考总价',
          content: this.dealData(this.detail, 'referenceTotalPriceMin', 'referenceTotalPriceMax', this.type == 'stall' ? '万/个' : '万/套'),
          flag: true
        }, {
          label: '参考建面',
          content: this.dealData(this.detail, 'floorAreaMin', 'floorAreaMax', '㎡')
        }]
        
        switch (this.type) {
          case 'residence': {
            this.detail.info1.unshift({
              label: '参考户型',
              content: this.detail.referenceHouseType ? this.detail.referenceHouseType + '室' : '待定'
            })
            this.detail.info2 = this.residenceInfo()
            break
          }
          case 'stall': {
            this.detail.info2 = this.stallInfo()
            break
          }
          case 'shop': {
            this.detail.info2 = this.shopInfo()
            break
          }
          case 'office': {
            this.detail.info2 = this.officeInfo()
            break
          }
          default: break;
        }
      },
      residenceInfo() {
        let info2 = []
        info2.push(this.unitPrice())
        if (this.detail.greeningRate || this.detail.plotRatio) {
          let data = []
          if (this.detail.greeningRate) {
            data.push({
              label: '绿化率',
              content: this.detail.greeningRate + '%'
            })
          }
          if (this.detail.plotRatio) {
            data.push({
              label: '容积率',
              content: this.detail.plotRatio
            })
          }
          info2.push(data)
        }
        if (this.detail.propertyPrice || this.detail.stallMatching) {
          let data = []
          if (this.detail.propertyPrice) {
            data.push({
              label: '物业费',
              content: this.detail.propertyPrice + '元/㎡/月'
            })
          }
          if (this.detail.stallMatching) {
            data.push({
              label: '车位比',
              content: this.detail.stallMatching
            })
          }
          info2.push(data)
        }
        return info2
      },
      stallInfo() {
        let info2 = []
        if (this.detail.decoration && this.detail.decoration.length) {
          info2.push([{
            label: '装修情况',
            content: this.detail.decoration.join('、')
          }])
        }
        if (this.detail.carportType && this.detail.carportType.length) {
          info2.push([{
            label: '车位类型',
            content: this.detail.carportType.join('、')
          }])
        }
        if (this.detail.stallCount || this.detail.chargingPile) {
          let data = []
          if (this.detail.stallCount) {
            data.push({
              label: '车位数',
              content: this.detail.stallCount
            })
          }
          if (this.detail.chargingPile) {
            data.push({
              label: '充电桩',
              content: this.detail.chargingPile == '1' ? this.detail.chargingPileCount ? `配备(${this.detail.chargingPileCount}个)` : '配备' : '未配备'
            })
          }
          info2.push(data)
        }
        return info2
      },
      shopInfo() {
        let info2 = []
        info2.push(this.unitPrice())
        if (this.detail.belongBusinessDistrict || this.detail.propertyPrice) {
          let data = []
          if (this.detail.belongBusinessDistrict) {
            data.push({
              label: '所属商圈',
              content: this.detail.belongBusinessDistrict
            })
          }
          if (this.detail.propertyPrice) {
            data.push({
              label: '物业费',
              content: this.detail.propertyPrice + '元/㎡/月'
            })
          }
          info2.push(data)
        }
        if (this.detail.stallCount) {
          info2.push([{
            label: '车位数',
            content: this.detail.stallCount
          }])
        }
        return info2
      },
      officeInfo() {
        let info2 = []
        info2.push(this.unitPrice())
        if (this.detail.belongBusinessDistrict || this.detail.decoration) {
          let data = []
          if (this.detail.belongBusinessDistrict) {
            data.push({
              label: '所属商圈',
              content: this.detail.belongBusinessDistrict
            })
          }
          if (this.detail.decoration && this.detail.decoration.length) {
            data.push({
              label: '装修情况',
              content: this.detail.decoration.join('、')
            })
          }
          info2.push(data)
        }
        if (this.detail.propertyPrice || this.detail.stallCount) {
          let data = []
          if (this.detail.propertyPrice) {
            data.push({
              label: '物业费',
              content: this.detail.propertyPrice + '元/㎡/月'
            })
          }
          if (this.detail.stallCount) {
            data.push({
              label: '车位数',
              content: this.detail.stallCount
            })
          }
          info2.push(data)
        }
        return info2
      },
      unitPrice() {
        let referenceUnitPrice = this.detail.referenceUnitPrice
        return [{
          unitPrice: true,
          label: '参考均价',
          content: referenceUnitPrice == '1' ? `约${this.detail.referenceUnitPriceMin}元/㎡`
                 : referenceUnitPrice == '2' ? `约${this.detail.referenceUnitPriceMin}元-${this.detail.referenceUnitPriceMax}元/㎡`
                 : referenceUnitPrice == '3' ? `约${this.detail.referenceUnitPriceMin}元/㎡起`
                 : '待定'
        }]
      },
      dealData(data, start, end, unit) {
        let str = '待定'
        if (data[start] && data[end]) {
          str = data[start] + '-' + data[end] + unit
        } else if (data[start]) {
          str = data[start] + unit
        } else if (data[end]) {
          str = data[end] + unit
        }
        return str
      },
    }
  };
</script>

<style lang="scss" scoped>
</style>
