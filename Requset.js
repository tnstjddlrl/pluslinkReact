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
  const [listPlus, setListPlus] = useState('전기') //세부카테고리

  const [pwss, setPwss] = useState('') //비밀번호
  const [name, setName] = useState('') //이름

  const [link1, setLink1] = useState('')
  const [link2, setLink2] = useState('') //좌표



  const Subcate = () => {
    if (listCate == '전기&조명') {
      return (
        <Modal transparent={true} visible={subSelect}>
          <TouchableOpacity onPress={() => setSubselect(false)}>
            <View style={{ width: chartWidth, height: chartHeight }}>

              <View style={{ width: chartWidth - 30, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: 300 }}>
                <TouchableOpacity onPress={() => { setListPlus('전기'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>전기</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('조명'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>조명</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('cctv'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>cctv</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setListPlus('인터폰 및 도어폰'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>인터폰 및 도어폰</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('에어컨'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>에어컨</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('통신설비'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>통신설비</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('계전'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>계전</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('음향'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>음향</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )
    } else if (listCate == '수도') {
      return (
        <Modal transparent={true} visible={subSelect}>
          <TouchableOpacity onPress={() => setSubselect(false)}>
            <View style={{ width: chartWidth, height: chartHeight }}>

              <View style={{ width: chartWidth - 30, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: 300 }}>
                <TouchableOpacity onPress={() => { setListPlus('상하수도'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>상하수도</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('동파'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>동파</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('누수'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>누수</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setListPlus('소모품 교체'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>소모품 교체</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('악취제거'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>악취제거</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('방수공사'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>방수공사</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('결로'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>결로</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )
    } else if (listCate == '도배&장판') {
      return (
        <Modal transparent={true} visible={subSelect}>
          <TouchableOpacity onPress={() => setSubselect(false)}>
            <View style={{ width: chartWidth, height: chartHeight }}>

              <View style={{ width: chartWidth - 30, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: 300 }}>
                <TouchableOpacity onPress={() => { setListPlus('도배'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>도배</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('장판'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>장판</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('몰딩'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>몰딩</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setListPlus('바닥재 및 타일'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>바닥재 및 타일</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('줄눈시공'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>줄눈시공</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('곰팡이제거'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>곰팡이제거</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )
    } else if (listCate == '인테리어') {
      return (
        <Modal transparent={true} visible={subSelect}>
          <TouchableOpacity onPress={() => setSubselect(false)}>
            <View style={{ width: chartWidth, height: chartHeight }}>

              <View style={{ width: chartWidth - 30, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: 300 }}>
                <TouchableOpacity onPress={() => { setListPlus('화장실 리모델링'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>화장실 리모델링</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('부엌 리모델링'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>부엌 리모델링</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('종합 인테리어'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>종합 인테리어</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )
    } else if (listCate == '샷시&창호') {
      return (
        <Modal transparent={true} visible={subSelect}>
          <TouchableOpacity onPress={() => setSubselect(false)}>
            <View style={{ width: chartWidth, height: chartHeight }}>

              <View style={{ width: chartWidth - 30, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: 300 }}>
                <TouchableOpacity onPress={() => { setListPlus('샷시'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>샷시</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('창호'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>창호</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )
    } else if (listCate == '청소&철거') {
      return (
        <Modal transparent={true} visible={subSelect}>
          <TouchableOpacity onPress={() => setSubselect(false)}>
            <View style={{ width: chartWidth, height: chartHeight }}>

              <View style={{ width: chartWidth - 30, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: 300 }}>
                <TouchableOpacity onPress={() => { setListPlus('입주청소'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>입주청소</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('건물청소'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>건물청소</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('에어컨청소'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>에어컨청소</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setListPlus('세탁기청소'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>세탁기청소</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('철거 및 처리'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>철거 및 처리</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('방역'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>방역</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('가사도우미'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>가사도우미</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('상가복구'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>상가복구</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )
    } else if (listCate == '보일러&배관') {
      return (
        <Modal transparent={true} visible={subSelect}>
          <TouchableOpacity onPress={() => setSubselect(false)}>
            <View style={{ width: chartWidth, height: chartHeight }}>

              <View style={{ width: chartWidth - 30, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: 300 }}>
                <TouchableOpacity onPress={() => { setListPlus('보일러'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>보일러</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('배관공사'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>배관공사</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )
    } else if (listCate == '건물외부') {
      return (
        <Modal transparent={true} visible={subSelect}>
          <TouchableOpacity onPress={() => setSubselect(false)}>
            <View style={{ width: chartWidth, height: chartHeight }}>

              <View style={{ width: chartWidth - 30, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: 300 }}>
                <TouchableOpacity onPress={() => { setListPlus('외벽크랙'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>외벽크랙</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('지붕 및 담장'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>지붕 및 담장</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('울타리 및 펜스'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>울타리 및 펜스</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setListPlus('미장'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>미장</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('석재'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>석재</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('어닝 및 천막'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>어닝 및 천막</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('간판'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>간판</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setListPlus('빗물받이'), setSubselect(false) }}>
                  <Text style={{ left: 5, marginTop: 5 }}>상가복구</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )
    }
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
    } else {
      var img = response.base64
      var type = response.type
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
      img: img,
      imgtype: type,
      link1: link1,
      link2: link2
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
                  <View style={{ backgroundColor: "#d24dff", width: 70, height: 35, }}>
                    <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10 }}>작성하기</Text>
                  </View>
                </TouchableOpacity >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <View style={{ backgroundColor: "#404040", width: 50, height: 35, }}>
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
              <TouchableOpacity onPress={() => { SetlistCate('전기&조명'), setSelect(false), setListPlus('전기') }}>
                <Text style={{ left: 5, marginTop: 5 }}>전기&조명</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('수도'), setSelect(false), setListPlus('상하수도') }}>
                <Text style={{ left: 5, marginTop: 5 }}>수도</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('도배&장판'), setSelect(false), setListPlus('도배') }}>
                <Text style={{ left: 5, marginTop: 5 }}>도배&장판</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { SetlistCate('인테리어'), setSelect(false), setListPlus('화장실 리모델링') }}>
                <Text style={{ left: 5, marginTop: 5 }}>인테리어</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('샷시&창호'), setSelect(false), setListPlus('샷시') }}>
                <Text style={{ left: 5, marginTop: 5 }}>샷시&창호</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('청소&철거'), setSelect(false), setListPlus('입주청소') }}>
                <Text style={{ left: 5, marginTop: 5 }}>청소&철거</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('보일러&배관'), setSelect(false), setListPlus('보일러') }}>
                <Text style={{ left: 5, marginTop: 5 }}>보일러&배관</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { SetlistCate('건물외부'), setSelect(false), setListPlus('외벽크랙') }}>
                <Text style={{ left: 5, marginTop: 5 }}>건물외부</Text>
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
              <Text style={{ fontWeight: 'bold', fontSize: 28 }}>X</Text>
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
          <View style={{ width: chartWidth, height: chartHeight }}>
            <View style={{ height: chartHeight / 2, top: chartHeight / 2.5, borderWidth: 1 }}>
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