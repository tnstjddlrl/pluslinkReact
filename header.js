import React, { useState, Component, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Modal,
  ImageBackground,
  Linking,
  SafeAreaView
} from "react-native";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";


const logo = { uri: "https://pluslink.kr/img/pluslink/logo.png" };
const logo2 = { uri: "https://pluslink.kr/img/menu.png" };
const testlogo = require('./img/logo.png')
const graBox = require('./img/gradation.jpg')

const ffimg = require('./img/b01.png')
const ffimg2 = require('./img/b02.png')
const ffimg3 = require('./img/b03.png')
const ffimg4 = require('./img/b04.png')

const mm1 = require('./img/mm01.png')
const mm2 = require('./img/mm02.png')
const mm3 = require('./img/mm03.png')
const mm4 = require('./img/mm04.png')

const arrow = require('./img/arrow02.png')

const arrdown = require('./img/arrdown.png')
const arrup = require('./img/arrup.png')

const userplus = require('./img/contact.png')
const axe = require('./img/axe.png')
const close2 = require('./img/close2.png')

const HeadHeder = () => {
  const navigation = useNavigation();

  const [logstate, setLogstate] = useState('로그인해주세요')
  const [viewmenu, setViewmenu] = useState(false)

  const [newid, setNewid] = useState('');

  async function isFavorite() {
    try {
      return await AsyncStorage.getItem("@super:id");
    } catch (error) {
      return false;
    }
  }



  const fetchUser = async (id) => {
    AsyncStorage.setItem(
      '@super:id',
      id
    );
  }

  function logCheck(prop) {
    if (newid == '로그인해주세요') {
      alert('로그인을 먼저 해주세요.')
      navigation.navigate('로그인')
    } else {
      navigation.navigate(prop)
    }
  }

  let os = Platform.OS

  let nowheight;
  let mata;
  let nnee;
  if (os == 'ios') {
    nowheight = 1.11;
    mata = 35;
    nnee = 80
  } else {
    nowheight = 1.08;
    mata = 0;
    nnee = 50;
  }
  useEffect(() => {
    console.log(os)
    console.log(nowheight)
    console.log('헤더 콘솔 체크: ', newid)
  }, [])

  async function GetMember() {
    try {
      console.log('겟멤버 작동됨')
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_member.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetCate() {
    try {
      console.log('겟멤버 작동됨')
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/category.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }

  const [memberList, setMemberList] = useState([]);
  const [cateList, setCateList] = useState([])
  useEffect(() => {
    if (memberList.length == 0) {
      console.log('작동테스트')
      GetMember().then((res) => {
        setMemberList(res.data)
      })
    }
    if (cateList.length == 0) {
      GetCate().then((res) => {
        setCateList(res.data)
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

  const MenuChild = (prop) => {
    return (
      <View>
        {/* <View style={{ width: chartWidth / 1.45, borderWidth: 0.5, borderColor: '#999999' }}></View> */}
        <TouchableOpacity onPress={() => { navigation.navigate('업체목록', { cate: prop.title, subcate: prop.text }), setViewmenu(false) }}>
          <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 5, fontSize: 13, color: '#888' }}>{prop.text}</Text>
        </TouchableOpacity>
      </View>
    )
  }


  const LeftMenu = (prop) => {
    const [test, setTest] = useState(false)
    const [tcolor, setTcolor] = useState('black')
    const List = () => {
      var ll = []
      var subll = []

      for (var i = 0; i < cateList.length; i++) {
        if (cateList[i].category == prop.title) {
          if (cateList[i].subcategory == '') {
            subll.push("전체")
          } else {
            subll.push(cateList[i].subcategory)
          }
        }
      }
      for (var i = 0; i < subll.length; i++) {
        if (i + 1 == subll.length) {
          ll.push(<View><MenuChild key={i} text={subll[i]} title={prop.title}></MenuChild><View style={{marginTop:10, width: chartWidth / 1.45, borderWidth: 0.7, borderColor: '#eeeeee', marginBottom: 3 }}></View></View>)
        } else {
          ll.push(<MenuChild key={i} text={subll[i]} title={prop.title}></MenuChild>)
        }

      }
      return ll
    }

    function view() {
      if (test) { setTest(false) } else { setTest(true) }
    }
    function colcol() {
      if (tcolor == 'black') { setTcolor('rgb(125,50,184)') } else { setTcolor('black') }
    }

    return (
      <View>
        <TouchableOpacity onPress={() => { view() }}>
          <View style={{ width: chartWidth / 1.45, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ margin: 15, fontSize: 15, color: tcolor }}>{prop.title}</Text>
            {test ? <Image source={arrup} style={{ position: 'absolute', right: 20, width: 10, height: 6.5 }}></Image> :
              <Image source={arrdown} style={{ position: 'absolute', right: 20, width: 10, height: 6.5 }}></Image>
            }
          </View>
        </TouchableOpacity>
        
        {test && <View style={{ backgroundColor: 'white' }}><View style={{ width: chartWidth / 1.45, borderWidth: 0.7, borderColor: '#eeeeee', marginBottom: 1 }}></View><List></List></View>}
      </View>
    )
  }

  const [ispng, setIspng] = useState(false)

  const unsubscribe = navigation.addListener('focus', () => {
    setIspng(false)
  });
  useEffect(() => {
    return () => unsubscribe();
  });

  return (
    <View>
      <View style={{ justifyContent: 'space-between', alignItems: "flex-end", borderWidth: 0.3, position: 'absolute', width: chartWidth + 15, left: -2, bottom: (chartHeight - nnee), height: 120, flexDirection: 'row', backgroundColor: 'white' }}>

        <TouchableOpacity activeOpacity={0.5} onPress={() => { setViewmenu(true) }} style={{ left: 10 }}>
          <View style={{ width: 75, marginBottom: 15 }}>
            <Image
              source={logo2}
              style={{ width: 23, height: 18 }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ height: 30, width: 40, marginBottom: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('홈')}>
            <Image source={testlogo} style={{ width: 40, height: 34 }}>
            </Image>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => { Linking.openURL('https://pluslink.kr/shop/') }}>
          <View style={{
            width: 75, height: 35, backgroundColor: '#863bc2',
            borderTopLeftRadius: 17,
            borderTopRightRadius: 17,
            borderBottomLeftRadius: 17,
            borderBottomRightRadius: 17,
            marginRight: 20, alignItems: "center", justifyContent: "center", marginBottom: 10
          }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              PnL Mall
              </Text>
          </View>
        </TouchableOpacity>
      </View>




      <Modal transparent={false} visible={viewmenu}>
        <TouchableOpacity onPress={() => setViewmenu(false)}>
          <View style={{ width: chartWidth, height: chartHeight, backgroundColor: 'black' }}></View>
        </TouchableOpacity>
        <View style={{ width: chartWidth / 1.45, height: chartHeight, position: 'absolute', backgroundColor: 'white' }}>
          <View>
            <ImageBackground source={graBox} style={{ width: chartWidth / 1.45, masHeight: 220 }}>
              <View style={{ marginTop: mata }}>

                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15, alignItems: 'center' }}>
                  {
                    newid != '로그인해주세요' && <View style={{ flexDirection: "row", alignItems: 'center' }}>
                      <View style={{ backgroundColor: 'white', width: 50, height: 50, borderRadius: 28, justifyContent: "center", alignItems: "center" }}>
                        {ispng ? <Image source={userplus} style={{ width: 35, height: 40, borderRadius: 0, justifyContent: "center", alignItems: "center" }}></Image> :
                          <Image source={{ uri: 'https://pluslink.kr/data/member_image/' + newid.substr(0, 2) + '/' + newid + '.gif' }} onError={() => setIspng(true)} style={{ width: 50, height: 50, borderRadius: 28, backgroundColor: 'white' }}></Image>
                        }
                      </View>
                      <Text style={{ fontWeight: 'bold', marginLeft: 10, color: 'white', fontSize: 18 }}>{name}</Text>
                    </View>
                  }
                  <TouchableOpacity onPress={() => setViewmenu(false)} style={{ width: 40, height: 40, backgroundColor: 'white', borderRadius: 27, right: 15, top: 0, position: 'absolute' }}>
                    <View style={{ width: 40, height: 40, left: 0, justifyContent: "center", alignItems: "center" }}>
                      <Image style={{ width: 12, height: 12 }} source={close2}></Image>
                    </View>
                  </TouchableOpacity>
                </View>



                {newid == '로그인해주세요' ? <View style={{ flexDirection: 'row', marginTop: 60, justifyContent: 'space-between', alignItems: "center", width: chartWidth / 1.45 - 30, marginLeft: 15 }}>
                  <TouchableOpacity onPress={() => { navigation.navigate('로그인'), setViewmenu(false) }}>
                    <View style={{ backgroundColor: 'white', width: chartWidth / 3.4, height: 40, borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ fontSize: 15 }}>로그인</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { navigation.navigate('회원가입'), setViewmenu(false) }}>
                    <View style={{ backgroundColor: 'white', width: chartWidth / 3.4, height: 40, borderRadius: 5, marginLeft: 10, justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ fontSize: 15 }}>회원가입</Text>
                    </View>
                  </TouchableOpacity>
                </View> : <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: "center", width: chartWidth / 1.45 - 30, marginLeft: 15 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('정보변경'), setViewmenu(false) }}>
                      <View style={{ backgroundColor: 'white', width: chartWidth / 3.4, height: 40, borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 15 }}>정보변경</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { fetchUser('로그인해주세요'), setViewmenu(false), navigation.navigate('홈'), setName('로그인해주세요') }}>
                      <View style={{ backgroundColor: 'white', width: chartWidth / 3.4, height: 40, borderRadius: 5, marginLeft: 10, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 15 }}>로그아웃</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                }

              </View>

              <View style={{ bottom: 0, flexDirection: 'row', justifyContent: "space-between", alignItems: "center", width: chartWidth / 1.45 - 40, marginLeft: 20, marginTop: 35, marginBottom: 30 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('홈'), setViewmenu(false) }}>
                  <View style={{ alignItems: "center" }}>
                    <Image source={mm1} style={{ width: 22, height: 24,marginBottom:-3 }}></Image>
                    <Text style={{ color: 'white', fontSize: 12, letterSpacing: -0.5, marginTop: 5 }}>홈</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { logCheck('견적의뢰'), setViewmenu(false) }}>
                  <View style={{ alignItems: "center" }}>
                    <Image source={mm2} style={{ width: 22, height: 26 }}></Image>
                    <Text style={{ color: 'white', fontSize: 12, letterSpacing: -0.5, marginTop: 3 }}>견적의뢰</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { logCheck('견적현황'), setViewmenu(false) }}>
                  <View style={{ alignItems: "center" }}>
                    <Image source={mm3} style={{ width: 27, height: 23,marginRight:-1 }}></Image>
                    <Text style={{ color: 'white', fontSize: 12, letterSpacing: -0.5, marginTop: 6 }}>견적현황</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { logCheck('마이페이지'), setViewmenu(false) }}>
                  <View style={{ alignItems: "center" }}>
                    <Image source={mm4} style={{ width: 25, height: 25 }}></Image>
                    <Text style={{ color: 'white', fontSize: 12, letterSpacing: -0.5, marginTop: 4 }}>마이메뉴</Text>
                  </View>
                </TouchableOpacity>

              </View>
            </ImageBackground>

            <ScrollView style={{ maxHeight: chartHeight / 1.5 }} showsVerticalScrollIndicator={false}>
              <LeftMenu title={'전기&조명'} ></LeftMenu>
              <LeftMenu title={'수도'} ></LeftMenu>
              <LeftMenu title={'도배&장판'} ></LeftMenu>
              <LeftMenu title={'인테리어&리모델링'} ></LeftMenu>
              <LeftMenu title={'샷시&창호'} ></LeftMenu>
              <LeftMenu title={'청소'} ></LeftMenu>
              <LeftMenu title={'보일러&배관'} ></LeftMenu>
              <LeftMenu title={'건물외부'} ></LeftMenu>
              <LeftMenu title={'철거 및 처리'} ></LeftMenu>
              <LeftMenu title={'이사'} ></LeftMenu>
            </ScrollView>



          </View>

        </View>

      </Modal>


    </View>

  );
};

export default HeadHeder;