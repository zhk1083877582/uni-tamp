export default {
  methods: {
    createImg() {
      this.$nextTick(async () => {
        let self = this
        // 初始化
        await this.$refs.rCanvas.init({
          canvas_id: "rCanvas",
          canvas_width: 375,
          canvas_height: 437,
          // background_color:'#22ac38'
          hidden: true
        })

        // 画头像
        await this.$refs.rCanvas.drawImage({
          url: self.user.avatarUrl,
          x: 25,
          y: 26,
          w: 113,
          h: 113,
          border_radius: 53
        }).catch(err_msg => {
          console.log('画头像', err_msg)
        })
        // 名字
        await this.$refs.rCanvas.drawText({
          text: self.user.userName,
          max_width: 0,
          x: 152,
          y: 56,
          font_color: "rgba(0,0,0,1)",
          font_size: 23
        }).catch(err_msg => {
          console.log('名字', err_msg)
        })
        // 画手机图标
        await this.$refs.rCanvas.drawImage({
          url: 'https://images.tospurfang.com/E9075F2FFABC4ADEB12819FDBAF9C970-6-2.jpg',
          x: 152,
          y: 77,
          w: 17,
          h: 17,
        }).catch(err_msg => {
          console.log('画手机图标报错', err_msg)
        })
        // 手机号
        await this.$refs.rCanvas.drawText({
          text: self.user.phone,
          max_width: 0,
          x: 179,
          y: 93,
          font_color: "rgba(0,0,0,1)",
          font_size: 15
        }).catch(err_msg => {
          console.log('手机号报错', err_msg)
        })
        // 画微信图标
        await this.$refs.rCanvas.drawImage({
          url: 'https://images.tospurfang.com/74AB4837022B47C3B50B5AE126D4B43E-6-2.jpg',
          x: 152,
          y: 115,
          w: 20,
          h: 16,
        }).catch(err_msg => {
          console.log('画微信图标报错', err_msg)
        })
        // 微信
        await this.$refs.rCanvas.drawText({
          text: self.user.wechat,
          max_width: 0,
          x: 179,
          y: 128,
          font_color: "rgba(102,102,102,1)",
          font_size: 15
        }).catch(err_msg => {
          console.log('画微信报错', err_msg)
        })
        // 画楼盘图标
        await this.$refs.rCanvas.drawImage({
          url: 'https://images.tospurfang.com/F49BC314D29E426F9C73662F83481CBE-6-2.jpg',
          x: 32,
          y: 167,
          w: 23,
          h: 22,
        }).catch(err_msg => {
          console.log('画楼盘图标报错', err_msg)
        })
        // 画楼盘名称
        await this.$refs.rCanvas.drawText({
          text: self.building.housesName,
          max_width: 0,
          x: 61,
          y: 186,
          font_color: "rgba(6,36,113,1)",
          font_size: 19,
          font_weight: 600
        }).catch(err_msg => {
          console.log('画楼盘名称报错', err_msg)
        })
        // 画楼盘亮点
        await this.$refs.rCanvas.drawText({
          text: self.building.housesLightSpot ? self.building.housesLightSpot : '-',
          max_width: 300,
          x: 32,
          y: 217,
          font_color: "rgba(102,102,102,1)",
          font_size: 16,
          line_clamp: 1,
          line_clamp_hint: '...',
        }).catch(err_msg => {
          console.log('画楼盘亮点报错', err_msg)
        })
        //楼盘亮点下的横线
        await this.$refs.rCanvas.drawRect({
          x: 0,
          y: 241,
          w: 375,
          h: 1,
          color: 'rgba(243,243,243,1)'
        })
        //楼盘亮点下的第二横线
        await this.$refs.rCanvas.drawRect({
          x: 0,
          y: 330,
          w: 375,
          h: 1,
          color: 'rgba(243,243,243,1)'
        })
        //楼盘亮点下的竖线
        await this.$refs.rCanvas.drawRect({
          x: 0,
          y: 330,
          w: 375,
          h: 1,
          color: 'rgba(243,243,243,1)'
        })
        //楼盘亮点下的竖线
        await this.$refs.rCanvas.drawRect({
          x: 125,
          y: 241,
          w: 1,
          h: 90,
          color: 'rgba(243,243,243,1)'
        })
        //楼盘亮点下的竖线
        await this.$refs.rCanvas.drawRect({
          x: 250,
          y: 241,
          w: 1,
          h: 90,
          color: 'rgba(243,243,243,1)'
        })
        //服务客户
        await this.$refs.rCanvas.drawSpecialText({
          general: {
            x: 45,
            y: 285,
          },
          list: [{
            text: self.user.servedPeopleNum,
            font_color: 'rgba(0,0,0,1)',
            font_size: 20
          },
          {
            text: '人',
            font_color: 'rgba(0,0,0,1)',
            font_size: 10
          }, ]
        }).catch(err => {
          this.error(err)
        })
        await this.$refs.rCanvas.drawText({
          text: '服务人数',
          max_width: 133,
          x: 40,
          y: 310,
          font_color: "rgba(102,102,102,1)",
          font_size: 12
        }).catch(err_msg => {
          console.log('服务人数报错', err_msg)
        })
        //客户满意度
        await this.$refs.rCanvas.drawSpecialText({
          general: {
            x: 176,
            y: 285,
          },
          list: [{
            text: '5',
            font_color: 'rgba(0,0,0,1)',
            font_size: 20
          },
          {
            text: '分',
            font_color: 'rgba(0,0,0,1)',
            font_size: 10
          }, ]
        }).catch(err => {})
        await this.$refs.rCanvas.drawText({
          text: '客户满意度',
          max_width: 133,
          x: 158,
          y: 310,
          font_color: "rgba(102,102,102,1)",
          font_size: 12
        }).catch(err_msg => {
          console.log('客户满意度报错', err_msg)
        })
        //从业年限
        await this.$refs.rCanvas.drawSpecialText({
          general: {
            x: 288,
            y: 285,
          },
          list: [{
            text: self.user.workExperienceDesc,
            font_color: 'rgba(0,0,0,1)',
            font_size: 20,
          }, ]
        }).catch(err => {
          this.error(err)
        })
        await this.$refs.rCanvas.drawText({
          text: '从业年限',
          max_width: 133,
          x: 288,
          y: 310,
          font_color: "rgba(102,102,102,1)",
          font_size: 12
        }).catch(err_msg => {
          console.log('从业年限报错', err_msg)
        })
        //底部小程序二维码
        await this.$refs.rCanvas.drawText({
          text: '扫一扫或长按识别二维码',
          max_width: 0,
          x: 59,
          y: 370,
          font_color: "rgba(153,153,153,1)",
          font_size: 15
        }).catch(err_msg => {
          console.log('扫一扫或长按识别二维码报错', err_msg)
        })
        await this.$refs.rCanvas.drawText({
          text: '期待您的咨询',
          max_width: 0,
          x: 100,
          y: 400,
          font_color: "rgba(153,153,153,1)",
          font_size: 15
        }).catch(err_msg => {
          console.log('期待您的咨询报错', err_msg)
        })
        // 画微信二维码
        await this.$refs.rCanvas.drawImage({
          url: 'data:image/jpeg;base64,' + self.wxcodeCard,
          x: 258,
          y: 343,
          w: 72,
          h: 72,
        }).catch(err_msg => {
          console.log('画微信二维码报错', err_msg)
        })

        // 生成海报
        await this.$refs.rCanvas.draw((res) => {
          this.canvasImg = res.tempFilePath
        })
      })
    },
  }
}
