import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const MyPhoto = () => {
  const navigation = useNavigation()
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

  function del(){
    axios.post('http://ip0131.cafe24.com/pluslink/json/delPhoto.php', JSON.stringify({
      id: newid,
    }))
      .then(function (response) {
        console.log('리스폰스 ', response);
        if (response.request._response == 'suc') {
          Alert.alert('로그인 되었습니다.')
          fetchUser(id)
          console.log(isFavorite());
          navigation.navigate('홈');
        }
        else {
          console.log(response.request._response)
          navigation.goBack()
          Alert.alert('삭제되었습니다.')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function insert(){
    axios.post('http://ip0131.cafe24.com/pluslink/json/insertPhoto.php', JSON.stringify({
      id: newid,
      img:response.base64
    }))
      .then(function (response) {
        console.log('리스폰스 ', response);
        if (response.request._response == 'suc') {
          Alert.alert('로그인 되었습니다.')
          fetchUser(id)
          console.log(isFavorite());
          navigation.navigate('홈');
        }
        else {
          console.log(response.request._response)
          navigation.goBack()
          Alert.alert('등록되었습니다.')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  
  }

  const [isUri,setIsUri] = useState(true)
  const [response, setResponse] = React.useState(null);

  function loadFail (){
    setTimeout(() => {
      setIsUri(false)
    }, 200);
  }

  function loadsucc (){
    setTimeout(() => {
      setIsUri(true)
    }, 200);
  }

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
                <Image style={{ height: 250, width: 250, borderRadius: 150, }} onError={()=>loadFail()}  source={{ uri: 'https://pluslink.kr/data/member_image/' + newid.substr(0, 2) + '/' + newid + '.gif' }} ></Image>
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
                    //console.log(response)
                    // console.log(JSON.stringify(response))
                  },
                )
              }>
                <View style={{ marginTop: 15, marginBottom: 15, borderWidth: 0.5, width: 80, height: 30, alignItems: 'center' }}>
                  <Text style={{ marginTop: 5 }}>사진선택</Text>
                </View>
              </TouchableOpacity>

              {response && (
                <View>
                  <View>
                    <Image
                      style={{ width: response.width, height: response.height }}
                      source={{ uri: response.uri }}
                    />
                  </View>
                </View>
              )}

              <View style={{flexDirection:"row",marginTop:30}}>
                {isUri &&<TouchableOpacity onPress={()=>{del()}}>
                <View style={{width: 50,height:40,backgroundColor:'rgb(157,157,149)',justifyContent:"center",alignItems:"center",borderRadius:6}}>
                  <Text style={{fontSize:15,fontWeight:"bold"}}>삭제</Text>
                </View>
                </TouchableOpacity>}

                {response &&
                  <View style={{flexDirection:"row"}}>
                  <TouchableOpacity onPress={()=>{insert()}}>
                  <View style={{width: 50,height:40,backgroundColor:'rgb(125,50,184)',justifyContent:"center",alignItems:"center",marginLeft:5,borderRadius:6}}>
                    <Text style={{fontSize:15,color:'white',margin:5,fontWeight:'bold'}}>등록</Text>
                  </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                  <View style={{width: 50,height:40,backgroundColor:'black',justifyContent:"center",alignItems:"center",marginLeft:5,borderRadius:6}}>
                    <Text style={{fontSize:15,color:'white',margin:5,fontWeight:'bold'}}>취소</Text>
                  </View>
                  </TouchableOpacity>
                  </View>
                }
              </View>

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