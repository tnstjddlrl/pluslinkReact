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
  Alert,
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
const InfoChange = () => {
  const navigation = useNavigation()
  const [newid,setNewid] = useState('');
  
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

    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
  const [hp, setHp] = useState('')
  const [pwd, setPwd] = useState('')
  const [cpwd, setCpwd] = useState('')

  useEffect(() => {
   
      for (var i = 0; i < memberList.length; i++) {
        if (memberList[i].mb_id == newid) {
          setEmail(memberList[i].mb_email)
          setHp(memberList[i].mb_hp)
          setName(memberList[i].mb_name)
        }
      }
    
  })

    

    function changeData(){

      if(pwd == '' || cpwd == '' || email == ''|| hp  == ''){
        Alert.alert('모든 칸을 전부 채워주세요!')
        return
      }else if(pwd != cpwd){
        Alert.alert('비밀번호가 서로 다릅니다!')
        return
      }

      axios.post('http://ip0131.cafe24.com/pluslink/json/updateMember.php', JSON.stringify({
        id : newid,
        password : pwd,
        email:email,
        hp:hp
      }))
      .then(function (response) {
        console.log('리스폰스 ',response);
        if(response.request._response=='suc'){
        alert('로그인 되었습니다.')
        fetchUser(id)
        console.log (isFavorite());
        navigation.navigate('홈');
        }
        else{
          alert('변경되었습니다.')
          navigation.navigate('홈');
          count = 0
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
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>정보변경</Text>
                      </View>

              <View style={{margin:15,borderWidth:1,width:chartWidth-30,borderColor:'#cccccc'}}>
                <Text style={{margin:10,fontWeight:'bold'}}>이용정보입력</Text>
                <View style={{borderColor:'#cccccc',borderWidth:1,width:chartWidth-30,borderColor:'#cccccc'}}></View>
                <Text style={{marginLeft:10,marginTop:15,fontWeight:'bold'}}>아이디</Text>
                <View style={{borderWidth:1,borderColor:'#cccccc',width:chartWidth-50,marginLeft:10,marginTop:5,backgroundColor:'#ffcccc'}}>
                  <Text style={{margin:10,fontWeight:'100'}}>{newid}</Text>
                </View>
                <Text style={{marginLeft:10,marginTop:15,fontWeight:'bold'}}>비밀번호</Text>
                <TextInput onChangeText={(text)=>setPwd(text)} value={pwd} style={{borderWidth:1,borderColor:'#cccccc',width:chartWidth-50,height:35,marginLeft:10,marginTop:5,}}></TextInput>
                <Text style={{marginLeft:10,marginTop:15,fontWeight:'bold'}}>비밀번호 확인</Text>
                <TextInput onChangeText={(text)=>setCpwd(text)} value={cpwd} style={{borderWidth:1,borderColor:'#cccccc',width:chartWidth-50,height:35,marginLeft:10,marginTop:5,}}></TextInput>
                <Text style={{marginLeft:10,marginTop:15,fontWeight:'bold'}}>E-mail</Text>
                <TextInput onChangeText={(text)=>setEmail(text)} value={email} style={{borderWidth:1,borderColor:'#cccccc',width:chartWidth-50,height:35,marginLeft:10,marginTop:5,marginBottom:20}}></TextInput>
              </View>

              <View style={{margin:15,borderWidth:1,width:chartWidth-30,borderColor:'#cccccc'}}>
                <Text style={{margin:10,fontWeight:'bold'}}>본인확인</Text>
                <View style={{borderColor:'#cccccc',borderWidth:1,width:chartWidth-30,borderColor:'#cccccc'}}></View>
                <Text style={{marginLeft:10,marginTop:15,fontWeight:'bold'}}>이름</Text>
                <View style={{borderWidth:1,borderColor:'#cccccc',width:chartWidth-50,marginLeft:10,marginTop:5,backgroundColor:'#ffcccc'}}>
                  <Text style={{margin:10,fontWeight:'100'}}>{name}</Text>
                </View>
                <Text style={{marginLeft:10,marginTop:15,fontWeight:'bold'}}>휴대폰번호</Text>
                <TextInput onChangeText={(text)=>setHp(text)} value={hp} style={{borderWidth:1,borderColor:'#cccccc',width:chartWidth-50,height:35,marginLeft:10,marginTop:5,marginBottom:15}}></TextInput>
                
              </View>
              <View style={{flexDirection:'row',alignSelf:'center'}}>
              <TouchableOpacity onPress={()=>navigation.navigate('회원탈퇴체크')}>
                <View style={{borderWidth:0.5,borderColor:'gray',height:35,}}>
                  <Text style={{alignSelf:'center',margin:10}}>회원탈퇴</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>changeData()}>
                <View style={{backgroundColor:"#d24dff",width:70,height:35,}}>
                  <Text style={{color:'white',alignSelf:'center',marginTop:10}}>정보수정</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('홈')}>
                <View style={{backgroundColor:"#404040",width:50,height:35,}}>
                  <Text style={{color:'white',alignSelf:'center',marginTop:10}}>취소</Text>
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

export default InfoChange;