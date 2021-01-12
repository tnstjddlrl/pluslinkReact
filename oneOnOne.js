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

const user = require('./img/user.png')
const clock = require('./img/clock.png')

const OneonOne = () => {
    const navigation = useNavigation();
    return(
        <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>1대1문의</Text>
                      </View>

            <View style={{margin:15}}>
                <View style={{width:chartWidth-30,borderWidth:1}}></View>
                <View style={{flexDirection:'row',margin:15}}>
                    <Text>답변</Text>
                    <View style={{height:15,borderWidth:0.3,marginLeft:20}}></View>
                    <Text style={{position:'absolute', left:chartWidth/2}}>제목</Text>
                </View>
                <View style={{width:chartWidth-30,borderWidth:0.4}}></View>


                <OneList></OneList>
                <OneList></OneList>
                <OneList></OneList>
                
                <TouchableOpacity onPress={()=>navigation.navigate('1대1문의쓰기')}>
                    <View style={{width:70,height:30,backgroundColor:'#db4dff',marginTop:15}}>
                        <Text style={{color:'white',margin:5,marginLeft:15,fontWeight:'900'}}>글쓰기</Text>
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

const OneList = () =>{
    return(
        <View>
                    <TouchableOpacity>
                    <View style={{flexDirection:'row',alignContent:'center'}}>
                        <Text style={{margin:15}}>완료</Text>
                        <View style={{left:chartWidth/5,position:'absolute',marginTop:5}}>
                            <Text>[회원] 테스트 문의입니다.</Text>
                            <View style={{flexDirection:'row', marginTop:5,alignItems:'center'}}>
                                <Image source={user} style={{width:10,height:10}}></Image>
                                <Text>test</Text>
                                <Image source={clock} style={{width:10,height:10,marginLeft:20}}></Image>
                                <Text>2020.11.10</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{width:chartWidth-60,borderWidth:0.3,marginTop:5}}></View>
                    </TouchableOpacity>
        </View>
    )
}

export default OneonOne;