import React,{useState,Component,useEffect} from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
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

  function refreshData(tableName){
    axios.post('http://ip0131.cafe24.com/pluslink/json/jsonMember.php', JSON.stringify({
      id : tableName,
    }))
    .then(function (response) {
      console.log('리스폰스 ',response);
      if(response.request._response=='suc'){
      }
      else{
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(()=>{
    refreshData('g5_member')
    refreshData('partners')
    refreshData('g5_member')
  },[])

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
      if(expertise[i].category==menu &&expertise[i].state=='정상'){
        cate.push(expertise[i].mb_id)
      }
    }

    const set = new Set(cate);
    cate = [...set];

    console.log('중복체크  ',cate)
    console.log('이상체크 : ',memberList[5])

    for(var i = 0;i<3;i++){
      for(var j =0;j<memberList.length;j++){
                 if(cate[i]==memberList[j].mb_id){
                  for(var x=0;x<patners.length;x++){
                    if(cate[i]==patners[x].mb_id &&count<3){
                      List.push(<Item id={cate[i]} addr1={patners[x].pt_addr1} addr2={patners[x].pt_addr2} name={patners[x].pt_name} content={memberList[j].mb_profile.replace(/\r\n/g, '')} star={patners[x].pt_score}></Item>)
                      count += 1
                      console.log('작동체크')
                  }
                }
              }
      }
    }
 


  }


    
  
  
  
  if(count == 0){
    List.push(<NoItem></NoItem>)
  }
    return List
  }


  const marker = require('./img/marker.png')

const Item = (prop) => {
  const navigation = useNavigation()
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('회사자세히보기', { id: prop.id })}>
        <View style={{ width: chartWidth - 40, backgroundColor: '#f2f2f2', borderRadius: 10, marginLeft: 20, marginRight: 20, marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: 'https://pluslink.kr/data/member_image/' + prop.id.substring(0, 2) + '/' + prop.id + '.gif' }} style={{ marginLeft: 15, marginTop: 15, borderRadius: 28, width: 55, height: 55, backgroundColor: 'red' }}></Image>
            <Text style={{ fontWeight: '500', fontSize: 15, marginLeft: 15, marginTop: 15 }}>{prop.name}</Text>
          </View>
          <Text style={{ margin: 15, fontWeight: '200' }} numberOfLines={3}>{prop.content}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 15 }}>

            <View style={{ flexDirection: "row" ,alignItems:"center"}}>
              <Image source={marker} style={{ width: 20, height: 20 }}></Image>
              <Text style={{ marginRight: 5 }}>{prop.addr1}</Text>
              <Text>{prop.addr2}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Image source={starimg} style={{ width: 20, height: 20 }}></Image>
              <Text>{prop.star}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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