<template>
  <view class="page">
    <view class="dt-bg-color-white" style="border-bottom: 1px solid #eeeeee;">
      <dt-tab :tabs="tabData" :value="tabIndex" @input="onTabCLick" isScroll tab-class="item tab-class" tab-class-active="item tab-class tab-class-active"
        lineStyle="width: 60rpx; background-color: #4A6DDB;"></dt-tab>
    </view>
    
    <view>
      <scroll-view class="xq-margin-t-30" style="height: calc(100vh - 154rpx); padding: 40rpx 32rpx;" :scroll-into-view="'item_' + tabIndex" @scroll="onScroll" scroll-y scroll-with-animation="true">
        <view @touchmove="onTouchmove" v-for="(info, index) in infos" :key="index" :id="'item_' + index" :ref="'item_' + index" style="margin-bottom: 44rpx;">
          <view class="dt-text-size-32" style="color: #333; font-weight: 500; margin-bottom: 26rpx;">
            {{ info.title }}
          </view>
          <view v-for="(item, idx) in info.fields" :key="idx" class="dt-flex dt-text-size-28" style="margin-bottom: 14rpx;">
            <view style="color: #999; width: 144rpx;">{{ item.name }}：</view>
            <view style="color: #333; flex: 1;">{{ item.content }}{{ item.unit }}</view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        isclickTab: false,
        tabIndex: 0,
        tabData: [
          { title: '基本信息', key: 'sd' },
          { title: '住宅信息', key: 'zh' },
          { title: '车位信息', key: 'gjj' },
          { title: '商铺信息', key: 'gjj' },
          { title: '办公楼信息', key: 'gjj' }
        ],
        infos: [
          {
            title: '基本信息',
            fields: [
              { name: '楼盘名称', field: 'name', unit: '', content: '万科天空之城' },
              { name: '所在区域', field: 'name', unit: '', content: '上海-青浦-徐泾' },
              { name: '楼盘地址', field: 'name', unit: '', content: '诸陆西路966号' },
            ]
          },
          {
            title: '住宅信息',
            fields: [
              { name: '参考均价', field: 'name', unit: '元/㎡', content: '58600-60000' },
              { name: '参考建面', field: 'name', unit: '㎡', content: '75-122' },
              { name: '参考总价', field: 'name', unit: '万/套', content: '439.5-714.9' },
              { name: '开发商', field: 'name', unit: '', content: '上海万泾置业有限公司' },
              { name: '装修情况', field: 'name', unit: '', content: '精装修' },
              { name: '交房日期', field: 'name', unit: '', content: '2022年6月30日' },
              { name: '产权年限', field: 'name', unit: '年', content: '70' },
              { name: '容积率', field: 'name', unit: '', content: '1.80' },
              { name: '绿化率', field: 'name', unit: '％', content: '35.00' },
              { name: '物业公司', field: 'name', unit: '', content: '上海万科物业管理有限公司' },
              { name: '物业费', field: 'name', unit: '元/㎡/月', content: '3.95' },
              { name: '车位配比', field: 'name', unit: '', content: '1:1.09' },
              { name: '车位个数', field: 'name', unit: '', content: '500' },
            ]
          },
          {
            title: '车位信息',
            fields: [
              { name: '参考建面', field: 'name', unit: '㎡', content: '10-15' },
              { name: '参考总价', field: 'name', unit: '万/个', content: '39.5-53.9' },
              { name: '装修情况', field: 'name', unit: '', content: '环氧地坪' },
              { name: '车位类型', field: 'name', unit: '', content: '标准、微型、子母' },
            ]
          },
          {
            title: '商铺信息',
            fields: [
              { name: '参考均价', field: 'name', unit: '元/㎡', content: '58600-60000' },
              { name: '建筑面积', field: 'name', unit: '㎡', content: '70-100' },
              { name: '参考总价', field: 'name', unit: '万/个', content: '339.5-553.9' },
              { name: '交房日期', field: 'name', unit: '', content: '2022年6月30日' },
              { name: '产权年限', field: 'name', unit: '年', content: '40' },
              { name: '物业公司', field: 'name', unit: '', content: '上海万科物业管理有限公司' },
              { name: '物业费', field: 'name', unit: '元/㎡/月', content: '3.95' },
              { name: '车位数', field: 'name', unit: '', content: '500' },
              { name: '所属商圈', field: 'name', unit: '', content: '虹桥枢纽' },
            ]
          },
          {
            title: '办公楼信息',
            fields: [
              { name: '参考均价', field: 'name', unit: '元/㎡', content: '58600-60000' },
              { name: '建筑面积', field: 'name', unit: '㎡', content: '70-100' },
              { name: '参考总价', field: 'name', unit: '万/个', content: '339.5-553.9' },
              { name: '装修情况', field: 'name', unit: '', content: '毛坯' },
              { name: '交房日期', field: 'name', unit: '', content: '2022年6月30日' },
              { name: '产权年限', field: 'name', unit: '年', content: '40' },
              { name: '物业公司', field: 'name', unit: '', content: '上海万科物业管理有限公司' },
              { name: '物业费', field: 'name', unit: '元/㎡/月', content: '3.95' },
              { name: '车位数', field: 'name', unit: '', content: '500' },
              { name: '所属商圈', field: 'name', unit: '', content: '虹桥枢纽' },
            ]
          }
        ]
      }
    },
    watch: {},
    onLoad(opt) {},
    onShareAppMessage(opt) {},
    methods: {
      onTabCLick(index) {
      	this.tabIndex = index
      	this.isclickTab = true;
      },
      onTouchmove() {
      	this.isclickTab = false;
      },
      onScroll(e) {
       //  if (this.isclickTab) return
       //  let _this = this
       //  let scrollTop = e.detail.scrollTop
       //  for (let index = 0; index <= _this.infos.length - 1; index ++) {
       //    console.log(scrollTop)
       //    console.log(_this.$refs['item_' + index][0].$el.offsetTop)
       //    console.log(_this.$refs['item_' + (index + 1)][0].$el.offsetTop)
       //    console.log('----------')
       //    let offsetTop = _this.$refs['item_' + index][0].$el.offsetTop
       //    if (scrollTop >= offsetTop && scrollTop < _this.$refs['item_' + (index + 1)][0].$el.offsetTop) {
       //    	_this.tabIndex = index
       //    	break
       //    }
      	// }
      },
    }
  };
</script>

<style lang="scss" scoped>
  ::v-deep .tab-class {
  	font-size: 30upx;
  	color: #666;
    font-weight: 400;
    height: 74rpx;
    line-height: 74rpx;
    margin: 0 34rpx;
  }
  
  ::v-deep .tab-class-active {
  	color: #4A6DDB;
    font-weight: 500;
  }
</style>
