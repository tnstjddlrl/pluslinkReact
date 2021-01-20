import React, { useState,useEffect } from 'react';
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

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import axios from "axios";

const EventToPage = ({route}) => {
  const [Elist,setElist] = useState([])
  const [target,setTarget] = useState(0)
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
    if(Elist.length!=0){
      for(var i = 0; i<Elist.length; i++){
        if(Elist[i].wr_id==route.params.id){
          setTarget(i)
        }
      }
      List.push(<Item subj={Elist[target].wr_subject} content={Elist[target].wr_content} img={Elist[target].as_thumb}></Item>)
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
                
              <PushItem></PushItem>

          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

const Item = (prop) =>{
  const image = {uri: prop.img}
  return(
    <View>
      <Text style={{fontSize:21,fontWeight:'bold',marginTop:35,marginLeft:15}}>{prop.subj}</Text>
        <View style={{width:chartWidth-50,height:200,backgroundColor:'gray',marginLeft:25,marginTop:20}}>
          <Image source={image} style={{width:chartWidth-50,height:200}}></Image>
        </View>
       <Text style={{marginTop:15,marginLeft:15}}>{prop.content}</Text>
    </View>
  )
}

export default EventToPage;