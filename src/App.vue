<script>
import { getData } from '@/request/api'
export default {
  onLaunch: function () {
    console.log('进入App Launch')
  },
  onShow: function () {},
  onHide: function () {},
}
</script>

<style lang="scss">
  @import './style/main.scss';
  
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
