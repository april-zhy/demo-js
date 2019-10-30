import './toast.scss';
import { AtToast } from "taro-ui";
import Taro, { Component } from '@tarojs/taro';
import { ZToast, IToastParam } from './z-toast';

class Toast extends Component<any> {

  state = {
    title: '',
    isShow: false,
    complete: () => { },
    duration: 1500,
    type: 'success',
  }
  _timer;
  constructor(props) {
    super(props);
    this._bindListener();
    this._initToast();
  }

  componentWillUnmount() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
  }

  private _bindListener() {
    Taro.eventCenter.on('info', (options: IToastParam = { title: '' }) => {
      options.type = 'info';
      this._showToast(options);
    });
    ZToast.info = Taro.eventCenter.trigger.bind(Taro.eventCenter, 'info');


    Taro.eventCenter.on('success', (options: IToastParam = { title: '' }) => {
      options.type = 'success';
      this._showToast(options);
    });
    ZToast.success = Taro.eventCenter.trigger.bind(Taro.eventCenter, 'success');


    Taro.eventCenter.on('error', (options: IToastParam = { title: '' }) => {
      options.type = 'error';
      this._showToast(options);
    });
    ZToast.error = Taro.eventCenter.trigger.bind(Taro.eventCenter, 'error');


    Taro.eventCenter.on('warning', (options: IToastParam = { title: '' }) => {
      options.type = 'warning';
      this._showToast(options);
    });
    ZToast.warning = Taro.eventCenter.trigger.bind(Taro.eventCenter, 'warning');

  }

  private _showToast(options: IToastParam) {
    const self = this;
    if (this.state.isShow) {
      return this._initToast();
    }
    this.setState({
      isShow: true,
      type: options.type,
      title: options.title,
      complete: options.complete ? options.complete : undefined,
      duration: options.duration ? options.duration : 1500
    }, () => {
      this._timer = setTimeout(() => {
        self.setState({
          isShow: false
        }, () => {
          if (self._timer) {
            clearTimeout(self._timer);
          }
        });
      }, options.duration || 1500);
    });
  }

  // 初始化 参数
  private _initToast() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this.setState({
      title: '',
      type: 'error',
      isShow: false,
      complete: () => { },
      duration: 1500,
    });
  }

  private _onToastHide() {
    const { complete } = this.state;
    if ((complete instanceof Function) === true) {
      this.state.complete();
    }
  }

  render() {
    let icon: any = null;
    const { isShow, type, title } = this.state;
    switch (type) {
      case 'error':
        icon = 'close'
        break;
      case 'warning':
        icon = 'alert-circle'
        break;
      case 'success':
        icon = 'check'
        break;
      default:
        icon = '';
        break;
    }
    return (
      <AtToast isOpened={isShow} text={title} icon={icon} hasMask={true} onClose={this._onToastHide.bind(this)}></AtToast>
    )
  }
}

export default Toast;
