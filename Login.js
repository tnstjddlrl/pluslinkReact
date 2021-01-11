import React,{useState,Component,useEffect} from "react";
import {
  Text,
  View,
  Dimensions,
  Button,
  TextInput,
} from "react-native";
import CheckBox from '@react-native-community/checkbox';

import FootTer from './footer.js'
import HeadHeder from "./header.js";
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios'

const logo = { uri: "https://pluslink.kr/img/pluslink/logo.png" };
const logo2 = { uri: "https://pluslink.kr/img/menu.png" };
const testlogo = require('./img/logo.png')

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

//로그인 연동 해야함...
//================================로그인===============================
function logindata(id,pss){
  Axios.post('http://ip0131.cafe24.com/pluslink/json/memberJson.php', JSON.stringify({
    id : id,
    password : pss
  }))
  .then(function (response) {
    console.log('리스폰스 ',response);
    if(response.request._response=='suc'){
    alert('로그인 되었습니다.')
    setLogin(true); //로그인 처리가 안됨. 이부분 수정해야함.
    }
    else{
      alert('아이디 또는 비밀번호를 확인해주세요')
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}


const Login=()=>{
    const [id, onChangeId] = React.useState('');//textinput용
    const [pss, onChangePSS] = React.useState('');//textinput용
    const [toggleCheckBox, setToggleCheckBox] = useState(false)//체크박스용
    const navigation = useNavigation();
    return(
      <View>
      <View style={{height:chartHeight}}>
        
        <View style={{position:'absolute',backgroundColor:'white',borderWidth: 1,borderColor:"#a6a6a6",margin:20 , width:350,height:500, top:100}}>
          <Text style={{color: 'black',fontSize: 30,fontWeight: 'bold',position:'absolute', top:40,left:15}}>로그인</Text>
          <View style={{position:'absolute',borderWidth:1,width:80,top:80,left:15}}></View>
          <TextInput
            style={{position:'absolute', height: 40,width:315,marginLeft:15 ,top:120,  borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeId(text)}
            value={id}
            placeholder='아이디'
          />
          <TextInput
            style={{position:'absolute', height: 40,width:315,marginLeft:15 ,top:180,  borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangePSS(text)}
            value={pss}
            placeholder='비밀번호'
          />
  
          <View style={{flex:1,flexDirection:'row',position:'absolute',top:230,left:10}}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
          <Text style={{textAlignVertical:'center'}}>자동로그인</Text>
          <Text style={{textAlign:'right',textAlignVertical:'center',marginLeft:90}}>아이디/비밀번호 찾기</Text>
          
          </View>
          <View style={{position:'absolute', top:270,left:15,width:315}}>
          <Button title={'로그인'} color="#d24dff" onPress={()=>logindata(id,pss)}></Button>
          </View>
          <View style={{position:'absolute',borderWidth:1,borderColor:"#d9d9d9",width:350,top:440}}></View>
          <View style={{position:'absolute',left:15,flex:1,flexDirection:'row',top:455,height:30}}>
            <Text style={{textAlignVertical:'center',marginRight:10}}>처음이신가요??</Text>
            
            <Button title={'회원가입'} color={'#404040'} onPress={()=>navigation.navigate('회원가입')}></Button>
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