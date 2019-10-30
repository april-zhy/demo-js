import { host } from './api-url';
import { profile } from './profile';
import { httpClient } from './http-client';

const urls = {
  userUrl: host + 'users'
};


/**
 * 绑定用户
 */
export function v01Binding(jsonData) {
  const param = {
    open_id: profile.getUserOpenID(),
    v01_account: jsonData.v01_account,
    v01_password: jsonData.v01_password
  };
  return httpClient.post(urls.userUrl, param);
}
/**
 * 取消绑定
 */
export function v01CancelBind() {
  const open_id = profile.getUserOpenID();
  const uid = profile.getUserUID();
  const url = urls.userUrl + '/' + uid + '/open_id/' + open_id;
  return httpClient.delete(url);
}
/**
 * 确认绑定
 */
export function confirmBind() {
  const url = urls.userUrl + '/' + profile.getUserUID();
  return httpClient.get(url);
}
