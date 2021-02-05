import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const SigongCancel = ({route}) =>{
  const navigation = useNavigation()
  const [cancelText,setCancelText] = useState('')

  function CancelData() {
    axios.post('http://ip0131.cafe24.com/pluslink/json/sigonCancel.php', JSON.stringify({
      id: route.params.id,
      add_id: route.params.newid,
      content: cancelText
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
    Alert.alert('취소가 완료되었습니다.')
    navigation.navigate('홈')
  }

  return(
    <View style={{ width: chartWidth - 40, height: chartHeight - 100, top: 60, backgroundColor: 'white', marginLeft: 20, borderWidth:0.5 }}>
            <View style={{ flexDirection: 'row', width: chartWidth - 40, justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ marginTop: 10, marginRight: 15, fontSize: 25, fontWeight: 'bold' }}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: chartWidth - 100, marginLeft: 30, }}>
              <Text style={{ fontWeight: 'bold', marginTop: 30, marginBottom: 15 }}>취소사유</Text>
              <View style={{ borderWidth: 0.5, borderColor: 'gray' }}>
                <TextInput style={{ width: chartWidth - 100, height: 200 }} multiline={true} onChangeText={(text)=>setCancelText(text)} value={cancelText}></TextInput>
              </View>
              <Text style={{ color: 'red', fontWeight: 'bold',marginTop:10 }}># 취소시 고객 또는 업체의 동의 후 취소 및 환불이 진행됩니다.</Text>
              <View style={{ width: chartWidth - 100, backgroundColor: '#e6e6e6', marginTop: 20 }}>
                <View style={{margin:10}}>
                  <Text style={{fontWeight:'bold'}}>환불규정</Text>
                  <Text style={{fontWeight:'200',marginTop:20,width: chartWidth - 100}}>현재 견적의 취소수수료 : {route.params.price}원</Text>
                  <Text style={{fontWeight:'200',marginTop:10,width: chartWidth - 100}}>현재 견적의 방문 요청일 : {route.params.date}</Text>
                  <Text style={{fontWeight:'200',marginTop:10,width: chartWidth - 100}}>낙찰 당일 취소 {">"} 취소수수료 없음(0원)</Text>
                  <Text style={{fontWeight:'200',marginTop:10,width: chartWidth - 100}}>(업체 방문전) 2일 이상 {">"} 취소수수료 없음(0원)</Text>
                  <Text style={{fontWeight:'200',marginTop:10,width: chartWidth - 100}}>(업체 방문전) 1일전 {">"} 취소수수료 50%({route.params.price / 2}원)</Text>
                  <Text style={{fontWeight:'200',marginTop:10,width: chartWidth - 100}}>(업체 방문전) 당일취소 {">"} 취소수수료 100%({route.params.price}원)</Text>
                  <Text style={{fontWeight:'200',marginTop:10,width: chartWidth - 100}}>(업체 방문후) 소비자과실 {">"} 취소수수료 100%({route.params.price}원)</Text>
                  <Text style={{fontWeight:'200',marginTop:10,width: chartWidth - 100}}>(업체 방문후) 업체과실 {">"} 취소수수료 없음(0원)</Text>
                </View>
              </View>
              <TouchableOpacity onPress={()=>CancelData()}>
                <View style={{width:chartWidth-100,justifyContent:'center',alignItems:'center',backgroundColor:'#df80ff',marginTop:20}}>
                  <Text style={{color:'white',margin:15,fontWeight:'bold'}}>확인</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
  )
}

export default SigongCancel