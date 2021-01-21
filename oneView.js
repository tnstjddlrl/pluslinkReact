import React,{useState,useEffect} from 'react';
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

const user = require('./img/user.png')
const clock = require('./img/clock.png')

import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";

const OneView = ({route}) => {
  const navigation = useNavigation();

  const [OneList,setOneList] = useState([]);

    async function GetJson() {
      try {
        return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_qa_content.json');
      } catch (error) {
        console.log('에러 : ',error)
        return false;
      }
    }

    useEffect(()=>{
      if(OneList.length==0){
        GetJson().then((res)=>{
          setOneList(res.data)
        })
      }
    })

    var pushlist = []

    const ItemPush = () =>{
      if(OneList.length != 0){
        for(var i =0;i<OneList.length;i++){
          if(OneList[i].qa_id==route.params.id){
            var date = OneList[i].qa_datetime
            date = date.substring(0,16)
            date = date.replace(/-/gi,'.')
            pushlist.push(<Content title={OneList[i].qa_subject} content={OneList[i].qa_content} name={OneList[i].mb_id} hp={OneList[i].qa_hp} email={OneList[i].qa_email} date={date}></Content>)
          }
        }
      }
      return pushlist
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

            <ItemPush></ItemPush>
              
          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

const Content = (prop) => {
  return(
    <View>
    <View style={{flexDirection:'row',alignItems:'center',marginTop:30,marginLeft:20}}>
              {/* <View style={{backgroundColor:'gray',borderRadius:28,width:60,height:60}}></View> */}
                <Text style={{marginLeft:5,fontSize:20,fontWeight:'bold',marginBottom:20}}>{prop.title}</Text>
            </View>

            <View style={{marginLeft:10,marginTop:10}}>
              <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
              <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
                <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
                  <Image source={user} style={{width:10,height:10,}}></Image>
                  <Text style={{fontSize:13}}>{prop.name}</Text>
                  <Image source={user} style={{width:10,height:10,marginLeft:10}}></Image>
                  <Text style={{fontSize:13}}>{prop.hp}</Text>
                  <Image source={user} style={{width:10,height:10,marginLeft:10}}></Image>
                  <Text style={{fontSize:13}}>{prop.email}</Text>
                  <Image source={clock} style={{width:10,height:10 ,marginLeft:10}}></Image>
                  <Text style={{fontSize:13}}>{prop.date}</Text>
                </View>
                <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
              <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
                <Text style={{margin:15}}>{prop.content}</Text>
      </View>
      </View>
  )
}

export default OneView;