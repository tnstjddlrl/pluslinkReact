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
import { ScrollView } from "react-native-gesture-handler";


const logo = { uri: "https://pluslink.kr/img/pluslink/logo.png" };
const logo2 = { uri: "https://pluslink.kr/img/menu.png" };
const testlogo = require('./img/logo.png')
const graBox = require('./img/gradation.jpg')

const ffimg = require('./img/b01.png')
const ffimg2 = require('./img/b02.png')
const ffimg3 = require('./img/b03.png')
const ffimg4 = require('./img/b04.png')
const arrow = require('./img/arrow02.png')

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
      <TouchableOpacity onPress={() => { navigation.navigate('업체목록', { cate: prop.title, subcate: prop.text }), setViewmenu(false) }}>
        <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 5, fontSize: 15 }}>{prop.text}</Text>
      </TouchableOpacity>
    )
  }


  const LeftMenu = (prop) => {
    const [test, setTest] = useState(false)
    const [tcolor, setTcolor] = useState('black')
    const List = () => {
      var ll = []
      var subll = []

      for (var i = 0; i < cateList.length; i++) {
        if (cateList[i].category == prop.title && cateList[i].subcategory != '') {
          subll.push(cateList[i].subcategory)
        }
      }
      for (var i = 0; i < subll.length; i++) {
        ll.push(<MenuChild key={i} text={subll[i]} title={prop.title}></MenuChild>)
      }
      return ll
    }

    function view() {
      if (test) { setTest(false) } else { setTest(true) }
    }
    function colcol() {
      if (tcolor == 'black') { setTcolor('#ac00e6') } else { setTcolor('black') }
    }

    return (
      <View>
        <TouchableOpacity onPress={() => { view(), colcol() }}>
          <View style={{ width: chartWidth / 1.45, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 15, color: tcolor }}>{prop.title}</Text>
            <Image source={arrow} style={{ position: 'absolute', right: 10, }}></Image>
          </View>
        </TouchableOpacity>
        {test && <View style={{ backgroundColor: '#e6e6e6' }}><List></List></View>}
      </View>
    )
  }


  return (
    <View>
      <View style={{ justifyContent: 'space-between', alignItems: "flex-end", borderWidth: 1, position: 'absolute', width: chartWidth + 15, left: -2, bottom: (chartHeight - nnee), height: 120, flexDirection: 'row', backgroundColor: 'white' }}>

        <TouchableOpacity activeOpacity={0.5} onPress={() => { setViewmenu(true) }} style={{ left: 10 }}>
          <View style={{ width: 75, marginBottom: 15 }}>
            <Image
              source={logo2}
              style={{ width: 30, height: 25 }}
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
            width: 75, height: 35, backgroundColor: '#b84dff',
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




      <Modal transparent={true} visible={viewmenu}>
        <View style={{ width: chartWidth / 1.45, height: chartHeight, position: 'absolute', backgroundColor: 'white' }}>
          <View>
            <ImageBackground source={graBox} style={{ width: chartWidth / 1.45, height: 220 }}>
              <View style={{ marginTop: mata }}>

                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, alignItems: 'center' }}>
                  <View style={{ backgroundColor: 'white', width: 50, height: 50, borderRadius: 28 }}>
                    <Image source={{ uri: 'https://pluslink.kr/data/member_image/' + newid.substr(0, 2) + '/' + newid + '.gif' }} style={{ width: 50, height: 50, borderRadius: 28 }}></Image>
                  </View>
                  <Text style={{ fontWeight: 'bold', marginLeft: 10, color: 'white', fontSize: 18 }}>{name}</Text>

                  <TouchableOpacity onPress={() => setViewmenu(false)} style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 27, right: 10, top: -10, position: 'absolute' }}>
                    <View style={{ width: 50, height: 50, left: 0 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 25, alignSelf: 'center', marginTop: 10 }}>X</Text>
                    </View>
                  </TouchableOpacity>
                </View>



                {newid == '로그인해주세요' ? <View style={{ flexDirection: 'row', marginTop: 25, marginLeft: 10 }}>
                  <TouchableOpacity onPress={() => { navigation.navigate('로그인'), setViewmenu(false) }}>
                    <View style={{ backgroundColor: 'white', width: chartWidth / 3.5, height: 40, borderRadius: 5 }}>
                      <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 15 }}>로그인</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { navigation.navigate('회원가입'), setViewmenu(false) }}>
                    <View style={{ backgroundColor: 'white', width: chartWidth / 3.5, height: 40, borderRadius: 5, marginLeft: 10 }}>
                      <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 15 }}>회원가입</Text>
                    </View>
                  </TouchableOpacity>
                </View> : <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('정보변경'), setViewmenu(false) }}>
                      <View style={{ backgroundColor: 'white', width: chartWidth / 3.5, height: 40, borderRadius: 5 }}>
                        <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 15 }}>정보변경</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { fetchUser('로그인해주세요'), setViewmenu(false), navigation.navigate('홈'), setName('로그인해주세요') }}>
                      <View style={{ backgroundColor: 'white', width: chartWidth / 3.5, height: 40, borderRadius: 5, marginLeft: 10 }}>
                        <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 15 }}>로그아웃</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                }

              </View>

              <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', }}>
                <TouchableOpacity onPress={() => { navigation.navigate('홈'), setViewmenu(false) }}>
                  <View>
                    <ImageBackground source={ffimg} style={{ width: 65, height: 65, }}>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { logCheck('견적의뢰'), setViewmenu(false) }}>
                  <View>
                    <ImageBackground source={ffimg2} style={{ width: 65, height: 65 }}>
                    </ImageBackground>
                  </View>
                </TouchableOpacity >
                <TouchableOpacity onPress={() => { logCheck('견적현황'), setViewmenu(false) }}>
                  <View>
                    <ImageBackground source={ffimg3} style={{ width: 65, height: 65 }}>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { logCheck('마이페이지'), setViewmenu(false) }}>
                  <View>
                    <ImageBackground source={ffimg4} style={{ width: 65, height: 65 }}>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>

              </View>
            </ImageBackground>

            <ScrollView>
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