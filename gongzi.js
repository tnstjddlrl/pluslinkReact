import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import AsyncStorage from '@react-native-community/async-storage'; //로그인한 아이디값 저장하기 위한 앱 내부 저장소
import axios from "axios";

import { useNavigation } from '@react-navigation/native';




const Gongzi = () => {

  function refreshData(tableName) {
    axios.post('http://ip0131.cafe24.com/pluslink/json/jsonMember.php', JSON.stringify({
      id: tableName,
    }))
      .then(function (response) {
        console.log('리스폰스 ', response);
        if (response.request._response == 'suc') {
        }
        else {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(()=>{
    refreshData('g5_write_notice')
  },[])



  const [OneList,setOneList] = useState([]);

    async function GetJson() {
      try {
        return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_notice.json');
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

    var pp = []
    const PushItem = () => {
      for(var i = 0;i<OneList.length;i++){
        if(OneList[i].wr_is_comment == 0){
        pp.push(<Mitem time={OneList[i].wr_datetime.substring(0,10)} title={OneList[i].wr_subject} id={OneList[i].wr_id}></Mitem>)
      }
      }
      return pp
    }

    const NewPush = () => {
      var ll = []
      for(var i = 0;i<OneList.length;i++){
        if(OneList[i].wr_is_comment == 0 && OneList[i].wr_subject.indexOf(text) != -1){
        ll.push(<Mitem time={OneList[i].wr_datetime.substring(0,10)} title={OneList[i].wr_subject} id={OneList[i].wr_id}></Mitem>)
      }
      }
      return ll
    }

    const find = require('./img/find.png')
    const [text,setText] = useState('') //검색창용

  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth }}>
        <ScrollView style={{backgroundColor:'white'}}>
          <View style={{ marginBottom: 100 }}>
            <View style={{ width: chartWidth, marginTop: 50 }}>
              <ImageBackground source={event} style={{ width: chartWidth, height: chartHeight / 7 }}>
              </ImageBackground>
              <Text style={{ position: 'absolute', color: "white", fontSize: 20, fontWeight: 'bold', top: 40, left: 10 }}>공지사항</Text>
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


            {text == ''  ? <PushItem></PushItem> : <NewPush></NewPush>}


          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

const Mitem = (prop) =>{
  const navigation = useNavigation()
  return(
    <TouchableOpacity onPress={()=>navigation.navigate('공지사항상세',{id:prop.id})}>
    <View style={{marginLeft:10,marginTop:20}}>
      <View style={{flexDirection:'row',marginBottom:5}}>
      <Text style={{fontSize:15}}>{prop.time}</Text>
      <Text style={{fontSize:15,marginLeft:10,fontWeight:'bold'}} numberOfLines={1}>{prop.title}</Text>
      </View>
      <View style={{borderWidth:0.5,width:chartWidth-20}}></View>
    </View>
    </TouchableOpacity>
  )
}

export default Gongzi;