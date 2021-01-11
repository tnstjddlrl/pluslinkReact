import React from 'react';
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
import { useState } from 'react/cjs/react.development';

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


                    



                </ScrollView>

                <Modal  transparent={true} visible={select}>
                    <View style={{width:100, height:180,position:'absolute',backgroundColor:'white',borderWidth:0.5,left:10,top:150}}>
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