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


const starimg =require('./img/review.png')
const comImg = require('./img/14.png')
const comImg2 =require('./img/123.png')
const maker = require('./img/main_marker.png')

import { useNavigation } from '@react-navigation/native'; //네비게이션 프롭을 다른 페이지에서 받지않고도 이 페이지에서 단독으로 네비게이션을 사용할 수 있는 도구
import axios from "axios";

//prop(아무 변수이름)으로 App에서 Company를 생성할때 넣어준 값을 받아올 수 있다.
//네비게이터로 화면을 넘겨올때 값을 받을 때는 route를 사용해야한다.

const Company=(prop)=>{
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
  var cate= []
  var count = 0;
  const[menu,setMenu] = useState('전기&조명')
  
  if(menu != prop.menu){
    cate = [];
    setMenu(prop.menu)
    count = 0
    console.log(menu)
  }

  if(expertise.length !=0 && patners.length!=0 && memberList.length!=0){
    for(var i =0;i < expertise.length;i++){
      if(expertise[i].category==menu){
        cate.push(expertise[i].mb_id)
      }
    }

    const set = new Set(cate);
    cate = [...set];

    console.log('중복체크  ',cate)
  }


    // for(var i = 0;i<3;i++){
    //   for(var j =0;j<memberList.length;i++){
       
    //              if(cate[i]==memberList[j].mb_id){
    //               for(var x=0;x<patners.length;x++){
    //                 if(cate[i]==patners[x].mb_id &&count<3){
    //                   List.push(<Item name={patners[x].pt_name} content={memberList[j].mb_profile} star={patners[x].pt_score}></Item>)
    //                   count += 1
    //                   console.log('작동체크')
    //               }
    //             }
    //           }
        
 
    //   }
    // }
 
  
  
  
  if(count == 0){
    List.push(<NoItem></NoItem>)
  }
    return List
  }


  const Item = (prop)=>{
    return(
      <View>
       <View style={{width:chartWidth-40,height:200,backgroundColor:'#f2f2f2',borderRadius:10,marginLeft:20,marginRight:20,marginTop:10}}>
          <View style={{flexDirection:'row'}}>
            <Image style={{width:30,height:30,backgroundColor:'red'}}></Image>
            <Text>{prop.name}</Text>
          </View>
          <Text>{prop.content}</Text>
          <View style={{flexDirection:'row'}}>
            <Image source={starimg} style={{width:20,height:20}}></Image>
            <Text>{prop.star}</Text>
          </View>
       </View>
     </View>
    )
  }

  const NoItem = (prop) =>{
    return(
    <View style={{alignItems:'center',marginTop:30,marginBottom:30}}>
      <Text>주변 업체가 없습니다.</Text>
    </View>
    )
  }

  

  export default Company;