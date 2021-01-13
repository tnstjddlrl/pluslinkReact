import React,{useState,Component,useEffect} from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Modal
} from "react-native";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';


const logo = { uri: "https://pluslink.kr/img/pluslink/logo.png" };
const logo2 = { uri: "https://pluslink.kr/img/menu.png" };
const testlogo = require('./img/logo.png')

const HeadHeder = () => {
    const navigation = useNavigation();

    const [viewmenu,setViewmenu] = useState(false)


    let os = Platform.OS
    console.log(os)
    let nowheight;
      if(os == 'ios'){
       nowheight = 1.11;
      }else{
        nowheight = 1.08;
      }

      console.log(nowheight)
      
    
  return (
    <View>
    <View style={{flex:1}}>
        <View style={{borderWidth:1,position:'absolute',width:chartWidth+15,left:-2,bottom:(chartHeight/nowheight),height:100,marginTop:100,flexDirection: 'row',backgroundColor:'white'}}>
            
            <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.dispatch(DrawerActions.openDrawer());}} style={{top:30,left:10}}>
                <Image
                  source={logo2}
                  style={{width:40,height:35,marginTop:20}}
                />
            </TouchableOpacity>
            <View style={{left:chartWidth/3,height:30,width:40,top:20}}>
            <TouchableOpacity onPress={() => navigation.navigate('홈')}>
              <Image source={testlogo} style={{width:40,height:34,marginTop:35,}}>
              </Image>
            </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={() => navigation.navigate('로그인')}>
            <View style={{left:chartWidth/1.8,top:50,width:75,height:35,backgroundColor:'#b84dff',
                  borderTopLeftRadius: 17,
                  borderTopRightRadius: 17,
                  borderBottomLeftRadius:17,
                  borderBottomRightRadius:17,}}>
              <Text style={{width:65,height:70,marginLeft:10,marginTop:8,color:'white', fontWeight:'bold'}}>
                PnL Mall
              </Text>
            </View>
            </TouchableOpacity>
        </View>
    </View>
    
    <Modal transparent={true} visible={viewmenu}>
      <View style={{width:chartWidth/1.45,height:chartHeight,position:'absolute',backgroundColor:'gray'}}>



      </View>

    </Modal>


    </View>
   
  );
};

export default HeadHeder;