import React,{useState,Component,useEffect} from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';


const logo = { uri: "https://pluslink.kr/img/pluslink/logo.png" };
const logo2 = { uri: "https://pluslink.kr/img/menu.png" };
const testlogo = require('./img/logo.png')

const HeadHeder = () => {
    const navigation = useNavigation();
  return (
    <View style={{flex:1}}>
        <View style={{borderWidth:1,position:'absolute',width:chartWidth+15,left:-2,bottom:(chartHeight/1.08),height:60,flexDirection: 'row',backgroundColor:'white'}}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.dispatch(DrawerActions.openDrawer());}} style={{top:10,left:10}}>
                <Image
                  source={logo2}
                  style={{width:40,height:35}}
                />
            </TouchableOpacity>
            <View style={{left:chartWidth/3,height:30,width:40}}>
            <TouchableOpacity onPress={() => navigation.navigate('홈')}>
              <Image source={testlogo} style={{width:40,height:34,marginTop:10,}}>
              </Image>
            </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={() => navigation.navigate('로그인')}>
            <View style={{left:chartWidth/1.8,top:10,width:75,height:35,backgroundColor:'#b84dff',
                  borderTopLeftRadius: 17,
                  borderTopRightRadius: 17,
                  borderBottomLeftRadius:17,
                  borderBottomRightRadius:17,}}>
              <Text style={{width:65,height:70,marginLeft:10,marginTop:8,color:'white', fontWeight:'bold'}}>
                PnL Mall
              </Text>
            </View>
            </TouchableOpacity>
        </View>
      </View>
   
  );
};

export default HeadHeder;