import { profile } from '../api/profile';
import * as bookAPI from '../api/book-api';

// -----------------------------------get---------------------------------------

/**
 * 获取所有的类型
 */
export function getBookTypes() {
  return bookAPI.getBookTypes();
}
/**
 * 获取所有的书籍
 */
export function getAllBooks(param) {
  return bookAPI.getBookList(param);
}

/**
 * 按照类型获取书籍
 */
export function getBooksByType(typeid, param) {

  if (!param) {
    param = {};
  }
  const _param = Object.assign({
    type_id: typeid
  }, param);
  return bookAPI.getBookList(_param);
}
/**
 * 获取我名下的书籍
 */
export function getMyBooks(param) {
  if (!param) {
    param = {};
  }
  const _param = Object.assign({
    owner: profile.getUserUID()
  }, param);
  return bookAPI.getBookList(_param);
}

/**
 * 获取我当前借阅的书籍
 */
export function getMyBorrowingBooks(param) {
  if (!param) {
    param = {};
  }
  const _param = Object.assign({
    current_borrower: profile.getUserUID(),
    borrow_status: 1
  }, param);
  return bookAPI.getBookList(_param);
}

/**
 * 获取我借阅完成的书籍
 */
export function getMyBorrowedBooks(param) {
  if (!param) {
    param = {};
  }
  const _param = Object.assign({
    borrower: profile.getUserUID(),
    his_borrow_record: 1
  }, param);
  return bookAPI.getBookList(_param);
}

/**
 * 通过书籍名称获取书籍详情
 */
export function getBookDetailByBookName(bookName) {
  const _param = {
    book_name: bookName
  };
  return bookAPI.getBookList(_param);
}
/**
 * 通过书籍ID获取书籍详情
 */
export function getBookDetailByBookId(bookId) {
  const _param = {
    book_id: bookId
  };
  return bookAPI.getBookList(_param);
}
/**
 * 搜索
 */
export function searchBook(searchKey) {
  const _param = {
    search: searchKey
  };
  return bookAPI.getBookList(_param);
}
// -------------------------post---------------------------------------------
/**
 *借书
 */
export function borrowerBook(bookId) {
  return bookAPI.borrowerBook(bookId);
}

// ---------------------------helper--------------------------------------------
/**
 * 
 * @param bookList
 * 格式化该列表，将书籍同名的合并，并且添加 
 * {
 *    count: 书籍本数
 *    borrowers:借用者列表
 * }
 */
export function formatBookList(_bookList) {
  const bookList = JSON.parse(JSON.stringify(_bookList));
  const result = [];
  bookList.forEach((item, i) => {
    const index = result.findIndex(v => {
      return v['bookName'] === item['bookName'];
    });
    const borrower = (item['currentBorrowerRealName'] !== '' && item['currentBorrowerRealName'] !== null) ? item['currentBorrowerRealName'] : item['currentBorrowerName'];
    if (index !== -1) { // 已经有该书籍的信息
      result[index]['count']++;
      if (item['currentBorrowerUid'] && result[index]['borrowers']) {
        result[index]['borrowers'].push(borrower);
      }
    } else {
      const len = result.push(item);
      result[len - 1]['count'] = 1;
      if (item['currentBorrowerUid']) {
        result[len - 1]['borrowers'] = [borrower];
      }
    }
  });
  return result;
}

