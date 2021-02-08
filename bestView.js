//우수시공사례 자세히보기

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
const chartWidth = Dimensions.get('window').width; //현재 창 크기 가져오기

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js"; //푸터 헤더

import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import WebView from 'react-native-webview';

const user = require('./img/user.png')
const clock = require('./img/clock.png')

const BestView = ({route}) => {


  const navigation = useNavigation();

  const [OneList,setOneList] = useState([]);

    async function GetJson() {
      try {
        return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_example.json');
      } catch (error) {
        console.log('에러 : ',error)
        return false;
      }
    }

    useEffect(()=>{
      if(OneList.length==0){
        GetJson().then((res)=>{
        setOneList(res.data)
        console.log(list)
        })
      }
    })

    var title = []
    const PushTitle = ()=>{
      if(OneList.length!=0){
        for(var i =0;i<OneList.length;i++){
          if(OneList[i].wr_id==route.params.id){
            var date = OneList[i].wr_datetime
            date = date.substring(0,10)
            title.push(<TitleItem title={OneList[i].wr_subject} name={OneList[i].wr_name} date={date} img={OneList[i].as_thumb} main={OneList[i].wr_content}></TitleItem>)
          }
        }
      }
      return title
    }





  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView style={{backgroundColor:'white'}}>
          {/* 상단 이미지 */}
          <View style={{marginBottom:50}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>시공사례</Text>
                      </View>
            <PushTitle></PushTitle>
            
              
          </View>
        </ScrollView>
      </View>


      {/* 헤더와 푸터를 맨밑에 배치하는 이유는, 여러가지 시도 후 맨 마지막에 렌더링된 아이템이 맨 상단에 올라와진다는 것을 알게되었기 때문이다. */}
      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

const TitleItem =(prop) =>{
  return(
    <View>
    <View style={{flexDirection:'row',alignItems:'center',marginTop:25,marginLeft:20}}>
    <Image source={{uri:prop.img}} style={{backgroundColor:'gray',borderRadius:28,width:60,height:60}}></Image>
      <Text style={{marginLeft:5,fontSize:18,fontWeight:'bold',width:chartWidth/1.3}} >{prop.title}</Text>
  </View>

  {/* 작성자 전화번호 이메일 일시 */}
  <View style={{marginLeft:10,marginTop:10}}>
    <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
      <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
        <Image source={user} style={{width:10,height:10,marginLeft:10}}></Image>
        <Text style={{fontSize:13}}>{prop.name}</Text>
        <Image source={clock} style={{width:10,height:10 ,marginLeft:20}}></Image>
        <Text style={{fontSize:13}}>{prop.date}</Text>
      </View>
    <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
    <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
  </View>

  <View>
      <WebView style={{width:chartWidth,height:500,marginTop:20}} source={{html: '<style>img { width: 800px;}</style>'+prop.main}}></WebView>
    </View>
  </View>
  )
}

const MainItem = () =>{
  return(
    <View>
      <WebView></WebView>
    </View>
  )
}

export default BestView;