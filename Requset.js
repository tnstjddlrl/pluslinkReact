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
  Alert
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import Postcode from 'react-native-daum-postcode';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';


import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

var dateee = new Date().getDate(); //Current Date
var monthee = new Date().getMonth() + 1; //Current Month
var yearee = new Date().getFullYear(); //Current Year

const axe = require('./img/axe.png')




const REquset = () => {
  const navigation = useNavigation()

  const [newid, setNewid] = useState('');
  const [response, setResponse] = React.useState(null);//사진
  const [response2, setResponse2] = React.useState(null);//사진
  const [response3, setResponse3] = React.useState(null);//사진
  const [response4, setResponse4] = React.useState(null);//사진
  const [response5, setResponse5] = React.useState(null);//사진
  const [response6, setResponse6] = React.useState(null);//사진
  const [response7, setResponse7] = React.useState(null);//사진
  const [response8, setResponse8] = React.useState(null);//사진
  const [response9, setResponse9] = React.useState(null);//사진
  const [response10, setResponse10] = React.useState(null);//사진


  async function isFavorite() {
    try {
      return await AsyncStorage.getItem("@super:id");
    } catch (error) {
      return false;
    }
  }

  const result = isFavorite().then((company_id) => {
    setNewid(company_id.toLowerCase())
  });

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

  const [select, setSelect] = useState(false)

  const [listCate, SetlistCate] = useState("전기&조명") //카테고리

  const [text, setText] = useState("기본주소");//주소용
  const [chanAddr, setChanAddr] = useState('');//상세주소

  const [show, setShow] = React.useState(false);//modal용
  const [calShow, setCalShow] = useState(false);
  const [date, setDate] = useState("날짜를 입력해주세요");

  const [value, onChangeText] = React.useState('');//상세내용

  const [subSelect, setSubselect] = useState(false)
  const [listPlus, setListPlus] = useState('선택해주세요') //세부카테고리

  const [pwss, setPwss] = useState('') //비밀번호
  const [name, setName] = useState('') //이름

  const [link1, setLink1] = useState('')
  const [link2, setLink2] = useState('') //좌표

  async function GetCate() {
    try {
      console.log('겟멤버 작동됨')
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/category.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }

  const [cateList, setCateList] = useState([])
  useEffect(() => {
    if (cateList.length == 0) {
      GetCate().then((res) => {
        setCateList(res.data)
      })
    }
  })

  const SubItem = (prop) => {
    return (
      <TouchableOpacity onPress={() => { setListPlus(prop.sub), setSubselect(false) }}>
        <Text style={{ left: 5, marginTop: 5 }}>{prop.sub}</Text>
      </TouchableOpacity>
    )
  }



  const Subcate = () => {
    const Push = () => {
      var cc = []
      for (var i = 0; i < cateList.length; i++) {
        if (cateList[i].category == listCate) {
          if (cateList[i].subcategory == '') {
            cc.push(<SubItem key={i} sub={'선택해주세요'}></SubItem>)
          } else {
            cc.push(<SubItem key={i} sub={cateList[i].subcategory}></SubItem>)
          }
        }
      }
      return cc
    }


    return (
      <Modal transparent={true} visible={subSelect}>
        <TouchableOpacity onPress={() => setSubselect(false)}>
          <View style={{ width: chartWidth, height: chartHeight }}>

            <View style={{ width: chartWidth - 30, maxHeight: 300, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: 250 }}>
              <ScrollView>
                <Push></Push>
              </ScrollView>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )


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

  if (memberList.length != 0 && pwss == '') {
    for (var i = 0; i < memberList.length; i++) {
      if (memberList[i].mb_id == newid.toLowerCase()) {
        setPwss(memberList[i].mb_password)
        setName(memberList[i].mb_name)
      }
    }
  }




  function insert() {

    if (text == '기본주소') {
      Alert.alert('기본주소를 입력해주세요')
      return
    } else if (chanAddr == '') {
      Alert.alert('기본주소를 입력해주세요')
      return
    } else if (date == '날짜를 입력해주세요') {
      Alert.alert('기본주소를 입력해주세요')
      return
    } else if (value == '') {
      Alert.alert('상세설명을 입력해주세요')
      return
    }

    console.log('비밀번호 테스트 : ', pwss)
    console.log('이름테스트 : ', name)

    if (response == null) {
      var img = '1'
      var type = '1'
      var width = ''
      var height = ''
      var fileSize = ''
      var fileName = ''
    } else {
      var img = response.base64
      var type = response.type
      var width = response.width
      var height = response.height
      var fileSize = response.fileSize
      var fileName = response.fileName
    }

    if (response2 == null) {
      var img2 = '1'
      var type2 = '1'
      var width2 = ''
      var height2 = ''
      var fileSize2 = ''
      var fileName2 = ''
    } else {
      var img2 = response2.base64
      var type2 = response2.type
      var width2 = response2.width
      var height2 = response2.height
      var fileSize2 = response2.fileSize
      var fileName2 = response2.fileName
    }
    if (response3 == null) {
      var img3 = '1'
      var type3 = '1'
      var width3 = ''
      var height3 = ''
      var fileSize3 = ''
      var fileName3 = ''
    } else {
      var img3 = response3.base64
      var type3 = response3.type
      var width3 = response3.width
      var height3 = response3.height
      var fileSize3 = response3.fileSize
      var fileName3 = response3.fileName
    }
    if (response4 == null) {
      var img4 = '1'
      var type4 = '1'
      var width4 = ''
      var height4 = ''
      var fileSize4 = ''
      var fileName4 = ''
    } else {
      var img4 = response4.base64
      var type4 = response4.type
      var width4 = response4.width
      var height4 = response4.height
      var fileSize4 = response4.fileSize
      var fileName4 = response4.fileName
    }
    if (response5 == null) {
      var img5 = '1'
      var type5 = '1'
      var width5 = ''
      var height5 = ''
      var fileSize5 = ''
      var fileName5 = ''
    } else {
      var img5 = response5.base64
      var type5 = response5.type
      var width5 = response5.width
      var height5 = response5.height
      var fileSize5 = response5.fileSize
      var fileName5 = response5.fileName
    }
    if (response6 == null) {
      var img6 = '1'
      var type6 = '1'
      var width6 = ''
      var height6 = ''
      var fileSize6 = ''
      var fileName6 = ''
    } else {
      var img6 = response6.base64
      var type6 = response6.type
      var width6 = response6.width
      var height6 = response6.height
      var fileSize6 = response6.fileSize
      var fileName6 = response6.fileName
    }
    if (response7 == null) {
      var img7 = '1'
      var type7 = '1'
      var width7 = ''
      var height7 = ''
      var fileSize7 = ''
      var fileName7 = ''
    } else {
      var img7 = response7.base64
      var type7 = response7.type
      var width7 = response7.width
      var height7 = response7.height
      var fileSize7 = response7.fileSize
      var fileName7 = response7.fileName
    }
    if (response8 == null) {
      var img8 = '1'
      var type8 = '1'
      var width8 = ''
      var height8 = ''
      var fileSize8 = ''
      var fileName8 = ''
    } else {
      var img8 = response8.base64
      var type8 = response8.type
      var width8 = response8.width
      var height8 = response8.height
      var fileSize8 = response8.fileSize
      var fileName8 = response8.fileName
    }
    if (response9 == null) {
      var img9 = '1'
      var type9 = '1'
      var width9 = ''
      var height9 = ''
      var fileSize9 = ''
      var fileName9 = ''
    } else {
      var img9 = response9.base64
      var type9 = response9.type
      var width9 = response9.width
      var height9 = response9.height
      var fileSize9 = response9.fileSize
      var fileName9 = response9.fileName
    }
    if (response10 == null) {
      var img10 = '1'
      var type10 = '1'
      var width10 = ''
      var height10 = ''
      var fileSize10 = ''
      var fileName10 = ''
    } else {
      var img10 = response10.base64
      var type10 = response10.type
      var width10 = response10.width
      var height10 = response10.height
      var fileSize10 = response10.fileSize
      var fileName10 = response10.fileName
    }

    console.log(img + type)

    axios.post('http://ip0131.cafe24.com/pluslink/json/insertTest.php', JSON.stringify({
      wr_1: listCate, //카테고리
      wr_2: listPlus, //세부항목
      wr_content: value, //상세설명
      wr_4: text,//시공주소
      wr_5: chanAddr,//상세주소
      wr_7: date,//방문날짜
      mb_id: newid,//아이디
      wr_password: pwss,//비번
      wr_name: name,//이름
      bo_table: 'estimate',
      link1: link1,
      link2: link2,
      img: img,
      imgtype: type,
      imgwidth: width,
      imgheight: height,
      imgfilesize: fileSize,
      imgfilename: fileName,
      img2: img2,
      imgtype2: type2,
      imgwidth2: width2,
      imgheight2: height2,
      imgfilesize2: fileSize2,
      imgfilename2: fileName2,
      img3: img3,
      imgtype3: type3,
      imgwidth3: width3,
      imgheight3: height3,
      imgfilesize3: fileSize3,
      imgfilename3: fileName3,
      img4: img4,
      imgtype4: type4,
      imgwidth4: width4,
      imgheight4: height4,
      imgfilesize4: fileSize4,
      imgfilename4: fileName4,
      img5: img5,
      imgtype5: type5,
      imgwidth5: width5,
      imgheight5: height5,
      imgfilesize5: fileSize5,
      imgfilename5: fileName5,
      img6: img6,
      imgtype6: type6,
      imgwidth6: width6,
      imgheight6: height6,
      imgfilesize6: fileSize6,
      imgfilename6: fileName6,
      img7: img7,
      imgtype7: type7,
      imgwidth7: width7,
      imgheight7: height7,
      imgfilesize7: fileSize7,
      imgfilename7: fileName7,
      img8: img8,
      imgtype8: type8,
      imgwidth8: width8,
      imgheight8: height8,
      imgfilesize8: fileSize8,
      imgfilename8: fileName8,
      img9: img9,
      imgtype9: type9,
      imgwidth9: width9,
      imgheight9: height9,
      imgfilesize9: fileSize9,
      imgfilename9: fileName9,
      img10: img10,
      imgtype10: type10,
      imgwidth10: width10,
      imgheight10: height10,
      imgfilesize10: fileSize10,
      imgfilename10: fileName10,
    }))
      .then(function (response) {
        console.log('리스폰스 ', response.request._response);
        if (response.request._response == 'succ') {
          alert('로그인 되었습니다.')
          console.log(isFavorite());
          navigation.navigate('홈');
        }
        else {
          Alert.alert('견적 등록이 완료되었습니다..')
          refreshData('g5_write_estimate')
          navigation.navigate('홈');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getAddr(addr) {

    const Kakao = axios.create({
      baseURL: "https://dapi.kakao.com",
      headers: {
        Authorization: "KakaoAK " + '1fca8682191d27067ab092d740c45ecf'
      }
    });

    Kakao.get("/v2/local/search/address.json?query=" + addr)
      .then(res => {
        console.log(res.data.documents[0].address.x)
        setLink1(res.data.documents[0].address.y)
        setLink2(res.data.documents[0].address.x)
      })

  }

  function vsCal(day) {
    var nn = day.split('-')
    if (nn[0] < yearee) {
      Alert.alert('이전 날짜는 선택할 수 없습니다.')
      return
    } else if (nn[1] < monthee) {
      Alert.alert('이전 날짜는 선택할 수 없습니다.')
      return
    } else if (nn[2] < dateee) {
      Alert.alert('이전 날짜는 선택할 수 없습니다.')
      return
    } else {
      setCalShow(false)
      setDate(day)
    }
  }


  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth }}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={{ marginBottom: 100 }}>
            <View style={{ width: chartWidth, marginTop: 50 }}>
              <ImageBackground source={event} style={{ width: chartWidth, height: chartHeight / 7 }}>
              </ImageBackground>
              <Text style={{ position: 'absolute', color: "white", fontSize: 20, fontWeight: 'bold', top: 40, left: 10 }}>견적의뢰</Text>
            </View>

            <View style={{ margin: 10, marginTop: 20 }}>
              <Text style={{ fontWeight: 'bold' }}>카테고리</Text>
              <TouchableOpacity onPress={() => setSelect(true)}>
                <View style={{ borderWidth: 0.5, marginTop: 10, alignItems: "center", flexDirection: "row", width: chartWidth - 30, backgroundColor: 'white', borderRadius: 5 }}>
                  <Text style={{ margin: 10 }}>{listCate}</Text>
                  <Image source={arrow} style={{ width: 8, height: 14, right: 5, position: 'absolute' }}></Image>
                </View>
              </TouchableOpacity>

              <Text style={{ fontWeight: 'bold', marginTop: 10 }}>세부항목</Text>
              <TouchableOpacity onPress={() => setSubselect(true)}>
                <View style={{ borderWidth: 0.5, marginTop: 10, alignItems: "center", flexDirection: "row", width: chartWidth - 30, backgroundColor: 'white', borderRadius: 5 }}>
                  <Text style={{ margin: 10 }}>{listPlus}</Text>
                  <Image source={arrow} style={{ width: 8, height: 14, right: 5, position: 'absolute' }}></Image>
                </View>
              </TouchableOpacity>



              <Text style={
                {
                  "fontWeight": "bold",
                  "fontSize": 16,
                  "color": "rgba(0, 0, 0, 255)",
                  "marginTop": 17
                }
              } >시공주소 </Text>
              <TouchableOpacity onPress={() => setShow(true)}>
                <View style={
                  {
                    "alignItems": "flex-start",
                    "marginTop": 8,
                    "width": chartWidth - 30,
                    "height": 37,
                    "borderWidth": 1,
                    "borderColor": "rgba(171, 171, 171, 255)",
                    "backgroundColor": "rgba(255, 255, 255, 255)"
                  }
                }
                ><Text>{text}</Text></View>
              </TouchableOpacity>
              <TextInput placeholder='상세주소' style={{ marginTop: 8, width: chartWidth - 30, height: 37, borderWidth: 1, borderColor: 'gray', }}
                onChangeText={text => setChanAddr(text)}
                value={chanAddr}></TextInput>

              <Text style={
                {

                  "fontWeight": "bold",
                  "fontSize": 16,
                  "color": "rgba(0, 0, 0, 255)",
                  "marginTop": 17
                }
              } >방문날짜 </Text>
              <TouchableOpacity onPress={() => setCalShow(true)}>
                <View style={
                  {
                    "alignItems": "flex-start",
                    "marginTop": 10,
                    "width": chartWidth - 30,
                    "height": 37,
                    "borderWidth": 1,
                    "borderColor": "rgba(171, 171, 171, 255)",
                    "backgroundColor": "rgba(255, 255, 255, 255)"
                  }
                }
                ><Text>{date}</Text></View>
              </TouchableOpacity>
              <Text style={{ color: 'red' }}>※ 방문날짜 이전에 낙찰이 되지 않으면 견적이 자동취소 됩니다.</Text>

              <Text style={{ fontWeight: 'bold', marginTop: 10 }}>상세설명</Text>
              <Text style={{ color: 'red' }}>※ 사진 첨부를 자세히 할수록 견적을 상세하게 받을 수 있습니다.</Text>
              <TextInput
                style={{ height: 150, width: chartWidth - 30, marginTop: 10, borderColor: 'gray', borderWidth: 0.5 }}
                onChangeText={text => onChangeText(text)}
                value={value}
                placeholder="내용을 입력해주세요."
                multiline={true}
              />

              <Text style={{ margin: 5, fontWeight: "bold", fontSize: 18, marginTop: 10 }}>첨부파일</Text>
              <Text style={{ color: 'red' }}>※ 시공 부분 사진을 첨부해주세요</Text>
              <View style={{ marginTop: 15 }}>
                {response && (
                  <View>
                    <Image
                      style={{ width: response.width, height: response.height }}
                      source={{ uri: response.uri }}
                    />
                  </View>
                )}


                <View style={{ borderWidth: 1, borderColor: 'rgb(197,197,197)', flexDirection: 'row' }}>
                  <View style={{ height: 30, backgroundColor: 'rgb(235,235,235)', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ margin: 5 }}>사진1</Text>
                  </View>
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
                        // console.log(response)
                        // console.log(JSON.stringify(response))
                      },
                    )
                  }>
                    <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10 }}>
                      <Text style={{ marginTop: 5 }}>사진선택</Text>
                    </View>
                  </TouchableOpacity>
                  {
                    (response && !response2) && <TouchableOpacity onPress={() => { setResponse(null) }}>
                      <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10, backgroundColor: 'black' }}>
                        <Text style={{ marginTop: 5, color: 'white' }}>사진삭제</Text>
                      </View>
                    </TouchableOpacity>
                  }
                </View>
              </View>

              {response && <View style={{ marginTop: 15 }}>
                {response2 && (
                  <View>
                    <Image
                      style={{ width: response2.width, height: response2.height }}
                      source={{ uri: response2.uri }}
                    />
                  </View>
                )}


                <View style={{ borderWidth: 1, borderColor: 'rgb(197,197,197)', flexDirection: 'row' }}>
                  <View style={{ height: 30, backgroundColor: 'rgb(235,235,235)', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ margin: 5 }}>사진2</Text>
                  </View>
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
                        // console.log(response)
                        // console.log(JSON.stringify(response))
                      },
                    )
                  }>
                    <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10 }}>
                      <Text style={{ marginTop: 5 }}>사진선택</Text>
                    </View>
                  </TouchableOpacity>
                  {
                    (response2 && !response3) && <TouchableOpacity onPress={() => { setResponse2(null) }}>
                      <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10, backgroundColor: 'black' }}>
                        <Text style={{ marginTop: 5, color: 'white' }}>사진삭제</Text>
                      </View>
                    </TouchableOpacity>
                  }

                </View>
              </View>}

              {response2 && <View style={{ marginTop: 15 }}>
                {response3 && (
                  <View>
                    <Image
                      style={{ width: response3.width, height: response3.height }}
                      source={{ uri: response3.uri }}
                    />
                  </View>
                )}


                <View style={{ borderWidth: 1, borderColor: 'rgb(197,197,197)', flexDirection: 'row' }}>
                  <View style={{ height: 30, backgroundColor: 'rgb(235,235,235)', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ margin: 5 }}>사진3</Text>
                  </View>
                  <TouchableOpacity onPress={() =>
                    launchImageLibrary(
                      {
                        mediaType: 'photo',
                        includeBase64: true,
                        maxHeight: chartHeight,
                        maxWidth: chartWidth / 1.1,
                      },
                      (response) => {
                        setResponse3(response);
                        console.log(response)
                        // console.log(JSON.stringify(response))
                      },
                    )
                  }>
                    <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10 }}>
                      <Text style={{ marginTop: 5 }}>사진선택</Text>
                    </View>
                  </TouchableOpacity>
                  {
                    (response3 && !response4) && <TouchableOpacity onPress={() => { setResponse3(null) }}>
                      <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10, backgroundColor: 'black' }}>
                        <Text style={{ marginTop: 5, color: 'white' }}>사진삭제</Text>
                      </View>
                    </TouchableOpacity>
                  }
                </View>
              </View>}

              {response3 && <View style={{ marginTop: 15 }}>
                {response4 && (
                  <View>
                    <Image
                      style={{ width: response4.width, height: response4.height }}
                      source={{ uri: response4.uri }}
                    />
                  </View>
                )}


                <View style={{ borderWidth: 1, borderColor: 'rgb(197,197,197)', flexDirection: 'row' }}>
                  <View style={{ height: 30, backgroundColor: 'rgb(235,235,235)', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ margin: 5 }}>사진4</Text>
                  </View>
                  <TouchableOpacity onPress={() =>
                    launchImageLibrary(
                      {
                        mediaType: 'photo',
                        includeBase64: true,
                        maxHeight: chartHeight,
                        maxWidth: chartWidth / 1.1,
                      },
                      (response) => {
                        setResponse4(response);
                        console.log(response)
                        // console.log(JSON.stringify(response))
                      },
                    )
                  }>
                    <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10 }}>
                      <Text style={{ marginTop: 5 }}>사진선택</Text>
                    </View>
                  </TouchableOpacity>
                  {
                    (response4 && !response5) && <TouchableOpacity onPress={() => { setResponse4(null) }}>
                      <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10, backgroundColor: 'black' }}>
                        <Text style={{ marginTop: 5, color: 'white' }}>사진삭제</Text>
                      </View>
                    </TouchableOpacity>
                  }
                </View>
              </View>}

              {response4 && <View style={{ marginTop: 15 }}>
                {response5 && (
                  <View>
                    <Image
                      style={{ width: response5.width, height: response5.height }}
                      source={{ uri: response5.uri }}
                    />
                  </View>
                )}


                <View style={{ borderWidth: 1, borderColor: 'rgb(197,197,197)', flexDirection: 'row' }}>
                  <View style={{ height: 30, backgroundColor: 'rgb(235,235,235)', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ margin: 5 }}>사진5</Text>
                  </View>
                  <TouchableOpacity onPress={() =>
                    launchImageLibrary(
                      {
                        mediaType: 'photo',
                        includeBase64: true,
                        maxHeight: chartHeight,
                        maxWidth: chartWidth / 1.1,
                      },
                      (response) => {
                        setResponse5(response);
                        console.log(response)
                        // console.log(JSON.stringify(response))
                      },
                    )
                  }>
                    <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10 }}>
                      <Text style={{ marginTop: 5 }}>사진선택</Text>
                    </View>
                  </TouchableOpacity>
                  {
                    (response5 && !response6) && <TouchableOpacity onPress={() => { setResponse5(null) }}>
                      <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10, backgroundColor: 'black' }}>
                        <Text style={{ marginTop: 5, color: 'white' }}>사진삭제</Text>
                      </View>
                    </TouchableOpacity>
                  }
                </View>
              </View>}


              {response5 && <View style={{ marginTop: 15 }}>
                {response6 && (
                  <View>
                    <Image
                      style={{ width: response6.width, height: response6.height }}
                      source={{ uri: response6.uri }}
                    />
                  </View>
                )}


                <View style={{ borderWidth: 1, borderColor: 'rgb(197,197,197)', flexDirection: 'row' }}>
                  <View style={{ height: 30, backgroundColor: 'rgb(235,235,235)', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ margin: 5 }}>사진6</Text>
                  </View>
                  <TouchableOpacity onPress={() =>
                    launchImageLibrary(
                      {
                        mediaType: 'photo',
                        includeBase64: true,
                        maxHeight: chartHeight,
                        maxWidth: chartWidth / 1.1,
                      },
                      (response) => {
                        setResponse6(response);
                        console.log(response)
                        // console.log(JSON.stringify(response))
                      },
                    )
                  }>
                    <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10 }}>
                      <Text style={{ marginTop: 5 }}>사진선택</Text>
                    </View>
                  </TouchableOpacity>
                  {
                    (response6 && !response7) && <TouchableOpacity onPress={() => { setResponse6(null) }}>
                      <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10, backgroundColor: 'black' }}>
                        <Text style={{ marginTop: 5, color: 'white' }}>사진삭제</Text>
                      </View>
                    </TouchableOpacity>
                  }
                </View>
              </View>}

              {response6 && <View style={{ marginTop: 15 }}>
                {response7 && (
                  <View>
                    <Image
                      style={{ width: response7.width, height: response7.height }}
                      source={{ uri: response7.uri }}
                    />
                  </View>
                )}


                <View style={{ borderWidth: 1, borderColor: 'rgb(197,197,197)', flexDirection: 'row' }}>
                  <View style={{ height: 30, backgroundColor: 'rgb(235,235,235)', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ margin: 5 }}>사진7</Text>
                  </View>
                  <TouchableOpacity onPress={() =>
                    launchImageLibrary(
                      {
                        mediaType: 'photo',
                        includeBase64: true,
                        maxHeight: chartHeight,
                        maxWidth: chartWidth / 1.1,
                      },
                      (response) => {
                        setResponse7(response);
                        console.log(response)
                        // console.log(JSON.stringify(response))
                      },
                    )
                  }>
                    <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10 }}>
                      <Text style={{ marginTop: 5 }}>사진선택</Text>
                    </View>
                  </TouchableOpacity>
                  {
                    (response7 && !response8) && <TouchableOpacity onPress={() => { setResponse2(null) }}>
                      <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10, backgroundColor: 'black' }}>
                        <Text style={{ marginTop: 5, color: 'white' }}>사진삭제</Text>
                      </View>
                    </TouchableOpacity>
                  }
                </View>
              </View>}


              {response7 && <View style={{ marginTop: 15 }}>
                {response8 && (
                  <View>
                    <Image
                      style={{ width: response8.width, height: response8.height }}
                      source={{ uri: response8.uri }}
                    />
                  </View>
                )}


                <View style={{ borderWidth: 1, borderColor: 'rgb(197,197,197)', flexDirection: 'row' }}>
                  <View style={{ height: 30, backgroundColor: 'rgb(235,235,235)', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ margin: 5 }}>사진8</Text>
                  </View>
                  <TouchableOpacity onPress={() =>
                    launchImageLibrary(
                      {
                        mediaType: 'photo',
                        includeBase64: true,
                        maxHeight: chartHeight,
                        maxWidth: chartWidth / 1.1,
                      },
                      (response) => {
                        setResponse8(response);
                        console.log(response)
                        // console.log(JSON.stringify(response))
                      },
                    )
                  }>
                    <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10 }}>
                      <Text style={{ marginTop: 5 }}>사진선택</Text>
                    </View>
                  </TouchableOpacity>
                  {
                    (response8 && !response9) && <TouchableOpacity onPress={() => { setResponse8(null) }}>
                      <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10, backgroundColor: 'black' }}>
                        <Text style={{ marginTop: 5, color: 'white' }}>사진삭제</Text>
                      </View>
                    </TouchableOpacity>
                  }
                </View>
              </View>}


              {response8 && <View style={{ marginTop: 15 }}>
                {response9 && (
                  <View>
                    <Image
                      style={{ width: response9.width, height: response9.height }}
                      source={{ uri: response9.uri }}
                    />
                  </View>
                )}


                <View style={{ borderWidth: 1, borderColor: 'rgb(197,197,197)', flexDirection: 'row' }}>
                  <View style={{ height: 30, backgroundColor: 'rgb(235,235,235)', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ margin: 5 }}>사진9</Text>
                  </View>
                  <TouchableOpacity onPress={() =>
                    launchImageLibrary(
                      {
                        mediaType: 'photo',
                        includeBase64: true,
                        maxHeight: chartHeight,
                        maxWidth: chartWidth / 1.1,
                      },
                      (response) => {
                        setResponse9(response);
                        console.log(response)
                        // console.log(JSON.stringify(response))
                      },
                    )
                  }>
                    <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10 }}>
                      <Text style={{ marginTop: 5 }}>사진선택</Text>
                    </View>
                  </TouchableOpacity>
                  {
                    (response9 && !response10) && <TouchableOpacity onPress={() => { setResponse9(null) }}>
                      <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10, backgroundColor: 'black' }}>
                        <Text style={{ marginTop: 5, color: 'white' }}>사진삭제</Text>
                      </View>
                    </TouchableOpacity>
                  }
                </View>
              </View>}


              {response9 && <View style={{ marginTop: 15 }}>
                {response10 && (
                  <View>
                    <Image
                      style={{ width: response10.width, height: response10.height }}
                      source={{ uri: response10.uri }}
                    />
                  </View>
                )}


                <View style={{ borderWidth: 1, borderColor: 'rgb(197,197,197)', flexDirection: 'row' }}>
                  <View style={{ height: 30, backgroundColor: 'rgb(235,235,235)', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ margin: 5 }}>사진10</Text>
                  </View>
                  <TouchableOpacity onPress={() =>
                    launchImageLibrary(
                      {
                        mediaType: 'photo',
                        includeBase64: true,
                        maxHeight: chartHeight,
                        maxWidth: chartWidth / 1.1,
                      },
                      (response) => {
                        setResponse10(response);
                        console.log(response)
                        // console.log(JSON.stringify(response))
                      },
                    )
                  }>
                    <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10 }}>
                      <Text style={{ marginTop: 5 }}>사진선택</Text>
                    </View>
                  </TouchableOpacity>
                  {
                    response10 && <TouchableOpacity onPress={() => { setResponse10(null) }}>
                      <View style={{ borderWidth: 0.5, width: 80, height: 30, alignItems: 'center', marginLeft: 10, backgroundColor: 'black' }}>
                        <Text style={{ marginTop: 5, color: 'white' }}>사진삭제</Text>
                      </View>
                    </TouchableOpacity>
                  }
                </View>
                <Text style={{ margin: 20, fontSize: 18, fontWeight: 'bold' }}>사진은 최대 10개까지 등록할 수 있습니다!</Text>
              </View>}



              <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                <TouchableOpacity onPress={() => insert()}>
                  <View style={{ backgroundColor: "rgb(157,109,192)", width: 70, height: 35, }}>
                    <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10 }}>작성하기</Text>
                  </View>
                </TouchableOpacity >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <View style={{ backgroundColor: "#404040", width: 50, height: 35,marginLeft:10 }}>
                    <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10 }}>취소</Text>
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
        <TouchableOpacity onPress={() => setSelect(false)}>
          <View style={{ width: chartWidth, height: chartHeight }}>
            <View style={{ width: chartWidth - 30, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: 150 }}>
              <TouchableOpacity onPress={() => { SetlistCate('전기&조명'), setSelect(false), setListPlus('선택해주세요') }}>
                <Text style={{ left: 5, marginTop: 5 }}>전기&조명</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('수도'), setSelect(false), setListPlus('선택해주세요') }}>
                <Text style={{ left: 5, marginTop: 5 }}>수도</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('도배&장판'), setSelect(false), setListPlus('선택해주세요') }}>
                <Text style={{ left: 5, marginTop: 5 }}>도배&장판</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { SetlistCate('인테리어'), setSelect(false), setListPlus('선택해주세요') }}>
                <Text style={{ left: 5, marginTop: 5 }}>인테리어</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('샷시&창호'), setSelect(false), setListPlus('선택해주세요') }}>
                <Text style={{ left: 5, marginTop: 5 }}>샷시&창호</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('청소'), setSelect(false), setListPlus('선택해주세요') }}>
                <Text style={{ left: 5, marginTop: 5 }}>청소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('보일러&배관'), setSelect(false), setListPlus('선택해주세요') }}>
                <Text style={{ left: 5, marginTop: 5 }}>보일러&배관</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('건물외부'), setSelect(false), setListPlus('선택해주세요') }}>
                <Text style={{ left: 5, marginTop: 5 }}>건물외부</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('철거 및 처리'), setSelect(false), setListPlus('선택해주세요') }}>
                <Text style={{ left: 5, marginTop: 5 }}>철거 및 처리</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('이사'), setSelect(false), setListPlus('선택해주세요') }}>
                <Text style={{ left: 5, marginTop: 5 }}>이사</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Subcate></Subcate>

      <Modal transparent={true} visible={show}>
        <View>
          <TouchableOpacity onPress={() => setShow(false)}>
            <View style={{ backgroundColor: 'white', width: 60, height: 60, borderRadius: 28, marginTop: 40, justifyContent: "center", alignItems: 'center', borderWidth: 0.5 }}>
            <Image style={{width:20,height:20}} source={axe}></Image>
            </View>
          </TouchableOpacity>
          <View style={{ width: chartWidth - 60, height: chartHeight - 150, position: 'absolute', marginLeft: 30, marginTop: 100, borderWidth: 0.5 }}>
            <Postcode
              jsOptions={{ animated: true }}
              onSelected={(data) => { setText(JSON.stringify(data.address).replace(/"/gi, '')), setShow(false), getAddr(JSON.stringify(data.address).replace(/"/gi, '')) }}
            />
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={calShow}>
        <TouchableOpacity onPress={() => setCalShow(false)}>
          <View style={{ width: chartWidth, height: chartHeight, alignItems: "center" }}>
            <View style={{ top: chartHeight / 2.5, borderWidth: 1, width: chartWidth - 20 }}>
              <Calendar
                onDayPress={(day) => { vsCal(day.dateString) }}
                onDayLongPress={(day) => { console.log(yearee + ':' + monthee + ':' + dateee) }}
                monthFormat={'yyyy MM'}
                onMonthChange={(month) => { console.log('month changed', month) }}
                hideExtraDays={false}
                disableMonthChange={true}
                firstDay={1}
                hideDayNames={false}
                showWeekNumbers={false}
                onPressArrowLeft={substractMonth => substractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                disableAllTouchEventsForDisabledDays={true}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  )
}



export default REquset;