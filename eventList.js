import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const EventList = () =>{
  const [Elist,setElist] = useState([])

  async function GetJson() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_event.json');
    } catch (error) {
      console.log('에러 : ',error)
      return false;
    }
  }

  useEffect(()=>{
    if(Elist.length==0){
      GetJson().then((res)=>{
        setElist(res.data)
      })
    }
  })

  var List = []
  const PushItem = () =>{
    for(var i = 0; i<Elist.length; i++){
      var date = Elist[i].wr_datetime
      date = date.substring(0,10)
      List.push(<ListItem date={date} content={Elist[i].wr_subject} id={Elist[i].wr_id}></ListItem>)
    }
    

    return List
  }



  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>이벤트</Text>
                      </View>
              <View style={{marginTop:30,marginLeft:15}}>
                <PushItem></PushItem>
              </View>
           
          </View>
        </ScrollView>


      </View>
      
      <HeadHeder></HeadHeder>
      <FootTer></FootTer>


    </View>
  )
}

const ListItem = (prop) => {
  const navigation = useNavigation()
  return(
    <View>
      <TouchableOpacity onPress={()=>navigation.navigate('이벤트자세히보기',{id:prop.id})}>
              <View style={{width:chartWidth-40}}>
                <View style={{borderWidth:0.5,borderColor:'#b3b3b3',}}></View>
                <Text style={{margin:10,width:chartWidth-55}} numberOfLines={1}>{prop.date}  {prop.content}</Text>
                <View style={{borderWidth:0.5,borderColor:'#b3b3b3',}}></View>
              </View>
      </TouchableOpacity>
    </View>
  )
}

export default EventList;