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
import axios from 'axios'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Eimg =require('./img/e_banner01.jpg')
const Eimg2 =require('./img/e_banner02.jpg')
const Eimg3 =require('./img/e_banner03.jpg')
const EEvent =({}) =>{
    const navigation = useNavigation();

    const [Elist,setElist] = useState([])
    async function GetJson() {
      try {
        return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_event.json');
      } catch (error) {
        console.log('에러 : ',error)
        return false;
      }
    }

    useEffect(()=>{
      if(Elist.length==0){
        GetJson().then((res)=>{
          setElist(res.data)
        })
      }
    })

    var List = []
    const PushItem = () =>{
      if(Elist.length != 0){
        for(var i = 0; i< Elist.length;i++){
          List.push(<Listitem title={Elist[i].wr_subject} thumb={Elist[i].as_thumb} id={Elist[i].wr_id}></Listitem>)
        }
      }
      return List
    }


  return (
    <View style={styles.cardview}>
      <TouchableWithoutFeedback onPress={()=>navigation.navigate('이벤트목록')}>
      <Text style={styles.etitle}>이벤트</Text>
      <Text style={styles.etitle2}>진행중인 이벤트를 확인해보세요!</Text>
      </TouchableWithoutFeedback>
      <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd ={
                    () => {console.log('Scrolling is End')}
                }
            >
              
              <PushItem></PushItem>
              
              
          <View>
          </View>

      </ScrollView>
    </View>
  )
}

const Listitem = (prop) => {
  const navigation = useNavigation()
  return(
           <View style={{marginLeft:10,marginRight:8,}}>
              <TouchableWithoutFeedback onPress={()=>navigation.navigate('이벤트자세히보기',{id:prop.id})}>
                <Image source={{uri:prop.thumb}} style={{width:chartWidth/2-18,borderTopLeftRadius: 1,borderTopRightRadius: 20,borderBottomLeftRadius:20,borderBottomRightRadius:1,height:100,}}></Image>
                </TouchableWithoutFeedback>
                <Text numberOfLines={1} ellipsizeMode='tail' style={{width:180,marginTop:10}}>{prop.title}</Text>
              </View>
  )
}

export default EEvent;