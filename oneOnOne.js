import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";

const user = require('./img/user.png')
const clock = require('./img/clock.png')

const OneonOne = () => {

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
  refreshData('g5_qa_content')
  const navigation = useNavigation();

  const [newid, setNewid] = useState('');

  async function isFavorite() {
    try {
      return await AsyncStorage.getItem("@super:id");
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }

  const result = isFavorite().then((company_id) => {
    setNewid(company_id)
  });

  const [OneList, setOneList] = useState([]);

  async function GetJson() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_qa_content.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }

  useEffect(() => {
    if (OneList.length == 0) {
      GetJson().then((res) => {
        setOneList(res.data)
      })
    }
  })

  var pushlist = []
  const ItemPush = () => {
    if (OneList.length != 0) {
      console.log('1대1문의 숫자 : ', OneList.length)
      for (let i = 0; i < OneList.length; i++) {
        if (OneList[i].mb_id.toLowerCase() == newid.toLowerCase() && OneList[i].qa_subject.indexOf(text) != -1) {
          var date = OneList[i].qa_datetime
          date = date.substring(0, 10)
          if (OneList[i].qa_status == '1') {
            var status = '완료'
            pushlist.push(<ListItem title={OneList[i].qa_subject} id={OneList[i].qa_id} name={OneList[i].mb_id} cate={OneList[i].qa_category} status={status} date={date}></ListItem>)
          } else {
            var status = '대기'
            pushlist.push(<ListItem title={OneList[i].qa_subject} id={OneList[i].qa_id} name={OneList[i].mb_id} cate={OneList[i].qa_category} status={status} date={date}></ListItem>)
          }
        }
      }
    }

    return pushlist
  }

  const find = require('./img/find.png')
  const [text,setText] = useState('') //검색창용

  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth }}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={{ marginBottom: 100 }}>
            <View style={{ width: chartWidth, marginTop: 50 }}>
              <ImageBackground source={event} style={{ width: chartWidth, height: chartHeight / 7 }}>
              </ImageBackground>
              <Text style={{ position: 'absolute', color: "white", fontSize: 20, fontWeight: 'bold', top: 40, left: 10 }}>1대1문의</Text>
            </View>

            <View style={{ margin: 10 }}>
              <View style={{ borderWidth: 1, width: chartWidth - 20, height: 60, justifyContent: "center", backgroundColor: 'rgb(249,249,249)',borderColor:'rgb(216,216,216)' }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', width: chartWidth - 40, marginLeft: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: 30, height: 30, backgroundColor: 'rgb(235,235,235)', borderTopWidth: 1, borderBottomWidth: 1, borderLeftWidth: 1, justifyContent: "center", alignItems: "center",borderColor:'rgb(216,216,216)' }}>
                      <Image style={{ width: 20, height: 20 }} source={find}></Image>
                    </View>
                    <View style={{ width: chartWidth / 2.3, height: 30, borderWidth: 1,borderColor:'rgb(216,216,216)' }}>
                      <TextInput onChangeText={(txt) => setText(txt)} value={text} style={{ width: chartWidth / 2.3, height: 40 }}></TextInput>
                    </View>
                  </View>
                  <View style={{ height: 30, width: chartWidth / 3, backgroundColor: 'black', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>검색하기</Text>
                  </View>
                </View>
              </View>
            </View>



            <View style={{ margin: 15 }}>
              <View style={{ width: chartWidth - 30, borderWidth: 1 }}></View>
              <View style={{ flexDirection: 'row', margin: 15 }}>
                <Text>답변</Text>
                <View style={{ height: 15, borderWidth: 0.3, marginLeft: 20 }}></View>
                <Text style={{ position: 'absolute', left: chartWidth / 2 }}>제목</Text>
              </View>
              <View style={{ width: chartWidth - 30, borderWidth: 0.4 }}></View>


              <ItemPush></ItemPush>

              <TouchableOpacity onPress={() => navigation.navigate('1대1문의쓰기')}>
                <View style={{ width: 70, height: 30, backgroundColor: '#db4dff', marginTop: 15 }}>
                  <Text style={{ color: 'white', margin: 5, marginLeft: 15, fontWeight: '900' }}>글쓰기</Text>
                </View>
              </TouchableOpacity>

            </View>


          </View>
        </ScrollView>


      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>


    </View>
  )
}

const ListItem = (prop) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('1대1문의보기', { id: prop.id })}>
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <Text style={{ margin: 15 }}>{prop.status}</Text>
          <View style={{ left: chartWidth / 5, position: 'absolute', marginTop: 5 }}>
            <Text>[{prop.cate}] {prop.title}</Text>
            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
              <Image source={user} style={{ width: 10, height: 10 }}></Image>
              <Text>{prop.name}</Text>
              <Image source={clock} style={{ width: 10, height: 10, marginLeft: 20 }}></Image>
              <Text>{prop.date}</Text>
            </View>
          </View>
        </View>
        <View style={{ width: chartWidth - 30, borderWidth: 0.8, marginTop: 5,borderColor:'rgb(216,216,216)' }}></View>
      </TouchableOpacity>
    </View>
  )
}

export default OneonOne;