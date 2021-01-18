
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
import axios from "axios";

import { useNavigation } from '@react-navigation/native';

import arraydata from './json/g5_write_estimate'

const JsonTest = () => {
  const [list,setList]=useState([]);
  const [testlist,setTestlist]=useState([]);

  useEffect(()=>{
    axios.get('http://ip0131.cafe24.com/pluslink/test.json').then((res)=>{
      setList(res.data);
      console.log('길이 : ',list.length)
      console.log(list[3].category)
    })
  },[])

  const DataTest = ()=>{
    for(var i = 0; i <=list.length;i++){
      return(
        <ListItem id={list[i].no} category={list[i].category} subcategory={list[i].subcategory}></ListItem>
      )
    }
  }


  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>테스트</Text>
                      </View>

            {/* <Text key={list.no}>{list.category} : {list.subcategory}</Text> */}
            {/* <DataTest></DataTest> */}
            {/* <ListItem id={list[3].no} category={list[3].category} subcategory={list[3].subcategory}></ListItem> */}
            {/* <Text>{list[0].category}</Text> */}

            <DataTest></DataTest>


          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
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




export default JsonTest;