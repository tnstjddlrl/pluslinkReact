import React,{useState,Component,useEffect} from "react";
import {
  Text,
  View,
  Dimensions,
  Button,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import CheckBox from '@react-native-community/checkbox';

import FootTer from './footer.js'
import HeadHeder from "./header.js";
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios'

import AsyncStorage from '@react-native-community/async-storage';

const logo = { uri: "https://pluslink.kr/img/pluslink/logo.png" };
const logo2 = { uri: "https://pluslink.kr/img/menu.png" };
const testlogo = require('./img/logo.png')

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

//로그인 연동 해야함...
//================================로그인===============================



const fetchUser = async(id)=>{
  AsyncStorage.setItem(
    '@super:id',
    id
  );
}

async function isFavorite() {
  try {
    return await AsyncStorage.getItem("@super:id");
  } catch (error) {
    return false;
  }
}


const Login=()=>{

  const [toggleCheckBox, setToggleCheckBox] = useState(true)

  function logindata(id,pss){
    Axios.post('http://ip0131.cafe24.com/pluslink/json/memberJson.php', JSON.stringify({
      id : id,
      password: pss
    }))
      .then(function (response) {
        console.log('리스폰스 ', response);
        if (response.request._response == 'suc') {
          Alert.alert('로그인 되었습니다.')
          fetchUser(id)
          console.log(isFavorite());
          navigation.navigate('홈');
        }
        else if (response.request._response == 'nodata') {
          Alert.alert('탈퇴된 회원의 정보입니다.')
        } else if (response.request._response == 'passwrod is not correct.') {
          Alert.alert('아이디 혹은 비밀번호가 일치하지 않습니다..')
        } else {
          Alert.alert('등록된 아이디가 없습니다.')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [id, onChangeId] = React.useState('');//textinput용
  const [pss, onChangePSS] = React.useState('');//textinput용
  const navigation = useNavigation();
  return (
    <View>
      <View style={{ height: chartHeight, backgroundColor: 'white',justifyContent:"center",alignItems:"center" }}>

        <View style={{  backgroundColor: 'white', borderWidth: 1, borderColor: "#a6a6a6", margin: 20, width: chartWidth - 40 }}>
          <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold', left: 15,marginTop:60 }}>로그인</Text>
          <View style={{  borderWidth: 1, width: 80, left: 15 ,marginBottom:20}}></View>
          <TextInput
            style={{  height: 40, width: chartWidth - 80, marginLeft: 15, borderColor: 'gray', borderWidth: 1,marginBottom:20 }}
            onChangeText={text => onChangeId(text)}
            value={id}
            placeholder='아이디'
          />
          <TextInput
            style={{  height: 40, width: chartWidth - 80, marginLeft: 15, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangePSS(text)}
            value={pss}
            placeholder='비밀번호'
          />

          <View style={{ flexDirection: 'row', left: 10 }}>


          </View>
          <View style={{ margin: 15, width: chartWidth - 80 }}>

            <View style={{ flexDirection: "row",alignItems:'center',justifyContent:'space-between' }}>

              <View style={{flexDirection:"row",alignItems:"center"}}>
              <CheckBox disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                boxType={"square"} ></CheckBox>
              <Text style={{marginLeft:5}}>자동로그인</Text>
              </View>

              <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={()=>navigation.navigate('아이디찾기')}>
                <Text>아이디/비밀번호 찾기</Text>
                </TouchableOpacity>
              </View>


            </View>


            <TouchableOpacity onPress={() => { logindata(id, pss), console.log('버튼 눌러짐') }}>
              <View style={{ width: chartWidth - 80, height: 40, backgroundColor: '#d24dff', justifyContent:'center' , alignItems:'center',marginTop:20 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', }}>로그인</Text>
              </View>
            </TouchableOpacity>



          </View>
          <View style={{  borderWidth: 1, borderColor: "#d9d9d9", width: 350,marginTop:50,marginBottom:10 }}></View>

          <View style={{  left: 15, flexDirection: 'row', height: 30, alignItems: 'center',marginBottom:20 }}>
            <Text style={{ textAlignVertical: 'center', marginRight: 10 }}>처음이신가요??</Text>

            <TouchableOpacity onPress={() => navigation.navigate('회원가입')}>
              <View style={{ width: 65, height: 30, backgroundColor: 'black', alignItems: 'center',justifyContent:"center" }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>회원가입</Text>
              </View>
            </TouchableOpacity>

          </View>

        </View>

      </View>

      <HeadHeder></HeadHeder>

      <FootTer></FootTer>

    </View>
  )
}
  
  export default Login;
  
  
  //=====================================================================