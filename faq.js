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
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-community/async-storage'; //로그인한 아이디값 저장하기 위한 앱 내부 저장소
import axios from "axios";

const find = require('./img/find.png')

const Faq = () => {

  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView style={{backgroundColor:'white'}}>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>FAQ</Text>
                      </View>

            <View style={{margin:10}}>
              <View style={{borderWidth:0.5,borderColor:'gray',width:chartWidth-20,flexDirection:"row",backgroundColor:'#f2f2f2'}}>
                <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
                  <View style={{width:40,height:40,justifyContent:"center",alignItems:'center',backgroundColor:'#cccccc',borderWidth:1,borderColor:'gray'}}>
                    <Image style={{width:30,height:30}} source={find}></Image>
                  </View>
                  <View style={{width:chartWidth/1.8,height:40,borderWidth:0.5,borderColor:'gray'}}>
                    <TextInput style={{width:chartWidth/1.8,height:40}}></TextInput>
                  </View>
                </View>


                <View style={{height:40,width:chartWidth/5,backgroundColor:'black',alignItems:"center",justifyContent:"center",margin:10}}>
                  <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>검색하기</Text>
                </View>
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

const Menu = (prop) =>{
  
  return(
    <View>
      <View style={{borderWidth:0.5,borderColor:'gray'}}>
        <Text>{prop.sub}</Text>
      </View>
    </View>
  )
}


export default Faq;