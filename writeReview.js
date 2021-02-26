import React, { useState,useEffect } from 'react';
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

import AsyncStorage from '@react-native-community/async-storage'; //로그인한 아이디값 저장하기 위한 앱 내부 저장소
import axios from "axios";


const WriteReview = ({route}) => {
  const [newid, setNewid] = useState('');
  const [star,setStar] =useState(0)
  
  const [content,setContent] = useState('')
  const [name,setName] = useState('')
  const [pss,setPss] =useState('')

  async function isFavorite() {
    try {
      return await AsyncStorage.getItem("@super:id");
    } catch (error) {
      return false;
    }
  } //아이디값 가져오기

  useEffect(() => {
    if(newid == ''){
    const result = isFavorite().then((company_id) => {
        setNewid(company_id.toLowerCase());
        console.log('새 : ', company_id);
        console.log('새새 : '+newid)
    });
  }
  },[])





  

  async function GetMember() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_member.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }

  const [memberList, setMemberList] = useState([])
  useEffect(() => {
    if (memberList.length == 0) {
      GetMember().then((res) => {
        setMemberList(res.data)
      })
    }
  })

  useEffect(()=>{
    if(pss == '' || name == ''){
      for(var i = 0;i<memberList.length;i++){
        if(memberList[i].mb_id == newid){
          setPss(memberList[i].mb_password)
          setName(memberList[i].mb_name)
          Alert.alert(pss + name)
          break
        }
      }
    }
  },[])
 

  function write(){
    axios.post('http://ip0131.cafe24.com/pluslink/json/insertConmment.php', JSON.stringify({
      no:route.params.no,
      partner:route.params.patner,
      star:star,
      mb_id:newid,
      mb_password:pss,
      wr_content:content,
      wr_namename:name
    }))
      .then(function (response) {
        console.log('리스폰스 ', response.request._response);
        if (response.request._response == 'succ') {
        }
        else {
          console.log(response.request._response)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  


  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>리뷰쓰기</Text>
                      </View>


          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

export default WriteReview;