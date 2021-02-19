import React, { useState } from 'react';
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
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

import axios from "axios";

const FindId = () => {

  const [email,setEmail] = useState('');

  function finde(){
    axios.post('http://ip0131.cafe24.com/pluslink/json/pwd_lost2.php', JSON.stringify({
      mb_email : email,
    }))
    .then(function (response) {
      console.log('리스폰스 ',response);

      if(response.request._response=='suc'){
      alert('로그인 되었습니다.')
      
      }
      else{
        alert('발송되었습니다.')
        // navigation.navigate('홈');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth }}>
        <ScrollView>
          <View style={{ marginBottom: 500 }}>
            <View style={{ width: chartWidth, marginTop: 50 }}>
              <ImageBackground source={event} style={{ width: chartWidth, height: chartHeight / 7 }}>
              </ImageBackground>
              <Text style={{ position: 'absolute', color: "white", fontSize: 20, fontWeight: 'bold', top: 40, left: 10 }}>아이디 찾기</Text>
            </View>

            <View style={{margin:15}}>
              <Text>회원가입시 등록하신 이메일 주소를 입력해 주세요. 해당 이메일 주소로 비밀번호 정보를 전달해 드립니다.</Text>

              <TextInput onChangeText={(txt)=>setEmail(txt)} value={email} placeholder={'이메일주소'} style={{width:chartWidth-30,height:30,borderWidth:0.5,borderColor:'gray',marginTop:20}}></TextInput>
              <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:50}}>
              <TouchableOpacity onPress={()=>finde()}>
                <View style={{width:50,height:40,justifyContent:"center",alignItems:"center",backgroundColor:'gray'}}>
                  <Text>확인</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity>
                <View style={{width:50,height:40,justifyContent:"center",alignItems:"center",backgroundColor:'gray',marginLeft:10}}>
                  <Text>취소</Text>
                </View>
                </TouchableOpacity>

              </View>
            </View>







          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

export default FindId;