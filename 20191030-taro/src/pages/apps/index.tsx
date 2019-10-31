import './index.scss'
import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import UserInfo from '../../components/userInfo/userInfo';
import bookImg from '../../images/apps/btn_book.png';
import labImg from '../../images/apps/btn_lab.png';
import visitorImg from '../../images/apps/btn_visitor.png';
import photoImg from '../../images/apps/btn_photo.png';
import { AtGrid } from 'taro-ui';


class Index extends Component {

  state = {
    appList: [
      {
        image: bookImg,
        value: '书籍管理',
        url: 'books/books'
      }, {
        image: labImg,
        value: '实验室设备管理',
        url: 'books/books'
      }, {
        image: visitorImg,
        value: '访客登记',
        url: 'books/books'
      }, {
        image: bookImg,
        value: '书籍管理',
        url: 'books/books'
      }, {
        image: labImg,
        value: '实验室设备管理',
        url: 'books/books'
      }, {
        image: visitorImg,
        value: '访客登记',
        url: 'books/books'
      }, {
        image: bookImg,
        value: '书籍管理',
        url: 'books/books'
      }, {
        image: labImg,
        value: '实验室设备管理',
        url: 'books/books'
      }, {
        image: visitorImg,
        value: '访客登记',
        url: 'books/books'
      }, {
        image: photoImg,
        value: '摄影投稿',
        url: 'books/books'
      }, {
        image: photoImg,
        value: '摄影投稿',
        url: 'books/books'
      }, {
        image: photoImg,
        value: '摄影投稿',
        url: 'books/books'
      }, {
        image: photoImg,
        value: '摄影投稿',
        url: 'books/books'
      }, {
        image: photoImg,
        value: '摄影投稿',
        url: 'books/books'
      }
    ]
  }

  componentWillMount() {
    // 检测是否登录
    // Taro.navigateTo({ url: 'books/books' });

  }

  appClick(appItem) {
    Taro.navigateTo({ url: appItem.url });
  }

  render() {
    const { appList } = this.state;
    return (
      <View className='page'>
        <UserInfo></UserInfo>
        <View className='container-m'>
          <View className="appList">
            <ScrollView scrollY className='scroll'>
              <AtGrid className='myGrid' data={appList} onClick={this.appClick.bind(this)}></AtGrid>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}

export default Index;
