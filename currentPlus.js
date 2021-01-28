import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  Alert
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')


import { useNavigation } from '@react-navigation/native';

import FootTer from './footer.js'
import HeadHeder from "./header.js";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";


const CurrentPlus = ({route}) =>{

  const [newid,setNewid] = useState('');
  
    async function isFavorite() {
      try {
        return await AsyncStorage.getItem("@super:id");
      } catch (error) {
        return false;
      }
    }
    
      const result = isFavorite().then((company_id) => {
        setNewid(company_id.toLowerCase())
      });

  async function GetJson() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/bidding.json');
    } catch (error) {
      console.log('에러 : ',error)
      return false;
    }
  }
  async function GetEstimate() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_estimate.json');
    } catch (error) {
      console.log('에러 : ',error)
      return false;
    }
  }
  async function GetMember() {
    try {
        console.log('겟멤버 작동됨')
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_member.json');
    } catch (error) {
      console.log('에러 : ',error)
      return false;
    }
  }
  async function GetBidding() {
    try {
        console.log('겟멤버 작동됨')
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/bidding.json');
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

  const [patners,setPatners]=useState([])
  const [bidding,setBidding] = useState([])
  const [memberList,setMemberList] = useState([]);
  const [list,setlist] = useState([]);
  const [estimate,setEstimate] = useState([]);
      useEffect(()=>{
        if(list.length==0){
            GetJson().then((res)=>{
            setlist(res.data)
            console.log(list)
            })
          }
          if(memberList.length==0){
            console.log('작동테스트')
          GetMember().then((res)=>{
            setMemberList(res.data)
            })
        }
        if(list.length==0){
            GetEstimate().then((res)=>{
            setEstimate(res.data)
            console.log(list)
            })
          }
        if(bidding.length==0){
          GetBidding().then((res)=>{
            setBidding(res.data)
          })
        }
        if(patners.length==0){
          GetPatners().then((res)=>{
            setPatners(res.data)
          })
        }
      })
      var pay = []
  const Payment = () =>{
    if(list.length != 0){
      for(var i = 0; i < list.length; i++){
        if(list[i].wr_id == route.params.num){
          
        }
      }
    }
    return pay
  }
  const [partnum,setPartnum] = useState('')
  var main = []
  const MainPush = () =>{
    if(estimate.length != 0){
      for(var i = 0; i<estimate.length; i++){
        if(estimate[i].wr_id==route.params.num){
          setPartnum(estimate[i].wr_3)
          for(var j = 0;j<patners.length;j++){
            if(patners[j].no==partnum){
              main.push(<MainContent content={estimate[i].wr_content} num={estimate[i].wr_id} state={estimate[i].wr_8} subj={estimate[i].wr_subject} com={patners[j].pt_name} cate={estimate[i].wr_1} subcate={estimate[i].wr_2} fdate={estimate[i].wr_10} addr={estimate[i].wr_4+' '+estimate[i].wr_5}></MainContent>)
            }
          }
        }
      }
    }
    return main
  }
  const [isBidding,setisBidding] = useState(false)
  var rr = []
  const PayPush = ()=>{
    if(bidding.length != 0){
      for(var i =0;i<bidding.length;i++){
        if(bidding[i].wr_id == route.params.num){
          for(var j = 0; j<patners.length ; j++){
            if(patners[j].no == partnum){
              rr.push(<PayHeyon name={patners[j].pt_name} pay={bidding[i].pay} info={bidding[i].info} id={patners[j].mb_id}></PayHeyon>)
              setisBidding(true)
              console.log(isBidding)
            }
            
          }
        }
      }
    }
    return (<View>
      {isBidding && rr}
    </View>)
  }

  

  const MainContent = (prop) =>{
    const navigation = useNavigation()
    function refreshData(id){
      axios.post('http://ip0131.cafe24.com/pluslink/json/cancelEstimate.php', JSON.stringify({
        id : id,
        add_id:newid
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
      Alert.alert('취소가 완료되었습니다.')
      navigation.navigate('홈')
    }
    return(
      <View>
                <PlusItem name='견적번호' num={prop.num}></PlusItem>
                <PlusItem name='상태' num={prop.state}></PlusItem>
                {prop.subj == '지정견적' ? <PlusItem name='지정업체' num={prop.com}></PlusItem> : <View></View>}
                <PlusItem name='카테고리' num={prop.cate}></PlusItem>
                <PlusItem name='세부항목' num={prop.subcate}></PlusItem>
                <PlusItem name='요청날짜' num={prop.fdate}></PlusItem>
                <PlusItem name='시공주소' num={prop.addr}></PlusItem>

                <View style={{marginTop:15,marginLeft:15}}>
                  <Text style={{fontSize:16}}>상세내용</Text>
                  <View style={{borderWidth:0.5,borderColor:'gray',marginTop:15,marginBottom:15,marginRight:15}}>
                    <Text style={{margin:10}}>{prop.content}</Text>
                  </View>
                </View>

                {(prop.state == '입찰대기' ) &&
                  <TouchableOpacity onPress={()=>{refreshData(prop.num)}}>
                <View style={{marginTop:15,marginLeft:15,width:chartWidth-90,height:50,backgroundColor:'#cc33ff',justifyContent:"center",alignItems:"center"}}>
                  <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>견적취소</Text>
                </View>
                </TouchableOpacity>}

                {(prop.state == '입찰진행중') &&
                  <TouchableOpacity onPress={()=>{refreshData(prop.num)}}>
                <View style={{marginTop:15,marginLeft:15,width:chartWidth-90,height:50,backgroundColor:'#cc33ff',justifyContent:"center",alignItems:"center"}}>
                  <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>견적취소</Text>
                </View>
                </TouchableOpacity>}
      </View>
    )
  }
  

  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:100}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>견적현황</Text>
                      </View>


          <View style={{margin:10}}>
            <View style={{flexDirection:'row',alignItems:'center',width:chartWidth-30,marginTop:20}}>
              <Text style={{fontWeight:'bold',fontSize:18}}>견적요청서</Text>
              <Image source={arrow} style={{right:0,position:'absolute'}}></Image>
            </View>
            <View style={{width:chartWidth-30,borderWidth:0.5,borderColor:'gray',marginTop:10}}></View>
            
            <View style={{width:chartWidth-30,backgroundColor:'#e6e6e6',}}>
              <View style={{backgroundColor:'white', width:chartWidth-60,marginLeft:15,marginTop:15,marginBottom:20}}>
                <MainPush></MainPush>

                {isBidding &&<View>
                <Text style={{marginTop:60,fontSize:18}}>입찰현황</Text>
                <View style={{width:65,borderWidth:0.5,marginTop:5,marginBottom:10}}></View></View>}

                <PayPush></PayPush>

                {/* <Text style={{marginTop:60,fontSize:18}}>댓글</Text>
                <View style={{width:40,borderWidth:0.5,marginTop:5,marginBottom:10}}></View>

                <View>
                  <View style={{width:chartWidth-60,height:50,borderWidth:0.5, borderRadius:10,borderColor:'gray'}}></View>
                </View> */}

                

              </View>
            </View>



          </View>

          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>
    </View>
  )
}

const PayHeyon = (prop)=>{
  const navigation = useNavigation()
  const heart = require('./img/handhart.png')
  return(
    <View>
      

      <View style={{width:chartWidth-60,borderRadius:10,borderWidth:0.5,borderColor:'gray',marginBottom:10}}>
        <View style={{alignItems:"center",flexDirection:"row",justifyContent:'space-between'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={heart} style={{width:30,height:30,borderRadius:28,marginLeft:10,marginTop:10}}></Image>
            <Text style={{fontSize:17,marginLeft:5}}>{prop.name}</Text>
            <Text style={{fontSize:17,marginLeft:15}}>{prop.pay}원</Text>
          </View>
          <View>
            <TouchableOpacity onPress={()=>navigation.navigate('회사자세히보기',{id:prop.id})}>
            <View style={{borderRadius:5,borderWidth:0.5,marginRight:10}}>
              <Text style={{margin:5,fontSize:17}}>업체정보</Text>
            </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{width:chartWidth-80,borderWidth:0.5,marginLeft:10,marginTop:10}}></View>
        <Text style={{marginTop:10,marginLeft:10,marginRight:10}} numberOfLines={3}>{prop.info}</Text>

        <View style={{flexDirection:'row'}}>
          <View style={{borderRadius:5,width:chartWidth/2.6,backgroundColor:'#d9d9d9',justifyContent:'center',alignItems:'center',marginLeft:10,marginTop:10,marginBottom:10}}>
            <Text style={{margin:10}}>입찰정보</Text>
          </View>

          <View style={{borderRadius:5,width:chartWidth/2.6,backgroundColor:'#d9d9d9',justifyContent:'center',alignItems:'center',marginLeft:10,marginTop:10,marginBottom:10}}>
            <Text style={{margin:10}}>결제하기</Text>
          </View>
        </View>
      </View>
    </View>
  )
}





const PlusItem = (prop) =>{
  return(
    <View>
               <View style={{flexDirection:'row',marginTop:15,marginLeft:15}}>
                  <Text style={{fontSize:16,width:80 }}>{prop.name}</Text>
                  <Text style={{ left:50,width:170}}>{prop.num}</Text>
                </View>
                <View style={{width:chartWidth-60,borderWidth:0.5,borderColor:'#b3b3b3',marginTop:10}}></View>
    </View>
  )
}


export default CurrentPlus;
