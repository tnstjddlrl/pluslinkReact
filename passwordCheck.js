import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';

const PasswordCheck = () => {
  const [value, onChangeText] = React.useState('');//textinput용
  const navigation = useNavigation();
  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>비밀번호확인</Text>
                      </View>

            <View style={{margin:10,marginTop:30,borderWidth:1,width:chartWidth-20}}>
              <Text style={{fontSize:16,margin:15,fontWeight:'bold'}}>회원 비밀번호 확인</Text>
              <Text style={{fontSize:14,marginTop:15,marginLeft:15}}>비밀번호를 한번 더 입력해주세요.</Text>
              <Text style={{fontSize:12,marginLeft:15,marginTop:5}}>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 한번더 확인합니다.</Text>

              <Text style={{fontSize:14,marginTop:15,marginLeft:15}}>회원아이디 : (로그인한아이디)</Text>
              <TextInput      
                style={{ height: 40,width:chartWidth-50,marginLeft:15,marginTop:10,marginBottom:20, borderColor: 'gray', borderWidth: 0.5 }}
                onChangeText={text => onChangeText(text)}
                value={value}
              />
              <TouchableOpacity onPress={()=>navigation.navigate('정보변경2')}>
              <View style={{margin:15,width:chartWidth-50,backgroundColor:'#d11aff'}}>
                <Text style={{color:"white",margin:15,alignSelf:'center',fontWeight:'bold'}}>확인하기</Text>
              </View>
              </TouchableOpacity>

            </View>


          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

export default PasswordCheck;