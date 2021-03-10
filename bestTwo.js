//우수시공사례

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
import { useNavigation } from '@react-navigation/native'; //네비게이션 프롭을 다른 페이지에서 받지않고도 이 페이지에서 단독으로 네비게이션을 사용할 수 있는 도구
import axios from "axios";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width; //현재 디바이스의 창크기를 얻어오는 함수들

const event = require('./img/eventBg.jpg')
const bg_1 = require('./img/case_bg.png')
const best1 = require('./img/best1.png')
const best2 = require('./img/best2.jpg')
const best3 = require('./img/best3.jpg')
const best4 = require('./img/best4.jpg')
const bongwoo = require('./img/bongwoo.png') //각종 이미지 소스

const BestTwo = () =>{

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

    var List = [];

    const PushItem = () =>{
      if(OneList.length !=0){
        for(var i = 0 ; i < OneList.length; i++){
          if(OneList[i].wr_10=='메인'){
            console.log(OneList[i].mb_id)
            List.push(<ListItem id={OneList[i].wr_id} title={OneList[i].wr_subject} name={OneList[i].wr_name} thumb={OneList[i].as_thumb} content={OneList[i].wr_1} wrid={OneList[i].mb_id}></ListItem>)
          }
        }
      }
      return List
    }


  return(
    <View style={{marginTop:0,marginBottom:250}}>
      <View>
        <ImageBackground source={bg_1} style={{width:chartWidth,height:250}}>
          <Text style={{alignSelf:'center',top:160,fontSize:20,fontWeight:'bold'}}>우수시공사례</Text>
        </ImageBackground>
        {/* 스크롤뷰의 horizontal 옵션은 가로 스크롤을 할수있도록 만들어준다. */}
        <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd ={
                    () => {console.log('Scrolling is End')}
                }
                style={{position:'absolute',top:200}}
            >
              {/* 스크롤뷰 안에 들어가는 아이템들은 컴포넌트화 시켜서 넣어줬다. */}
              <PushItem></PushItem>


        </ScrollView> 
            

        
      </View>
    </View> 
  )
}

const ListItem = (prop) =>{
  const navigation = useNavigation()
  return(
    <TouchableOpacity onPress={()=>navigation.navigate('베스트보기',{id:prop.id})}>
          <View style={{width:chartWidth/2.3,height:268,borderWidth:0.6,marginLeft:18,borderColor:'gray',marginBottom:20,marginTop:10}}>
            <Image source={{uri : prop.thumb}} style={{width:chartWidth/2.3,height:150}}></Image>
            <Text style={{width:chartWidth/2.5,margin:10,fontWeight:'bold'}} numberOfLines={1}>{prop.title}</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={{uri:'https://pluslink.kr/data/member_image/'+prop.wrid.substring(0,2) +'/'+prop.wrid+'.gif'}} style={{width:30,height:30,borderRadius:28,marginLeft:10}}></Image>
              <Text style={{marginLeft:10,fontWeight:'200'}}>{prop.name}</Text>
            </View>
            <Text numberOfLines={2} style={{margin:5,color:'#888',fontSize:12}}>{prop.content}</Text>
          </View>
      </TouchableOpacity>
  )
}

export default BestTwo;