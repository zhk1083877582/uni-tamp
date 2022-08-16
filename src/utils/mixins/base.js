import {
  getData
} from '@/request/api';
export default {
  data() {
    return {
      //设置默认买点参数
      buryingPoint: {
        customerId: '', //客户Id
        userId: '',
        operationType: '', //1.发送置业报告,2.打开置业报告,3.关闭置业报告,5.返回首页，6.用户点击楼盘，7.联系管家，8.管家名片点击，9.管家名片分享
        modelType: '', //模块(1.首页 2.楼盘详情 3.置业报告)
        reportId: '', //置业报告Id
        beginTime: '', //打开时间
        endTime: '', //关闭时间
        buildingId: '',
        wxOpenId: '',
        wxUnionId: '',
        updateTransmitCountFlag: 1, //是否更新置业计划书转发次数： 0 不更新， 1 更新
      },
      //客户足迹埋点
      CustomerTrack: {
        buildingId: '', //楼盘ID
        userId: '', //顾问ID
        customerId: '', //客户id
        dataId: '', //业务id(名片/置业报告ID/素材id)
        stayTime: '', //	停留时长
        operateType: '', //操作类型(1:查看置业报告 2:浏览楼盘 3:查看名片 4:查看素材 )
        shareType: '', //分享类型(1:分享置业报告 2:分享楼盘 3:分享名片 4:分享素材
        operateCanal: '', //查看渠道(1:来源名片  2:来源置业计划书 3:来源客户转发)
        wxAvatarUrl: '', //头像
        wxNickname: '', //微信昵称
        wxOpenId: '',
        wxUnionId: '',
      },
      //设置默认的分享参数
      share: {
        title: '置业笔记',
        path: '',
        imageUrl: '',
      }
    }
  },
  methods: {
    //埋点
    /* 
     *  埋点调用
     *	this.ReportLog({reportId:111,reportA:222})
     */
    ReportLog(data) {
      let params = Object.assign({}, this.buryingPoint, data);
      console.log('大数据埋点数据', params)
      getData('/dt-marketing/v1/report/log/noToken/create', params).then((res) => {
        // console.log('埋点接口',res)
      }).catch((err) => {
        console.log('埋点接口', err)
      })
    },
    /* 
     * 客户足迹埋点
     */
    addCustomerTrack(data) {
      let params = Object.assign({}, this.CustomerTrack, data);
      params.stayTime = params.stayTime ? this.formatDuring(params.stayTime) : ''
      console.log('客户足迹埋点', params)
      getData('/dt-customer/customerTrack/noToken/shareCard', params).then((res) => {
        // console.log('埋点接口',res)
      }).catch((err) => {
        console.log('埋点接口', err)
      })
    },
    //时间戳转时分秒
    formatDuring(mss) {
      var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));

      var seconds = parseInt((mss % (1000 * 60)) / 1000);

      hours = hours < 10 ? ('0' + hours) : hours;

      minutes = minutes < 10 ? ('0' + minutes) : minutes;

      seconds = seconds < 10 ? ('0' + seconds) : seconds;

      return hours + ":" + minutes + ":" + seconds;

    },
  },
  mounted() {

  },
  onShareAppMessage(res) {
    let buryingPointShareType = '',
      CustomerTrackShareType = '',
      CustomerOperateCanal = ''
    //大数据
    if (this.buryingPoint.modelType == '3' || this.buryingPoint.modelType == '4') {
      if (this.buryingPoint.modelType == '3') {
        this.buryingPoint.operationType = '' //清空操作类型
        buryingPointShareType = '1'
      }
      if (this.buryingPoint.modelType == '4') {
        this.buryingPoint.operationType = '' //清空操作类型
        buryingPointShareType = '2'
      }
      this.ReportLog({
        shareType: buryingPointShareType
      })
    }

    //客户足迹
    if (this.CustomerTrack.operateType == '1') {
      let userInfo = this.$dt.biz.auth.getInfoSync()
      let { avatarUrl, nickName } = userInfo.userInfo || {}
      CustomerTrackShareType = '1'
      this.addCustomerTrack({
        shareType: CustomerTrackShareType,
        operateCanal: CustomerOperateCanal,
        wxAvatarUrl: avatarUrl, //头像
        wxNickname: nickName, //微信昵称
        wxOpenId: userInfo.openid,
        wxUnionId: userInfo.unionid,
      })
    }
    if (this.CustomerTrack.operateType == '2') {
      CustomerTrackShareType = '2'
    }
    if (this.CustomerTrack.operateType == '3') {
      CustomerTrackShareType = '3'
    }
    if (this.CustomerTrack.operateType == '4') {
      CustomerTrackShareType = '4'
    }
    if (this.CustomerTrack.operateType == '5') {
      CustomerTrackShareType = '5'
    }


    return {
      title: this.share.title,
      path: this.share.path,
      imageUrl: this.share.imageUrl,
      success(res) {
        console.log('分享成功', res)
        // uni.showToast({
        //     title:'分享成功'
        // })
      },
      fail(res) {
        // uni.showToast({
        //     title:'分享失败',
        //     icon:'none'
        // })
      }
    }
  }
}