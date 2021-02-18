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
  Linking
} from "react-native";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios'


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

  const result = isFavorite().then((company_id) => {
    setNewid(company_id)
  });

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
  if (os == 'ios') {
    nowheight = 1.11;
    mata = 35;
  } else {
    nowheight = 1.08;
    mata = 0;
  }
  useEffect(() => {
    console.log(os)
    console.log(nowheight)
    console.log('헤더 콘솔 체크: ', newid)
  }, [])


  return (
    <View>
      <View style={{ flex: 1 }}>
        <View style={{ borderWidth: 1, position: 'absolute', width: chartWidth + 15, left: -2, bottom: (chartHeight / nowheight), height: 100, marginTop: 100, flexDirection: 'row', backgroundColor: 'white' }}>

          <TouchableOpacity activeOpacity={0.5} onPress={() => { setViewmenu(true) }} style={{ top: 30, left: 10 }}>
            <Image
              source={logo2}
              style={{ width: 40, height: 35, marginTop: 20 }}
            />
          </TouchableOpacity>
          <View style={{ left: chartWidth / 3, height: 30, width: 40, top: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate('홈')}>
              <Image source={testlogo} style={{ width: 40, height: 34, marginTop: 35, }}>
              </Image>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => { Linking.openURL('https://pluslink.kr/shop/') }}>
            <View style={{
              left: chartWidth / 1.8, top: 50, width: 75, height: 35, backgroundColor: '#b84dff',
              borderTopLeftRadius: 17,
              borderTopRightRadius: 17,
              borderBottomLeftRadius: 17,
              borderBottomRightRadius: 17,
            }}>
              <Text style={{ width: 65, height: 70, marginLeft: 10, marginTop: 8, color: 'white', fontWeight: 'bold' }}>
                PnL Mall
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>




      <Modal transparent={true} visible={viewmenu}>
        <View style={{ width: chartWidth / 1.45, height: chartHeight, position: 'absolute', backgroundColor: 'gray' }}>
          <View>
            <ImageBackground source={graBox} style={{ width: chartWidth / 1.45, height: 220 }}>
              <View style={{ marginTop: mata }}>

                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, alignItems: 'center' }}>
                  <View style={{ backgroundColor: 'white', width: 50, height: 50, borderRadius: 28 }}></View>
                  <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{newid}</Text>

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

                    <TouchableOpacity onPress={() => { fetchUser('로그인해주세요'), setViewmenu(false), navigation.navigate('홈') }}>
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

            <TouchableOpacity onPress={() => { navigation.navigate('업체목록', { cate: '전기&조명' }), setViewmenu(false) }}>
              <View style={{ width: chartWidth / 1.45, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 15 }}>전기&조명</Text>
                <Image source={arrow} style={{ position: 'absolute', right: 10, }}></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('업체목록', { cate: '수도' }), setViewmenu(false) }}>
              <View style={{ width: chartWidth / 1.45, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 15 }}>수도</Text>
                <Image source={arrow} style={{ position: 'absolute', right: 10, }}></Image>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('업체목록', { cate: '도배&장판' }), setViewmenu(false) }}>
              <View style={{ width: chartWidth / 1.45, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 15 }}>도배&장판</Text>
                <Image source={arrow} style={{ position: 'absolute', right: 10, }}></Image>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('업체목록', { cate: '인테리어' }), setViewmenu(false) }}>
              <View style={{ width: chartWidth / 1.45, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 15 }}>인테리어</Text>
                <Image source={arrow} style={{ position: 'absolute', right: 10, }}></Image>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('업체목록', { cate: '샷시&창호' }), setViewmenu(false) }}>
              <View style={{ width: chartWidth / 1.45, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 15 }}>샷시&창호</Text>
                <Image source={arrow} style={{ position: 'absolute', right: 10, }}></Image>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('업체목록', { cate: '청소&철거' }), setViewmenu(false) }}>
              <View style={{ width: chartWidth / 1.45, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 15 }}>청소&철거</Text>
                <Image source={arrow} style={{ position: 'absolute', right: 10, }}></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('업체목록', { cate: '보일러&배관' }), setViewmenu(false) }}>
              <View style={{ width: chartWidth / 1.45, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 15 }}>보일러&배관</Text>
                <Image source={arrow} style={{ position: 'absolute', right: 10, }}></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('업체목록', { cate: '건물외부' }), setViewmenu(false) }}>
              <View style={{ width: chartWidth / 1.45, height: 50, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ margin: 15, fontWeight: 'bold', fontSize: 15 }}>건물외부</Text>
                <Image source={arrow} style={{ position: 'absolute', right: 10, }}></Image>
              </View>
            </TouchableOpacity>



          </View>

        </View>

      </Modal>


    </View>

  );
};

export default HeadHeder;