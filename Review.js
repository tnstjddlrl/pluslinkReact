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
import REquset from "./Requset.js";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'

const image = { uri: "https://pluslink.kr/img/review_bg.jpg" };
const pinimg = require("./img/map_icon.png")
const starimg =require('./img/review.png')
const REview =(prop)=>{
  return(
    <View style={styles.reviewc}>
      <ImageBackground source={image} style={styles.image}>
      <Text style={styles.reviewT}>실시간 리뷰</Text>
      <ScrollView
                // pagingEnabled={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd ={
                    () => {console.log('Scrolling is End')}
                }
            >
              <View style={styles.reviewCard}><ReviewText></ReviewText><Image source={pinimg} style={{position:'absolute',top:50,left:75}}></Image></View>
              <View style={styles.reviewCard}><ReviewText></ReviewText><Image source={pinimg} style={{position:'absolute',top:50,left:75}}></Image></View>
              <View style={styles.reviewCard}><ReviewText></ReviewText><Image source={pinimg} style={{position:'absolute',top:50,left:75}}></Image></View>
              <View style={styles.reviewCard}><ReviewText></ReviewText><Image source={pinimg} style={{position:'absolute',top:50,left:75}}></Image></View>
              <View style={styles.reviewCard}><ReviewText></ReviewText><Image source={pinimg} style={{position:'absolute',top:50,left:75}}></Image></View>
            </ScrollView>
            </ImageBackground>
    </View>
  )
}

const ReviewText=(prop)=>{
  return (
    <View style={{width:130,height:160,backgroundColor:"#fff",marginTop:60,marginLeft:20,marginRight:20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,}}>
      <Text style={{top:40,textAlign:'center'}}>테스트리뷰</Text>
      <View style={{position:'absolute',flexDirection:'row',top:60,left:15}}>
        <Image source={starimg} style={{width:20,height:20}}></Image>
        <Image source={starimg} style={{width:20,height:20}}></Image>
        <Image source={starimg} style={{width:20,height:20}}></Image>
        <Image source={starimg} style={{width:20,height:20}}></Image>
        <Image source={starimg} style={{width:20,height:20}}></Image>   
      </View>
      
    
      <Text numberOfLines={4} ellipsizeMode='tail' style={{top:60,margin:5,height:70,textAlign:'center',fontSize:12}}>리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.리뷰내용입니다.</Text>
    </View>
  )
}

export default REview;