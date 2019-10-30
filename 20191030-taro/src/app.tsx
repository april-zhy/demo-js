import './app.scss'
import '@tarojs/async-await'
import Index from './pages/index'
import configStore from './store';
import { Provider } from '@tarojs/redux'
import Taro, { Component, Config } from '@tarojs/taro'

const store = configStore()

class App extends Component {

  config: Config = {
    pages: [
      'pages/index/index',
      'pages/apps/index',
      'pages/apps/books/books'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#4EEADD',
      navigationBarTitleText: 'ITTI 助手',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: false
    }
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
