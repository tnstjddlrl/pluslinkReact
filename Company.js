import React, { useState, Component, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;


const starimg = require('./img/review.png')
const comImg = require('./img/14.png')
const comImg2 = require('./img/123.png')
const maker = require('./img/main_marker.png')

import { useNavigation } from '@react-navigation/native'; //네비게이션 프롭을 다른 페이지에서 받지않고도 이 페이지에서 단독으로 네비게이션을 사용할 수 있는 도구
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

//prop(아무 변수이름)으로 App에서 Company를 생성할때 넣어준 값을 받아올 수 있다.
//네비게이터로 화면을 넘겨올때 값을 받을 때는 route를 사용해야한다.

function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
  function deg2rad(deg) { return deg * (Math.PI / 180) }
  
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1); // deg2rad below
  var dLon = deg2rad(lng2 - lng1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  var d = R * c; // Distance in km 
  return d; 
}

const Company = (prop) => {
  const [newid, setNewid] = useState('');

  const [lat,setLat] = useState('')
  const [lng,setLng] = useState('') //좌표값

  const navigation = useNavigation()



  async function isFavorite() {
    try {
      return await AsyncStorage.getItem("@super:id");
    } catch (error) {
      return false;
    }
  } //아이디값 가져오기

  useEffect(() => {
    navigation.navigate('로딩')

    const result = isFavorite().then((company_id) => {
      if(company_id == null){
        setNewid('')
      }else{
        setNewid(company_id.toLowerCase());
        console.log('새 : ', company_id);
        console.log('새새 : '+newid)
      }
    });
    getGeo()
  }, [])


  function refresh(){
    for(var i = 0;i<20;i++){
      isFavorite().then((company_id) => {
        setNewid(company_id.toLowerCase())
      });
      console.log(newid)
    }
  }

  function getGeo(){
   
    if(newid == '로그인해주세요' || newid == ''){
    }else{
      for(var i = 0;i<useraddress.length;i++){
        if(useraddress[i].mb_id == newid){
          setLng(useraddress[i].lng)
          setLat(useraddress[i].lat)
          break
        }
      }
    }
    
  }


  const unsubscribe = navigation.addListener('focus', () => {
    refresh();
    getGeo()
  });
  useEffect(() => {
    return () => unsubscribe();
  });
    

  async function GetExpertise() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/expertise.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetExpertise_ena() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/expertise_enable.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetPatners() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/partners.json');
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
  async function GetUserAddress() {
    try {
      console.log('겟멤버 작동됨')
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/user_address.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }

  const [patners, setPatners] = useState([])
  const [expertise, setExpertise] = useState([])
  const [expertise_ena, setExpertise_ena] = useState([])
  const [memberList, setMemberList] = useState([])
  const [useraddress, setUseraddress] = useState([])
  useEffect(() => {
    if (expertise.length == 0) {
      GetExpertise().then((res) => {
        setExpertise(res.data)
      })
    }
    if (expertise_ena.length == 0) {
      GetExpertise_ena().then((res) => {
        setExpertise_ena(res.data)
      })
    }
    if (patners.length == 0) {
      GetPatners().then((res) => {
        setPatners(res.data)
      })
    }
    if (memberList.length == 0) {
      GetMember().then((res) => {
        setMemberList(res.data)
      })
    }
    if (useraddress.length == 0) {
      GetUserAddress().then((res) => {
        setUseraddress(res.data)
      })
    }
  })


  var List = []
  var cate = []
  var count = 0;
  const [menu, setMenu] = useState('전기&조명')

  if (menu != prop.menu) {
    cate = [];
    setMenu(prop.menu)
    count = 0
    console.log(menu)
  }


  for (var i = 0; i < expertise.length; i++) {
    if (expertise[i].category == menu && expertise[i].state == '정상') {
      cate.push(expertise[i].mb_id)
    }
  }

  const set = new Set(cate);
  cate = [...set];

  // console.log('중복체크  ', cate)
  // console.log('이상체크 : ', memberList[5])

  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < memberList.length; j++) {
      if (cate[i] == memberList[j].mb_id) {
        for (var x = 0; x < patners.length; x++) {
          if (cate[i] == patners[x].mb_id && count < 4 && patners[x].pt_state == '승인') {
            if (lng != '' || lat != '') {
              var km = String(getDistanceFromLatLonInKm(lat, lng, patners[x].pt_lat, patners[x].pt_lng))
              km = km.split('.')
              if (km[0] < 50) {
                List.push(<Item id={cate[i]} addr1={patners[x].pt_addr1} addr2={patners[x].pt_addr2} name={patners[x].pt_name} content={memberList[j].mb_profile.replace(/\r\n/g, '')} star={patners[x].pt_score}></Item>)
                count += 1
                console.log('작동체크')
              }
            }else{
              List.push(<Item id={cate[i]} addr1={patners[x].pt_addr1} addr2={patners[x].pt_addr2} name={patners[x].pt_name} content={memberList[j].mb_profile.replace(/\r\n/g, '')} star={patners[x].pt_score}></Item>)
              count += 1
              console.log('작동체크')
            }
          }
        }
      }
    }
  }


  if (List.length == 0) {
    List.push(<NoItem></NoItem>)
  }
  return List
}


const marker = require('./img/marker.png')

const Item = (prop) => {
  const navigation = useNavigation()

  async function Getexamp() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_example.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }

  const [examp, setExamp] = useState([]);

  useEffect(() => {
    if (examp.length == 0) {
      Getexamp().then((res) => {
        setExamp(res.data)
      })
    }
  })

  var nc = 0
  for (var i = 0; i < examp.length; i++) {
    if (examp[i].mb_id == prop.id) {
      nc += 1
    }
  }




  return (
    <View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('회사자세히보기', { id: prop.id })}>
        <View style={{ width: chartWidth - 20, backgroundColor: '#f2f2f2', borderRadius: 10, marginLeft: 10, marginRight: 20, marginTop: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: 'https://pluslink.kr/data/member_image/' + prop.id.substring(0, 2) + '/' + prop.id + '.gif' }} style={{ marginLeft: 15, marginTop: 15, borderRadius: 28, width: 55, height: 55, backgroundColor: 'gray' }}></Image>
              <Text style={{ fontWeight: 'bold', fontSize: 17, marginLeft: 15, marginTop: 15 }}>{prop.name}</Text>
            </View>
          </View>
          <Text style={{ margin: 5,marginLeft:15,fontSize:13 }}>시공사례 {nc}건</Text>
          <Text style={{ margin: 15,fontSize:16 }} numberOfLines={3}>{prop.content}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 15 }}>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={marker} style={{ width: 20, height: 20 }}></Image>
              <Text style={{ marginRight: 5,color:'gray' }}>{prop.addr1}</Text>
              <Text style={{color:'gray'}}>{prop.addr2}</Text>
            </View>

            <View style={{ flexDirection: "row",alignItems:"center" }}>
              <Image source={starimg} style={{ width: 20, height: 20 }}></Image>
              <Text>{prop.star}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const NoItem = (prop) => {
  return (
    <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
      <Text>주변 업체가 없습니다.</Text>
    </View>
  )
}



export default Company;