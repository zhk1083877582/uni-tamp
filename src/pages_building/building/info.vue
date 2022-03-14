<template>
  <view class="page">
    <view class="dt-width-100 dt-line-b">
      <dt-tab :tabs="infos" :value="current" @input="onTabCLick" isScroll tab-class="dt-line-tab-class" tab-class-active="dt-line-tab-class dt-line-tab-active-class"
        lineStyle="display: block; width: 60rpx; background-color: #4A6DDB;"></dt-tab>
    </view>
    
    <scroll-view class="dt-margin-t-30" style="height: calc(100vh - 130rpx);" @scroll="onScroll" scroll-y
      :scroll-into-view="'item_' + current" scroll-with-animation="true">
      <view @touchmove="onTouchmove" v-for="(info, index) in infos" :key="index" :id="'item_' + index" :ref="'item_' + index" style="padding: 0 30rpx; margin-bottom: 44rpx;">
        <view class="dt-text-size-32" style="color: #333; font-weight: 500; margin-bottom: 26rpx;">
          {{ info.title }}
        </view>
        <view v-for="(item, key) in info.fields" :key="key" class="dt-flex dt-text-size-28" style="margin-bottom: 14rpx;">
          <view v-if="key == 'signAddress'" class="dt-width-100 dt-flex dt-flex-horizontal-between">
            <view class="dt-flex">
              <view style="color: #999; width: 144rpx;">{{ item.label }}：</view>
              <view style="color: #4A6DDB; flex: 1;">{{ item.content }}</view>
            </view>
            <view style="width: 12rpx; margin-top: 10rpx;">
              <image src="https://static.tospurfang.com/com/building/arrow_blue.png" style="display: block; width: 12rpx; height: 20rpx;"></image>
            </view>
          </view>
          
          <template v-else>
            <view style="color: #999; width: 144rpx;">{{ item.label }}：</view>
            <view style="color: #333; flex: 1;">{{ item.content }}{{ item.unit || '' }}</view>
          </template>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        isclickTab: false,
        current: 0,
        infos: [],
        detail: null
      }
    },
    onLoad(opt) {
      this.detail = JSON.parse(opt.data)
      this.setInfos()
    },
    methods: {
      setInfos() {
        let infos = [{
          title: '基本信息',
          fields: {
            housesName: {
              label: '楼盘名称',
              content: this.detail.housesName
            },
            city: {
              label: '所在区域',
              content: `${this.detail.cityName}-${this.detail.areaName}-${this.detail.streetName}`
            },
            signAddress: {
              label: '楼盘地址',
              content: this.detail.signAddress
            },
          }
        }]
        
        if (this.detail.residence && this.residenceInfo()) {
          infos.push(this.residenceInfo())
        }
        if (this.detail.stall && this.stallInfo()) {
          infos.push(this.stallInfo())
        }
        if (this.detail.shop && this.shopInfo()) {
          infos.push(this.shopInfo())
        }
        if (this.detail.office && this.officeInfo()) {
          infos.push(this.officeInfo())
        }
        this.infos = infos
      },
      residenceInfo() {
        let info = this.detail.residence
        let fields = {
          price: {
            label: '参考均价',
            content: '约' + info.referenceUnitPriceMin + '元/㎡'
          },
          area: {
            label: '参考建面',
            content: this.dealData(info, 'floorAreaMin', 'floorAreaMax', '㎡') ? `约${this.dealData(info, 'floorAreaMin', 'floorAreaMax', '㎡')}` : '待定'
          },
          totalPrice: {
            label: '参考总价',
            content: this.dealData(info, 'referenceTotalPriceMin', 'referenceTotalPriceMax', '万/套') ? `约${this.dealData(info, 'referenceTotalPriceMin', 'referenceTotalPriceMax', '万/套')}` : '待定'
          },
        }
        let arr = [
          { key: 'developers', label: '开发商' },
          { key: 'decoration', label: '装修情况' },
          { key: 'associateDate', label: '交房日期' },
          { key: 'propertyRightYear', label: '产权年限', unit: '年' },
          { key: 'plotRatio', label: '容积率', unit: '%' },
          { key: 'greeningRate', label: '绿化率', unit: '%' },
          { key: 'propertyCompany', label: '物业公司' },
          { key: 'propertyPrice', label: '物业费', unit: '元/㎡/月' },
          { key: 'stallMatching', label: '车位配比' },
          { key: 'stallCount', label: '车位个数' },
        ]
        for (let item of arr) {
          let value = item.key == 'decoration' ? info[item.key] && info[item.key].length : info[item.key]
          if (value) {
            fields[item.key] = {
              label: item.label,
              content: item.key == 'decoration' ? info[item.key].join('、') : info[item.key],
              unit: item.unit || ''
            }
          }
        }
        return Object.keys(fields).length ? { title: '住宅信息', fields } : null
      },
      stallInfo() {
        let info = this.detail.stall
        let fields = {
          area: {
            label: '参考建面',
            content: this.dealData(info, 'floorAreaMin', 'floorAreaMax', '㎡') ? `约${this.dealData(info, 'floorAreaMin', 'floorAreaMax', '㎡')}` : '待定'
          },
          totalPrice: {
            label: '参考总价',
            content: this.dealData(info, 'referenceTotalPriceMin', 'referenceTotalPriceMax', '万/个') ? `约${this.dealData(info, 'referenceTotalPriceMin', 'referenceTotalPriceMax', '万/个')}` : '待定'
          },
        }
        let arr = [
          { key: 'decoration', label: '装修情况' },
          { key: 'carportType', label: '车位类型' },
          { key: 'stallCount', label: '车位个数' },
          { key: 'chargingPile', label: '充电桩' },
        ]
        for (let item of arr) {
          let value = item.key == 'decoration' || item.key == 'carportType' ? info[item.key] && info[item.key].length : info[item.key]
          if (value) {
            if (item.key == 'chargingPile') {
              fields.chargingPile = {
                label: item.label,
                content: info.chargingPile == '1' ? info.chargingPileCount ? `有(${info.chargingPileCount}个)` : '有' : '无',
              }
            } else {
              fields[item.key] = {
                label: item.label,
                content: item.key == 'decoration' || item.key == 'carportType' ? info[item.key].join('、') : info[item.key],
                unit: item.unit || ''
              }
            }
          }
        }
        return Object.keys(fields).length ? { title: '车位信息', fields } : null
      },
      shopInfo() {
        let info = this.detail.shop
        let fields = {
          price: {
            label: '参考均价',
            content: '约' + info.referenceUnitPriceMin + '元/㎡'
          },
          area: {
            label: '建筑面积',
            content: this.dealData(info, 'floorAreaMin', 'floorAreaMax', '㎡') ? `约${this.dealData(info, 'floorAreaMin', 'floorAreaMax', '㎡')}` : '待定'
          },
          totalPrice: {
            label: '参考总价',
            content: this.dealData(info, 'referenceTotalPriceMin', 'referenceTotalPriceMax', '万/套') ? `约${this.dealData(info, 'referenceTotalPriceMin', 'referenceTotalPriceMax', '万/套')}` : '待定'
          },
        }
        let arr = [
          { key: 'associateDate', label: '交房日期' },
          { key: 'propertyRightYear', label: '产权年限', unit: '年' },
          { key: 'propertyCompany', label: '物业公司' },
          { key: 'propertyPrice', label: '物业费', unit: '元/㎡/月' },
          { key: 'stallCount', label: '车位个数' },
          { key: 'belongBusinessDistrict', label: '所属商圈' },
        ]
        for (let item of arr) {
          if (info[item.key]) {
            fields[item.key] = {
              label: item.label,
              content: info[item.key],
              unit: item.unit || ''
            }
          }
        }
        return Object.keys(fields).length ? { title: '商铺信息', fields } : null
      },
      officeInfo() {
        let info = this.detail.office
        let fields = {
          price: {
            label: '参考均价',
            content: '约' + info.referenceUnitPriceMin + '元/㎡'
          },
          area: {
            label: '建筑面积',
            content: this.dealData(info, 'floorAreaMin', 'floorAreaMax', '㎡') ? `约${this.dealData(info, 'floorAreaMin', 'floorAreaMax', '㎡')}` : '待定'
          },
          totalPrice: {
            label: '参考总价',
            content: this.dealData(info, 'referenceTotalPriceMin', 'referenceTotalPriceMax', '万/套') ? `约${this.dealData(info, 'referenceTotalPriceMin', 'referenceTotalPriceMax', '万/套')}` : '待定'
          },
        }
        let arr = [
          { key: 'decoration', label: '装修情况' },
          { key: 'associateDate', label: '交房日期' },
          { key: 'propertyRightYear', label: '产权年限', unit: '年' },
          { key: 'propertyCompany', label: '物业公司' },
          { key: 'propertyPrice', label: '物业费', unit: '元/㎡/月' },
          { key: 'stallCount', label: '车位个数' },
          { key: 'belongBusinessDistrict', label: '所属商圈' },
        ]
        for (let item of arr) {
          let value = item.key == 'decoration' ? info[item.key] && info[item.key].length : info[item.key]
          if (value) {
            fields[item.key] = {
              label: item.label,
              content: item.key == 'decoration' ? info[item.key].join('、') : info[item.key],
              unit: item.unit || ''
            }
          }
        }
        return Object.keys(fields).length ? { title: '办公楼信息', fields } : null
      },
      onTabCLick(index) {
      	this.current = index
      	this.isclickTab = true;
      },
      onTouchmove() {
      	this.isclickTab = false;
      },
      onScroll(e) {
        if (this.isclickTab) return
        let _this = this
        let scrollTop = e.detail.scrollTop
        for (let index = 0; index <= _this.infos.length - 1; index ++) {
          _this.$nextTick(() => {
            console.log(_this.$refs.item_0)
          })
          // console.log(_this.infos[index])
          // console.log(scrollTop)
          // console.log(_this.$refs.item_0)
          // console.log('----------')
          // let top = _this.$refs['item_' + index][0].$el.offsetTop,
          //     idx = index + 1 == _this.infos.length ? index : index + 1,
          //     topN = _this.$refs['item_' + idx][0].$el.offsetTop
          // if ((index + 1 < _this.infos.length && scrollTop < topN) || (index + 1 == _this.infos.length && top <= scrollTop)) {
          //   _this.current = index
          // }
        }
      },
      dealData(data, start, end, unit) {
        let str = ''
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
