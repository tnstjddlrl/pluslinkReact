import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  TextInput
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

  const NewPush = () => {
    var ll = []

    for (var i = 0; i < Elist.length; i++) {
      if (Elist[i].wr_subject.indexOf(text)!=-1) {
        var date = Elist[i].wr_datetime
        date = date.substring(0, 10)
        ll.push(<ListItem date={date} content={Elist[i].wr_subject} id={Elist[i].wr_id}></ListItem>)
      }
    }


    return ll

  }

  const find = require('./img/find.png')
  const [text,setText] = useState('') //검색창용
  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView style={{backgroundColor:'white'}}>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>이벤트</Text>
                      </View>

            <View style={{ margin: 10 }}>
              <View style={{ borderWidth: 0.4, width: chartWidth - 20, height: 60, justifyContent: "center", backgroundColor: '#f2f2f2' }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', width: chartWidth - 40, marginLeft: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: 30, height: 30, backgroundColor: '#d9d9d9', borderTopWidth: 0.4, borderBottomWidth: 0.4, borderLeftWidth: 0.4, justifyContent: "center", alignItems: "center" }}>
                      <Image style={{ width: 20, height: 20 }} source={find}></Image>
                    </View>
                    <View style={{ width: chartWidth / 2.3, height: 30, borderWidth: 0.4 }}>
                      <TextInput onChangeText={(txt) => setText(txt)} value={text} style={{ width: chartWidth / 2.3, height: 40 }}></TextInput>
                    </View>
                  </View>
                  <View style={{ height: 30, width: chartWidth / 3, backgroundColor: 'black', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>검색하기</Text>
                  </View>
                </View>
              </View>

            </View>


              {(text=='') ?
              <View style={{marginTop:5,marginLeft:15}}>
                <PushItem></PushItem>
              </View> :
              <View style={{marginTop:5,marginLeft:15}}>
              <NewPush></NewPush>
            </View>
              }
           
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