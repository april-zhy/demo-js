import Taro from '@tarojs/taro'
import { getErrorMsgByErrorNo } from './error';


function handleData(res) {
  if (res.data === "<h1>Hello, koa2!</h1>") {
    return {
      error_no: 100,
      error_msg: '请求地址错误！'
    };
  } else {
    if (res.data.success) {
      if (typeof (res.data.body) === 'string') {
        // "body": "update success."   "body":''   "body":"null"
        return [];
      } else if (Array.isArray(res.data.body) === false) {
        // "body":{}
        const _arr: Array<any> = [];
        _arr.push(res.data.body);
        return _arr;
      } else {
        // [{},{}]
        return res.data.body;
      }
    } else {
      if (res.data.error_no) {
        //  node server error
        return {
          error_no: res.data.error_no,
          error_msg: getErrorMsgByErrorNo(res.data.error_no)
        };
      } else {
        // company  server error
        return {
          error_no: 123456,
          error_msg: '服务器维护中，请稍后!'
        };
      }
    }
  }
}


export const request = {
  request: (method, url, data?, accessToken?) => {
    return new Promise((resolve) => {
      Taro.request({
        url: url,
        data: data,
        header: {
          'accesstoken': accessToken
        },
        method: method,
        success: (res) => {
          resolve(handleData(res));
        },
        fail: () => {
          resolve({
            error_no: 110,
            error_msg: '请求服务器失败，请稍后再试！'
          });
        },
        complete: () => {
          console.log("request completed!");
        }
      })
    })
  },
  get: (url) => {
    return request.request('GET', url);
  },
  post: (url, data) => {
    return request.request('POST', url, data);
  },
  put: (url, data) => {
    return request.request('PUT', url, data);
  },
  delete: (url, data) => {
    return request.request('DELETE', url, data);
  },
};

