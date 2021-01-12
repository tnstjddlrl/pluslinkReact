import React,{useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';

const OneWrite = () => {
  const [select,setSelect] = useState(false)
  const [listCate,SetlistCate] = useState("선택하세요")
  const [value, onChangeText] = React.useState('');//textinput용
  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>1대1문의</Text>
                      </View>

            <View style={{margin:15}}>
              <View style={{borderWidth:0.3,width:chartWidth-30,borderColor:'gray'}}>
                <Text style={{margin:15}}>글작성</Text>
              </View>

              <TouchableOpacity onPress={()=>setSelect(true)}>
                            <View style={{borderWidth:0.7,marginTop:30,alignItems:"center",flexDirection:"row"}}>
                                <Text style={{margin:10}}>{listCate}</Text>
                                <Image source={arrow} style={{width:8,height:14,right:5,position:'absolute'}}></Image>
                            </View>
              </TouchableOpacity>

              <Text style={{marginTop:20}}>E-mail</Text>
              <TextInput
                style={{ height: 40,width:chartWidth-30,marginTop:10, borderColor: 'gray', borderWidth: 0.5}}
                onChangeText={text => onChangeText(text)}
                placeholder='test@test.com'
                value={value}
              />

              <Text style={{marginTop:20}}>휴대폰</Text>
              <TextInput      
                style={{ height: 40,width:chartWidth-30,marginTop:10, borderColor: 'gray', borderWidth: 0.5 }}
                onChangeText={text => onChangeText(text)}
                placeholder='010-1234-1234'
                keyboardType='number-pad'
                value={value}
              />

              <Text style={{marginTop:20}}>제목</Text>
              <TextInput      
                style={{ height: 40,width:chartWidth-30,marginTop:10, borderColor: 'gray', borderWidth: 0.5 }}
                onChangeText={text => onChangeText(text)}
                value={value}
              />

              <TextInput      
                style={{ height: 150,width:chartWidth-30,marginTop:10, borderColor: 'gray', borderWidth: 0.5 }}
                onChangeText={text => onChangeText(text)}
                value={value}
                multiline={true}
              />



            </View>

            

          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>


      <Modal  transparent={true} visible={select}>
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:300}}>
                        <TouchableOpacity onPress={()=>{SetlistCate('선택하세요'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>선택하세요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('회원'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>회원</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('포인트'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>포인트</Text>
                        </TouchableOpacity>
                    </View>
       </Modal>

    </View>
  )
}

export default OneWrite;