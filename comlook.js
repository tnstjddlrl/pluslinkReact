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
  Platform,
  Alert
} from "react-native";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'
import { useNavigation } from '@react-navigation/native';
import ComSigong from './Component1.js'
import TestCom from './Component0.js';
import FootTer from './footer.js'
import HeadHeder from "./header.js";

import AsyncStorage from '@react-native-community/async-storage';
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

    async function GetReview() {
      try {
        return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_review.json');
      } catch (error) {
        console.log('에러 : ',error)
        return false;
      }
    }
  
    const [ReviewL,setReviewL] = useState([]);
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
      if(ReviewL.length==0){
        GetReview().then((res)=>{
          setReviewL(res.data)
        })
      }
    })

    var reviewlist = []
    const PushReview = () =>{
      if(ReviewL.length != 0){
        for(var i =0; i<ReviewL.length;i++){
          if(ReviewL[i].wr_2==route.params.id){
            reviewlist.push(<ReviewItem id={ReviewL[i].mb_id} content={ReviewL[i].wr_content} star={ReviewL[i].wr_3}></ReviewItem>)
          }
        }
      }

      return reviewlist
    }


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

    const [selectmenu,setSelectmenu] = useState('시공')
    const Content = (prop) => {
      let os = Platform.OS
      
      let nowmargin;
        if(os == 'ios'){
         nowmargin = 95;
        }else{
          nowmargin = 60;
        }
        useEffect(()=>{
        },[])
      return(
        <View style={{marginTop:nowmargin,marginLeft:20}}>
          <Image source={{uri:'https://pluslink.kr/data/member_image/'+prop.img.substring(0,2) +'/'+prop.img+'.gif'}} style={{width:chartWidth-40, height:200, borderRadius:15,backgroundColor:'gray'}}></Image>
          <View style={{flexDirection:'row' , alignItems:'center'}}>
            <Image source={heart} style={{width:50,height:50,borderRadius:28}}></Image>
            <Text style={{fontSize:18,marginLeft:10}}>{prop.name}</Text>
            <Image source={starimg} style={{width:25,height:25,marginLeft:10}}></Image>
            <Text style={{fontSize:18,marginLeft:10}}>{prop.star}</Text>
          </View>
  
          <Text style={{margin:10,width:chartWidth-60}}>{prop.content.replace(/\r\n/g, '')}</Text>
  
          <View style={{flexDirection:'row',marginTop:10,justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>setSelectmenu('시공')}>
            <View style={{width:90,height:40, backgroundColor:'black',borderRadius:28,marginRight:10,justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'white',fontWeight:'bold'}}>시공사례</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setSelectmenu('리뷰')}>
            <View style={{width:90,height:40, backgroundColor:'#d9d9d9',borderRadius:28,marginLeft:10,marginBottom:10,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontWeight:'bold'}}>리뷰</Text>
            </View>
            </TouchableOpacity>
          </View>
          <View style={{width:chartWidth-40,borderWidth:0.5,borderColor:'gray'}}></View>
        </View>
      )
    }

    var scrollList = []
    const PushList=()=>{
      const [OneList,setOneList] = useState([]);

    async function GetJson() {
      try {
        return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_example.json');
      } catch (error) {
        console.log('에러 : ',error)
        return false;
      }
    }

    useEffect(()=>{
      if(OneList.length==0){
        GetJson().then((res)=>{
        setOneList(res.data)
        console.log(list)
        })
      }
    })

    for(var i = 0;i<OneList.length;i++){
      if(route.params.id==OneList[i].mb_id){
        scrollList.push(<ListItem id={OneList[i].wr_id} img={OneList[i].as_thumb} title={OneList[i].wr_subject} content={OneList[i].wr_1}></ListItem>)
      }
    }

      return scrollList
    }

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

    function logtest(){
      if(newid=='로그인해주세요'){
        Alert.alert('로그인 후 이용해주세요.')
        console.log('아이디 체크',newid)
        navigation.navigate('로그인')
      }else{
        console.log('아이디 체크',newid)
        navigation.navigate('지정의뢰',{comid:route.params.id})
      }
    }

    return(
      <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:100}}>
                      
            <PushItem></PushItem>
            {selectmenu == '시공' ? <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <PushList></PushList>
            </ScrollView> : 
            <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
              <PushReview></PushReview>
              </View>}

            
            <TouchableOpacity onPress={()=>logtest()}>
              <View style={{marginLeft:10,marginRight:10,width:chartWidth-20,height:50,justifyContent:'center',alignItems:'center',backgroundColor:'black',borderRadius:10,marginTop:20}}>
                <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>견적의뢰하기</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
    )
  }

  const ListItem=(prop)=>{
    const navigation=useNavigation()
    return(
      <View style={{marginTop:20}}>
        <TouchableOpacity onPress={()=>navigation.navigate('베스트보기',{id:prop.id})}>
          <View style={{width:chartWidth/2.5,marginLeft:10}}>
            <Image source={{uri:prop.img}} style={{width:chartWidth/2.5,height:120,backgroundColor:'gray',borderRadius:10}}></Image>
            <Text numberOfLines={2} style={{fontWeight:'bold'}}>{prop.title}</Text>
            <Text numberOfLines={3} style={{marginTop:10,fontWeight:'100'}}>{prop.content}</Text>
            <View style={{width:chartWidth/2.5,borderWidth:0.5,borderColor:'gray',marginTop:5}}></View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const Star=(prop)=>{
    var starlist = []
    const starimg =require('./img/review.png')
    for(var i =0; i< prop.num; i++){
      starlist.push(<Image source={starimg} style={{width:20,height:20}}></Image>)
    }


    return starlist
  }

  const ReviewItem = (prop) => {
    return(
      <View style={{width:chartWidth-40,borderWidth:0.4,borderColor:'gray',borderRadius:10,marginTop:10}}>
                <View style={{flexDirection:'row',alignItems:'center',width:chartWidth-60}}>
                  <Text style={{fontSize:18,marginLeft:10,marginTop:10}}>{prop.id}</Text>
                  <View style={{flexDirection:"row",justifyContent:'flex-end',flex:1}}>
                    <Star num={prop.star}></Star>
                  </View>
                </View>
                <Text style={{fontSize:15,margin:10}} numberOfLines={3}>{prop.content}</Text>
              </View>
    )
  }

  
  
  export default ComLook;
  
  //=====================================================================