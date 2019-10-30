import './index.scss'
import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import UserInfo from '../../components/userInfo/userInfo';
import bookImg from '../../images/apps/btn_book.png';
import labImg from '../../images/apps/btn_lab.png';
import visitorImg from '../../images/apps/btn_visitor.png';
import photoImg from '../../images/apps/btn_photo.png';


class Index extends Component {

  state = {
    appList: [
      {
        img: bookImg,
        title: '书籍管理',
        url: 'books/books'
      }, {
        img: labImg,
        title: '实验室设备管理',
        url: 'books/books'
      }, {
        img: visitorImg,
        title: '访客登记',
        url: 'books/books'
      }, {
        img: photoImg,
        title: '摄影投稿',
        url: 'books/books'
      }, {
        img: photoImg,
        title: '摄影投稿',
        url: 'books/books'
      }, {
        img: photoImg,
        title: '摄影投稿',
        url: 'books/books'
      }, {
        img: photoImg,
        title: '摄影投稿',
        url: 'books/books'
      }, {
        img: photoImg,
        title: '摄影投稿',
        url: 'books/books'
      }
    ]
  }

  componentWillMount() {
    // 检测是否登录
  }

  appClick(url) {
    Taro.navigateTo({ url })
  }

  render() {
    const { appList } = this.state;
    return (
      <View className='page'>
        <UserInfo></UserInfo>
        <View className='container-m'>
          <View className="appList">
            <ScrollView scrollY className='scroll'>
              {
                appList.map((app) => {
                  return (<View className='appItem' onClick={this.appClick.bind(this, app.url)}>
                    <Image className='appIcon' src={app.img}></Image>
                    <View className='appName'>{app.title}</View>
                  </View>)
                })
              }
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}

export default Index;
