import React,{useState,Component,useEffect} from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'
import { useNavigation } from '@react-navigation/native';


const ffimg =require('./img/b01.png')
const ffimg2 =require('./img/b02.png')
const ffimg3 =require('./img/b03.png')
const ffimg4 =require('./img/b04.png')
const FootTer = () => {
  const navigation = useNavigation(); //////////////////////////////////////////////////////////////////////////성공!
  return (
   
    <View style={{flex:1}}>
        <View style={{borderWidth:1,position:'absolute',bottom:0,flexDirection: 'row',}}>
        <TouchableOpacity onPress={() => navigation.navigate('홈')}>
        <View style={{backgroundColor:'white'}}>
          <ImageBackground source={ffimg} style={{width:65,height:65,marginLeft:30}}>
          </ImageBackground>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('견적의뢰')}>
        <View style={{backgroundColor:'white'}}>
          <ImageBackground source={ffimg2} style={{width:65,height:65,marginLeft:20,marginRight:10}}>
          </ImageBackground>
        </View>
        </TouchableOpacity >
        <TouchableOpacity onPress={() => navigation.navigate('견적현황')}>
        <View style={{backgroundColor:'white'}}>
          <ImageBackground source={ffimg3} style={{width:65,height:65,marginLeft:20,marginRight:10}}>
          </ImageBackground>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('마이페이지')}>
        <View style={{backgroundColor:'white'}}>
          <ImageBackground source={ffimg4} style={{width:65,height:65,marginLeft:20,marginRight:40}}>
          </ImageBackground>
        </View>
        </TouchableOpacity>

        </View>
    </View>
    
   
  );
};

export default FootTer;