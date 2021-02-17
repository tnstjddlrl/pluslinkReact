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
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import AsyncStorage from '@react-native-community/async-storage'; //로그인한 아이디값 저장하기 위한 앱 내부 저장소
import axios from "axios";

import { useNavigation } from '@react-navigation/native';


const GongziPlus = ({route}) => {

  const [OneList,setOneList] = useState([]);

    async function GetJson() {
      try {
        return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_notice.json');
      } catch (error) {
        console.log('에러 : ',error)
        return false;
      }
    }

    useEffect(()=>{
      if(OneList.length==0){
        GetJson().then((res)=>{
        setOneList(res.data)
        console.log(list)
        })
      }
    })

  var pp = []
  const PushItem = () => {
    for (var i = 0; i < OneList.length; i++) {
      if (OneList[i].wr_id == route.params.id) {
        pp.push(<Mitem time={OneList[i].wr_datetime.substring(0, 10)} title={OneList[i].wr_subject} user={OneList[i].wr_name} chat={OneList[i].wr_comment} content={OneList[i].wr_content}></Mitem>)
        return pp
      }
    }
    return pp
  }

  var ee = []
  const SPush = () => {
    for (var i = 0; i < OneList.length; i++) {
      if(OneList[i].wr_is_comment == 1 && OneList[i].wr_parent == route.params.id){
        ee.push(<SmallText name={OneList[i].wr_name} id={OneList[i].mb_id} date={OneList[i].wr_datetime} content={OneList[i].wr_comment}></SmallText>)
      }
    }
    return ee
  }

  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth }}>
        <ScrollView>
          <View style={{ marginBottom: 500 }}>
            <View style={{ width: chartWidth, marginTop: 50 }}>
              <ImageBackground source={event} style={{ width: chartWidth, height: chartHeight / 7 }}>
              </ImageBackground>
              <Text style={{ position: 'absolute', color: "white", fontSize: 20, fontWeight: 'bold', top: 40, left: 10 }}>공지사항</Text>
            </View>

            <PushItem></PushItem>


            <ScrollView horizontal={true} style={{marginTop:100}}>
              <SPush></SPush>

            </ScrollView>


          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

const SmallText = (prop) => {
  return (
    <View style={{ marginLeft: 10, borderWidth: 0.5, borderRadius: 5, borderColor: 'gray' }}>
      <View style={{ margin: 5 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold' }}>{prop.name}</Text>
          <Text style={{ fontWeight: '100' }}>({prop.id})</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Image source={clock} style={{ width: 10, height: 10 }}></Image>
          <Text style={{ fontSize: 9, color: 'gray' }}>{prop.date}</Text>
        </View>

        <Text style={{ marginTop: 10, width: chartWidth / 2.0 }}>{prop.content}</Text>
      </View>
    </View>
  )
}

const clock = require('./img/clock2.png')
const user = require('./img/user.png')
const chat = require('./img/chat.png')

const Mitem = (prop) => {
  return (
    <View>
      <Text style={{ fontSize: 22, marginLeft: 10, marginTop: 10, fontWeight: 'bold' }} numberOfLines={1}>{prop.title}</Text>

      <View style={{ marginLeft: 10, marginTop: 20 }}>
        <View style={{ borderWidth: 0.5, width: chartWidth - 20, }}></View>
        <View style={{ flexDirection: 'row', backgroundColor: '#e6e6e6', width: chartWidth - 20, height: 30, alignItems: "center" }}>

          <Image source={user} style={{ width: 20, height: 20 }}></Image>
          <Text style={{ fontSize: 15 }}>{prop.user}</Text>

          <Image source={chat} style={{ width: 15, height: 15, marginLeft: 15,marginRight:5 }}></Image>
          <Text style={{ fontSize: 15 }}>{prop.chat}</Text>

          <Image source={clock} style={{ width: 20, height: 20, marginLeft: 15 }}></Image>
          <Text style={{ fontSize: 15 }}>{prop.time}</Text>

        </View>
        <View style={{ borderWidth: 0.5, width: chartWidth - 20 }}></View>
      </View>

      <Text style={{margin:10}}>{prop.content}</Text>

      


    </View>
  )
}

export default GongziPlus;