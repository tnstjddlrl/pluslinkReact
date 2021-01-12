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
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'
import { useNavigation } from '@react-navigation/native';

const Eimg =require('./img/e_banner01.jpg')
const Eimg2 =require('./img/e_banner02.jpg')
const Eimg3 =require('./img/e_banner03.jpg')
const EEvent =({}) =>{
    const navigation = useNavigation();
  return (
    <View style={styles.cardview}>
      <Text style={styles.etitle}>이벤트</Text>
      <Text style={styles.etitle2}>진행중인 이벤트를 확인해보세요!</Text>
      <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd ={
                    () => {console.log('Scrolling is End')}
                }
            >
              
              <View style={styles.eventList}>
              <TouchableOpacity onPress={()=>navigation.navigate('이벤트자세히보기',{name:'김업체'})}>
                <Image source={Eimg} style={styles.imagetest}></Image>
                </TouchableOpacity>
                <Text numberOfLines={1} ellipsizeMode='tail' style={{width:180}}>[여름맞이 이벤트]2020년 7~월 수도견적 5000원 할인</Text>
              </View>
              
                <View style={styles.eventList}>
                  <Image source={Eimg2} style={styles.imagetest}></Image>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={{width:180}}>[여름맞이 이벤트]2020년 7~월 수도견적 5000원 할인</Text>
                </View>
                <View style={styles.eventList}>
                  <Image source={Eimg3} style={styles.imagetest}></Image>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={{width:180}}>[여름맞이 이벤트]2020년 7~월 수도견적 5000원 할인</Text>
              </View>
              
          <View>
          </View>

      </ScrollView>
    </View>
  )
}

export default EEvent;