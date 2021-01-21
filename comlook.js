import React,{useState,Component,useEffect} from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  AppRegistry,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'
import { useNavigation } from '@react-navigation/native';
import ComSigong from './Component1.js'
import TestCom from './Component0.js';
import FootTer from './footer.js'
import HeadHeder from "./header.js";


import axios from "axios";

const starimg =require('./img/review.png')
const heart = require('./img/handhart.png')


//=========================업체 자세히보기=============================
const ComLook=({route})=>{
    const navigation = useNavigation();

    async function GetExpertise() {
      try {
        return await axios.get('http://ip0131.cafe24.com/pluslink/json/expertise.json');
      } catch (error) {
        console.log('에러 : ',error)
        return false;
      }
    }
    async function GetPatners() {
      try {
        return await axios.get('http://ip0131.cafe24.com/pluslink/json/partners.json');
      } catch (error) {
        console.log('에러 : ',error)
        return false;
      }
    }
    async function GetMember() {
      try {
        return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_member.json');
      } catch (error) {
        console.log('에러 : ',error)
        return false;
      }
    } 

    const [patners,setPatners]=useState([])
  const [expertise,setExpertise]=useState([])
  const [memberList,setMemberList] = useState([])
  useEffect(()=>{
    if(expertise.length==0){
      GetExpertise().then((res)=>{
      setExpertise(res.data)
      })
    }
    if(patners.length==0){
      GetPatners().then((res)=>{
        setPatners(res.data)
      })
    }
    if(memberList.length==0){
      GetMember().then((res)=>{
      setMemberList(res.data)
      })
    }
  })

    var List = []
    const PushItem=()=>{
      if(expertise.length!=0 &&patners.length!=0&&memberList!=0){
        for(var i =0;i<patners.length;i++){
          if(patners[i].mb_id==route.params.id){
            for(var j =0;j<memberList.length;j++){
              if(patners[i].mb_id==memberList[j].mb_id){
                List.push(<Content name={patners[i].pt_name} star={patners[i].pt_score} content={memberList[j].mb_profile} img={patners[i].mb_id}></Content>)
              }
            }
            
          }
        }
      }
      
      return List
    }
    

    return(
      <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      
            <PushItem></PushItem>

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
      <View style={{marginTop:100,marginLeft:20}}>
        <Image source={{uri:'https://pluslink.kr/data/member_image/'+prop.img.substring(0,2) +'/'+prop.img+'.gif'}} style={{width:chartWidth-40, height:200, borderRadius:15,backgroundColor:'gray'}}></Image>
        <View style={{flexDirection:'row' , alignItems:'center'}}>
          <Image source={heart} style={{width:50,height:50,borderRadius:28}}></Image>
          <Text style={{fontSize:18,marginLeft:10}}>{prop.name}</Text>
          <Image source={starimg} style={{width:25,height:25,marginLeft:10}}></Image>
          <Text style={{fontSize:18,marginLeft:10}}>{prop.star}</Text>
        </View>

        <Text style={{margin:10,width:chartWidth-60}}>{prop.content.replace(/\r\n/g, '')}</Text>

        <View style={{flexDirection:'row',marginTop:10,justifyContent:'center'}}>
          <View style={{width:90,height:40, backgroundColor:'black',borderRadius:28,marginRight:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white',fontWeight:'bold'}}>시공사례</Text>
          </View>
          <View style={{width:90,height:40, backgroundColor:'#d9d9d9',borderRadius:28,marginLeft:10,marginBottom:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontWeight:'bold'}}>리뷰</Text>
          </View>
        </View>
        <View style={{width:chartWidth-40,borderWidth:0.5,borderColor:'gray'}}></View>
      </View>
    )
  }
  
  export default ComLook;
  
  //=====================================================================