import React,{useState,useEffect} from 'react';
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
const chartWidth = Dimensions.get('window').width; //현재 창 크기 가져오기

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js"; //푸터 헤더

import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import WebView from 'react-native-webview';

const PnlMall = () => {
  return(
    <WebView style={{height:chartHeight-30,width:chartWidth,marginTop:30}} source={{uri: 'https://pluslink.kr/shop/'}}></WebView>
  )
}

export default PnlMall