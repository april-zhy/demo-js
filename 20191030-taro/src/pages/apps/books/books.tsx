import './books.scss'
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Image, ScrollView, Button } from '@tarojs/components';

import { Scroll, Toast } from '../../../components';
import { BookResponse, BookTypeResponse } from 'src/@types';
import * as bookService from '../../../services/service/book.service';
import { ZToast } from '../../../components/toast/z-toast';


class Books extends Component {

  config: Config = {
    navigationBarTitleText: '书籍管理'
  }
  extras = {

  }
  state = {
    activeTypeId: 1,
    extras: {
      noMoreMsg: '已经加载完成~',
      noDataMsg: '暂无该类型的书籍'
    },
    params: {
      type_id: 1,
      page_size: 75
    },
    typeList: [],
    bookList: [],
  }

  onScroll(e) {
    if (e.error_no) {
      // show error msg
    } else {
      this.setState({
        bookList: bookService.formatBookList(e)
      });
    }
  }

  componentDidMount() {
    this.getBookTypes();
  }

  onTypeChange(typeId) {
    this.setState({
      activeTypeId: typeId,
      params: {
        type_id: typeId,
        page_size: 75
      }
    });
  }

  async getBookTypes() {
    const _result = await bookService.getBookTypes();
    if (_result.error_no) {
      // show error msg
    } else {
      this.setState({
        typeList: _result
      });
    }
  }

  onClick() {
    // ZToast.success({
    //   title: '正确消息'
    // });
    // ZToast.info({
    //   title: '提示消息'
    // });
    // ZToast.success({
    //   title: '111消息',
    //   complete: () => {
    //     console.error('toast complete');
    //   },
    //   duration: 500
    // });

    ZToast.warning({
      title: '警告消息'
    });
  }


  render() {

    return (
      <View className='container'>
        <Button onClick={this.onClick.bind(this)}>button </Button>
        <View className="header">
          <ScrollView scrollX className="scroll-x contentFontSize contentFontColor">
            {
              this.state.typeList.map((typeItem: BookTypeResponse) => {
                return <View className={this.state.activeTypeId === typeItem.bookTypeId ? 'bookItem active' : 'bookItem'} >
                  <Text className='bookItemName labelFontSize' onClick={this.onTypeChange.bind(this, typeItem.bookTypeId)}>{typeItem.typeName}</Text>
                </View>
              })
            }
          </ScrollView>
        </View >
        <View className="content">
          <Scroll baseUrl='books' extras={this.state.extras} params={this.state.params} onScroll={this.onScroll.bind(this)}>
            {this.state.bookList.map((book: BookResponse) => {
              return <View className='bookItem'>
                <Image className='bookItemImg' src={book.coverThumbnailUrl}></Image>
                <Text className='bookItemName labelFontSize'>{book.bookName}</Text>
              </View>
            })}
          </Scroll>
        </View>
        <Toast></Toast>
      </View >
    )
  }
}
export default Books;