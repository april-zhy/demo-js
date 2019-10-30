
import { profile } from '../api/profile';
import { getOpenId } from '../api/openid-api';
import { getTokenByOpenId } from '../api/token-api';
import * as  accountService from '../api/account-api';



export function getToken() {
  return new Promise((resolve) => {
    getOpenId().then((_openIdRes) => {
      if (_openIdRes.error_no) {
        resolve(_openIdRes);
      } else {
        const _openID = _openIdRes;
        getTokenByOpenId(_openID).then(_tokenRes => {
          if (!_tokenRes.error_no) {
            profile.setAccessToken(_tokenRes[0].access_token);
            profile.setUserInfo(_tokenRes[0]);
          }
          resolve(_tokenRes);
        }).catch(err => {
          resolve({
            error_no: 1000,
            error_msg: '网络错误，请稍后再试！' + err
          });
        });
      }
    }).catch(err => {
      resolve({
        error_no: 1000,
        error_msg: '网络错误，请稍后再试！' + err
      });
    });
  });
}

export function binding(jsonData) {
  return new Promise((resolve, reject) => {
    accountService.v01Binding(jsonData).then(res => {
      if (!res.error_no) {
        const userInfo = res[0];
        const obj = {
          user_uid: userInfo.accountName,
          user_name: userInfo.userName === '' ? userInfo.cn : userInfo.userName,
          avatar: userInfo.avatar,
          mobile: userInfo.mobile,
          mail: userInfo.mail,
          department: userInfo.department
        };
        profile.setUserInfo(obj);
      }
      resolve(res);
    }).catch(err => {
      resolve({
        error_no: 1000,
        error_msg: '网络错误，请稍后再试！' + err
      });
    });
  });
}

export function cancelBind() {
  return accountService.v01CancelBind();
}

export function confirmBind() {
  return accountService.confirmBind();
}

