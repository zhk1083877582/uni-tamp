<script>
import { getData } from '@/request/api'
export default {
  onLaunch: function () {
    console.log('进入App Launch')
    // 获取jsCode openid session_key
    const self = this
    uni.login({
      success: (res) => {
        if (res.code) {
          self.jsCode = res.code //保存获取到的code
          let params = {
            jsCode: res.code,
          }
          let api = '/dt-user/noToken/wx/wxAuth'
          getData(api, params)
            .then((res) => {
              this.$cache.setCache('customerWXId', res)
            })
            .catch((err) => {
              console.log('请求结果报错', err)
            })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
    })
  },
  onShow: function () {},
  onHide: function () {},
}
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  src: url('/static/uni.ttf');
}
/* #endif */
uni-page-body,
html,
body {
  height: 100%;
}
</style>
