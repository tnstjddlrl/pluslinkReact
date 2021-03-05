import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Alert
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const OneWrite = () => {
  const [select, setSelect] = useState(false)
  const [listCate, SetlistCate] = useState("선택하세요")

  const [response, setResponse] = React.useState(null);//사진
  const [response2, setResponse2] = React.useState(null);//사진

  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [newid, setNewid] = useState('');
  const [nick, setNick] = useState('')



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
    if (memberList.length != 0) {
      for (var i = 0; i < memberList.length; i++) {
        if (memberList[i].mb_id == newid.toLowerCase()) {
          setEmail(memberList[i].mb_email)
          setHp(memberList[i].mb_hp)
          setNick(memberList[i].mb_nick)
        }
      }
    }
  })

  async function isFavorite() {
    try {
      return await AsyncStorage.getItem("@super:id");
    } catch (error) {
      return false;
    }
  }

  const result = isFavorite().then((company_id) => {
    setNewid(company_id)
  });


  function insert() {
    if(listCate=='선택하세요'){
      Alert.alert('문의 항목을 선택하세요!')
      return
    }
    if(title == '' || content =='' ){
      Alert.alert('제목 또는 내용을 모두 입력해주세요!')
      return
    }

    if (response == null) {
      var img = '1'
      var type = '1'
    } else {
      var img = response.base64
      var type = response.type
    }

    if (response2 == null) {
      var img2 = '1'
      var type2 = '1'
    } else {
      var img2 = response2.base64
      var type2 = response2.type
    }

    axios.post('http://ip0131.cafe24.com/pluslink/json/qaInsert.php', JSON.stringify({
      mb_id: newid.toLowerCase(),
      qa_name: nick,
      qa_email: email,
      qa_hp: hp,
      qa_category: listCate,
      qa_subject: title,
      qa_content: content,
      img: img,
      imgtype: type,
      img2: img2,
      imgtype2: type2,
    }))
      .then(function (response) {
        console.log('리스폰스 ', response.request._response);
        if (response.request._response == 'succ') {
          alert('로그인 되었습니다.')
          fetchUser(id)
          console.log(isFavorite());
          navigation.navigate('홈');
        }
        else {
          Alert.alert('1대1문의가 작성되었습니다!')
          navigation.navigate('마이페이지')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const navigation = useNavigation();
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

            <View style={{ margin: 15 }}>
              <View style={{ borderWidth: 0.3, width: chartWidth - 30, borderColor: 'gray', backgroundColor: 'rgb(241,241,241)' }}>
                <Text style={{ margin: 15 }}>글작성</Text>
              </View>

              <TouchableOpacity onPress={() => setSelect(true)}>
                <View style={{ borderWidth: 0.7, marginTop: 30, alignItems: "center", flexDirection: "row" }}>
                  <Text style={{ margin: 10 }}>{listCate}</Text>
                  <Image source={arrow} style={{ width: 8, height: 14, right: 5, position: 'absolute' }}></Image>
                </View>
              </TouchableOpacity>

              <Text style={{ marginTop: 20 }}>E-mail</Text>
              <TextInput
                style={{ height: 40, width: chartWidth - 30, marginTop: 10, borderWidth: 0.7 }}
                onChangeText={text => setEmail(text)}
                placeholder='test@test.com'
                value={email}
              />

              <Text style={{ marginTop: 20 }}>휴대폰</Text>
              <TextInput
                style={{ height: 40, width: chartWidth - 30, marginTop: 10, borderWidth: 0.7 }}
                onChangeText={text => setHp(text)}
                placeholder='010-1234-1234'
                keyboardType='number-pad'
                value={hp}
              />

              <Text style={{ marginTop: 20 }}>제목</Text>
              <TextInput
                style={{ height: 40, width: chartWidth - 30, marginTop: 10, borderWidth: 0.7 }}
                onChangeText={text => setTitle(text)}
                value={title}
              />

              <TextInput
                style={{ height: 150, width: chartWidth - 30, marginTop: 10, borderWidth: 0.7 }}
                onChangeText={text => setContent(text)}
                value={content}
                placeholder="내용을 입력해주세요."
                multiline={true}
              />


              <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>사진 #1</Text>


              <View style={{ flexDirection: "row", marginTop: 15, alignItems: "center" }}>
                <TouchableOpacity onPress={() =>
                  launchImageLibrary(
                    {
                      mediaType: 'photo',
                      includeBase64: true,
                      maxHeight: chartHeight,
                      maxWidth: chartWidth / 1.1,
                    },
                    (response) => {
                      setResponse(response);
                      console.log(response)
                      // console.log(JSON.stringify(response))
                    },
                  )
                }>
                  <View style={{ marginBottom: 15, borderWidth: 0.5, width: 80, height: 30, alignItems: 'center' }}>
                    <Text style={{ marginTop: 5 }}>사진선택</Text>
                  </View>
                </TouchableOpacity>
                {!response && <Text style={{ marginLeft: 10 }}>선택된 사진이 없습니다.</Text>}
              </View>

              {response && (
                <View>
                  <Image
                    style={{ width: response.width, height: response.height }}
                    source={{ uri: response.uri }}
                  />
                </View>
              )}

              <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>사진 #2</Text>
              <View style={{ flexDirection: "row", marginTop: 15, alignItems: "center" }}>
                <TouchableOpacity onPress={() =>
                  launchImageLibrary(
                    {
                      mediaType: 'photo',
                      includeBase64: true,
                      maxHeight: chartHeight,
                      maxWidth: chartWidth / 1.1,
                    },
                    (response) => {
                      setResponse2(response);
                      console.log(response)
                      // console.log(JSON.stringify(response))
                    },
                  )
                }>
                  <View style={{ marginBottom: 15, borderWidth: 0.5, width: 80, height: 30, alignItems: 'center' }}>
                    <Text style={{ marginTop: 5 }}>사진선택</Text>
                  </View>
                </TouchableOpacity>
                {!response2 && <Text style={{ marginLeft: 10 }}>선택된 사진이 없습니다.</Text>}
              </View>

              {response2 && (
                <View>
                  <Image
                    style={{ width: response2.width, height: response2.height }}
                    source={{ uri: response2.uri }}
                  />
                </View>
              )}

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { insert()}}>
                  <View style={{ width: 70, height: 30, backgroundColor: '#db4dff', marginTop: 15 }}>
                    <Text style={{ color: 'white', margin: 5, marginLeft: 10, fontWeight: '900' }}>작성완료</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('1대1문의')}>
                  <View style={{ width: 40, height: 30, backgroundColor: 'black', marginTop: 15, marginLeft: 10 }}>
                    <Text style={{ color: 'white', margin: 5, marginLeft: 8, fontWeight: '900' }}>목록</Text>
                  </View>
                </TouchableOpacity>
              </View>


            </View>



          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>


      <Modal transparent={true} visible={select}>
        <View style={{ width: chartWidth - 30, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: 300 }}>
          <TouchableOpacity onPress={() => { SetlistCate('선택하세요'), setSelect(false) }}>
            <Text style={{ left: 5, marginTop: 5 }}>선택하세요</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { SetlistCate('회원'), setSelect(false) }}>
            <Text style={{ left: 5, marginTop: 5 }}>회원</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { SetlistCate('포인트'), setSelect(false) }}>
            <Text style={{ left: 5, marginTop: 5 }}>포인트</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  )
}

export default OneWrite;