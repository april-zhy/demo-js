import './scroll.scss';
import Taro, { Component } from '@tarojs/taro';
import { host } from '../../services/api/api-url';
import { serialize } from '../../services/utils/tools';
import { ScrollView, View, Text } from '@tarojs/components';
import { httpClient } from '../../services/api/http-client';

export interface IScrollExtras {
  noMoreMsg?: String;    // default --我是有底线的--
  noDataMsg?: String;    // default --暂无数据-- 
}

export interface IScrollProps {
  baseUrl?: String;          // 
  params?: object;           // eg: page_size,type_id 
  onScroll: Function;        // trigger custom event
  extras?: IScrollExtras;
}

export default class Scroll extends Component<IScrollProps> {

  state = {
    url: '',
    data: [],
    pageSize: 10,
    params: {},
    noMore: false,
    noData: false,
    noMoreMsg: '我是有底线的',
    noDataMsg: '暂无数据'
  }

  constructor(props: IScrollProps) {
    super(props);
    this._initScroll(props);
  }

  componentWillReceiveProps(props: IScrollProps) {
    const preProp = JSON.stringify(this.props);
    const nextProps = JSON.stringify(props);
    if (preProp === nextProps) {
      return;
    }
    this._initScroll(props);
  }

  private _initScroll(props) {
    if (JSON.stringify(props) === '{}') {
      return;
    }
    const _url = host + props.baseUrl;
    const _param = {
      page_no: 1,
      page_size: this.state.pageSize
    };
    Object.assign(_param, props.params);
    if (props.extras) {
      this.setState({
        noMoreMsg: props.extras.noMoreMsg,
        noDataMsg: props.extras.noDataMsg
      });
    }
    this.setState({
      url: _url,
      params: _param,
      data: [],
      noMore: false,
      noData: false
    }, () => {
      this._fetchList();
    });
  }

  onScrollToLower() {
    if (this.state.noMore) {
      return;
    }
    const _param = this.state.params;
    _param['page_no']++;
    this.setState({
      params: _param
    }, () => {
      this._fetchList();
    });
  }

  private async _fetchList() {
    Taro.showLoading({
      title: 'loading',
      mask: true
    });
    const _url = serialize(this.state.url, this.state.params);
    const res = await httpClient.get(_url);
    Taro.hideLoading();
    if (res.error_no) {
    } else {
      const preData = this.state.data;
      this.setState({
        data: preData.concat(res)
      }, () => {
        this.props.onScroll(this.state.data);
      });
      if ((res.length === 0) && (this.state.params['page_no'] === 1)) {
        this.setState({ noData: true });
      } else {
        this.setState({ noData: false });
      }
      if ((res.length < this.state.params['page_size']) && (this.state.params['page_no'] !== 1)) {
        this.setState({ noMore: true });
      } else {
        this.setState({ noMore: false });
      }
    }
  }

  render() {
    let status: any;
    if (this.state.noMore === true) {
      status = <Text>-- {this.state.noMoreMsg} --</Text>
    } else if (this.state.noData === true) {
      status = <Text>-- {this.state.noDataMsg} --</Text>
    }
    return (
      <ScrollView className='scroll' scrollY onScrollToLower={this.onScrollToLower.bind(this)}>
        {this.props.children}
        <View className='notice'>{status}</View>
      </ScrollView>
    )
  }
}
