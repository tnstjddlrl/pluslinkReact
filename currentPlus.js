import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')


import { useNavigation } from '@react-navigation/native';

import FootTer from './footer.js'
import HeadHeder from "./header.js";
import { ScrollView, TextInput } from 'react-native-gesture-handler';


const CurrentPlus = () =>{
  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>견적현황</Text>
                      </View>


          <View style={{margin:10}}>
            <View style={{flexDirection:'row',alignItems:'center',width:chartWidth-30,marginTop:20}}>
              <Text style={{fontWeight:'bold',fontSize:18}}>견적요청서</Text>
              <Image source={arrow} style={{right:0,position:'absolute'}}></Image>
            </View>
            <View style={{width:chartWidth-30,borderWidth:0.5,borderColor:'gray',marginTop:10}}></View>
            
            <View style={{width:chartWidth-30,height:300,backgroundColor:'#e6e6e6',}}>
              <View style={{backgroundColor:'white', width:chartWidth-60,marginLeft:15,marginTop:15}}>
                
                <PlusItem name='견적번호' num='57'></PlusItem>
                <PlusItem name='상태' num='견적취소'></PlusItem>
                <PlusItem name='카테고리' num='수도'></PlusItem>
                <PlusItem name='세부항목' num='동파'></PlusItem>
                <PlusItem name='요청날짜' num='2020-12-15'></PlusItem>
                <PlusItem name='시공주소' num='테스트 주소입니다10-1'></PlusItem>


                <View style={{marginTop:15,marginLeft:15}}>
                  <Text style={{fontSize:16}}>상세내용</Text>
                  <View style={{borderWidth:0.5,borderColor:'gray',marginTop:15,marginBottom:15}}>
                    <Text style={{margin:10}}>상세 내용 테스트입니다.</Text>
                  </View>
                </View>

                <Text style={{marginTop:60,fontSize:18}}>댓글</Text>
                <View style={{width:40,borderWidth:0.5,marginTop:5}}></View>

                <View></View>

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

const PlusItem = (prop) =>{
  return(
    <View>
               <View style={{flexDirection:'row',marginTop:15,marginLeft:15}}>
                  <Text style={{fontSize:16}}>{prop.name}</Text>
                  <Text style={{position:'absolute', left:150}}>{prop.num}</Text>
                </View>
                <View style={{width:chartWidth-60,borderWidth:0.5,borderColor:'#b3b3b3',marginTop:10}}></View>
    </View>
  )
}


export default CurrentPlus;
