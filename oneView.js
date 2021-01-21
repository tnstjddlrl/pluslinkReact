import React,{useState,useEffect} from 'react';
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

const user = require('./img/user.png')
const clock = require('./img/clock.png')

import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";

const OneView = ({route}) => {
  const navigation = useNavigation();

  const [OneList,setOneList] = useState([]);

    async function GetJson() {
      try {
        return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_qa_content.json');
      } catch (error) {
        console.log('에러 : ',error)
        return false;
      }
    }

    useEffect(()=>{
      if(OneList.length==0){
        GetJson().then((res)=>{
          setOneList(res.data)
        })
      }
    })

    var pushlist = []
    var anslist = []

    const ItemPush = () =>{
      var ans = 'no'
      var qadate = '';
      if(OneList.length != 0){
        for(var i =0;i<OneList.length;i++){
          if(OneList[i].qa_id==route.params.id){
            var date = OneList[i].qa_datetime
            date = date.substring(0,16)
            date = date.replace(/-/gi,'.')
            if(OneList[i].qa_file1 !=""){
              var file1 = OneList[i].qa_file1
            }else{
              var file1 = 'null'
            }
            if(OneList[i].qa_file2 !=""){
              var file2 = OneList[i].qa_file2
            }else{
              var file2 = 'null'
            }

            for(var j = 0; j<OneList.length; j++){
              if(OneList[i].qa_id==OneList[j].qa_parent){
                if(OneList[j].qa_type==1){
                  console.log('작동테스트')
                  ans = 'yes'
                  var qadate = OneList[j].qa_datetime
                  qadate = qadate.substring(0,16)
                  qadate = qadate.replace(/-/gi,'.')
                  pushlist.push(<Content ans={ans} anstitle={OneList[j].qa_subject} anscontent={OneList[j].qa_content} ansdate={qadate} title={OneList[i].qa_subject} content={OneList[i].qa_content} name={OneList[i].mb_id} hp={OneList[i].qa_hp} email={OneList[i].qa_email} date={date} file1={file1} file2={file2}></Content>)
                  break
                }
                else{
                  var ans = 'no'
                }
              }
            }
            if(ans=='no'){
              pushlist.push(<Content ans={ans} title={OneList[i].qa_subject} content={OneList[i].qa_content} name={OneList[i].mb_id} hp={OneList[i].qa_hp} email={OneList[i].qa_email} date={date} file1={file1} file2={file2}></Content>)
            }
          }
        }
      }
      return pushlist
    }

  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView style={{backgroundColor:'white'}}>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>1대1문의</Text>
                      </View>

            <ItemPush></ItemPush>
              
          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

const Content = (prop) => {
  return(
    <View>
    <View style={{flexDirection:'row',alignItems:'center',marginTop:30,marginLeft:20}}>
              {/* <View style={{backgroundColor:'gray',borderRadius:28,width:60,height:60}}></View> */}
                <Text style={{marginLeft:5,fontSize:20,fontWeight:'bold',marginBottom:20}}>{prop.title}</Text>
            </View>

            <View style={{marginLeft:10,marginTop:10}}>
              <View style={{width:chartWidth-20,borderWidth:0.4,borderColor:'gray'}}></View>
              <View style={{width:chartWidth-20,borderWidth:0.4,borderColor:'gray'}}></View>
                <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
                  <Image source={user} style={{width:10,height:10,}}></Image>
                  <Text style={{fontSize:13}}>{prop.name}</Text>
                  <Image source={user} style={{width:10,height:10,marginLeft:10}}></Image>
                  <Text style={{fontSize:13}}>{prop.hp}</Text>
                  <Image source={user} style={{width:10,height:10,marginLeft:10}}></Image>
                  <Text style={{fontSize:13}}>{prop.email}</Text>
                  <Image source={clock} style={{width:10,height:10 ,marginLeft:10}}></Image>
                  <Text style={{fontSize:13}}>{prop.date}</Text>
                </View>
                <View style={{width:chartWidth-20,borderWidth:0.4,borderColor:'gray'}}></View>
              <View style={{width:chartWidth-20,borderWidth:0.4,borderColor:'gray'}}></View>

              {prop.file1 != 'null' && <Image source={{uri:'https://pluslink.kr/data/qa/'+prop.file1}} style={{width:400,height:400,marginTop:15}}></Image>}
              {prop.file2 != 'null' && <Image source={{uri:'https://pluslink.kr/data/qa/'+prop.file1}} style={{width:400,height:400,marginTop:15}}></Image>}

                <Text style={{margin:15,fontSize:15}}>{prop.content}</Text>

                {prop.ans == 'yes' && <Ans ansTitle={prop.anstitle} anscontent={prop.anscontent} date={prop.ansdate}></Ans>}
                {prop.ans == 'no' && <NoAns></NoAns> }
      </View>
      </View>
  )
}

const Ans = (prop) => {
  return(
    <View>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:30}}>
        <Image source={user} style={{width:20,height:20}}></Image>
        <Text style={{backgroundColor:'white'}}>{prop.ansTitle}</Text>
        <View style={{marginLeft:5,height:7,width:chartWidth/1.13,backgroundColor:'#e6e6e6'}}></View>
      </View>
      <Text style={{margin:20}}>{prop.anscontent}</Text>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'flex-end',flex:1,marginRight:10}}>
        <Image source={clock} style={{width:15,height:15}}></Image>
        <Text>{prop.date}</Text>
      </View>
    </View>
  )
}

const NoAns = () =>{
  return(
    <View>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:30}}>
        <Image source={user} style={{width:20,height:20}}></Image>
        <Text style={{backgroundColor:'white'}}>문의에 대한 답변을 준비중입니다.</Text>
        <View style={{marginLeft:5,height:7,width:chartWidth/1.13,backgroundColor:'#e6e6e6'}}></View>
      </View>
      <Text style={{margin:20}}>답변이 등록될 때까지 잠시 기다려주시기 바랍니다.</Text>
      
    </View>
  )
}


export default OneView;