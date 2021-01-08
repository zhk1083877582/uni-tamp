# UviewUI-UniAPP-Project
前言：uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、H5、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。

此项目基于uni-app结合内置的uinUI组件+外置UviewUI组件写的小程序项目，一切都是可视化界面，通过`HBuilderX`来操作一切

## 一、环境搭建
使用 `HBuilderX`可视化界面快速创建项目，`HBuilderX`内置处理了相关环境依赖。
可视化的方式比较简单，HBuilderX内置相关环境，开箱即用，无需配置nodejs(如果用到package.json，需按照依赖包的话，请安装node!)。
HBuilderX是通用的前端开发工具，但为uni-app做了特别强化。
下载App开发版，可开箱即用；如下载标准版，在运行或发行uni-app时，会提示安装uni-app插件，插件下载完成后方可使用

- HBuilderX：内置uni-app编辑及项目模板，[下载地址](https://www.dcloud.io/hbuilderx.html)

## 二、项目目录

文件 | 作用
---|---
components|组件文件存放
pages|业务页面文件存放
request|请求接口封装方法与接口存放
static|存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此,小程序由于有大小限制，尽量图片一下资源外链的方式引入
App.vue |应用配置，用来配置App全局样式以及监听应用的生命周期
config.js |api配置
main.js|Vue初始化入口文件
manifest.json |配置应用名称、appid、logo、版本等打包信息
package.json|依赖包配置文件
pages.json |配置页面路由、导航条、底部选项卡等页面类信息
uni.scss|配置公共样式

## 三、运行uni-app

1、安装依赖包：npm install （因uView-ui不支持cnpm安装，请尽量别cnpm install）

2、以运行微信小程序为例：进入项目，点击工具栏的运行 -> 运行到小程序模拟器 -> 微信开发者工具，即可在微信开发者工具里面体验uni-app。

![](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-3.png)

其他平台<span style="color:red;">运行</span>方法，具体请看下面官方文档

##  https://uniapp.dcloud.io/quickstart?id=%e8%bf%90%e8%a1%8cuni-app

## 四、发布uni-app
以发布微信小程序为例：在HBuilderX中顶部菜单依次点击 "发行" => "小程序-微信"，输入小程序名称和appid点击发行即可在 unpackage/dist/build/mp-weixin 生成微信小程序项目代码。
 
![](https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/uni20190222-6.png)

其他平台<span style="color:red;">发布</span>方法，具体请看下面官方文档

##  https://uniapp.dcloud.io/quickstart?id=%e5%8f%91%e5%b8%83uni-app


## 五、引用uView-ui

### uView-ui的引入

 首先下载`uView-ui`解压后将uview-ui文件夹，复制到项目根目录，与`pages`目录同级。


## 详情请看 http://uviewui.com/components/install.html

 
注意：在开发过程中，当你写登录功能后，某个页面你需要经常进入并且多次修改，你每次修改都需要登录后的信息，所以就很麻烦了。你需要一直从登录开始操作，直到你到达这个界面。这时候你就可以用这个了`condition`。

**现在来介绍一下`condition`：**

**condition** 启动模式配置，仅开发期间生效，用于模拟直达页面的场景，如：小程序转发后，用户点击所打开的页面。

**属性说明：**

属性|	类型|	是否必填|	描述
---|---|---|---
current|Number|是|当前激活的模式，list节点的索引值
list|Array|是|启动模式列表

**list说明：**



属性|	类型|	是否必填|	描述
---|---|---|---
name|	String|	是|	启动模式名称
path|	String|是|	启动页面路径
query|	String|	否|	启动参数，可在页面的 onLoad 函数里获得

 在 5+App 里真机运行可直接打开配置的页面，微信开发者工具里需要手动改变编译模式，过程：微信开发工具 -> 工具 -> 编译配置 -> 找到在`condition`里配置的`name`。

 在`pages.josn`里配置`condition`，代码如下：

```
"condition": { //模式配置，仅开发期间生效
    "current": 0, //当前激活的模式（list 的索引项）
    "list": [{
             "name": "jingdian_detail", //模式名称
	     "path": "pages/jingdian_detail/jingdian_detail", //启动页面，必选
	     "query": "id=5d1483336d724301607b2c23" //启动参数，在页面的onLoad函数里面得到。
	   }
    ]
}
```

![](https://user-gold-cdn.xitu.io/2019/9/23/16d5ec340f91df47?w=979&h=453&f=png&s=284310)


