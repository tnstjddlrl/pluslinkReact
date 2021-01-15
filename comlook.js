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
import { useNavigation } from '@react-navigation/native';
import ComSigong from './Component1.js'
import TestCom from './Component0.js';
import FootTer from './footer.js'
import HeadHeder from "./header.js";


const logo = { uri: "https://pluslink.kr/img/pluslink/logo.png" };
const logo2 = { uri: "https://pluslink.kr/img/menu.png" };
const testlogo = require('./img/logo.png')
const ffimg =require('./img/b01.png')
const ffimg2 =require('./img/b02.png')
const ffimg3 =require('./img/b03.png')
const ffimg4 =require('./img/b04.png')

//=========================업체 자세히보기=============================
const ComLook=({route})=>{
    const navigation = useNavigation();

    

    return(
      <View>
      <View style={{height:chartHeight}}>
            <ScrollView style={{height:chartHeight-80,marginTop:60,}}>
              <View style={{margin:20,}}>
                <TestCom comname={route.params.name}></TestCom>
                <View style={{marginTop:10}}>
                <View style = {
                  {
                    "backgroundColor": "rgba(222, 218, 218, 255)",
                    "width": 412,
                    "height": 1
                    
                  }
                  }
                />
                </View>
                    
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
                height={340}
              >
                <ComSigong></ComSigong><ComSigong></ComSigong><ComSigong></ComSigong><ComSigong></ComSigong>
              </ScrollView>
              <View style={{marginBottom:100, alignItems:'center'}}>
              <View style = {
            {
              "alignItems": "flex-start"
            }
          } >
          <TouchableOpacity onPress={()=>navigation.navigate('지정의뢰')}>
          <View style = {
            {
              "alignItems": "flex-start",
              "paddingStart": 114,
              "paddingTop": 9,
              "width": 350,
              "height": 46,
              "borderRadius": 11,
              "backgroundColor": "rgba(71, 67, 55, 255)"
            }
          } >
          <Text style = {
            {
              "fontSize": 20,
              "color": "rgba(255, 255, 255, 255)"
            }
          } > 견적의뢰하기 </Text>
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
  
  export default ComLook;
  
  //=====================================================================