# 博客园移动客户端
>该客户端是用`ReactNative`0.51版本开发的，由于我也是第一次使用这个技术栈去开发，现有项目代码还有待重构，交互体验有待提高，功能还需要不断完善。希望各位多多提issue以及分享好的解决方案。

# 1 git clone https://github.com/cnblogs/android-app.git

# 2 打开`android-app/src/config/AppConfig.js`

```
class AppConfig{
    static clientId='';
    static clientSecret='';
    static deploymentKey='';
    static authorizedUrl='https://oauth.cnblogs.com/connect/token';
}
```
如果你还没有`clientId`和`clientSecret`的话，可以到[https://oauth.cnblogs.com](https://oauth.cnblogs.com )申请授权，审核结果将通过邮件通知。`deploymentKey`是`codepush`的部署秘钥，可以参考[http://www.jianshu.com/p/87ccfb795635](http://www.jianshu.com/p/87ccfb795635) | [codepush官方文档](https://github.com/Microsoft/react-native-code-push#getting-started)

# 3 `yarn install` or `npm install`

# 4 `react-native run-android`


