<!--  -->
<template>
  <view class='article_page'>
    <view class="detail">
      <view class="detailTit">{{articleData.articleTitle}}</view>
      <!-- <view class="avatar">
				<img :src="articleData.articleImage" class="avatarImg">
				<text class="Nickname">{{articleData.creater||''}}</text>
				<text class="dataTime">
						{{articleData.createTime||''}}
				</text>
			</view> -->
      <view class="artCon">
        <jyf-parser :html="articleData.articleContent" ref="article"></jyf-parser>
      </view>
    </view>
    <view class="fixed_bottom">
      <foot-bottom :userId='userId' v-if="userId" :buildingId="buildingId"></foot-bottom>
    </view>
  </view>
</template>

<script>
import { getData } from '@/request/api'
import jyfParser from '@/components/jyf-parser/jyf-parser.vue'
import footBottom from '@/components/footer/index.vue'
export default {
  components: {
    jyfParser,
    footBottom,
  },
  data() {
    return {
      articleId: '',
      articleData: {},
      beginTime: '',
      userId: '',
      showAuthorize: false,
      buildingId: '',
    }
  },
  computed: {},
  watch: {},
  methods: {
    getArticle(id) {
      let params = {
        articleId: id,
      }
      getData('/dt-business/article/manager/info/get', params).then((res) => {
        console.log(res)
        this.articleData = res
        this.buildingId = res.buildingId
      })
    },
  },
  created() {},
  mounted() {},
  onLoad(option) {
    console.log(option)
    if (option.scene) {
      const scene = decodeURIComponent(option.scene)
      let obj = {}
      scene.split('&').forEach((item) => {
        const key = item.split('=')[0]
        obj[key] = item.split('=')[1]
      })

      this.articleId = obj.articleId
      this.userId = obj.userId
      // this.buildingId = obj.buildingId || ''
    } else {
      this.articleId = option.articleId
      this.userId = option.userId
      // this.buildingId = option.buildingId || ''
    }
    this.getArticle(this.articleId)

    if (!this.$cache.getCache('M-Token')) {
      this.showAuthorize = true
      this.getPhone()
      // uni.navigateTo({
      // 	url: '/pagesUser/login/login?topath=pagesUser/article/article&articleId=' + option.articleId + '&userId=' + option.userId
      // });
    } else {
      this.showAuthorize = false
    }
  },
  onHide() {
    console.log('onHide 222')
    //客户足迹埋点
    this.CustomerTrack.stayTime = new Date().getTime() - this.beginTime
    this.addCustomerTrack()
  },
  onUnload() {
    console.log('onUnload 333')
    //客户足迹埋点
    this.CustomerTrack.stayTime = new Date().getTime() - this.beginTime
    this.addCustomerTrack()
  },
}
</script>
<style lang='scss' scoped>
.detail {
  background-color: #fff;
  padding: 20px;
  padding-bottom: 70px;
}
.fixed_bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
}
.detailTit {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  line-height: 1.5;
}
.avatar {
  margin-top: 22px;
  display: flex;
  flex-direction: row;
}

.avatar .avatarImg {
  width: 40px !important;
  height: 40px !important;
}

.Nickname {
  font-size: 14px;
  color: #333;
  line-height: 40px;
  margin-left: 10px;
}

.dataTime {
  font-size: 14px;
  color: #333;
  text-align: right;
  flex: 1;
  line-height: 40px;
}

.detailCon {
  font-size: 14px;
  color: #333;
  line-height: 21px;
  margin: 20px 0;
}
/deep/video {
  width: 100% !important;
  display: block;
}
/deep/img {
  width: 100% !important;
  display: block;
}
/deep/video {
  width: 100% !important;
  display: block;
}
/deep/iframe {
  width: 100% !important;
  height: 100% !important;
}
</style>
