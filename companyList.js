import React,{useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';

const heart = require('./img/handhart.png')
const starimg =require('./img/review.png')

const CompanyList = () => {
  const [select,setSelect] = useState(false)
  const [listCate,SetlistCate] = useState("전기&조명")
  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>업체목록</Text>
                      </View>

            <View style={{margin:10}}>
              <View style={{backgroundColor:'#e6e6e6', width:chartWidth-20,borderRadius:17}}>
                <Text style={{fontSize:18,marginTop:15,marginLeft:15}}>카테고리</Text>
                  <TouchableOpacity onPress={()=>setSelect(true)}>
                                <View style={{borderWidth:0.5,marginTop:10,alignItems:"center",flexDirection:"row",width:chartWidth-40,marginLeft:10,backgroundColor:'white',borderRadius:5}}>
                                    <Text style={{margin:10}}>{listCate}</Text>
                                    <Image source={arrow} style={{width:8,height:14,right:5,position:'absolute'}}></Image>
                                </View>
                  </TouchableOpacity>

                <Text style={{fontSize:18,marginTop:15,marginLeft:15}}>세부카테고리</Text>
                  <TouchableOpacity onPress={()=>setSelect(true)}>
                                <View style={{borderWidth:0.5,marginBottom:20,marginTop:10,alignItems:"center",flexDirection:"row",width:chartWidth-40,marginLeft:10,backgroundColor:'white',borderRadius:5}}>
                                    <Text style={{margin:10}}>{listCate}</Text>
                                    <Image source={arrow} style={{width:8,height:14,right:5,position:'absolute'}}></Image>
                                </View>
                  </TouchableOpacity>
              </View>

              <View style={{backgroundColor:'#e6e6e6', width:chartWidth-20,borderRadius:17,borderWidth:0.5,marginTop:30}}>
                
                <ListItem></ListItem>
                <ListItem></ListItem>


              </View>
            </View>
            


          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>


      <Modal  transparent={true} visible={select}>
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:150}}>
                        <TouchableOpacity onPress={()=>{SetlistCate('전기&조명'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>전기&조명</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('수도'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>수도</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('도배&장판'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>도배&장판</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{SetlistCate('인테리어'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>인테리어</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('샷시&창호'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>샷시&창호</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('청소&철거'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>청소&철거</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('건물외부'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>건물외부</Text>
                        </TouchableOpacity>
                    </View>
       </Modal>

    </View>
  )
}

const ListItem = () => {
  return(
    <View style={{margin:20}}>
            <TouchableOpacity>
                  <View style={{height:180,width:chartWidth-60,borderRadius:10,backgroundColor:'gray'}}></View>

                  <View style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
                    <Image source={heart} style={{width:30,height:30}}></Image>
                    <Text style={{fontSize:18,marginLeft:15}}>김업체</Text>
                  </View>

                  <View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
                    <Image source={starimg} style={{width:20,height:20}}></Image>
                    <Text style={{fontSize:18,marginLeft:15}}>3.7</Text>
                  </View>

                  <Text style={{marginTop:10}}>업체소개</Text>
                  <View style={{width:50,borderWidth:0.5,marginTop:3}}></View>
                  <Text numberOfLines={1} style={{marginTop:10}}>반갑습니다 수도전문업체는 15년 경력을가지고있습니다. 많은 이용바랍니다.</Text>

                  <View style={{width:chartWidth-60,borderWidth:0.8,marginTop:10,borderColor:'#a6a6a6'}}></View>
            </TouchableOpacity>
    </View>
  )
}

export default CompanyList;