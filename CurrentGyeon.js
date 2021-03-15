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


const CurGyeon = ({route}) => {
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
          GetJson().then((res) => {
            setList(res.data)
            console.log(list)
          })
        }
      })


  const [all, setAll] = useState(0) //전체 갯수
  const [wait, setWait] = useState(0) //입찰대기
  const [ipload,setIpload] = useState(0) //입찰진행중
  const [siload,setSiload] = useState(0) //시공진행중
  const [complete,setComplete] = useState(0) //시공완료
  const [sicancel, setSicancel] = useState(0) //시공취소
  const [gyoncancel, setGyoncancel] = useState(0)//견적취소


  function cnt(){
    var nn = 0
    for (var i = 0; i < list.length; i++) {
      if (list[i].mb_id == newid.toLowerCase() && list[i].wr_is_comment == '0') {
        nn += 1
        console.log('작동 테스트')
      }
      console.log(nn)
    }
    return nn
  }

  function newcnt(name){
    var nn = 0
    for (var i = 0; i < list.length; i++) {
      if (list[i].mb_id == newid.toLowerCase() && list[i].wr_is_comment == '0' && list[i].wr_8 == name) {
        nn += 1
        console.log('작동 테스트')
      }
      console.log(nn)
    }
    return nn
  }

  useEffect(() => {
    setAll(cnt())
    setWait(newcnt('입찰대기'))
    setIpload(newcnt('입찰진행중'))
    setSiload(newcnt('시공진행중'))
    setComplete(newcnt('시공완료'))
    setSicancel(newcnt('시공취소'))
    setGyoncancel(newcnt('견적취소'))
  })


    return (
        <View>
          <ScrollView style={{width:chartWidth,height:chartHeight,backgroundColor:'white'}}>
          
            <View style={{width:chartWidth,marginTop:50}}>
            <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
            </ImageBackground>
            <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>견적현황</Text>
            </View>

            <View style={{marginTop:20,marginLeft:10}}>
                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'전체'})}>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>전체({all})</Text>
                                <Image source={arrow} style={{position:'absolute',right:20,width:8,height:15}}></Image>
                            </View>
                            <View style={{width:chartWidth-30,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'입찰대기'})}>
                            <View style={{marginLeft:10,marginTop:40,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>입찰대기({wait})</Text>
                                <Image source={arrow} style={{position:'absolute',right:20,width:8,height:15}}></Image>
                            </View>
                            <View style={{width:chartWidth-30,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'입찰진행중'})}>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>입찰진행중({ipload})</Text>
                                <Image source={arrow} style={{position:'absolute',right:20,width:8,height:15}}></Image>
                            </View>
                            <View style={{width:chartWidth-30,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'시공진행중'})}>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>시공진행중({siload})</Text>
                                <Image source={arrow} style={{position:'absolute',right:20,width:8,height:15}}></Image>
                            </View>
                            <View style={{width:chartWidth-30,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'시공완료'})}>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>시공완료({complete})</Text>
                                <Image source={arrow} style={{position:'absolute',right:20,width:8,height:15}}></Image>
                            </View>
                            <View style={{width:chartWidth-30,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'시공취소'})}>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>시공취소({sicancel})</Text>
                                <Image source={arrow} style={{position:'absolute',right:20,width:8,height:15}}></Image>
                            </View>
                            <View style={{width:chartWidth-30,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>navigation.navigate('견적테이블',{name:'견적취소'})}>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:15}}>견적취소({gyoncancel})</Text>
                                <Image source={arrow} style={{position:'absolute',right:20,width:8,height:15}}></Image>
                            </View>
                            <View style={{width:chartWidth-30,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>
                            

                        </View>
          
          

          </ScrollView>


                <HeadHeder></HeadHeder>
                <FootTer></FootTer>

        </View>
 
 

      );
    
}

export default CurGyeon;