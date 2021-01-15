//우수시공사례 자세히보기

import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width; //현재 창 크기 가져오기

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js"; //푸터 헤더

import { useNavigation } from '@react-navigation/native';

const user = require('./img/user.png')
const clock = require('./img/clock.png')

const BestView = () => {
  const navigation = useNavigation();
  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          {/* 상단 이미지 */}
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>시공사례</Text>
                      </View>

            {/* 제목부분 */}
            <View style={{flexDirection:'row',alignItems:'center',marginTop:25,marginLeft:20}}>
              <View style={{backgroundColor:'gray',borderRadius:28,width:60,height:60}}></View>
                <Text style={{marginLeft:5,fontSize:18,fontWeight:'bold'}}>테스트 내용입니다.</Text>
            </View>

            {/* 작성자 전화번호 이메일 일시 */}
            <View style={{marginLeft:10,marginTop:10}}>
              <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
                <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
                  <Image source={user} style={{width:10,height:10,}}></Image>
                  <Text style={{fontSize:13}}>test</Text>
                  <Image source={user} style={{width:10,height:10,marginLeft:10}}></Image>
                  <Text style={{fontSize:13}}>01026002569</Text>
                  <Image source={user} style={{width:10,height:10,marginLeft:10}}></Image>
                  <Text style={{fontSize:13}}>test@test.com</Text>
                  <Image source={clock} style={{width:10,height:10 ,marginLeft:10}}></Image>
                  <Text style={{fontSize:13}}>2020.11.10 20:48</Text>
                </View>
              <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
            </View>
              
          </View>
        </ScrollView>
      </View>


      {/* 헤더와 푸터를 맨밑에 배치하는 이유는, 여러가지 시도 후 맨 마지막에 렌더링된 아이템이 맨 상단에 올라와진다는 것을 알게되었기 때문이다. */}
      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

export default BestView;