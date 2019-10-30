import Taro, { Component } from '@tarojs/taro';

import { View, Label, Text, Image } from '@tarojs/components';
import { profile } from '../../services/api/profile';
import './userInfo.scss';

import personalImg from '../../images/icons/personal.svg';
import departImg from '../../images/icons/depart.svg';
import telImg from '../../images/icons/tel.svg';
import mailImg from '../../images/icons/mail.svg';



export default class UserInfo extends Component<any> {

  render() {
    const userInfo = profile.getUserInfo();
    const imagePath = 'data:image/png;base64,' + userInfo.avatar;
    return (
      <View className="userInfoBox">
        <Image className="avatar" src={imagePath} ></Image>
        <View className="userInfo contentFontColor contentFontSize">
          <View className='infoLine'>
            <Label className='lineLabel'>
              <Image className='icon' src={personalImg}></Image>
            </Label>
            <Text className='lineText'>{userInfo.user_name}</Text>
          </View>
          <View className='infoLine'>
            <Label className='lineLabel'>
              <Image className='icon' src={departImg}></Image>
            </Label>
            <Text className='lineText'>{userInfo.department}</Text>
          </View>
          <View className='infoLine'>
            <Label className='lineLabel'>
              <Image className='icon' src={telImg}></Image>
            </Label>
            <Text className='lineText'>{userInfo.mobile}</Text>
          </View>
          <View className='infoLine'>
            <Label className='lineLabel'>
              <Image className='icon' src={mailImg}></Image>
            </Label>
            <Text className='lineText'>{userInfo.mail}</Text>
          </View>
        </View>
      </View>
    )
  }
}