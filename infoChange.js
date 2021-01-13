import React from 'react';
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

const InfoChange = () => {
  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>정보변경</Text>
                      </View>

              <View style={{margin:15,borderWidth:1,width:chartWidth-30,borderColor:'#cccccc'}}>
                <Text style={{margin:10,fontWeight:'bold'}}>이용정보입력</Text>
                <View style={{borderColor:'#cccccc',borderWidth:1,width:chartWidth-30,borderColor:'#cccccc'}}></View>
                <Text style={{marginLeft:10,marginTop:15,fontWeight:'bold'}}>아이디</Text>
                <View style={{borderWidth:1,borderColor:'#cccccc',width:chartWidth-50,marginLeft:10,marginTop:5,backgroundColor:'#ffcccc'}}>
                  <Text style={{margin:10,fontWeight:'100'}}>로그인한 아이디</Text>
                </View>
                <Text style={{marginLeft:10,marginTop:15,fontWeight:'bold'}}>비밀번호</Text>
                <TextInput style={{borderWidth:1,borderColor:'#cccccc',width:chartWidth-50,height:35,marginLeft:10,marginTop:5,}}></TextInput>
                <Text style={{marginLeft:10,marginTop:15,fontWeight:'bold'}}>비밀번호 확인</Text>
                <TextInput style={{borderWidth:1,borderColor:'#cccccc',width:chartWidth-50,height:35,marginLeft:10,marginTop:5,}}></TextInput>
                <Text style={{marginLeft:10,marginTop:15,fontWeight:'bold'}}>E-mail</Text>
                <TextInput style={{borderWidth:1,borderColor:'#cccccc',width:chartWidth-50,height:35,marginLeft:10,marginTop:5,marginBottom:20}}></TextInput>
              </View>

              <View style={{margin:15,borderWidth:1,width:chartWidth-30,borderColor:'#cccccc'}}>
                <Text style={{margin:10,fontWeight:'bold'}}>본인확인</Text>
                <View style={{borderColor:'#cccccc',borderWidth:1,width:chartWidth-30,borderColor:'#cccccc'}}></View>
                <Text style={{marginLeft:10,marginTop:15,fontWeight:'bold'}}>이름</Text>
                <View style={{borderWidth:1,borderColor:'#cccccc',width:chartWidth-50,marginLeft:10,marginTop:5,backgroundColor:'#ffcccc'}}>
                  <Text style={{margin:10,fontWeight:'100'}}>로그인이름</Text>
                </View>
                <Text style={{marginLeft:10,marginTop:15,fontWeight:'bold'}}>휴대폰번호</Text>
                <TextInput style={{borderWidth:1,borderColor:'#cccccc',width:chartWidth-50,height:35,marginLeft:10,marginTop:5,marginBottom:15}}></TextInput>
                
              </View>
              <View style={{flexDirection:'row',alignSelf:'center'}}>
                <View style={{backgroundColor:"#d24dff",width:70,height:35,}}>
                  <Text style={{color:'white',alignSelf:'center',marginTop:10}}>정보수정</Text>
                </View>
                <View style={{backgroundColor:"#404040",width:50,height:35,}}>
                  <Text style={{color:'white',alignSelf:'center',marginTop:10}}>취소</Text>
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

export default InfoChange;