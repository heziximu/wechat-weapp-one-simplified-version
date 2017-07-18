# wechat-weapp-one-simplified-version
###### 文艺阅读应用 ["ONE·一个"](http://wufazhuce.com/)简化版微信小程序
## 功能及界面
学校小学期做微信小程序的项目，简化版体现在只包括`“小记”`、`“ONE STORY”`、`“影视”`和`往期列表`四部分，界面完全参照ONE(v4.2.2)编写。<br>
* 4个tab界面：<br>
![image](https://github.com/heziximu/wechat-weapp-one-simplified-version/raw/master/Screenshot/4tabs.jpg)<br>
* 文章细节、往期列表中小记和阅读细节<br>
![image](https://github.com/heziximu/wechat-weapp-one-simplified-version/raw/master/Screenshot/details.jpg)<br>
<br>

## 注
* 由于ONE本身没有公开的API，数据获取部分就是Fiddler+参考网上API代码。<br>
* ONE自身的服务器是http的，获取数据的URL还有端口号，这两点都是在微信小程序教程API中写得很清楚不可以的啦。所以项目要勾选`开启开发环境不校验请求域名、TLS 版本以及HTTPS证书`，在手机上测试的时候要打开除错。<br>
<br>
> [参考项目](https://github.com/ahonn/weapp-one) 从中获益许多，十分感谢。
