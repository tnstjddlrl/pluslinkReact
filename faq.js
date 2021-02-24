import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-community/async-storage'; //로그인한 아이디값 저장하기 위한 앱 내부 저장소
import axios from "axios";


const Faq = () => {

  const [text,setText] = useState('') //검색창용

  function refreshData(tableName) {
    axios.post('http://ip0131.cafe24.com/pluslink/json/jsonMember.php', JSON.stringify({
      id: tableName,
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
  }

  useEffect(()=>{
    refreshData('g5_faq_master')
    refreshData('g5_faq')
  },[])
 

  const [mList,setMlist] = useState([]);
  const [faqList,setFaqList] =useState([])

  async function GetMaster() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_faq_master.json');
    } catch (error) {
      console.log('에러 : ',error)
      return false;
    }
  }

  async function GetFaq() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_faq.json');
    } catch (error) {
      console.log('에러 : ',error)
      return false;
    }
  }

  useEffect(()=>{
    if(mList.length==0){
      GetMaster().then((res)=>{
      setMlist(res.data)
      console.log(list)
      })
    }
    if(faqList.length==0){
      GetFaq().then((res)=>{
      setFaqList(res.data)
      console.log(list)
      })
    }
  })

  var mm = []
  const MPush = () => {
    for(var i = 0;i<mList.length;i++){
      mm.push(<Menu sub={mList[i].fm_subject} fmid={mList[i].fm_id}></Menu>)
    }
    return mm
  }

  const Menu = (prop) =>{
    var oo = []

    const MMPush = () =>{
    for(var i = 0;i<faqList.length;i++){
      if(faqList[i].fm_id==prop.fmid){
        oo.push(<FaItem key={i} sub={faqList[i].fa_subject} cont={faqList[i].fa_content}></FaItem>)
      }
    }

    if(oo==[]){
      return <View><Text>등록된 FAQ가 없습니다.</Text></View>
    }
    return oo
  }

    return(
      <View style={{marginTop:20}}>
        <View style={{borderWidth:0.5,borderColor:'gray',height:30,justifyContent:"center",width:100,alignItems:"center"}}>
          <Text style={{color:'#9900cc'}}>{prop.sub}</Text>
        </View>

        <MMPush></MMPush>
      </View>
    )
  }

  const NewPush = () =>{
    var oo = []

    for(var i = 0;i<faqList.length;i++){
      if(faqList[i].fa_subject.indexOf(text)!=-1){
        oo.push(<FaItem key={i} sub={faqList[i].fa_subject} cont={faqList[i].fa_content}></FaItem>)
      }
    }

    if(oo==[]){
      return <View><Text>등록된 FAQ가 없습니다.</Text></View>
    }
    return oo
  }

  const find = require('./img/find.png')

  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView style={{backgroundColor:'white'}}>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>FAQ</  Text>
                      </View>

            <View style={{margin:10}}>
              <View style={{borderWidth:0.4,width:chartWidth-20,height:60,justifyContent:"center",backgroundColor:'#f2f2f2'}}>
                <View style={{flexDirection:"row",justifyContent:'space-between',width:chartWidth-40,marginLeft:10}}>
                  <View style={{flexDirection:"row"}}>
                  <View style={{width:30,height:30,backgroundColor:'#d9d9d9',borderTopWidth:0.4,borderBottomWidth:0.4,borderLeftWidth:0.4,justifyContent:"center",alignItems:"center"}}>
                    <Image style={{width:20,height:20}} source={find}></Image>
                  </View>
                  <View style={{width:chartWidth/2.3,height:30,borderWidth:0.4}}>
                    <TextInput onChangeText={(txt)=>setText(txt)} value={text} style={{width:chartWidth/2.3,height:40}}></TextInput>
                  </View>
                  </View>
                  <View style={{height:30,width:chartWidth/3,backgroundColor:'black',justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:'white',fontWeight:'bold'}}>검색하기</Text>
                  </View>
                </View>
              </View>

              {(text=='')  ? <MPush></MPush> : <NewPush></NewPush>}


            </View>


          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

const FaItem = (prop) =>{
  const [view,setView] = useState(false)
  var cont = prop.cont
  cont = cont.replace(/</g,"");
  cont = cont.replace(/>/g,"");
  cont = cont.replace(/p/g,"");
  cont = cont.replace("/","");
  return(
    <View>
      <TouchableOpacity onPress={() => setView(true)}>
      <View style={{flexDirection:"row",marginTop:10}}>
        <View style={{width:20,height:20,backgroundColor:'black',justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:'white'}}>+</Text>
        </View>

        <Text>{prop.sub}</Text>

      </View>
      <View style={{width:chartWidth-40,borderWidth:0.8,marginTop:5}}></View>
      </TouchableOpacity>

      <Modal visible={view} transparent={true}>
        <TouchableOpacity  onPress={() => setView(false)}>
          <View style={{justifyContent:"center",alignItems:"center"}}>
        <View style={{width:chartWidth-60,height:chartHeight/2,top:chartHeight/3,borderWidth:0.5,backgroundColor:'white'}}>
          <View style={{margin:20}}>
          <Text style={{fontSize:18,fontWeight:'bold'}}>질문 : {prop.sub}</Text>
          <Text style={{fontSize:15,marginTop:20}}>답변 : {cont}</Text>
          </View>
        </View>
        </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}


export default Faq;