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
const starimg =require('./img/review.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';

const ReviewManage = () => {
  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView style={{backgroundColor:'white'}}>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>리뷰관리</Text>
                      </View>

            <View style={{margin:10}}>

              <ListItem></ListItem>
              <ListItem></ListItem>
              <ListItem></ListItem>
              <ListItem></ListItem>

            </View>


          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

const ListItem = () =>{
  return(
    <View style={{borderWidth:0.6,borderColor:'gray',borderRadius:17,marginTop:10}}>
                <View style={{flexDirection:'row',alignItems:'center',width:chartWidth/1.15,margin:15}}>
                  <Text>김업체</Text>
                  <View style={{flexDirection:'row',right:0,position:'absolute'}}>
                      <Image source={starimg} style={{width:15,height:15}}></Image>
                      <Image source={starimg} style={{width:15,height:15}}></Image>
                      <Image source={starimg} style={{width:15,height:15}}></Image>
                      <Image source={starimg} style={{width:15,height:15}}></Image>
                      <Image source={starimg} style={{width:15,height:15}}></Image>
                  </View>
                </View>
                <Text style={{marginLeft:10,marginRight:10}} numberOfLines={3}>거실등이 인테리어랑 맞지 않아서 새로 전등을 교체하려고 하니 셀프로 하기엔 무리가 있었습니다. 견적의뢰하고 다음날 바로 시공진행해서 너무 만족합니다~!</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <View style={{height:25,backgroundColor:'black',margin:10,borderRadius:5}}>
                    <Text style={{color:'white',alignSelf:'center',margin:3}}>견적서보기</Text>
                  </View>
                  <Text style={{position:'absolute', right:15}}>2020-12-22 11:52:51</Text>
                </View>
              </View>
  )
}

export default ReviewManage;