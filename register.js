import React,{useState,Component,useEffect} from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  AppRegistry,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'

const image = { uri: "https://pluslink.kr/img/review_bg.jpg" };

import FootTer from './footer.js'
import HeadHeder from "./header.js";

//================================회원가입===============================

const Register=({navigation})=>{
    const [value, onChangeText] = React.useState('');//textinput용
    
    return(
      <View>
        <View>
          <ScrollView style={{marginTop:56}}>
            <View style={{height:chartHeight*1.7}}>
            <View style={{width:chartWidth,height:150}}>
              <ImageBackground source={image} style={{flex: 1,resizeMode: "cover",justifyContent: "center"}}>
              <Text style={{position:'absolute',textAlignVertical:'center',top:30,left:15,color:'white',fontSize:20,fontWeight:'bold'}}>회원가입</Text>
              <View style={{position:'absolute',borderWidth:1,borderColor:"#d9d9d9",width:75,top:60,left:15}}></View>
              </ImageBackground>
            </View>
            <View style={{position:'absolute',backgroundColor:'#d9d9d9',borderWidth: 1,borderColor:"#a6a6a6",margin:20 , width:350,height:400, top:150}}>
            <Text style={{position:'absolute',textAlignVertical:'center',top:10,left:15,color:'black',fontSize:15,}}>이용정보 입력</Text>
            </View>
            <View style={{position:'absolute',backgroundColor:'white',borderWidth: 1,borderColor:"#a6a6a6",margin:20 , width:350,height:410, top:190}}>
            </View>
  
            <View style={{position:'absolute',top:220,left:35,width:320,height:70}}>
            <Text>아이디</Text>
            <TextInput
            style={{position:'absolute', height: 30,width:315,top:25, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={value}
           />
           <Text style={{position:'absolute',fontSize:13,bottom:0}}>영문자, 숫자, _ 만 입력 가능. 최소 3자이상 입력하세요.</Text></View>
  
           <View style={{position:'absolute',top:310,left:35,width:320,height:70}}>
            <Text>비밀번호</Text>
            <TextInput
            style={{position:'absolute', height: 30,width:315,top:25, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={value}
           />
           </View>
           <View style={{position:'absolute',top:380,left:35,width:320,height:70}}>
            <Text>비밀번호 확인</Text>
            <TextInput
            style={{position:'absolute', height: 30,width:315,top:25, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={value}
           /></View>
           <View style={{position:'absolute',top:450,left:35,width:320,height:70}}>
            <Text>E-mail</Text>
            <TextInput
            style={{position:'absolute', height: 30,width:315,top:25, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={value}
           /></View>
           <View style={{position:'absolute',top:520,left:35,width:320,height:70}}>
            <Text>추천업체코드</Text>
            <TextInput
            style={{position:'absolute', height: 30,width:315,top:25, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={value}
           />
           <Text style={{position:'absolute',fontSize:13,bottom:0}}>추천업체코드 입력시 PL쇼핑몰 할인 쿠폰 지급</Text>
           </View>
  
  
           <View style={{position:'absolute',backgroundColor:'#d9d9d9',borderWidth: 1,borderColor:"#a6a6a6",margin:20 , width:350,height:200, top:640}}>
            <Text style={{position:'absolute',textAlignVertical:'center',top:10,left:15,color:'black',fontSize:15,}}>본인확인</Text>
            </View>
            <View style={{position:'absolute',backgroundColor:'white',borderWidth: 1,borderColor:"#a6a6a6",margin:20 , width:350,height:160, top:680}}>
            <View style={{position:'absolute',top:10,left:15,width:320,height:70}}>
            <Text>이름</Text>
            <TextInput
            style={{position:'absolute', height: 30,width:315,top:25, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={value}
           /></View>
  
           <View style={{position:'absolute',top:80,left:15,width:320,height:70}}>
            <Text>휴대폰번호</Text>
            <TextInput
            style={{position:'absolute', height: 30,width:315,top:25, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={value}
           />
           </View>
            </View>
          
            <View style={{position:'absolute',backgroundColor:'#d9d9d9',borderWidth: 1,borderColor:"#a6a6a6",margin:20 , width:350,height:100, top:880}}>
            <Text style={{position:'absolute',textAlignVertical:'center',top:10,left:15,color:'black',fontSize:15,}}>이미지등록</Text>
            </View>
            <View style={{position:'absolute',backgroundColor:'white',borderWidth: 1,borderColor:"#a6a6a6",margin:20 , width:350,height:120, top:920}}>
            <View style={{position:'absolute',top:10,left:15,width:320,height:70}}>
            <Text>대표이미지</Text>
            </View>
  
            </View>
            </View>
            <View style={{position:'absolute', top:1100,left:chartWidth/2.7,width:315,flex:1,flexDirection:'row'}}>
            <Button title={'회원가입'} color="#d24dff"></Button>
            <Button title={'취소'} color={'#404040'}></Button>
            </View>
            
          </ScrollView>
        </View>
  
  
  
        <HeadHeder></HeadHeder>
     
        <FootTer></FootTer>
        
      </View>
    )
  }
  
  export default Register;
  //=====================================================================