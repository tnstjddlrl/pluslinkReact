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
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const bg_1 = require('./img/case_bg.png')
const best1 = require('./img/best1.png')
const best2 = require('./img/best2.jpg')
const best3 = require('./img/best3.jpg')
const best4 = require('./img/best4.jpg')
const bongwoo = require('./img/bongwoo.png')

const BestTwo = () =>{
  return(
    <View style={{marginTop:30,marginBottom:250}}>
      <View>
        <ImageBackground source={bg_1} style={{width:chartWidth,height:250,}}>
          <Text style={{alignSelf:'center',top:160,fontSize:20,fontWeight:'bold'}}>우수시공사례</Text>
        </ImageBackground>
        <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd ={
                    () => {console.log('Scrolling is End')}
                }
                style={{position:'absolute',top:200}}
            >
              <ListItem></ListItem>
              <ListItem></ListItem>
              <ListItem></ListItem>
              <ListItem></ListItem>


        </ScrollView>


        
      </View>
    </View>
  )
}

const ListItem = () =>{
  const navigation = useNavigation()
  return(
    <TouchableOpacity onPress={()=>navigation.navigate('베스트보기')}>
          <View style={{width:chartWidth/2.3,height:268,borderWidth:0.6,marginLeft:18,borderColor:'gray',marginBottom:20,}}>
            <Image source={best1} style={{width:chartWidth/2.3,height:150}}></Image>
            <Text style={{width:chartWidth/2.5,margin:10,fontWeight:'bold'}} numberOfLines={1}>울산 제2장애인 체육관 조명 시공</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image source={bongwoo} style={{width:30,height:30,borderRadius:28,marginLeft:10}}></Image>
              <Text style={{marginLeft:10,fontWeight:'200'}}>이봉우</Text>
            </View>
            <Text numberOfLines={2} style={{margin:5,fontWeight:'100',color:'gray'}}>울산 제2장애인 체육관 조명 시공</Text>
          </View>
          </TouchableOpacity>
  )
}

export default BestTwo;