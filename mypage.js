import React,{useState,Component,useEffect} from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  AppRegistry,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

import FootTer from './footer.js'
import HeadHeder from "./header.js";

const mt_b = require('./img/mt_b.jpg')
const arrow = require('./img/arrow02.png')

const Mypage = () => {
    const navigation = useNavigation();

    return (
        <View>
            <View style={{height:chartHeight,width:chartWidth}}>
                <View style={{top:60,backgroundColor:'white'}}>
                    <View style={{marginLeft:20,marginRight:20,marginTop:10,backgroundColor:'white',height:chartHeight}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <View style={{borderWidth:1,height:60,width:60,borderRadius:27,backgroundColor:30}}></View>
                            <Text style={{fontSize:20,marginLeft:10}}>테스트</Text>
                        </View>

                        <View style={{width:chartWidth-40,borderWidth:0.5,marginBottom:5,marginTop:10}}></View>
                        <View style={{flexDirection:"row",alignItems:"center",}}>
                            <View style={{flexDirection:"row",width:chartWidth}}>
                                <Text style={{left:'200%'}}>정보변경</Text>
                                <Text style={{left:'500%'}}>취약계층인증</Text>
                                <Text style={{left:'800%'}}>로그아웃</Text>
                            </View>
                        </View>
                        <View style={{width:chartWidth-40,borderWidth:0.5,marginBottom:5,marginTop:10}}></View>


                        <View style={{marginTop:20}}>
                            <TouchableOpacity onPress={()=>navigation.navigate('견적현황')}>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:20}}>견적현황</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:20}}>결제관리</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:20}}>리뷰관리</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>


                            <TouchableOpacity>
                            <View style={{marginLeft:10,marginTop:30,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:20}}>공지사항</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:20}}>이벤트</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:20}}>1:1문의</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                            <View style={{marginLeft:10,marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                <Text style={{fontSize:20}}>자주묻는질문</Text>
                                <Image source={arrow} style={{position:'absolute',right:20}}></Image>
                            </View>
                            <View style={{width:chartWidth-40,borderWidth:0.3,marginBottom:5,marginTop:10,borderColor:'#DBDBDB'}}></View>
                            </TouchableOpacity>
                            

                        </View>

                    </View>
                </View>


                
            </View>
                <HeadHeder></HeadHeder>
                <FootTer></FootTer>
        </View>
    )
}

export default Mypage