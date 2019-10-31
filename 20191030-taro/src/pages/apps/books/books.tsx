import './books.scss'
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Image, ScrollView } from '@tarojs/components';

import Toast from '@components/toast/toast';
import Scroll from '@components/scroll/scroll';
import { ZToast } from '@components/toast/z-toast';
import { BookResponse, BookTypeResponse } from '@types';
import * as bookService from '../../../services/service/book.service';


class Books extends Component {

  config: Config = {
    navigationBarTitleText: '书籍管理'
  }
  state = {
    activeTypeId: 0,
    extras: {
      noMoreMsg: '~已经加载完成~',
      noDataMsg: '暂无该类型的书籍'
    },
    params: {
      page_size: 75
    },
    typeList: [{
      bookTypeId: 0,
      typeName: '全部'
    }],
    bookList: [],
  }

  onScroll(e) {
    if (e.error_no) {
      ZToast.error({
        title: e.error_msg
      });
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
    });
    if (typeId !== 0) {
      this.setState({
        params: {
          type_id: typeId,
          page_size: 75
        }
      });
    } else {
      this.setState({
        params: { page_size: 75 }
      });
    }
  }

  async getBookTypes() {
    Taro.showLoading();
    const _result = await bookService.getBookTypes();
    Taro.hideLoading();
    if (_result.error_no) {
      ZToast.error({
        title: _result.error_msg
      });
    } else {
      const prevTypeList = this.state.typeList;
      this.setState({
        typeList: prevTypeList.concat(_result)
      });
    }
  }

  render() {
    const { activeTypeId, extras, params, typeList, bookList } = this.state;
    return (
      <View className='container'>
        <View className="header">
          <View className="subHeader" >
            <View className='at-icon at-icon-user'></View>
            <View className="search">
              <View className='at-icon at-icon-search searchIcon'></View>
              输入名称查找书籍
            </View>
            <View className='z-icon z-icon-scan'></View>
          </View>
          <ScrollView scrollX className="scroll-x">
            {typeList.map((typeItem: BookTypeResponse) => {
              return <View className={activeTypeId === typeItem.bookTypeId ? 'typeItem active' : 'typeItem'} >
                <Text className='typeName' onClick={this.onTypeChange.bind(this, typeItem.bookTypeId)}>
                  {typeItem.typeName}
                </Text>
              </View>
            })}
          </ScrollView>
        </View >
        <View className="content">
          <Scroll baseUrl='books' extras={extras} params={params} onScroll={this.onScroll.bind(this)}>
            {bookList.map((book: BookResponse) => {
              let cover;
              if (book.coverThumbnailUrl !== '' && book.coverThumbnailUrl !== null) {
                cover = <Image className='bookItemImg' src={book.coverThumbnailUrl}></Image>
              } else {
                cover = <View className="noCover" >暂无封面</View>
              }
              return <View className='bookItem'> {cover}
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

