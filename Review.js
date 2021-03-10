import React, { useState, Component, useEffect } from "react";
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

import { useNavigation } from '@react-navigation/native'; //네비게이션 프롭을 다른 페이지에서 받지않고도 이 페이지에서 단독으로 네비게이션을 사용할 수 있는 도구
import axios from "axios";

const image = { uri: "https://pluslink.kr/img/review_bg.jpg" };
const pinimg = require("./img/map_icon.png")
const starimg = require('./img/review.png')
const REview = (prop) => {

  async function GetReview() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_review.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }

  const [ReviewL, setReviewL] = useState([]);
  useEffect(() => {
    if (ReviewL.length == 0) {
      GetReview().then((res) => {
        setReviewL(res.data)
      })
    }
  })

  var List = []
  const PushItem = () => {
    if (ReviewL.length != 0) {
      for (var i = 0; i < ReviewL.length; i++) {
        List.push(<ListItem name={ReviewL[i].wr_name} content={ReviewL[i].wr_content} ptid={ReviewL[i].wr_2} star={ReviewL[i].wr_3} id={ReviewL[i].mb_id}></ListItem>)
      }
    }

    return List
  }


  const StarPush = (prop) => {
    var ss = []

    for (var i = 0; i < prop.star; i++) {
      ss.push(<Image source={starimg} style={{ width: 20, height: 20 }}></Image>)
    }

    return ss
  }


  const ReviewText = (prop) => {
    return (
      <View style={styles.reviewCard}>

        <View >
          <View style={{ width: 130, height: 160, backgroundColor: "#fff", marginLeft: 20, marginRight: 20, borderRadius: 10, marginTop: 60 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image source={{ uri: 'https://pluslink.kr/data/member_image/' + prop.id.substr(0, 2) + '/' + prop.id + '.gif' }} style={{ height: 50, width: 50, borderRadius: 28, marginTop: -20 }}></Image>
            </View>

            <Text style={{ textAlign: 'center', marginTop: 10 }}>{prop.name}</Text>
            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
              <StarPush star={prop.star}></StarPush>
              {/* <Image source={starimg} style={{width:20,height:20}}></Image>
            <Image source={starimg} style={{width:20,height:20}}></Image>s
            <Image source={starimg} style={{width:20,height:20}}></Image>
            <Image source={starimg} style={{width:20,height:20}}></Image>
            <Image source={starimg} style={{width:20,height:20}}></Image>    */}
            </View>



            <Text numberOfLines={4} ellipsizeMode='tail' style={{ margin: 5, height: 70, textAlign: 'center', fontSize: 12,color:'#888',marginTop:10 }}>{prop.content}</Text>
          </View>
        </View>
      </View>
    )
  }

  const ListItem = (prop) => {
    const navigation = useNavigation()
    return (<TouchableOpacity onPress={() => navigation.navigate('회사자세히보기', { id: prop.ptid })}><ReviewText id={prop.id} name={prop.name} content={prop.content} ptid={prop.ptid} star={prop.star}></ReviewText></TouchableOpacity>)
  }

  return (
    <View style={styles.reviewc}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.reviewT}>실시간 리뷰</Text>
        <ScrollView
          // pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={
            () => { console.log('Scrolling is End') }
          }
        >

          <PushItem></PushItem>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}






export default REview;