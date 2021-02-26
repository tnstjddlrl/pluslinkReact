import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,TextInput
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
  const navigation = useNavigation()
  const [newid, setNewid] = useState('');
  const [star,setStar] =useState(1)
  
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
    const result = isFavorite().then((company_id) => {
      setNewid(company_id.toLowerCase())
    });
    for (var i = 0; i < memberList.length; i++) {
      if (memberList[i].mb_id == newid) {
        setName(memberList[i].mb_name)
        setPss(memberList[i].mb_password)
        break
      } else {
        setName(newid)
      }
    }
  })





  

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
    axios.post('http://ip0131.cafe24.com/pluslink/json/insertReview.php', JSON.stringify({
      no:route.params.no,
      partner:route.params.patner,
      star:star,
      mb_id:newid,
      mb_password:pss,
      content:content,
      name:name
    }))
      .then(function (response) {
        console.log('리스폰스 ', response.request._response);
        if (response.request._response == 'succ') {
        }
        else {
          console.log(response.request._response)
          navigation.goBack()
          Alert.alert('리뷰가 작성되었습니다!')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const starimg = require('./img/review.png')

  const Stars = ()=>{
    return(
      <Image source={starimg} style={{ width: 30, height: 30 }}></Image>
    )
  }

  const StarPush = () =>{
    var pp = []
    for(var i = 0; i<star; i++){
      pp.push(<Image source={starimg} style={{ width: 30, height: 30 }}></Image>)
    }

    return pp
  }
 
  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth }}>
        <ScrollView>
          <View style={{ marginBottom: 100 }}>
            <View style={{ width: chartWidth, marginTop: 50 }}>
              <ImageBackground source={event} style={{ width: chartWidth, height: chartHeight / 7 }}>
              </ImageBackground>
              <Text style={{ position: 'absolute', color: "white", fontSize: 20, fontWeight: 'bold', top: 40, left: 10 }}>리뷰쓰기</Text>
            </View>

            <View style={{ margin: 10 }}>
              <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>별점</Text>
              <TouchableOpacity onPress={()=>{if(star == 5){setStar(1)}else{setStar(star+1)}}}>
              <View style={{ flexDirection: "row", margin: 10,alignItems:"center" }}>
                <StarPush></StarPush>
                <Text style={{fontSize:20,marginLeft:10}}>{star}점</Text>
              </View>
              </TouchableOpacity>

              <Text style={{ margin: 10, fontSize: 20, fontWeight: 'bold' }}>내용</Text>
              <View style={{width:chartWidth-40,height:300,borderWidth:0.5,borderColor:'gray',marginLeft:10}}>
                <TextInput style={{width:chartWidth-40,height:300}} onChangeText={(txt) => setContent(txt)} value={content} multiline={true}></TextInput>
              </View>

              <View style={{flexDirection:"row",justifyContent:"center",marginTop:20}}>
                <TouchableOpacity onPress={()=>write()}>
                <View style={{width:80,height:35,backgroundColor:'#c61aff',justifyContent:"center",alignItems:"center"}}>
                  <Text style={{margin:5,color:'white'}}>작성하기</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <View style={{width:60,height:35,backgroundColor:'black',justifyContent:"center",alignItems:"center",marginLeft:5}}>
                  <Text style={{margin:5,color:'white'}}>취소</Text>
                </View>
                </TouchableOpacity>
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

export default WriteReview;