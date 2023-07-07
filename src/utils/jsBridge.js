/**
 * 用法：
 * import jsBridge from 'fileName.js'
 *
 * 1、给 APP 端发送数据
 * jsBridge.callHandler(eventName, data, callback(reponseData))
 * 参数说明：
 * eventName (string): 必传, 与 APP 端约定的事件名
 * data (object): 非必传, 发送给 APP 端的数据
 * callback (function): 通信完成后，前端的回调，reponseData，是APP端返回的数据
 *
 * 2、接收 APP 端的数据
 * jsBridge.registerHandler(eventName, callback(data, responseCallback))
 * 参数说明：
 * eventName (string): 必传，与 APP 端约定的事件名
 * callback (function): data: 是接收到的数据，responseCallback，通信完成后，传给 APP 端的回调
 */

const userAgent = navigator.userAgent;
const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
const isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

// 这是必须要写的，用来创建一些设置
const setupWebViewJavascriptBridge = (callback) => {
  if (isAndroid) {
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge);
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        () => callback(window.WebViewJavascriptBridge),
        false,
      );
    }
  }
  if (isiOS) {
    if (window.WKWebViewJavascriptBridge) {
      return callback(window.WKWebViewJavascriptBridge);
    }
    if (window.WKWVJBCallbacks) {
      return window.WKWVJBCallbacks.push(callback);
    }
    window.WKWVJBCallbacks = [callback];
    window.webkit?.messageHandlers?.iOS_Native_InjectJavascript?.postMessage?.(null)
    // const WVJBIframe = document.createElement('iframe');
    // WVJBIframe.style.display = 'none';
    // // WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    // WVJBIframe.src = 'https://__bridge_loaded__';
    // // WVJBIframe.src = 'https://publicmobile-uat.yeahgo.com';
    // // WVJBIframe.src = 'https://publicmobile.yeahgo.com';
    // document.documentElement.appendChild(WVJBIframe);
    // setTimeout(() => {
    //   document.documentElement.removeChild(WVJBIframe);
    // }, 0);
  }
}

const loadApp = () => {
  setupWebViewJavascriptBridge((bridge) => {
    console.log("初始化")
    if (isAndroid) {
      console.log("isAndroid")
      // 安卓端，接收数据时，需要先进行初始化
      bridge.init((message, responseCallback) => {
        const data = {
          'Javascript Responds': 'Wee!',
        };
        responseCallback(data);
      });
    }
  });
};

// 初始化 jsBridge
if (userAgent.indexOf('MicroMessenger') == -1) {//说明不在微信中
  console.log("不在微信中")
  // 走不在小程序的逻辑
  loadApp();
} else {
  const script = document.createElement('script');
  script.src = './jweixin-1.3.2.js';
  wx.miniProgram.getEnv(function(res) {
    if (res.miniprogram) {
      // 走在小程序的逻辑
    } else {
      // 走不在小程序的逻辑
      loadApp();
    }
  })
}

export default {
  // 给APP发送数据
  callHandler(name, data, callback) {
    setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler(name, data, callback);
    });
  },
  // 接收APP端的数据
  registerHandler(name, callback) {
    setupWebViewJavascriptBridge((bridge) => {
      bridge.registerHandler(name, (data, responseCallback) => {
        callback(data, responseCallback);
      });
    });
  },
};
