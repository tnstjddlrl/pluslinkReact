import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')


import { useNavigation } from '@react-navigation/native';

import FootTer from './footer.js'
import HeadHeder from "./header.js";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import axios from "axios";

const ReviewPlus = ({route}) =>{
  const [list,setList] = useState([]);
  const [aim,setAim] = useState('');
  async function GetJson() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/g5_estimate_write.json');
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
  })

  var List = [];

  const DataSet = () =>{
    for(var i = 0;i<list.length;i++){
      if(route.params.parant == list[i].wr_id){
        setAim(i)
      }
    }
    if(list.length!=0){
    List.push(<TotalView num={list[Number(aim)].wr_id} subj={list[Number(aim)].wr_8} cate={list[Number(aim)].wr_1} subcate={list[Number(aim)].wr_2} date={list[Number(aim)].wr_datetime} addr={list[Number(aim)].wr_4+ ' ' +list[Number(aim)].wr_5} content={list[Number(aim)].wr_content}></TotalView>)
    }
    return(
      List
    )
  }

  return(
    <View>
     <DataSet></DataSet>
    </View>
  )
}

const TotalView = (prop) => {
  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
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
            
            <View style={{width:chartWidth-30,height:300,backgroundColor:'#e6e6e6',}}>
              <View style={{backgroundColor:'white', width:chartWidth-60,marginLeft:15,marginTop:15}}>
                
                <PlusItem name='견적번호' num={prop.num}></PlusItem>
                <PlusItem name='상태' num={prop.subj}></PlusItem>
                {prop.subj == '지정견적' ? <PlusItem name='지정업체' num={prop.com}></PlusItem> : <View></View>}
                <PlusItem name='카테고리' num={prop.cate}></PlusItem>
                <PlusItem name='세부항목' num={prop.subcate}></PlusItem>
                <PlusItem name='요청날짜' num={prop.date}></PlusItem>
                <PlusItem name='시공주소' num={prop.addr}></PlusItem>


                <View style={{marginTop:15,marginLeft:15}}>
                  <Text style={{fontSize:16}}>상세내용</Text>
                  <View style={{borderWidth:0.5,borderColor:'gray',marginTop:15,marginBottom:15,marginRight:15}}>
                    <Text style={{margin:10}}>{prop.content}</Text>
                  </View>
                </View>

                <Text style={{marginTop:60,fontSize:18}}>댓글</Text>
                <View style={{width:40,borderWidth:0.5,marginTop:5}}></View>

                <View></View>

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


export default ReviewPlus;
