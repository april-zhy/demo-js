import CryptoJS from 'crypto-js';
import { host } from './api-url'
import { request } from './request';
import { profile } from './profile';
import { DHCrypto } from '../utils/dhCrypto';


const urls = {
  baseUrl: host + 'login',
  tokenUrl: host + 'login/token',
  publicKeyUrl: host + 'login/publicKey',
  verifySecretKeyUrl: host + 'login/secret_key'
};

/**
 * 获取密钥协商算法的公钥
 * pubN:服务器随机生成的公钥数字（允许公开）
 * modN:服务器随机生成的公钥数字（允许公开）
 * sPubResultN:服务器计算得出公钥结果（允许公开）
 */

function getPublicKey() {
  return request.get(urls.publicKeyUrl);
}

// 验证密钥是否和服务器的密钥一致
function verifySecretKey(wx_openid, _cPubResultN, _cSecretKey) {
  const _confirmSecretKeyUrl = urls.verifySecretKeyUrl;
  const jsonData = {
    pub_result_n: _cPubResultN,
    secret_key_hash: _cSecretKey,
    open_id: wx_openid,
    appid: profile.getAppId()
  }
  return request.put(_confirmSecretKeyUrl, jsonData);
}

/**
 * 
 * @param {openid} openid 
 * 1、获取公钥
 * 2、计算私钥
 * 3、将私钥发送至服务器，验证是否一致
 */
function getSecretKey(openid) {
  return new Promise((resolve, reject) => {
    // 获取密钥协商协议的公钥数字：pubN、modN，以及服务器的公钥计算结果：sPubResultN
    getPublicKey().then((res) => {
      if (res.error_no) {
        resolve(res);
      } else {
        const pubN = res[0]['pubN'];
        const modN = res[0]['modN'];
        const sPubResultN = res[0]['sPubResultN'];
        const dHCrypto = new DHCrypto();
        dHCrypto.setPublicKey(pubN, modN);
        // 计算客户端的公钥计算结果：cPubResultN
        const cPubResultN = dHCrypto.getCPubResultN();
        // 计算密钥
        const cSecretKey = dHCrypto.generateSecretKey(sPubResultN);
        // 对密钥进行hash处理
        const cSecretKeyHash = CryptoJS.SHA1(cSecretKey).toString(CryptoJS.enc.Hex);
        // 验证客户单和服务器协商的密钥结果是否一致，
        // 客户端：cSecretKey(cSecretKeyHash)，服务器端：sSecretKey(sSecretKeyHash)
        verifySecretKey(openid, cPubResultN, cSecretKeyHash).then((res) => {
          if (res.error_no) {
            resolve(res);
          } else {
            if (res[0]['confirm']) {
              resolve({
                secretKey: cSecretKey,
              });
            } else {
              resolve({
                error_no: 100,
                error_msg: '没有权限请求数据！'
              });
            }
          }
        });
      }
    });
  });
}

// 获取access_tokenAPI
function getTokenAPI(wx_openid, openid_pwd) {
  const jsonData = {
    appid: profile.getAppId(),
    open_id: wx_openid,
    open_id_pwd: openid_pwd
  }
  return request.put(urls.tokenUrl, jsonData);
}

// 1、获取私钥
// 2、利用私钥对openid进行加密
// 3、将加密后的 openid和 openid appid一起传给服务器，获取token
export function getTokenByOpenId(_openID): Promise<wResponse> {
  return new Promise((resolve) => {
    getSecretKey(_openID).then(secretKeyRes => {
      if (secretKeyRes['error_no']) {
        resolve(secretKeyRes)
      } else {
        const secretKey = secretKeyRes['secretKey'];
        const openid_pwd = (CryptoJS.AES.encrypt(_openID, secretKey)).toString();
        getTokenAPI(_openID, openid_pwd).then(tokenRes => {
          resolve(tokenRes)
        }).catch(err => {
          resolve({
            error_no: 1000,
            error_msg: '网络错误，请稍后再试！' + err
          });
        })
      }
    }).catch(err => {
      resolve({
        error_no: 1000,
        error_msg: '网络错误，请稍后再试！' + err
      });
    });
  });
}

