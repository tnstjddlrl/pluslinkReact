//베이스 코드들 모음. 새로운 페이지 생성시 복사하여 사용하는 코드. 아무런 기능 없이 헤더와 푸터 상단 이미지뷰만 있다.

import React, { useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;


import { useNavigation } from '@react-navigation/native';


const Loading = () => {
  const navigation = useNavigation()

  useEffect(()=>{
    setTimeout(() => {
      navigation.goBack()
    }, 100);
    
  },[])

  const logo = { uri: "https://pluslink.kr/img/pluslink/logo.png" };
  
  return(
    <View style={{width:chartWidth,height:chartHeight,justifyContent:"center",alignItems:"center"}}>
      <Image style={{width:300,height:245}} source={logo}></Image>
    </View>
  )
}

export default Loading;