import Taro from '@tarojs/taro'
import { host } from './api-url'

const urls = {
  openIdUrl: host + "getOpenId",
};


export function getOpenId(): Promise<any> {
  return new Promise((resolve) => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          var data = {
            js_code: res.code,
            appid: 'wx4cc5aa71aa1fb4e4',
            secret: '7b393ef65c716fc3ca874235815abebd'
          }
          Taro.request({
            url: urls.openIdUrl,
            method: 'POST',
            data: data,
            success: function (res) {
              if (res.statusCode === 502) {
                resolve({
                  error_no: 1000,
                  error_msg: '服务器维护中！'
                });
              }
              if (res.data === "<h1>Hello, koa2!</h1>") {
                resolve({
                  error_no: 1000,
                  error_msg: '请求OpenID地址错误！'
                });
              } else {
                resolve(res.data.openid);
              }
            },
            fail: function (err) {
              resolve({
                error_no: 1000,
                error_msg: '请求OpenID失败！'
              })
            },
            complete: function () {
              console.log("openid request completed!");
            }
          })
        }
      }
    });
  });
}