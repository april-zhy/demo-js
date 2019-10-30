import Taro from '@tarojs/taro';
/**
 * 验证参数是否为空
 */
export function paramsValidate(params) {
  let flag = true;
  if (params != undefined) {
    for (let key in params) {
      if (params[key] === "" || params[key] === undefined) {
        flag = false;
        break;
      }
    }
  }
  return flag;
}


export function navigateToBind(_url) {
  Taro.reLaunch({
    url: _url
  });
}

/**
 * 生成指定区间的随机整数
 * 比如生成[0,100]的闭区间随机整数，randomN(0,100)
 */
export function randomN(n, m) {
  var random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}

export function formatCN(data) {
  data.forEach(item => {
    if (item.ownerUid) {
      item.ownerCn = (item.ownerRealName !== null && item.ownerRealName !== '') ? item.ownerRealName : item.ownerName;
    }
    if (item.currentBorrowerUid) {
      item.currentBorrowerCn = (item.currentBorrowerRealName !== null && item.currentBorrowerRealName !== '') ? item.currentBorrowerRealName : item.currentBorrowerName;
    }
    if (item.borrowerUid) {
      item.borrowerCn = (item.borrowerRealName !== null && item.borrowerRealName !== '') ? item.borrowerRealName : item.borrowerName;
    }
    if (item.submitter) {
      item.submitterCn = (item.submitter_name !== null && item.submitter_name !== '') ? item.submitter_name : item.submitter;
    }
    if (item.contacterCnName) {
      item.contacterCn = (item.contacterName !== null && item.contacterName !== '') ? item.contacterName : item.contacterCnName
    }
    if (item.contacterUid) {
      item.contacterCn = (item.contacterRealName !== null && item.contacterRealName !== '') ? item.contacterRealName : item.contacterName
    }
  });
  return data;
}


export function serialize(baseUrl, param) {
  if (!param) {
    return baseUrl;
  }
  const params = Object.keys(param).map(function (name) {
    var value = param[name];
    return name + "=" + value;
  });
  return baseUrl + '?' + params.join('&');
}

