<script setup lang="ts">
  import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
  onLaunch(() => {
    console.log("App Launch");
  });
  onShow(() => {
    console.log("App Show");
  });
  onHide(() => {
    console.log("App Hide");
  });
</script>


<style lang="scss">
  @import './style/main.scss';

  uni-page-body,
  html,
  body {
    height: 100%;
  }
</style>
