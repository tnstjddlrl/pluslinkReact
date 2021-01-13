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
  Modal
} from "react-native";
import { useNavigation } from '@react-navigation/native';
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

import FootTer from './footer.js'
import HeadHeder from "./header.js";

const mt_b = require('./img/mt_b.jpg')
const arrow = require('./img/arrow02.png')

const InjuryPath = () => {
    const navigation = useNavigation();

    const [select, setSelect] = useState(false)
    const [listCate,SetlistCate] = useState('선택')

    let os = Platform.OS
    console.log(os)
    let nowheight;
      if(os == 'ios'){
       nowheight = 100;
      }else{
        nowheight = 60;
      }

    return (
        <View>
            <View style={{height:chartHeight,width:chartWidth}}>
                <View style={{top:nowheight,backgroundColor:'white'}}>
                    <View style={{marginLeft:20,marginRight:20,marginTop:10,backgroundColor:'white',height:chartHeight}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <View style={{borderWidth:1,height:60,width:60,borderRadius:27,backgroundColor:30}}></View>
                            <Text style={{fontSize:20,marginLeft:10}}>테스트</Text>
                        </View>

                        <View style={{width:chartWidth-40,borderWidth:0.5,marginBottom:5,marginTop:10}}></View>
                        <View style={{flexDirection:"row",alignItems:"center",}}>
                            <View style={{flexDirection:"row",width:chartWidth}}>
                                    <View style={{left:chartWidth/15}}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('정보변경')}>
                                        <Text>정보변경</Text>
                                    </TouchableOpacity>
                                    </View>
                                
                                
                                    <View style={{left:chartWidth/4}}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('취약계층인증')}>
                                        <Text>취약계층인증</Text>
                                        </TouchableOpacity>
                                    </View>
                                
                                
                                    <View style={{left:chartWidth/2.5}}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('정보변경')}>
                                        <Text>로그아웃</Text>
                                        </TouchableOpacity>
                                    </View>
                                
                            </View>
                        </View>
                        <View style={{width:chartWidth-40,borderWidth:0.5,marginBottom:5,marginTop:10}}></View>


                        <View style={{marginTop:20}}>
                            <View style={{flexDirection:'row'}}>
                                <Text>신청현황</Text>
                                <Text style={{position:'absolute',left:chartWidth/4}}>미신청</Text>
                            </View>

                            <TouchableOpacity onPress={()=>setSelect(true)}>
                            <View style={{flexDirection:'row',marginTop:25,alignItems:'center'}}>
                                <Text>취약계층구분</Text>
                                
                                    <View style={{width:100,height:30,borderWidth:0.7,position:'absolute',left:chartWidth/4,top:-10,alignItems:"center",flexDirection:"row"}}>
                                        <Text style={{left:2}}>{listCate}</Text>
                                        <Image source={arrow} style={{width:8,height:14,right:5,position:'absolute'}}></Image>
                                    </View>
                                
                            </View>
                            </TouchableOpacity>
                            <View style={{flexDirection:'row',marginTop:50}}>
                                <Text>인증이미지첨부</Text>
                                <Text style={{position:'absolute',left:chartWidth/4}}>미신청</Text>
                            </View>

                            
                            

                        </View>

                    </View>
                </View>


                
            </View>
                <HeadHeder></HeadHeder>
                <FootTer></FootTer>



                <Modal  transparent={true} visible={select}>
                    <View style={{width:100, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:chartWidth/3.4,top:chartHeight/3}}>
                        <TouchableOpacity onPress={()=>{SetlistCate('선택'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>선택</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('장애인'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>장애인</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
        </View>
    )
}

export default InjuryPath