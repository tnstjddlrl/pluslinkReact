import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')
const starimg = require('./img/review.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";

const ReviewManage = () => {
  const navigation = useNavigation()

  const [newid, setNewid] = useState('');

  async function isFavorite() {
    try {
      return await AsyncStorage.getItem("@super:id");
    } catch (error) {
      return false;
    }
  }



  const unsubscribe = navigation.addListener('focus', () => {
    isFavorite().then((company_id) => {
      setNewid(company_id)
    });
  });
  useEffect(() => {
    return () => unsubscribe();
  });


  const [list, setList] = useState([]);
  const [memberList, setMemberList] = useState([]);

  async function GetJson() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_review.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }

  async function GetMember() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_member.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }

  useEffect(() => {
    if (list.length == 0) {
      GetJson().then((res) => {
        setList(res.data)
        console.log(list)
      })
    }
    if (memberList.length == 0) {
      GetMember().then((res) => {
        setMemberList(res.data)
        console.log(memberList)
      })
    }

    isFavorite().then((company_id) => {
      setNewid(company_id)
    });

  })

  var List = []

  const ItemPush = () => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].mb_id  == newid) {
        for (var j = 0; j < memberList.length; j++) {
          if (list[i].wr_2 == memberList[j].mb_id) {
            List.push(<ListItem date={list[i].wr_datetime} content={list[i].wr_content} id={memberList[j].mb_name} star={list[i].wr_3} detail={list[i].wr_id}></ListItem>)
          }
        }
      }
    }

    if(List.length == 0){
      return(
        <View style={{justifyContent:"center",alignItems:"center"}}>
          <View style={{width:chartWidth-60,height:70,justifyContent:"center",alignItems:"center", borderWidth:0.5,borderColor:'gray',borderRadius:5}}>
            <Text>작성하신 리뷰가 없습니다. 시공을 의뢰하시고 리뷰를 남겨보세요!</Text>
          </View>
        </View>
      )
    }


    return List
  }

  const ListItem = (prop) => {
    const navigation = useNavigation();

    
    var ss = []
    function Starpush(){
      for(var i = 0;i<prop.star;i++){
        ss.push(<Image source={starimg} style={{ width: 15, height: 15 }}></Image>)
      }

      return ss
    }

    return (
      <View style={{ borderWidth: 0.6, borderColor: 'gray', borderRadius: 17, marginTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: chartWidth / 1.15, margin: 15 }}>
          <Text>{prop.id}</Text>
          <View style={{ flexDirection: 'row', right: 0, position: 'absolute' }}>
            <Starpush></Starpush>
          </View>
        </View>
        <Text style={{ marginLeft: 10, marginRight: 10 }} numberOfLines={3}>{prop.content}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('견적자세히보기', { num: prop.detail })}>
            <View style={{ height: 25, backgroundColor: 'black', margin: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white', alignSelf: 'center', margin: 3 }}>견적서보기</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ position: 'absolute', right: 15 }}>{prop.date}</Text>
        </View>
      </View>
    )
  }



  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth }}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={{ marginBottom: 100 }}>
            <View style={{ width: chartWidth, marginTop: 50 }}>
              <ImageBackground source={event} style={{ width: chartWidth, height: chartHeight / 7 }}>
              </ImageBackground>
              <Text style={{ position: 'absolute', color: "white", fontSize: 20, fontWeight: 'bold', top: 40, left: 10 }}>리뷰관리</Text>
            </View>

            <View style={{ margin: 10 }}>

              <ItemPush></ItemPush>
            </View>


          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}




export default ReviewManage;