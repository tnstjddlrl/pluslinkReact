import React,{useState} from 'react';
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

                        
                        <TableItem></TableItem>
                        <TableItem></TableItem>
                        <TableItem></TableItem>
                        <TableItem></TableItem>
                        <TableItem></TableItem>
                        <TableItem></TableItem>
                        <TableItem></TableItem>
                        <TableItem></TableItem>

                        
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

const TableItem = () => {
    const navigation = useNavigation();
    return(
                        <View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <View style={{alignItems:'center',left:10}}>
                                <Text>12.16</Text>
                                <Text>견적취소</Text>
                            </View>
                            <Text style={{width:35,marginLeft:30}}>전기&조명</Text>
                            <Text style={{width:40,marginLeft:40}}>동파</Text>
                            <Text style={{width:100,marginLeft:40}}>테스트테스트테스트테스트테스트테스트</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate('견적자세히보기')}>
                            <View style={{width:45,height:30,backgroundColor:'gray',marginLeft:15,alignItems:'center'}}>
                                <Text style={{color:'white',marginTop:7}}>보기</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:chartWidth-20,borderWidth:1,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                        </View>
    )
}

export default CurrentTable;