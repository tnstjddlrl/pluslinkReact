import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";

const heart = require('./img/handhart.png')
const starimg = require('./img/review.png')

const CompanyList = ({ route }) => {
  const [select, setSelect] = useState(false)
  const [listCate, SetlistCate] = useState("전기&조명")

  const [subSelect, setSubselect] = useState(false)
  const [listPlus, setListPlus] = useState('전체') //세부카테고리

  useEffect(() => {
    SetlistCate(route.params.cate);
    setListPlus(route.params.subcate);
  }, [route])

  function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) { return deg * (Math.PI / 180) } 
    
    var R = 6371; // Radius of the earth in km 
    var dLat = deg2rad(lat2-lat1); // deg2rad below 
    var dLon = deg2rad(lng2 - lng1); 
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    var d = R * c; // Distance in km 
    return d; 
  }






  

  const SubCateItem = (prop) => {
    return (
      <TouchableOpacity onPress={() => { setListPlus(prop.text), setSubselect(false) }}>
        <Text style={{ left: 5, marginTop: 5 }}>{prop.text}</Text>
      </TouchableOpacity>
    )
  }

  const Subcate = () => {

    const SubPush = () => {
      var ll = []
      for(var i = 0;i<cateList.length;i++){
        if(cateList[i].category == listCate){
          if(cateList[i].subcategory ==''){
            ll.push(<SubCateItem key={i} text={'전체'}></SubCateItem>)
          }else{
            ll.push(<SubCateItem key={i} text={cateList[i].subcategory}></SubCateItem>)
          }
          
        }
      }
      return ll
    }

    const [top,setTop] = useState(200)

    useEffect(()=>{
      if(listPlus=='청소'){
        setTop(200)
      }else{
        setTop(300)
      }
    },[listPlus])
    

      return (
        <Modal transparent={true} visible={subSelect}>
          <TouchableOpacity style={{width:chartWidth,height:chartHeight}} onPress={()=>setSubselect(false)}></TouchableOpacity>
          <View style={{ width: chartWidth - 30,maxHeight:300, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: top }}>
            <ScrollView>
            <SubPush></SubPush>
            </ScrollView>
          </View>
        </Modal>
      )
    
  }

  async function GetExpertise() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/expertise.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetExpertise_ena() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/expertise_enable.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetPatners() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/partners.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetMember() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_member.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetCate() {
    try {
      console.log('겟멤버 작동됨')
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/category.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetUserAddress() {
    try {
      console.log('겟멤버 작동됨')
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/user_address.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }


  const [patners, setPatners] = useState([])
  const [expertise, setExpertise] = useState([])
  const [expertise_ena, setExpertise_ena] = useState([])
  const [memberList, setMemberList] = useState([])
  const [cateList, setCateList] = useState([])
  const [useraddress, setUseraddress] = useState([])
  useEffect(() => {
    if (expertise.length == 0) {
      GetExpertise().then((res) => {
        setExpertise(res.data)
      })
    }
    if (expertise_ena.length == 0) {
      GetExpertise_ena().then((res) => {
        setExpertise_ena(res.data)
      })
    }
    if (patners.length == 0) {
      GetPatners().then((res) => {
        setPatners(res.data)
      })
    }
    if (memberList.length == 0) {
      GetMember().then((res) => {
        setMemberList(res.data)
      })
    }
    if (cateList.length == 0) {
      GetCate().then((res) => {
        setCateList(res.data)
      })
    }
    if (useraddress.length == 0) {
      GetUserAddress().then((res) => {
        setUseraddress(res.data)
      })
    }
  })
  var List = []
  const PushItem = () => {
    var cate = []

    

    if(listPlus == '전체'){
   
      for(var i = 0; i < expertise.length;i++){
        if(expertise[i].category == listCate && expertise[i].state=='정상'){
          for(var j = 0; j<patners.length;j++){
            if(expertise[i].mb_id==patners[j].mb_id && patners[j].pt_state == '승인'){
              for(var x = 0;x<expertise_ena.length;x++){
                if(expertise[i].no==expertise_ena[x].ex_id && expertise_ena[x].state=='활성화'){
                  cate.push(expertise[i].mb_id)
                }
              }
            }
          }
        }
      }

      const set = new Set(cate);
      cate = [...set];

      //Alert.alert(cate)

      if (cate.length != 0) {
        for (var i = 0; i < cate.length; i++) {
          for (var j = 0; j < memberList.length; j++) {
            if (cate[i] == memberList[j].mb_id) {
              for (var x = 0; x < patners.length; x++) {
                if (cate[i] == patners[x].mb_id) {
                  List.push(<ListItem id={cate[i]} comname={patners[x].pt_name} score={patners[x].pt_score} content={memberList[j].mb_profile}></ListItem>)
                }
              }
            }
          }
        }
        return List
      } else {
        return (<Text>업체가 없습니다.</Text>)
      }


    }
    
    return List
  }

  const MainModalItem = (prop) =>{
    return(
      <TouchableOpacity onPress={() => { SetlistCate(prop.cate), setSelect(false), setListPlus('전체') }}>
              <Text style={{ left: 5, marginTop: 5 }}>{prop.cate}</Text>
            </TouchableOpacity>
    )
  }

const MainMPush =() =>{
  var ll = []
  var cate = []
  for(var i = 0;i<cateList.length; i++){
    cate.push(cateList[i].category)
  }

  const set = new Set(cate);  
  cate = [...set];

  for(var i = 0;i<cate.length;i++){
    ll.push(<MainModalItem key={i} cate={cate[i]}></MainModalItem>)
  }
  
  return ll
}



  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth }}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View style={{ marginBottom: 100 }}>
            <View style={{ width: chartWidth, marginTop: 50 }}>
              <ImageBackground source={event} style={{ width: chartWidth, height: chartHeight / 7 }}>
              </ImageBackground>
              <Text style={{ position: 'absolute', color: "white", fontSize: 20, fontWeight: 'bold', top: 40, left: 10 }}>업체목록</Text>
            </View>

            <View style={{ margin: 10 }}>
              <View style={{ backgroundColor: '#e6e6e6', width: chartWidth - 20, borderRadius: 17 }}>
                <Text style={{ fontSize: 18, marginTop: 15, marginLeft: 15 }}>카테고리</Text>
                <TouchableOpacity onPress={() => setSelect(true)}>
                  <View style={{ borderWidth: 0.5, marginTop: 10, alignItems: "center", flexDirection: "row", width: chartWidth - 40, marginLeft: 10, backgroundColor: 'white', borderRadius: 5 }}>
                    <Text style={{ margin: 10 }}>{listCate}</Text>
                    <Image source={arrow} style={{ width: 8, height: 14, right: 5, position: 'absolute' }}></Image>
                  </View>
                </TouchableOpacity>

                <Text style={{ fontSize: 18, marginTop: 15, marginLeft: 15 }}>세부카테고리</Text>
                <TouchableOpacity onPress={() => setSubselect(true)}>
                  <View style={{ borderWidth: 0.5, marginBottom: 20, marginTop: 10, alignItems: "center", flexDirection: "row", width: chartWidth - 40, marginLeft: 10, backgroundColor: 'white', borderRadius: 5 }}>
                    <Text style={{ margin: 10 }}>{listPlus}</Text>
                    <Image source={arrow} style={{ width: 8, height: 14, right: 5, position: 'absolute' }}></Image>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ backgroundColor: '#e6e6e6', width: chartWidth - 20, borderRadius: 17,marginTop:20 }}>
                <Text style={{ fontSize: 18, marginTop: 15, marginLeft: 15 }}>주소</Text>
              </View>



              <View style={{ backgroundColor: 'white', width: chartWidth - 20, borderRadius: 17, borderWidth: 0.5, marginTop: 30 }}>
                <PushItem></PushItem>
              </View>
            </View>



          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>


      <Modal transparent={true} visible={select}>
        <TouchableOpacity style={{width:chartWidth,height:chartHeight}} onPress={()=>setSelect(false)}></TouchableOpacity>
        <View style={{ width: chartWidth - 30, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: 15, top: 150 }}>
          <MainMPush></MainMPush>
          {/* <TouchableOpacity onPress={() => { SetlistCate('전기&조명'), setSelect(false), setListPlus('전체') }}>
            <Text style={{ left: 5, marginTop: 5 }}>전기&조명</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { SetlistCate('수도'), setSelect(false), setListPlus('전체') }}>
            <Text style={{ left: 5, marginTop: 5 }}>수도</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { SetlistCate('도배&장판'), setSelect(false), setListPlus('전체') }}>
            <Text style={{ left: 5, marginTop: 5 }}>도배&장판</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { SetlistCate('인테리어'), setSelect(false), setListPlus('전체') }}>
            <Text style={{ left: 5, marginTop: 5 }}>인테리어</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { SetlistCate('샷시&창호'), setSelect(false), setListPlus('전체') }}>
            <Text style={{ left: 5, marginTop: 5 }}>샷시&창호</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { SetlistCate('청소&철거'), setSelect(false), setListPlus('전체') }}>
            <Text style={{ left: 5, marginTop: 5 }}>청소&철거</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { SetlistCate('보일러&배관'), setSelect(false), setListPlus('전체') }}>
            <Text style={{ left: 5, marginTop: 5 }}>보일러&배관</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { SetlistCate('건물외부'), setSelect(false), setListPlus('전체') }}>
            <Text style={{ left: 5, marginTop: 5 }}>건물외부</Text>
          </TouchableOpacity> */}
        </View>
      </Modal>

      <Subcate></Subcate>

    </View>
  )
}



const ListItem = (prop) => {
  const navigation = useNavigation()
  return (
    <View style={{ margin: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate('회사자세히보기', { id: prop.id })}>
        <View style={{ height: 180, width: chartWidth - 60, borderRadius: 10, backgroundColor: 'gray' }}>
          <Image source={{ uri: 'https://pluslink.kr/data/member_image/' + prop.id.substring(0, 2) + '/' + prop.id + '.gif' }} style={{ height: 180, width: chartWidth - 60, borderRadius: 10 }}></Image>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <Image source={heart} style={{ width: 30, height: 30 }}></Image>
          <Text style={{ fontSize: 18, marginLeft: 15 }}>{prop.comname}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
          <Image source={starimg} style={{ width: 20, height: 20 }}></Image>
          <Text style={{ fontSize: 18, marginLeft: 15 }}>{prop.score}</Text>
        </View>

        <Text style={{ marginTop: 10 }}>업체소개</Text>
        <View style={{ width: 50, borderWidth: 0.5, marginTop: 3 }}></View>
        <Text numberOfLines={1} style={{ marginTop: 10 }}>{prop.content}</Text>

        <View style={{ width: chartWidth - 60, borderWidth: 0.8, marginTop: 10, borderColor: '#a6a6a6' }}></View>
      </TouchableOpacity>
    </View>
  )
}

export default CompanyList;