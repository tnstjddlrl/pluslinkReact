import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';


const Faq = () => {

  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>FAQ</Text>
                      </View>

            <View style={{margin:10}}>
              <View style={{borderWidth:0.5,borderColor:'gray',width:chartWidth-20,flexDirection:"row"}}>
                <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
                  <View style={{borderWidth:0.5,width:40,height:40}}>
                    <Image></Image>
                  </View>
                  <View style={{width:chartWidth/1.8,height:40,borderWidth:0.5,borderColor:'gray'}}>
                    <TextInput style={{width:chartWidth/1.8,height:40}}></TextInput>
                  </View>
                </View>


                <View style={{height:40,width:chartWidth/5,backgroundColor:'black',alignItems:"center",justifyContent:"center",margin:10}}>
                  <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>검색하기</Text>
                </View>
              </View>
            </View>


          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

export default Faq;