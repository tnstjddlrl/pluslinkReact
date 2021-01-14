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

const OneView = () => {
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

            <View style={{flexDirection:'row',alignItems:'center',marginTop:25,marginLeft:20}}>
              <View style={{backgroundColor:'gray',borderRadius:28,width:60,height:60}}></View>
                <Text style={{marginLeft:5,fontSize:18,fontWeight:'bold'}}>테스트 내용입니다.</Text>
            </View>

            <View style={{marginLeft:10,marginTop:10}}>
              <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
                <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
                  <Image source={user} style={{width:10,height:10,}}></Image>
                  <Text style={{fontSize:13}}>test</Text>
                  <Image source={user} style={{width:10,height:10,marginLeft:10}}></Image>
                  <Text style={{fontSize:13}}>01026002569</Text>
                  <Image source={user} style={{width:10,height:10,marginLeft:10}}></Image>
                  <Text style={{fontSize:13}}>test@test.com</Text>
                  <Image source={clock} style={{width:10,height:10 ,marginLeft:10}}></Image>
                  <Text style={{fontSize:13}}>2020.11.10 20:48</Text>
                </View>
              <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
                
            </View>
              
          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

export default OneView;