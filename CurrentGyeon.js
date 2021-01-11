import React from 'react';
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

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const CurGyeon = () => {
  const navigation = useNavigation();
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
                                <Text style={{fontSize:15}}>전체(0)</Text>
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