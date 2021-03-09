import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Button
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import axios from "axios";
const Register = () => {
  const navigation = useNavigation()
  const [id, setId] = useState('')
  const [pwd, setPwd] = useState('')
  const [repwd, setRepwd] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [hp, setHp] = useState('')
  const [recommend,setRecommend] = useState('')

  const [response, setResponse] = React.useState(null); //ㅅㅏ진

  function registerdata() {

    if(response == null){
      var im = '1'
    }else{
      var im = response.base64
    }

    axios.post('http://ip0131.cafe24.com/pluslink/json/registerInsert.php', JSON.stringify({
      mb_id: id,
      mb_password: pwd,
      mb_name: name,
      mb_email: email,
      mb_hp: hp,
      img: im
    }))
      .then(function (response) {
        console.log('리스폰스 ', response);
        if (response.request._response == 'suc') {
          alert('회원가입 되었습니다.')
        }
        else {
          alert('회원가입이 완료되었습니다.')
          //navigation.navigate('홈');
          console.log(response)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function checkpw() {
    if (pwd == repwd) {
      registerdata()
    } else {
      alert('비밀번호 확인란을 다시 작성해주세요')
    }
  }



  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth }}>
        <ScrollView style={{backgroundColor:'white'}}>
          <View style={{ marginBottom: 100 }}>
            <View style={{ width: chartWidth, marginTop: 50 }}>
              <ImageBackground source={event} style={{ width: chartWidth, height: chartHeight / 7 }}>
              </ImageBackground>
              <Text style={{ position: 'absolute', color: "white", fontSize: 20, fontWeight: 'bold', top: 40, left: 10 }}>회원가입</Text>
            </View>

            <View style={{ margin: 15, borderWidth: 1, width: chartWidth - 30, borderColor: '#cccccc' }}>
            <View style={{backgroundColor:'rgb(243,243,243)'}}>
              <Text style={{ margin: 10, fontWeight: 'bold' }}>이용정보입력</Text>
              </View>
              <View style={{ borderColor: '#cccccc', borderWidth: 1, width: chartWidth - 30, borderColor: '#cccccc' }}></View>
              <Text style={{ marginLeft: 10, marginTop: 15, fontWeight: 'bold' }}>아이디</Text>
              <TextInput onChangeText={(text) => setId(text)} value={id} style={{ borderWidth: 1, borderColor: '#cccccc', width: chartWidth - 50, height: 35, marginLeft: 10, marginTop: 5, }}></TextInput>
              <Text style={{ marginLeft: 10, color: 'gray' }}>영문자,숫자,_만 입력가능,최소 3자이상 입력하세요</Text>
              <Text style={{ marginLeft: 10, marginTop: 15, fontWeight: 'bold' }}>비밀번호</Text>
              <TextInput onChangeText={(text) => setPwd(text)} value={pwd} style={{ borderWidth: 1, borderColor: '#cccccc', width: chartWidth - 50, height: 35, marginLeft: 10, marginTop: 5, }}></TextInput>
              <Text style={{ marginLeft: 10, marginTop: 15, fontWeight: 'bold' }}>비밀번호 확인</Text>
              <TextInput onChangeText={(text) => setRepwd(text)} value={repwd} style={{ borderWidth: 1, borderColor: '#cccccc', width: chartWidth - 50, height: 35, marginLeft: 10, marginTop: 5, }}></TextInput>
              <Text style={{ marginLeft: 10, marginTop: 15, fontWeight: 'bold' }}>E-mail</Text>
              <TextInput onChangeText={(text) => setEmail(text)} value={email} style={{ borderWidth: 1, borderColor: '#cccccc', width: chartWidth - 50, height: 35, marginLeft: 10, marginTop: 5, marginBottom: 20 }}></TextInput>
              <Text style={{ marginLeft: 10, marginTop: 15, fontWeight: 'bold' }}>추천업체코드</Text>
              <TextInput onChangeText={(text) => setEmail(text)} value={recommend} style={{ borderWidth: 1, borderColor: '#cccccc', width: chartWidth - 50, height: 35, marginLeft: 10, marginTop: 5, marginBottom: 20 }}></TextInput>

            </View>

            <View style={{ margin: 15, borderWidth: 1, width: chartWidth - 30, borderColor: '#cccccc' }}>
            <View style={{backgroundColor:'rgb(243,243,243)'}}>
              <Text style={{ margin: 10, fontWeight: 'bold' }}>본인확인</Text>
              </View>
              <View style={{ borderColor: '#cccccc', borderWidth: 1, width: chartWidth - 30, borderColor: '#cccccc' }}></View>
              <Text style={{ marginLeft: 10, marginTop: 15, fontWeight: 'bold' }}>이름</Text>
              <TextInput onChangeText={(text) => setName(text)} value={name} style={{ borderWidth: 1, borderColor: '#cccccc', width: chartWidth - 50, height: 35, marginLeft: 10, marginTop: 5, marginBottom: 15 }}></TextInput>
              <Text style={{ marginLeft: 10, marginTop: 5, fontWeight: 'bold' }}>휴대폰번호</Text>
              <TextInput onChangeText={(text) => setHp(text)} value={hp} style={{ borderWidth: 1, borderColor: '#cccccc', width: chartWidth - 50, height: 35, marginLeft: 10, marginTop: 5, marginBottom: 15 }}></TextInput>

            </View>

            <View style={{ margin: 15, borderWidth: 1, width: chartWidth - 30, borderColor: '#cccccc' }}>
            <View style={{backgroundColor:'rgb(243,243,243)'}}>
              <Text style={{ margin: 10, fontWeight: 'bold' }}>이미지 등록</Text>
              </View>
              <View style={{ borderColor: '#cccccc', borderWidth: 1, width: chartWidth - 30, borderColor: '#cccccc' }}></View>

              <View style={{ flexDirection: "row", alignItems: "center", width: chartWidth / 2, justifyContent: "space-between" }}>
                <Text style={{ margin: 10, fontWeight: 'bold' }}>대표 이미지</Text>
                <TouchableOpacity onPress={() =>
                  launchImageLibrary(
                    {
                      mediaType: 'photo',
                      includeBase64: true,
                      maxHeight: chartHeight,
                      maxWidth: chartWidth / 1.1,
                    },
                    (response) => {
                      setResponse(response);
                      console.log(response)
                      // console.log(JSON.stringify(response))
                    },
                  )
                }>
                  <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center' }}>
                    <Text style={{ marginTop: 5 }}>사진선택</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {response && (
                  <View>
                    <View>
                      <Image
                        style={{ width: response.width, height: response.height,margin:10 }}
                        source={{ uri: response.uri }}
                      />
                    </View>
                  </View>
                )}

            </View>



            


            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity onPress={() => checkpw()}>
                <View style={{ backgroundColor: "#d24dff", width: 70, height: 35, }}>
                  <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10 }}>회원가입</Text>
                </View>
              </TouchableOpacity>
              <View style={{ backgroundColor: "#404040", width: 50, height: 35, }}>
                <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10 }}>취소</Text>
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

export default Register;