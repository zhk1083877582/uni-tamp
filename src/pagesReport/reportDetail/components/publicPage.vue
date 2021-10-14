<!-- 公共页面 -->
<template>
  <view class='pablic_page'>
    <card :title="title">
      <!-- <image class="content_image" src="https://images.tospurfang.com/EB5ACB88E76C4C5C81947F3A10968F55-6-2.jpg" mode="widthFix"></image>
			<view class="content_text">
				徐泾人口少、密度低，是青浦的老牌别墅区板块。一场进博会，彻底引爆了徐泾板块的楼市。 徐泾的房地产市场这几年发展得如火如荼，大虹桥徐泾板块是近年来炙手可热的置业区域，区域内新房曝光度颇高。徐泾板块配套整体来看，都更偏向国际化趋势。
			</view> -->
      <view class="content_text">
        <jyf-parser :html="resData.articleContent" ref="article"></jyf-parser>
      </view>
    </card>
  </view>
</template>

<script>
import card from '@/components/card/card.vue'
import jyfParser from '@/components/jyf-parser/jyf-parser.vue'
export default {
  components: {
    card,
    jyfParser,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    resData: {
      type: Object,
      default: () => {
        return {
          articleContent: '暂无数据',
        }
      },
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    // console.log(this.resData,'公共样式数据')
  },
}
</script>
<style lang='scss' scoped>
.pablic_page {
  .content_image {
    width: 622rpx;
    height: 341rpx;
    display: block;
  }
  .content_text {
    font-size: 28rpx;
    font-weight: 400;
    color: #2b2014;
    line-height: 52rpx;
    margin-top: 17rpx;
  }
  ::v-deep video {
    width: 100% !important;
    display: block;
  }
  ::v-deep img {
    width: 100% !important;
    display: block;
  }
  ::v-deep video {
    width: 100% !important;
    display: block;
  }
  ::v-deep iframe {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
