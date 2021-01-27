import React, { useState , useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')



import { useNavigation } from '@react-navigation/native';

import FootTer from './footer.js'
import HeadHeder from "./header.js";
import CurrentTable  from "./currentTable";

import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import axios from "axios";

var allC = 0
var count = 0


const CurGyeon = () => {
  const [newid,setNewid] = useState('');
  
    async function isFavorite() {
      try {
        return await AsyncStorage.getItem("@super:id");
      } catch (error) {
        return false;
      }
    }
    
      const result = isFavorite().then((company_id) => {
        setNewid(company_id)
      });

  const navigation = useNavigation();

  function refreshData(tableName){
    axios.post('http://ip0131.cafe24.com/pluslink/json/jsonMember.php', JSON.stringify({
      id : tableName,
    }))
    .then(function (response) {
      console.log('리스폰스 ',response);
      if(response.request._response=='suc'){
      }
      else{
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  refreshData('g5_write_estimate')

  async function GetJson() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_estimate.json');
    } catch (error) {
      console.log('에러 : ',error)
      return false;
    }
  }

  const [list,setList] = useState([]);
      useEffect(()=>{
        if(list.length==0){
            GetJson().then((res)=>{
            setList(res.data)
            console.log(list)
            })
          }
      })

     
      const [all,setAll] = useState('') //전체 갯수

      if(count <10){
          if(list.length !=0){
          for(var i = 0;i<list.length;i++){
            if(list[i].mb_id == newid.toLowerCase()){
              allC += 1
            }
            count +=1
            console.log(count)
          }
          setAll(allC)
        }
      }

    return (
        <View>
          <ScrollView style={{width:chartWidth,height:chartHeight}}>
          
            <View style={{width:chartWidth,marginTop:50}}>
            <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
            </ImageBackground>
            <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>견적현황</Text>
            </View>

            <View style={{marginTop:20,marginLeft:10}}>
                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'전체'})}>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>전체({all})</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'입찰대기'})}>
                            <View style={{marginLeft:10,marginTop:40,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>입찰대기</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'입찰진행중'})}>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>입찰진행중</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'시공진행중'})}>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>시공진행중</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'시공완료'})}>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>시공완료</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'시공취소'})}>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>시공취소</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'견적취소'})}>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>견적취소</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>
                            

                        </View>
          
          

          </ScrollView>


                <HeadHeder></HeadHeder>
                <FootTer></FootTer>

        </View>
 
 

      );
    
}

export default CurGyeon;