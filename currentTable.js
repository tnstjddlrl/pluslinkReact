import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import { useNavigation } from '@react-navigation/native';

import FootTer from './footer.js'
import HeadHeder from "./header.js";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'

const ItemPush = () =>{
    var List = []
    var middle = []
    const [list,setList]=useState([])

    async function GetJson() {
        try {
          return await axios.get('http://ip0131.cafe24.com/pluslink/g5_estimate_write.json');
        } catch (error) {
          console.log('에러 : ',error)
          return false;
        }
      } 
      
      useEffect(()=>{
            if(list.length==0){
                GetJson().then((res)=>{
                setList(res.data)
                console.log('리스트값',list)
                
                })
          }
      
      })

    if(list.length != 0){
        console.log(list.length)
        for(let i = 0; i <list.length;i++){
              if(list[i].mb_id=='test'){
                  var nDate = list[i].wr_datetime
                  var fDate = nDate.substring(0,10)
                  nDate = nDate.substring(5,10)
                  console.log(nDate)
                  var addr = list[i].wr_4 +' '+ list[i].wr_5

                  
                  List.push(<TableItem num={list[i].wr_id} date={nDate} fdate={fDate} cate={list[i].wr_1} subcate={list[i].wr_2} content={list[i].wr_content} state={list[i].wr_8} addr={addr} subj={list[i].wr_subject} com={list[i].wr_name}></TableItem>)
              }

            
          }
        
    }
    return List
    
}


const TableItem = (prop) => {
    const navigation = useNavigation();
    return(
                        <View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{alignItems:'center',left:'35%'}}>
                                <Text>{prop.date}</Text>
                                <Text>{prop.state}</Text>
                            </View>
                            <Text style={{width:35,marginLeft:'7%'}}>{prop.cate}</Text>
                            <Text style={{width:40,marginLeft:'10%'}}>{prop.subcate}</Text>
                            <Text style={{width:120,marginLeft:'5%'}} numberOfLines={2}>{prop.content}</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate('견적자세히보기',{num:prop.num, date:prop.date, fdate:prop.fdate, cate:prop.cate, subcate:prop.subcate, content:prop.content, state:prop.state, addr:prop.addr, subj:prop.subj,com:prop.com})}>
                            <View style={{width:45,height:30,backgroundColor:'gray',marginLeft:'10%',alignItems:'center'}}>
                                <Text style={{color:'white',marginTop:7}}>보기</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:chartWidth-20,borderWidth:1,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                        </View>
    )
}



const CurrentTable =({route}) =>{
    
    const navigation = useNavigation();
    const [select, setSelect] = useState(false)
    const [listCate,SetlistCate] = useState(route.params.name)


    return(
        <View>
            <View style={{width:chartWidth,height:chartHeight}}>
                <ScrollView>
                    <View style={{width:chartWidth,marginTop:50}}>
                    <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                    </ImageBackground>
                    <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>견적현황</Text>
                    </View>


                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>setSelect(true)}>
                            <View style={{width:100,height:30,borderWidth:0.7,left:10,marginTop:20,alignItems:"center",flexDirection:"row"}}>
                                <Text style={{left:2}}>{listCate}</Text>
                                <Image source={arrow} style={{width:8,height:14,right:5,position:'absolute'}}></Image>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('견적의뢰')}>
                            <View style={{backgroundColor:'#A579C9',width:70,height:30,left:10,marginTop:20,alignItems:'center',alignContent:'center'}}>
                                <Text style={{color:'white',marginTop:5,fontWeight:"800"}}>견적의뢰</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{marginLeft:10,marginBottom:100}}>
                        <View style={{width:chartWidth-20,borderWidth:1,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                        <View style={{flexDirection:'row',width:chartWidth-30,height:40}}>
                            <Text style={{position:'absolute',right:330,width:30,fontWeight:'bold'}}>상태</Text>
                            <Text style={{position:'absolute',right:270,width:30,fontWeight:'bold'}}>카테고리</Text>
                            <Text style={{position:'absolute',right:190,fontWeight:'bold'}}>세부항목</Text>
                            <Text style={{position:'absolute',right:100,fontWeight:'bold'}}>내용</Text>
                            <Text style={{position:'absolute',right:5,fontWeight:'bold'}}>관리</Text>
                        </View>
                        <View style={{width:chartWidth-20,borderWidth:1,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>

                        

                        <ItemPush></ItemPush>

                        
                    </View>

                  

                    



                </ScrollView>

                <Modal  transparent={true} visible={select}>
                    <View style={{width:100, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:10,top:150}}>
                        <TouchableOpacity onPress={()=>{SetlistCate('전체'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>전체</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('입찰대기'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>입찰대기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('입찰진행중'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>입찰진행중</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('시공진행중'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>시공진행중</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('시공완료'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>시공완료</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('시공취소'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>시공취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('견적취소'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>견적취소</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            
            


            
            <HeadHeder></HeadHeder>
                <FootTer></FootTer>

            

        </View>
    )
}







export default CurrentTable;