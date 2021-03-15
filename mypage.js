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
  Linking
} from "react-native";
import { useNavigation } from '@react-navigation/native';
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import FootTer from './footer.js'
import HeadHeder from "./header.js";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const mt_b = require('./img/mt_b.jpg')
const arrow = require('./img/arrow02.png')

const Mypage = () => {

  function refreshData(tableName) {
    axios.post('http://ip0131.cafe24.com/pluslink/json/jsonMember.php', JSON.stringify({
      id: tableName,
    }))
      .then(function (response) {
        console.log('리스폰스 ', response);
        if (response.request._response == 'suc') {
        }
        else {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    refreshData('g5_faq_master')
    refreshData('g5_faq')
    refreshData('bidding')
    refreshData('expertise')
    refreshData('g5_member')
    refreshData('g5_qa_content')
    refreshData('g5_write_estimate')
    refreshData('g5_write_event')
    refreshData('g5_write_example')
    refreshData('g5_write_review')
    refreshData('g5_write_notice')
    refreshData('partners')
    refreshData('estimate_pay')
  }, [])

  const navigation = useNavigation();

  const fetchUser = async () => {
    AsyncStorage.setItem(
      '@super:id',
      '로그인해주세요'
    );
  }

  const [newid, setNewid] = useState('');

  async function isFavorite() {
    try {
      return await AsyncStorage.getItem("@super:id");
    } catch (error) {
      return false;
    }
  }


  let os = Platform.OS
  console.log(os)
  let nowheight;
  if (os == 'ios') {
    nowheight = 80;
  } else {
    nowheight = 50;
  }

  async function GetMember() {
    try {
      console.log('겟멤버 작동됨')
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_member.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }

  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    if (memberList.length == 0) {
      console.log('작동테스트')
      GetMember().then((res) => {
        setMemberList(res.data)
      })
    }
  })

  const [name, setName] = useState('')
  useEffect(() => {
    const result = isFavorite().then((company_id) => {
      setNewid(company_id.toLowerCase())
    });
    for (var i = 0; i < memberList.length; i++) {
      if (memberList[i].mb_id == newid) {
        setName(memberList[i].mb_name)
        break
      } else {
        setName(newid)
      }
    }
  })

  const [ispng, setIspng] = useState(false)
  const userplus = require('./img/contact.png')

  
  const unsubscribe = navigation.addListener('focus', () => {
    setTimeout(() => {
      setIspng(false)
    }, 300);
  });
  useEffect(() => {
    return () => unsubscribe();
  });


  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth }}>
        <View style={{ top: nowheight, backgroundColor: 'white' }}>
          <ScrollView>
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, backgroundColor: 'white', height: chartHeight }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.navigate('마이포토')}>
                  <View style={{ borderWidth: 1, height: 60, width: 60, borderRadius: 27, backgroundColor: 'rgb(216,216,216)', justifyContent: "center", alignItems: "center" }}>
                    {ispng ? <Image source={userplus} style={{ width: 35, height: 40, borderRadius: 0, justifyContent: "center", alignItems: "center" }}></Image> :
                      <Image style={{ height: 60, width: 60, borderRadius: 27, }} source={{ uri: 'https://pluslink.kr/data/member_image/' + newid.substr(0, 2) + '/' + newid + '.gif' }} onError={() => setIspng(true)}></Image>
                    }
                  </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginLeft: 10 }}>{name}</Text>
              </View>

              <View style={{ width: chartWidth - 40, borderWidth: 0.5, marginBottom: 5, marginTop: 10 }}></View>
              <View style={{ flexDirection: "row", alignItems: "center", }}>
                <View style={{ flexDirection: "row", left: 10, width: chartWidth - 70, justifyContent: 'space-between' }}>
                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate('정보변경')}>
                      <Text>정보변경</Text>
                    </TouchableOpacity>
                  </View>


                  <View>
                    <View style={{height:10,}}></View>
                    <TouchableOpacity onPress={() => navigation.navigate('취약계층인증',{name:name})}>
                      <Text>취약계층인증</Text>
                    </TouchableOpacity> 
                  </View>


                  <View>
                    <TouchableOpacity onPress={() => { navigation.navigate('홈'), fetchUser('로그인해주세요') }}>
                      <Text>로그아웃</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
              <View style={{ width: chartWidth - 40, borderWidth: 0.5, marginBottom: 5, marginTop: 10 }}></View>


              <View style={{ marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('견적현황')}>
                  <View style={{ marginLeft: 10, marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 20 }}>견적현황</Text>
                    <Image source={arrow} style={{ position: 'absolute', right: 20,width:8,height:15 }}></Image>
                  </View>
                  <View style={{ width: chartWidth - 40, borderWidth: 0.3, marginBottom: 5, marginTop: 10, borderColor: '#DBDBDB' }}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('결제관리')}>
                  <View style={{ marginLeft: 10, marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 20 }}>결제관리</Text>
                    <Image source={arrow} style={{ position: 'absolute', right: 20,width:8,height:15 }}></Image>
                  </View>
                  <View style={{ width: chartWidth - 40, borderWidth: 0.3, marginBottom: 5, marginTop: 10, borderColor: '#DBDBDB' }}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('리뷰관리')}>
                  <View style={{ marginLeft: 10, marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 20 }}>리뷰관리</Text>
                    <Image source={arrow} style={{ position: 'absolute', right: 20,width:8,height:15 }}></Image>
                  </View>
                  <View style={{ width: chartWidth - 40, borderWidth: 0.3, marginBottom: 5, marginTop: 10, borderColor: '#DBDBDB' }}></View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('공지사항')}>
                  <View style={{ marginLeft: 10, marginTop: 30, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 20 }}>공지사항</Text>
                    <Image source={arrow} style={{ position: 'absolute', right: 20,width:8,height:15 }}></Image>
                  </View>
                  <View style={{ width: chartWidth - 40, borderWidth: 0.3, marginBottom: 5, marginTop: 10, borderColor: '#DBDBDB' }}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('이벤트목록')}>
                  <View style={{ marginLeft: 10, marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 20 }}>이벤트</Text>
                    <Image source={arrow} style={{ position: 'absolute', right: 20,width:8,height:15 }}></Image>
                  </View>
                  <View style={{ width: chartWidth - 40, borderWidth: 0.3, marginBottom: 5, marginTop: 10, borderColor: '#DBDBDB' }}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('1대1문의')}>
                  <View style={{ marginLeft: 10, marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 20 }}>1:1문의</Text>
                    <Image source={arrow} style={{ position: 'absolute', right: 20,width:8,height:15 }}></Image>
                  </View>
                  <View style={{ width: chartWidth - 40, borderWidth: 0.3, marginBottom: 5, marginTop: 10, borderColor: '#DBDBDB' }}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('자주묻는질문')}>
                  <View style={{ marginLeft: 10, marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 20 }}>자주묻는질문</Text>
                    <Image source={arrow} style={{ position: 'absolute', right: 20,width:8,height:15 }}></Image>
                  </View>
                  <View style={{ width: chartWidth - 40, borderWidth: 0.3, marginBottom: 5, marginTop: 10, borderColor: '#DBDBDB' }}></View>
                </TouchableOpacity>


              </View>
              <TouchableWithoutFeedback onPress={() => { Linking.openURL('https://pluslink.kr/shop/') }}>
                <Image style={{ width: chartWidth - 40, height: 120, marginBottom: 100 }} source={{ uri: 'https://pluslink.kr/img/pluslink/mt_b.jpg' }}></Image>
              </TouchableWithoutFeedback>

            </View>
          </ScrollView>
        </View>



      </View>
      <HeadHeder></HeadHeder>
      <FootTer></FootTer>
    </View>
  )
}

export default Mypage