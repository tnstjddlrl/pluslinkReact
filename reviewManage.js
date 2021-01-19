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

const ReviewManage = () => {
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


  const [list,setList] = useState([]);
  const [memberList,setMemberList] = useState([]);

  async function GetJson() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_review.json');
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

  useEffect(()=>{
    if(list.length==0){
      GetJson().then((res)=>{
      setList(res.data)
      console.log(list)
      })
    }
    if(memberList.length==0){
      GetMember().then((res)=>{
        setMemberList(res.data)
        console.log(memberList)
        })
    }

  })

  var List = []

  const ItemPush = ()=>{
    for(let i = 0;i<list.length;i++){
      if(list[i].mb_id=newid.toLowerCase()){
        for(var j =0;j<memberList.length;j++){
          if(list[i].wr_2==memberList[j].mb_id){
            List.push(<ListItem date={list[i].wr_datetime} content={list[i].wr_content} id={memberList[j].mb_name} detail={list[i].wr_id}></ListItem>)
          }
        }
       
      }
    }
    
    return List
  }

  const ListItem = (prop) =>{
    const navigation = useNavigation();
    
    return(
      <View style={{borderWidth:0.6,borderColor:'gray',borderRadius:17,marginTop:10}}>
                  <View style={{flexDirection:'row',alignItems:'center',width:chartWidth/1.15,margin:15}}>
                    <Text>{prop.id}</Text>
                    <View style={{flexDirection:'row',right:0,position:'absolute'}}>
                        <Image source={starimg} style={{width:15,height:15}}></Image>
                        <Image source={starimg} style={{width:15,height:15}}></Image>
                        <Image source={starimg} style={{width:15,height:15}}></Image>
                        <Image source={starimg} style={{width:15,height:15}}></Image>
                        <Image source={starimg} style={{width:15,height:15}}></Image>
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
  


  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView style={{backgroundColor:'white'}}>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>리뷰관리</Text>
                      </View>

            <View style={{margin:10}}>

              <ItemPush></ItemPush>
            </View>


          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}



export default ReviewManage;