import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';


const MyPhoto = () => {

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

  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth }}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={{ marginBottom: 100 }}>
            <View style={{ width: chartWidth, marginTop: 50 }}>
              <ImageBackground source={event} style={{ width: chartWidth, height: chartHeight / 7 }}>
              </ImageBackground>
              <Text style={{ position: 'absolute', color: "white", fontSize: 20, fontWeight: 'bold', top: 40, left: 10 }}>My photo</Text>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={{ borderWidth: 1, height: 250, width: 250, borderRadius: 150, backgroundColor: 'white', marginTop: 20 }}>
                <Image style={{ height: 250, width: 250, borderRadius: 150, }} source={{ uri: 'https://pluslink.kr/data/member_image/' + newid.substr(0, 2) + '/' + newid + '.gif' }}></Image>
              </View>

              <Text style={{ marginTop: 10 }}>회원사진은 이미지(gif/jpg/png) 파일만 가능합니다</Text>
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

export default MyPhoto;