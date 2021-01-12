import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';

const EventList = () =>{
  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>이벤트</Text>
                      </View>
              <View style={{marginTop:30,marginLeft:15}}>
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

const ListItem = () => {
  return(
              <View style={{width:chartWidth-40}}>
                <View style={{borderWidth:0.5,borderColor:'#b3b3b3',}}></View>
                <Text style={{margin:10}}>2020.08.12 [테스트]테스트 이벤트리스트입니다.</Text>
                <View style={{borderWidth:0.5,borderColor:'#b3b3b3',}}></View>
              </View>
  )
}

export default EventList;