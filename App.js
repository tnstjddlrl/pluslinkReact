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
import { useIsDrawerOpen } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import SigongBest from './Component2.js'
import REquset from './Requset.js'
import CurGyeon from './CurrentGyeon.js'
import Login from './Login.js'

import EventToPage from './Eventtopage.js'
import Banner from './Banner.js'
import styles from './styles.js'
import Mmenu from './Mmenu.js'
import REview from './Review.js'
import Register from './register.js'

import ComLook from './comlook.js'
import Company from './Company.js'
import EEvent from './eevent.js'
import NaviMenu from "./NavigateD.js";
import Mypage from "./mypage"
import CurrentTable from "./currentTable.js";



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

function isshwon(params) {
  const [shown,setShown] = useState(false);
  setShown(params)
}


const App =({  }) =>{
  const logo = { uri: "https://pluslink.kr/img/pluslink/logo.png" };
  const logo2 = { uri: "https://pluslink.kr/img/menu.png" };
  const navigation = useNavigation();
  return(
    <View>
      <View>
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white'}}>
        <Banner></Banner>
        <Mmenu></Mmenu>

        <TouchableOpacity onPress={()=>navigation.navigate('회사자세히보기',{name:'김업체'})}>
        <Company img={comImg} star='3.1' color='red' text='주방 수도, 인테리어 전문 업체입니다. 원하시는 디자인으로 깔끔하게 시공해드립니다.' addr='부산 남구'></Company>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('회사자세히보기',{name:'박업체'})}>
        <Company img={comImg2} star='3.8' color='blue' text='수도전문 동진설비입니다. 새로운 수도 설치 전문입니다!' addr='부산 사하구'></Company>
        </TouchableOpacity>

       
        <EEvent></EEvent>
        <View>
        <SigongBest></SigongBest>
        </View>
        <REview></REview>

        </ScrollView>
      </View>
      
      <HeadHeder></HeadHeder>
     
      <FootTer></FootTer>
        
    </View>
  )
}

const starimg =require('./img/review.png')
const comImg = require('./img/14.png')
const comImg2 =require('./img/123.png')
const maker = require('./img/main_marker.png')

const ffimg =require('./img/b01.png')
const ffimg2 =require('./img/b02.png')
const ffimg3 =require('./img/b03.png')
const ffimg4 =require('./img/b04.png')

const logo = { uri: "https://pluslink.kr/img/pluslink/logo.png" };
const logo2 = { uri: "https://pluslink.kr/img/menu.png" };
const testlogo = require('./img/logo.png')

const Eimg =require('./img/e_banner01.jpg')
const Eimg2 =require('./img/e_banner02.jpg')
const Eimg3 =require('./img/e_banner03.jpg')




//------------------------------------------------------------
// function App2() {
  
//   return (
//     <NavigationContainer>
//       <Stack.Navigator headerMode={"none"} mode='modal'>
//         <Stack.Screen 
//           name="홈"
//           component={App}
//            />
//         <Stack.Screen 
//           name="로그인"
//           component={Login}
//            />
//            <Stack.Screen 
//           name="회원가입"
//           component={Register}
//            />
//         <Stack.Screen 
//           name="회사자세히보기"
//           component={ComLook} />
//         <Stack.Screen 
//           name="회사테스트"
//           component={Company} />
//         <Stack.Screen 
//           name="이벤트자세히보기"
//           component={EventToPage} />
//         <Stack.Screen 
//           name="견적의뢰"
//           component={REquset} />
//         <Stack.Screen 
//           name="견적현황"
//           component={CurGyeon} />
//         <Stack.Screen 
//           name="푸터"
//           component={FootTer} />
//           <Stack.Screen 
//           name="헤더"
//           component={HeadHeder} />
//           <Stack.Screen name="네비" component={DrawerNavigator}></Stack.Screen>
          
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

const DrawerNavigator = () => {
  const [islogin,setLogin] = useState(false);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
          <Drawer.Screen name="홈" component={App} />
          {
            islogin ? <Drawer.Screen name="마이페이지" component={Mypage} /> : <Drawer.Screen name="로그인" component={Login} />
          }
          {
            islogin ? <Drawer.Screen name="마이페이지" name='   ' component={Mypage} /> : <Drawer.Screen name="회원가입" component = {Register} />
          }
          
          <Drawer.Screen name="견적의뢰" component = {REquset} />
          <Drawer.Screen name="견적현황" component = {CurGyeon} />
          {/* <Drawer.Screen name="화사테스트" component = {Company} /> */}
          <Drawer.Screen name="회사자세히보기" component = {ComLook} options={{drawerLabel:''}} />
          <Drawer.Screen name="이벤트자세히보기"  component = {EventToPage} options={{drawerLabel:''}} />
          <Drawer.Screen name="마이페이지"   component={Mypage} options={{drawerLabel:''}} />
          <Drawer.Screen name="견적테이블"   component={CurrentTable} options={{drawerLabel:''}} />
          {/* <Drawer.Screen name="푸터" component = {FootTer} />
          <Drawer.Screen name="헤더" component = {HeadHeder} /> */}
      </Drawer.Navigator>
      </NavigationContainer>
  );
};


//----------------------------------------------------------



export default DrawerNavigator;//App2