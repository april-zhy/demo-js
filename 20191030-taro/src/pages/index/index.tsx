import './index.scss'
import { View, Text } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import * as loginService from '../../services';
import { Toast } from '../../components';
import { ZToast } from '../../components/toast/z-toast';

class Index extends Component {

  config: Config = {
    navigationBarBackgroundColor: "#5683F8",
  }

  state = {
    succeed: true
  }

  async componentDidMount() {
    Taro.showLoading({
      title: '自动登录中...',
      mask: true
    });
    const result = await loginService.getToken();
    Taro.hideLoading();
    if (result.error_no) {
      if (result.error_no === 1003) {
        // 跳转至登录页面
      }
      if (result.error_no === 1000) {
        ZToast.error({
          title: result.error_msg,
          complete: () => {
            this.setState({
              succeed: false
            });
          }
        });
      } else {
        ZToast.error({
          title: result.error_msg
        });
      }
    } else {
      ZToast.success({
        title: '登录成功！',
        complete: () => {
          Taro.redirectTo({
            url: '../apps/index'
          });
        }
      });
    }
  }

  render() {
    return (
      <View className={this.state.succeed ? 'wrapper successBg' : 'wrapper errorBg'} >
        <Text className='welcome'>欢迎使用 ITTI 助手</Text>
        <Toast></Toast>
      </View>
    )
  }
}

export default Index;
