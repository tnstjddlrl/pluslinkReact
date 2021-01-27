import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

const PasswordCheck = () => {

  function refreshData(tableName){
    axios.post('http://ip0131.cafe24.com/pluslink/json/jsonMember.php', JSON.stringify({
      id : tableName,
    }))
    .then(function (response) {
      console.log('리스폰스 ',response);
      if(response.request._response=='suc'){
      }
      else{
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  refreshData('g5_member')

  const [newid,setNewid] = useState('');
  const [pwd,setPwd] = useState('')

    async function isFavorite() {
      try {
        return await AsyncStorage.getItem("@super:id");
      } catch (error) {
        return false;
      }
    }
    
      const result = isFavorite().then((company_id) => {
        setNewid(company_id.toLowerCase())
        console.log(company_id)
      });

      async function GetMember() {
        try {
            console.log('겟멤버 작동됨')
          return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_member.json');
        } catch (error) {
          console.log('에러 : ',error)
          return false;
        }
      }
      
      const [memberList,setMemberList] = useState([]);
      useEffect(()=>{
        if(memberList.length==0){
            console.log('작동테스트')
          GetMember().then((res)=>{
            setMemberList(res.data)
            })
        }
      })

      function pwCheck(){
        axios.post('http://ip0131.cafe24.com/pluslink/json/memberJson.php', JSON.stringify({
          id : newid,
          password : pwd
        }))
        .then(function (response) {
          console.log('리스폰스 ',response);
          if(response.request._response=='suc'){
          alert('확인되었습니다.')
          navigation.navigate('정보변경2')
          }
          else{
            alert('아이디 또는 비밀번호를 확인해주세요')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }


  const [value, onChangeText] = React.useState('');//textinput용
  const navigation = useNavigation();
  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>비밀번호확인</Text>
                      </View>

            <View style={{margin:10,marginTop:30,borderWidth:1,width:chartWidth-20}}>
              <Text style={{fontSize:16,margin:15,fontWeight:'bold'}}>회원 비밀번호 확인</Text>
              <Text style={{fontSize:14,marginTop:15,marginLeft:15}}>비밀번호를 한번 더 입력해주세요.</Text>
              <Text style={{fontSize:12,marginLeft:15,marginTop:5}}>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 한번더 확인합니다.</Text>

            <Text style={{fontSize:14,marginTop:15,marginLeft:15}}>회원아이디 : {newid}</Text>
              <TextInput      
                style={{ height: 40,width:chartWidth-50,marginLeft:15,marginTop:10,marginBottom:20, borderColor: 'gray', borderWidth: 0.5 }}
                onChangeText={text => setPwd(text)}
                value={pwd}
              />
              <TouchableOpacity onPress={()=>pwCheck()}>
              <View style={{margin:15,width:chartWidth-50,backgroundColor:'#d11aff'}}>
                <Text style={{color:"white",margin:15,alignSelf:'center',fontWeight:'bold'}}>확인하기</Text>
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

export default PasswordCheck;