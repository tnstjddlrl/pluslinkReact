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

import { useNavigation } from '@react-navigation/native'; //네비게이션 프롭을 다른 페이지에서 받지않고도 이 페이지에서 단독으로 네비게이션을 사용할 수 있는 도구
import axios from "axios";

const image = { uri: "https://pluslink.kr/img/review_bg.jpg" };
const pinimg = require("./img/map_icon.png")
const starimg =require('./img/review.png')
const REview =(prop)=>{

  async function GetReview() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_review.json');
    } catch (error) {
      console.log('에러 : ',error)
      return false;
    }
  }

  const [ReviewL,setReviewL] = useState([]);
  useEffect(()=>{
    if(ReviewL.length==0){
      GetReview().then((res)=>{
        setReviewL(res.data)
      })
    }
  })

  var List = []
  const PushItem = () => {
    if(ReviewL.length!=0){
      for(var i = 0;i<ReviewL.length; i++){
        List.push(<ListItem name={ReviewL[i].wr_name} content={ReviewL[i].wr_content} ptid={ReviewL[i].wr_2}></ListItem>)
      }
    }

    return List
  }

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
              
              <PushItem></PushItem>
            </ScrollView>
            </ImageBackground>
    </View>
  )
}

const ListItem = (prop) => {
  const navigation = useNavigation()
  return(<TouchableOpacity onPress={()=>navigation.navigate('회사자세히보기',{id:prop.ptid})}><View style={styles.reviewCard}><ReviewText name={prop.name} content={prop.content} ptid={prop.ptid}></ReviewText><Image source={pinimg} style={{position:'absolute',top:50,left:75}}></Image></View></TouchableOpacity>)
}


const ReviewText=(prop)=>{
  return (
    <View>
        <View style={{width:130,height:160,backgroundColor:"#fff",marginTop:60,marginLeft:20,marginRight:20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,}}>
          <Text style={{top:40,textAlign:'center'}}>{prop.name}</Text>
          <View style={{position:'absolute',flexDirection:'row',top:60,left:15}}>
            <Image source={starimg} style={{width:20,height:20}}></Image>
            <Image source={starimg} style={{width:20,height:20}}></Image>
            <Image source={starimg} style={{width:20,height:20}}></Image>
            <Image source={starimg} style={{width:20,height:20}}></Image>
            <Image source={starimg} style={{width:20,height:20}}></Image>   
          </View>
          
        
          <Text numberOfLines={4} ellipsizeMode='tail' style={{top:60,margin:5,height:70,textAlign:'center',fontSize:12}}>{prop.content}</Text>
        </View>
    </View>
  )
}

export default REview;