
import React, { useState, useEffect } from 'react';
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

const JsonTest2 = () => {
  const [list,setList] = useState([]);

  // for(var i = 0;i<100;i++){
  // axios.get('http://ip0131.cafe24.com/pluslink/test.json').then((res)=>{
  //   setList(res.data);
  //   console.log(list)
  // })}



  async function GetJson() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/test.json');
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
  

  var List = []

  const Test = ()=>{
    for(let i = 0;i<list.length;i++){
      List.push(<ListItem id={list[i].no} category={list[i].category} subcategory={list[i].subcategory}></ListItem>)
    }
    
    return List
  }

  const ListItem = (prop) =>{
    return(
      <View>
        <Text>{prop.id}</Text>
        <Text>{prop.category}</Text>
        <Text>{prop.subcategory}</Text>
      </View>
    )
  }


  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>1대1문의</Text>
                      </View>
              {list.length == 0 ? <View></View> : <Test></Test>}

          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

export default JsonTest2;