package com.androidapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.mehcode.reactnative.splashscreen.SplashScreenPackage;
import com.microsoft.codepush.react.CodePush;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.dscj.autoheightwebview.AutoHeightWebViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenPackage(),
            new CodePush("Na445gxFz-KIIu2j1gGjEmUq4QpZ487f23ee-7ab9-474a-b2ea-308f881eabe4", getApplicationContext(), BuildConfig.DEBUG),
            new WebViewBridgePackage(),
            new VectorIconsPackage(),
            new RNSpinkitPackage(),
            new CookieManagerPackage(),
            new AutoHeightWebViewPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
