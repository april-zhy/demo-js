import { request } from './request';
import { profile } from './profile';
import { getTokenByOpenId } from './token-api';

/**
 * 请求数据时都使用httpClient
 * 当error_no===10144的时候，则说明请求token过期或者无效，
 * 则再次请求token，请求成功之后再次请求数据
 */

export const httpClient = {
  request2: function (method, url, data) {
    return new Promise((resolve) => {
      const access_token = profile.getAccessToken();
      // 每次请求都需要添加token
      request.request(method, url, data, access_token).then((requestRes) => {
        if (requestRes['error_no']) {
          if (requestRes['error_no'] === 10144) {
            // 说明token过期，则再次请求token
            const _openID = profile.getUserOpenID();
            getTokenByOpenId(_openID).then(tokenRes => {
              if (tokenRes.error_no) {
                resolve(tokenRes)
              } else {
                profile.setAccessToken(tokenRes[0].access_token);
                request.request(method, url, data, tokenRes[0].access_token).then((dataRes) => {
                  resolve((dataRes))
                });
              }
            })
          } else {
            resolve(requestRes)
          }
        } else {
          resolve(requestRes)
        }
      })
    });
  },
  get: function (url) {
    return this.request2('GET', url);
  },
  post: function (url, data) {
    return this.request2('POST', url, data);
  },
  put: function (url, data) {
    return this.request2('PUT', url, data);
  },
  delete: function (url, data?) {
    return this.request2('DELETE', url, data);
  },
};


export default httpClient;