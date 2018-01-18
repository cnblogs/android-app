package com.androidapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.mehcode.reactnative.splashscreen.SplashScreenPackage;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.dscj.autoheightwebview.AutoHeightWebViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import cn.jiguang.analytics.android.api.JAnalyticsInterface;
import cn.jpush.reactnativejanalytics.JAnalyticsPackage;


public class MainApplication extends Application implements ReactApplication {

   private static boolean SHUTDOWN_LOG = false;
    private static boolean SHUTDOWN_TOAST = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new JAnalyticsPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new SplashScreenPackage(),
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
    JAnalyticsInterface.setDebugMode(true);
    JAnalyticsInterface.init(this);
  }
}
