import React,{useState,Component,useEffect} from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'

import Swiper from 'react-native-swiper'
const Banimg =require('./img/banner.png')
const Banimg2 =require('./img/banner2.png')
const Banimg3 =require('./img/banner3.png')

const Banner = ()=>{
  return(
    // 스와이퍼 오픈소스를 활용하여 메인 배너 구성, 구성 요소는 ImageBackground로 구성한다.
    <Swiper style={styles.wrapper} showsButtons={true} autoplay={true}>
        <View style={styles.slide1}>
        <ImageBackground source={Banimg} style={styles.bannerimg}>
        </ImageBackground>
        </View>
        <View style={styles.slide1}>
        <ImageBackground source={Banimg2} style={styles.bannerimg}>
        </ImageBackground>
        </View>
        <View style={styles.slide1}>
        <ImageBackground source={Banimg3} style={styles.bannerimg}>
        </ImageBackground>
        </View>
      </Swiper>
  );
}

export default Banner;