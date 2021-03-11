import React,{useState,Component,useEffect} from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'

import Swiper from 'react-native-swiper'
const Banimg =require('./img/banner.png')
const Banimg2 =require('./img/banner2.png')
const Banimg3 =require('./img/banner3.png')

const gbg1 =require('./img/gbg1.png')
const gbg2 =require('./img/gbg2.png')
const gbg3 =require('./img/gbg3.png')

const ba1 = require('./img/ba1.jpg')
const ba2 = require('./img/ba2.jpg')
const ba3 = require('./img/ba3.jpg')

const Banner = ()=>{
  return(
    // 스와이퍼 오픈소스를 활용하여 메인 배너 구성, 구성 요소는 ImageBackground로 구성한다.
    <Swiper style={{marginTop:20,height:chartHeight/4.5,}} showsButtons={false} autoplay={true} autoplayTimeout={4}>
        
        <ImageBackground style={{width:chartWidth,height:chartHeight/4.5}} source={ba1}>
          <View style={{width:chartWidth,height:chartHeight/4,top:"20%",left:'3%'}}>
            <Text style={{color:'white',fontFamily:'ajh',fontSize:18}} >당장 시공이 필요할 때, 프링으로 손 쉽게 신청하세요!</Text>
            <Text style={{color:'white',fontFamily:'regular',fontSize:12}} >당장 시공이 필요할 때, 프링으로 손 쉽게 신청하세요!</Text>
          </View>
        </ImageBackground>

        <ImageBackground style={{width:chartWidth,height:chartHeight/4.5}} source={ba2}>
          <View style={{width:chartWidth,height:chartHeight/4,top:"20%",left:'3%'}}>
          <Text style={{color:'white',fontFamily:'ajh',fontSize:18}} >후기로 증명된 프링의 간편함, 지금 체험하세요!</Text>
          <Text style={{color:'white',fontFamily:'regular',fontSize:12}} >지금 당장 내 주변 시공견적을 비교해보세요</Text>
          </View>
        </ImageBackground>

        <ImageBackground style={{width:chartWidth,height:chartHeight/4.5}} source={ba3}>
          <View style={{width:chartWidth,height:chartHeight/4,top:"20%",left:'3%'}}>
          <Text style={{color:'white',fontFamily:'ajh',fontSize:18}} >이사 후, 프링으로 인테리어를 한번에 해결하세요</Text>
          <Text style={{color:'white',fontFamily:'regular',fontSize:12}} >프링몰에서 패키지 구매 후 시공까지 한번에!</Text>
          </View>
        </ImageBackground>


        {/* <Image source={gbg1} style={{ width:chartWidth,height:chartHeight/4,}}>
        </Image>
        <Image source={gbg2} style={{ width:chartWidth,height:chartHeight/4.5,}}>
        </Image>
        <Image source={gbg3} style={{ width:chartWidth,height:chartHeight/4.5,}}>
        </Image> */}
      </Swiper>
  );
}

export default Banner;