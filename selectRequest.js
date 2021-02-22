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

import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
import { ceil } from 'react-native-reanimated';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const SelectRequest = ({ route }) => {
  const navigation = useNavigation()
  const [response, setResponse] = React.useState(null);//사진

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

    
  

  const [newid, setNewid] = useState('');

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

  const [select, setSelect] = useState(false)
  const [subSelect, setSubselect] = useState(false)
  const [listCate, SetlistCate] = useState("카테고리를 선택해주세요") //카테고리
  const [listPlus, setListPlus] = useState('카테고리를 먼저 선택해주세요') //세부카테고리

  const [text, setText] = useState("기본주소");//주소용
  const [chanAddr, setChanAddr] = useState('');//상세주소

  const [show, setShow] = React.useState(false);//modal용
  const [calShow, setCalShow] = useState(false);
  const [date, setDate] = useState("날짜를 입력해주세요");

  const [value, onChangeText] = React.useState('');//상세내용

  const [pwss, setPwss] = useState('') //비밀번호
  const [name, setName] = useState('') //이름
  const [comno, setComno] = useState('') //시공업체의 파트너 번호
  
  const SubItem = (prop) => {
    return (
      <TouchableOpacity onPress={() => { setListPlus(prop.sub), setSubselect(false) }}>
        <Text style={{ left: 5, margin:10, fontSize:18 }}>{prop.sub}</Text>
      </TouchableOpacity>
    )
  }


  const Subcate = () => {
    var subP = []
    for(var i = 0; i<expertise.length;i++){
      if(expertise[i].category == listCate && expertise[i].mb_id == route.params.comid && expertise[i].state == '정상'){
        subP.push(<SubItem sub={expertise[i].subcategory}></SubItem>)
      }
    }
    const Push = () =>{
      console.log(subP)
      return subP
    }
      return (
        <Modal transparent={true} visible={subSelect}>
          <TouchableOpacity style={{width:chartWidth,height:chartHeight}} onPress={()=>setSubselect(false)}>
          <View style={{ width: chartWidth - 30, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: chartHeight/3 }}>
            <Push></Push>
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
  async function GetPatners() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/partners.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetExpertise() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/expertise.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }

  const [expertise, setExpertise] = useState([])
  const [patners, setPatners] = useState([])
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    if (memberList.length == 0) {
      console.log('작동테스트')
      GetMember().then((res) => {
        setMemberList(res.data)
      })
    }
    if (patners.length == 0) {
      GetPatners().then((res) => {
        setPatners(res.data)
      })
    }
    if (expertise.length == 0) {
      GetExpertise().then((res) => {
        setExpertise(res.data)
      })
    }
  })

  if (memberList.length != 0 && pwss == '') {
    for (var i = 0; i < memberList.length; i++) {
      if (memberList[i].mb_id == newid) {
        setPwss(memberList[i].mb_password)
        setName(memberList[i].mb_name)
      }
    }
  }

  if (patners.length != 0 && comno == '') {
    for (var i = 0; i < patners.length; i++) {
      if (patners[i].mb_id == route.params.comid) {
        setComno(patners[i].no)
      }
    }
  }

  function insert() {

    if(text=='기본주소'){
      Alert.alert('기본주소를 입력해주세요')
      return
    }else if(chanAddr==''){
      Alert.alert('기본주소를 입력해주세요')
      return
    }else if(date=='날짜를 입력해주세요'){
      Alert.alert('기본주소를 입력해주세요')
      return
    }else if(value==''){
      Alert.alert('상세설명을 입력해주세요')
      return
    }

    if(response == null){
      var img = '1'
      var type = '1'
    }else{
      var img = response.base64
      var type = response.type
    }


    axios.post('http://ip0131.cafe24.com/pluslink/json/selectRequest.php', JSON.stringify({
      wr_1: listCate, //카테고리
      wr_2: listPlus, //세부항목
      wr_content: value, //상세설명
      wr_4: text,//시공주소
      wr_5: chanAddr,//상세주소
      wr_7: date,//방문날짜
      wr_10: route.params.comid,
      comno: comno,
      mb_id: newid,//아이디
      wr_password: pwss,//비번
      wr_name: name,//이름
      img: img,
      imgtype: type,
    }))
      .then(function (response) {
        console.log('리스폰스 ', response.request._response);
        if (response.request._response == 'succ') {
          
          fetchUser(id)
          console.log(isFavorite());
          
        }
        else {
          alert('견적 등록이 완료되었습니다..')
          refreshData('g5_write_estimate')
          //navigation.navigate('홈');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

const MainItem = (prop) => {
  return(
    <TouchableOpacity onPress={() => { SetlistCate(prop.tem), setSelect(false), setListPlus('세부항목을 선택해주세요') }}>
            <Text style={{ left: 5, margin:10 ,fontSize:18}}>{prop.tem}</Text>
          </TouchableOpacity>
  )
}

function MainPush(){
  var maincate = []
  var mainP = []
  for(var i = 0;i<expertise.length;i++){
    if(expertise[i].mb_id==route.params.comid && expertise[i].state == '정상'){
      maincate.push(expertise[i].category)
    }
  }

  const set = new Set(maincate);
  maincate = [...set];

  for(var i = 0;i<maincate.length;i++){
    mainP.push(<MainItem tem={maincate[i]}></MainItem>)
  }

  return mainP
}




  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth }}>
        <ScrollView style={{backgroundColor:'white'}}>
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

              <Text style={{ marginTop: 15, fontWeight: 'bold' }}>지정업체</Text>
              <View style={{ borderWidth: 1, borderColor: '#cccccc', width: chartWidth - 30, marginTop: 5, backgroundColor: '#ffcccc' }}>
                <Text style={{ margin: 10, fontWeight: '100' }}>{route.params.comname}</Text>
              </View>

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
                    "width": chartWidth-30,
                    "height": 37,
                    "borderWidth": 1,
                    "borderColor": "rgba(171, 171, 171, 255)",
                    "backgroundColor": "rgba(255, 255, 255, 255)"
                  }
                }
                ><Text>{text}</Text></View>
              </TouchableOpacity>
              <TextInput placeholder='상세주소' onChangeText={(text) => setChanAddr(text)} value={chanAddr} style={{ marginTop: 8, width: chartWidth-30, height: 37, borderWidth: 1, borderColor: 'gray', }}></TextInput>

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
                    "width": chartWidth-30,
                    "height": 37,
                    "borderWidth": 1,
                    "borderColor": "rgba(171, 171, 171, 255)",
                    "backgroundColor": "rgba(255, 255, 255, 255)"
                  }
                }
                ><Text>{date}</Text></View>
              </TouchableOpacity>
              <Text style={{ color: 'red' }}>#방문날짜 이전에 낙찰이 되지않으면 견적이 자동취소 됩니다.</Text>

              <Text style={{ fontWeight: 'bold', marginTop: 10 }}>상세설명</Text>
              <TextInput
                style={{ height: 100, width: chartWidth - 30, marginTop: 10, borderColor: 'gray', borderWidth: 0.5 }}
                onChangeText={text => onChangeText(text)}
                value={value}
                placeholder="내용을 입력해주세요."
                multiline={true}
              />


              <View>
                <View style={{ flexDirection: 'row', marginTop: 50 }}>
                  <Text>이미지첨부</Text>
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
                  <View style={{ marginTop: 15, marginBottom: 15, borderWidth: 0.5, width: 80, height: 30, alignItems: 'center' }}>
                    <Text style={{ marginTop: 5 }}>사진선택</Text>
                  </View>
                </TouchableOpacity></View>

              {response && (
                <View>
                  <Image
                    style={{ width: response.width, height: response.height }}
                    source={{ uri: response.uri }}
                  />
                </View>
              )}

              <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                <TouchableOpacity onPress={() => insert()}>
                  <View style={{ backgroundColor: "#d24dff", width: 70, height: 35, }}>
                    <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10 }}>작성하기</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ backgroundColor: "#404040", width: 50, height: 35, }}>
                  <Text style={{ color: 'white', alignSelf: 'center', marginTop: 10 }}>취소</Text>
                </View>
              </View>





            </View>

          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>


      <Modal transparent={true} visible={select}>
        <TouchableOpacity style={{width:chartWidth,height:chartHeight}} onPress={()=>setSelect(false)}>
        <View style={{ width: chartWidth - 30, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: 150 }}>
          <MainPush></MainPush>
        </View>
        </TouchableOpacity>
      </Modal>

      <Subcate></Subcate>

      <Modal transparent={true} visible={show}>
        <View>
        <TouchableOpacity onPress={() => setShow(false)}>
          <View style={{backgroundColor:'white',width:60,height:60,borderRadius:28,marginTop:40,justifyContent:"center",alignItems:'center',borderWidth:0.5}}>
            <Text style={{fontWeight:'bold',fontSize:28}}>X</Text>
          </View>
        </TouchableOpacity>
            <View style={{ width: chartWidth - 60, height: chartHeight - 150, position: 'absolute', marginLeft: 30, marginTop: 100, borderWidth: 0.5 }}>
              <Postcode
                jsOptions={{ animated: true }}
                onSelected={(data) => { setText(JSON.stringify(data.address).replace(/"/gi, '')), setShow(false) }}
              />
            </View>
            </View>
        
      </Modal>

      <Modal transparent={true} visible={calShow}>
        <TouchableOpacity onPress={() => setCalShow(false)}>
          <View style={{ width: chartWidth, height: chartHeight }}>
            <View style={{ height: chartHeight / 2, top: chartHeight / 2.5 }}>
              <Calendar
                onDayPress={(day) => { console.log('selected day', day), setCalShow(false), setDate(day.dateString) }}
                onDayLongPress={(day) => { console.log('selected day', day) }}
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

export default SelectRequest;