import { host } from './api-url';
import { profile } from './profile';
import { httpClient } from './http-client';
import { serialize } from '../../services/utils/tools';

const urls = {
  baseUrl: host + 'books'
};



// -----------------------------------get---------------------------------------

/**
 * 获取所有的类型
 */
export function getBookTypes() {
  const _url = urls.baseUrl + '/types';
  return httpClient.get(_url);
}

/**
 * 获取书籍列表
 */
export function getBookList(param) {
  const _url = serialize(urls.baseUrl, param);
  return httpClient.get(_url);
}

// -------------------------post---------------------------------------------
/**
 *借书
 */
export function borrowerBook(bookId) {
  const _url = urls.baseUrl + '/' + bookId + '/current_borrower';
  const params = {
    'cb_uid': profile.getUserUID(),
    "type": "borrow"
  };
  return httpClient.put(_url, params);
}


