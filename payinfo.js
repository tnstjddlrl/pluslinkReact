import React,{useState,useEffect} from 'react'
import { 
  View,
  Text,
  Dimensions
 } from "react-native";

 const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width; //현재 디바이스의 가로 세로 값을 가져온다.

import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { TouchableOpacity } from 'react-native-gesture-handler';

 const PayInfo = ({route}) =>{

  async function GetBidding() {
    try {
        console.log('겟멤버 작동됨')
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/bidding.json');
    } catch (error) {
      console.log('에러 : ',error)
      return false;
    }
  }

  const [bidding,setBidding] = useState([])

  useEffect(()=>{
    if(bidding.length==0){ 
      GetBidding().then((res)=>{
        setBidding(res.data)
      })
    }
  })

  var list = []
  const ItemPush = () =>{
    if(bidding != 0){
      for(var i = 0;i<bidding.length;i++){
        if(bidding[i].no == route.params.bid){
          list.push(<Item pay={bidding[i].pay} cancel={bidding[i].cancel} as={bidding[i].as_period} construc={bidding[i].construction} info={bidding[i].info}></Item>)
        }
      }
    }
    return list
  }

  return(
    <View style={{width:chartWidth,height:chartHeight,backgroundColor:'black',justifyContent:'center',alignItems:'center'}}>
      <View style={{alignItems:'center'}}>
        <ItemPush></ItemPush>
      </View>
    </View>
  )
 }

 const Item = (prop) =>{
   const navigation = useNavigation()
   return(
     <View style={{width:chartWidth-20,height:chartHeight-80,marginTop:40,backgroundColor:'white'}}>
       <View style={{flexDirection:"row",alignItems:"center",width:chartWidth/1.5,justifyContent:"space-between",marginLeft:10,marginTop:80}}>
          <Text>견적비용</Text>
          <View style={{backgroundColor:'#cccccc'}}>
            <Text style={{margin:5,width:150,fontSize:18}}>{prop.pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
          </View>
       </View>

       <View style={{flexDirection:"row",alignItems:"center",width:chartWidth/1.5,justifyContent:"space-between",marginLeft:10,marginTop:20}}>
          <Text>취소수수료</Text>
          <View style={{backgroundColor:'#cccccc'}}>
            <Text style={{margin:5,width:150,fontSize:18}}>{prop.cancel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
          </View>
       </View>

       <View style={{flexDirection:"row",alignItems:"center",width:chartWidth/1.5,justifyContent:"space-between",marginLeft:10,marginTop:20}}>
          <Text>AS기간</Text>
          <View style={{backgroundColor:'#cccccc'}}>
            <Text style={{margin:5,width:150,fontSize:18}}>{prop.as.replace( /_/gi, ' ')}</Text>
          </View>
       </View>

       <View style={{flexDirection:"row",alignItems:"center",width:chartWidth/1.5,justifyContent:"space-between",marginLeft:10,marginTop:20}}>
          <Text>시공기간</Text>
          <View style={{backgroundColor:'#cccccc'}}>
            <Text style={{margin:5,width:150,fontSize:18}}>{prop.construc.replace( /_/gi, ' ')}</Text>
          </View>
       </View>

       <View style={{flexDirection:"row",alignItems:"center",width:chartWidth/1.15,justifyContent:"space-between",marginLeft:10,marginTop:20}}>
          <Text>방문안내</Text>
          <View style={{borderWidth:0.5,width:chartWidth/1.7,height:160}}>
            <Text style={{margin:10}} numberOfLines={6}>{prop.info}</Text>
          </View>
       </View>
      <View style={{margin:10,}}>
        <Text style={{marginTop:10,fontWeight:'bold',color:'red'}}>#당일 취소는 취소수수료가 발생하지 않지만 무분별한 낙찰취소를 방지하기 위해 소정의 취소수수료가 발생합니다.</Text>
        <Text style={{marginTop:10,fontWeight:'bold'}}>낙찰 당일 취소 {">"} 취소수수료없음</Text>
        <Text style={{marginTop:10,fontWeight:'bold'}}>(업체 방문전) 2일 이상 {">"} 취소수수료없음</Text>
        <Text style={{marginTop:10,fontWeight:'bold'}}>(업체 방문전) 1일전 {">"} 취소수수료 50%</Text>
        <Text style={{marginTop:10,fontWeight:'bold'}}>(업체 방문전) 당일취소 {">"} 취소수수료 100%</Text>
        <Text style={{marginTop:10,fontWeight:'bold'}}>(업체방문후) 소비자과실 {">"} 취소수수료 100%</Text>
        <Text style={{marginTop:10,fontWeight:'bold'}}>(업체방문후) 업체과실 {">"}취소수수료 없음</Text>
      </View>

      <TouchableOpacity onPress={()=>navigation.navigate('견적자세히보기')}>
      <View style={{borderWidth:0.7,borderColor:'#8600b3',width:chartWidth-40,marginLeft:10,borderRadius:5,height:50,justifyContent:"center",alignItems:"center",bottom:0}}>
        <Text style={{color:'#8600b3'}}>닫기</Text>
      </View>
      </TouchableOpacity>


     </View>
   )
 }

 export default PayInfo