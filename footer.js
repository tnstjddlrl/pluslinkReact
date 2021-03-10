import React,{useState,Component,useEffect} from "react";
import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const ffimg =require('./img/b01.png')
const ffimg2 =require('./img/b02.png')
const ffimg3 =require('./img/b03.png')
const ffimg4 =require('./img/b04.png')
const FootTer = () => {
  const navigation = useNavigation(); 

  const [newid,setNewid] = useState('');
  
    async function isFavorite() {
      try {
        return await AsyncStorage.getItem("@super:id");
      } catch (error) {
        return false;
      }
    }
    
    useEffect(()=>{
        isFavorite().then((company_id) => {
        setNewid(company_id.toLowerCase())
      });
    })

    function refresh(){
      for(var i = 0;i<20;i++){
        isFavorite().then((company_id) => {
          setNewid(company_id.toLowerCase())
        });
      }

    }

    const unsubscribe = navigation.addListener('focus', () => {
      refresh();
    });
    useEffect(() => {
      return () => unsubscribe();
    });
      


  function logCheck(prop){
    if(newid == '로그인해주세요' || newid == ''){
      Alert.alert('로그인을 먼저 해주세요.')
      navigation.navigate('로그인')
    }else{
      navigation.navigate(prop)
    }
  }

  return (

    <View style={{ flex: 1 }}>
      <View style={{ borderWidth: 0.3, position: 'absolute', bottom: 0, marginLeft: -5,width:chartWidth+10,backgroundColor:'white' }}>
        <View style={{justifyContent:'space-between', flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={() => { refresh(), navigation.navigate('홈') }}>
            <View style={{ backgroundColor: 'white' }}>
              <ImageBackground source={ffimg} style={{ width: 65, height: 65, marginBottom: 15,marginLeft:20 }}>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { refresh(), logCheck('견적의뢰') }}>
            <View style={{ backgroundColor: 'white' }}>
              <ImageBackground source={ffimg2} style={{ width: 65, height: 65, marginLeft: 20, marginRight: 10, marginBottom: 15 }}>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback >
          <TouchableWithoutFeedback onPress={() => { refresh(), logCheck('견적현황') }}>
            <View style={{ backgroundColor: 'white' }}>
              <ImageBackground source={ffimg3} style={{ width: 65, height: 65, marginLeft: 25, marginRight: 10, marginBottom: 15 }}>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { refresh(), logCheck('마이페이지') }}>
            <View style={{ backgroundColor: 'white' }}>
              <ImageBackground source={ffimg4} style={{ width: 65, height: 65, marginLeft: 20, marginBottom: 15,marginRight:20 }}>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
        </View>

      </View>
    </View>

   
  );
};

export default FootTer;