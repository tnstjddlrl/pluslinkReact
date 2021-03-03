import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const OneWrite = () => {
  const [select,setSelect] = useState(false)
  const [listCate,SetlistCate] = useState("선택하세요")

  const [email,setEmail] =useState('');
  const [hp,setHp] = useState('');
  const [title,setTitle] = useState('')
  const [content,setContent] =useState('')
  const [newid,setNewid] = useState('');
  const [nick,setNick] = useState('')

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
    if(memberList.length != 0 ){
      for(var i = 0;i<memberList.length;i++){
        if(memberList[i].mb_id == newid.toLowerCase()){
          setEmail(memberList[i].mb_email)
          setHp(memberList[i].mb_hp)
          setNick(memberList[i].mb_nick)
        }
      }
    }
  })

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


  function insert(){

    axios.post('http://ip0131.cafe24.com/pluslink/json/qaInsert.php', JSON.stringify({
      mb_id : newid.toLowerCase(),
      qa_name:nick,
      qa_email:email,
      qa_hp:hp,
      qa_category:listCate,
      qa_subject:title,
      qa_content:content,
    }))
    .then(function (response) {
      console.log('리스폰스 ',response.request._response);
      if(response.request._response=='succ'){
      alert('로그인 되었습니다.')
      fetchUser(id)
      console.log (isFavorite());
      navigation.navigate('홈');
      }
      else{
        alert(response.request._response)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const navigation = useNavigation();
  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView style={{backgroundColor:'white'}}>
          <View style={{marginBottom:100}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>1대1문의</Text>
                      </View>

            <View style={{margin:15}}>
              <View style={{borderWidth:0.3,width:chartWidth-30,borderColor:'gray'}}>
                <Text style={{margin:15}}>글작성</Text>
              </View>

              <TouchableOpacity onPress={()=>setSelect(true)}>
                            <View style={{borderWidth:0.7,marginTop:30,alignItems:"center",flexDirection:"row"}}>
                                <Text style={{margin:10}}>{listCate}</Text>
                                <Image source={arrow} style={{width:8,height:14,right:5,position:'absolute'}}></Image>
                            </View>
              </TouchableOpacity>

              <Text style={{marginTop:20}}>E-mail</Text>
              <TextInput
                style={{ height: 40,width:chartWidth-30,marginTop:10, borderColor: 'gray', borderWidth: 0.5}}
                onChangeText={text => setEmail(text)}
                placeholder='test@test.com'
                value={email}
              />

              <Text style={{marginTop:20}}>휴대폰</Text>
              <TextInput      
                style={{ height: 40,width:chartWidth-30,marginTop:10, borderColor: 'gray', borderWidth: 0.5 }}
                onChangeText={text => setHp(text)}
                placeholder='010-1234-1234'
                keyboardType='number-pad'
                value={hp}
              />

              <Text style={{marginTop:20}}>제목</Text>
              <TextInput      
                style={{ height: 40,width:chartWidth-30,marginTop:10, borderColor: 'gray', borderWidth: 0.5 }}
                onChangeText={text => setTitle(text)}
                value={title}
              />

              <TextInput      
                style={{ height: 150,width:chartWidth-30,marginTop:10, borderColor: 'gray', borderWidth: 0.5 }}
                onChangeText={text => setContent(text)}
                value={content}
                placeholder="내용을 입력해주세요."
                multiline={true}
              />

              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{insert(),navigation.navigate('1대1문의')}}>
                    <View style={{width:70,height:30,backgroundColor:'#db4dff',marginTop:15}}>
                        <Text style={{color:'white',margin:5,marginLeft:10,fontWeight:'900'}}>작성완료</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>navigation.navigate('1대1문의')}>
                    <View style={{width:40,height:30,backgroundColor:'black',marginTop:15,marginLeft:10}}>
                        <Text style={{color:'white',margin:5,marginLeft:8,fontWeight:'900'}}>목록</Text>
                    </View>
                </TouchableOpacity>
              </View>


            </View>

            

          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>


      <Modal  transparent={true} visible={select}>
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:300}}>
                        <TouchableOpacity onPress={()=>{SetlistCate('선택하세요'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>선택하세요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('회원'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>회원</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('포인트'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>포인트</Text>
                        </TouchableOpacity>
                    </View>
       </Modal>

    </View>
  )
}

export default OneWrite;