import Taro from '@tarojs/taro'


export const profile = {
  _appId: 'wx4cc5aa71aa1fb4e4',
  _accessToken: '',
  _open_id: '',
  _userInfo: {},
  validate: () => {
    const userInfo = Taro.getStorageSync('user_info');
    if (userInfo === undefined || userInfo === {} || userInfo === '') {
      return false;
    } else {
      return true;
    }
  },
  setUserOpenID: (_openId) => {
    profile._open_id = _openId;
    Taro.setStorage({
      key: "open_id",
      data: _openId
    });
  },
  getUserOpenID: () => {
    return Taro.getStorageSync('open_id');
  },

  setAccessToken: (_token) => {
    profile._accessToken = _token;
    Taro.setStorage({
      key: "access_token",
      data: _token
    });
  },
  getAccessToken: () => {
    return Taro.getStorageSync('access_token');
  },

  setUserInfo: (_userInfo) => {
    profile._userInfo = _userInfo;
    Taro.setStorage({
      key: "user_info",
      data: _userInfo
    });
  },
  getUserInfo: () => {
    const userInfo = Taro.getStorageSync('user_info');
    return {
      user_uid: userInfo.user_uid,
      user_name: (userInfo.user_name === '' || userInfo.user_name === null) ? userInfo.cn : userInfo.user_name,
      avatar: userInfo.avatar,
      mobile: userInfo.mobile,
      mail: userInfo.mail,
      department: (userInfo.department === '' || userInfo.department === null) ? '暂无' : userInfo.department
    }
  },
  getUserUID: () => {
    return Taro.getStorageSync('user_info').user_uid;
  },
  getAppId: () => {
    return profile._appId;
  }
}

export default profile;