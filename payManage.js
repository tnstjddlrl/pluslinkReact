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
const starimg =require('./img/review.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";

const PayManage = () => {
  const [newid,setNewid] = useState('');
  
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

      

  async function GetBidding() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/bidding.json');
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

  async function GetWrite() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/g5_estimate_write.json');
    } catch (error) {
      console.log('에러 : ',error)
      return false;
    }
  }
      const [Blist,setBList] = useState([]);
      const [memberList,setMemberList] = useState([]);
      const [Wlist,setWList] = useState([]);
  useEffect(()=>{
    if(memberList.length==0){
        GetMember().then((res)=>{
        setMemberList(res.data)
        })
    }
    if(Blist.length==0){
        GetBidding().then((res)=>{
        setBList(res.data)
        console.log(Blist)
        })
      }
      if(Wlist.length==0){
        GetWrite().then((res)=>{
        setWList(res.data)
        console.log(Wlist)
        })
      }
  })

  var List = [];

  const PushList = () => {
    if(memberList.length!=0 && Blist.length!=0 && Wlist.length != 0){
      
      for(let i = 0;i<Wlist.length;i++){
        
        if(newid.toLowerCase() == Wlist[i].mb_id){
          
        for(let j = 0;j<Blist.length;j++){
          if(Wlist[i].wr_id==Blist[j].wr_id){
            
            for(let x = 0;x<memberList.length;x++){
              if(Blist[j].mb_id==memberList[x].mb_id){
                console.log('작동테스트4')
                List.push(<ListItem subj={Wlist[i].wr_subject} detail={Wlist[i].wr_id} state={Wlist[i].wr_8} Bstate={Blist[j].state} content={Wlist[i].wr_content} date={Wlist[i].wr_datetime} comname={memberList[x].mb_name}></ListItem>)
              }
            }
            
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
        <ScrollView style={{backgroundColor:'white'}}>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>결제관리</Text>
                      </View>

              <View style={{margin:10}}>

                <PushList></PushList>

              </View>


          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

const ListItem = (prop) =>{
  const navigation = useNavigation()
  return(
    <View style={{borderWidth:0.6,borderColor:'gray',borderRadius:17,marginTop:10}}>
                <View style={{flexDirection:'row',alignItems:'center',width:chartWidth/1.15,margin:15}}>
                  <Text>{prop.subj} - {prop.state} - {prop.Bstate} </Text>
                  <View style={{right:0,position:'absolute'}}>
                      <Text>{prop.comname}</Text>
                  </View>
                </View>
                <Text style={{marginLeft:10,marginRight:10}} numberOfLines={3}>{prop.content}</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('리뷰용견적요청서', {parant : prop.detail})}>
                  <View style={{height:25,backgroundColor:'black',margin:10,borderRadius:5}}>
                    <Text style={{color:'white',alignSelf:'center',margin:3}}>견적서보기</Text>
                  </View>
                  </TouchableOpacity>
                  <Text style={{position:'absolute', right:15}}>{prop.date}</Text>
                </View>
              </View>
  )
}



export default PayManage;