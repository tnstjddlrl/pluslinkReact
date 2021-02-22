import React, { useState, Component, useEffect } from "react";
import {
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage'; //로그인한 아이디값 저장하기 위한 앱 내부 저장소
import axios from "axios";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native'; //네비게이션을 위한 도구들


import FootTer from './footer.js'
import HeadHeder from "./header.js";
import REquset from './Requset.js'
import CurGyeon from './CurrentGyeon.js'
import Login from './Login.js'

import EventToPage from './Eventtopage.js'
import Banner from './Banner.js'
import Mmenu from './Mmenu.js'
import REview from './Review.js'
import Register from './register.js'

import ComLook from './comlook.js'
import Company from './Company.js'
import EEvent from './eevent.js'
import Mypage from "./mypage"
import CurrentTable from "./currentTable.js";
import CurrentPlus from "./currentPlus";
import EventList from "./eventList.js";
import OneonOne from "./oneOnOne.js";
import OneWrite from "./oneWirte.js";
import OneView from "./oneView";
import CompanyList from "./companyList";
import PasswordCheck from "./passwordCheck";
import InfoChange from "./infoChange.js";
import SelectRequest from "./selectRequest.js";
import InjuryPath from "./injuryPath.js";
import BestView from "./bestView.js"
import BestTwo from "./bestTwo";
import PayManage from "./payManage.js";
import ReviewManage from "./reviewManage.js"; //컴포넌트화 시킨 객체들
import JsonTest from "./jsontest.js";
import JsonTest2 from "./jsontest2.js";
import ReviewPlus from "./reviewPlus.js";
import PayInfo from "./payinfo.js";
import SigongCancel from "./sigonCancel.js";
import PnlMall from "./PnlMall.js";
import Faq from "./faq.js";
import Gongzi from "./gongzi.js";
import GongziPlus from "./gongziPlus.js";
import FindId from "./findId.js";
import DeleteCheck from "./deletCheck.js";




const Stack = createStackNavigator(); // 스택 네비게이터를 위한 변수

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width; //현재 디바이스의 가로 세로 값을 가져온다.




const App = ({ }) => {

  const [newid, setNewid] = useState('');

  function refreshData(tableName) {
    axios.post('http://ip0131.cafe24.com/pluslink/json/jsonMember.php', JSON.stringify({
      id: tableName,
    }))
      .then(function (response) {
        console.log('리스폰스 ', response);
        if (response.request._response == 'suc') {
        }
        else {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(()=>{
    refreshData('g5_faq_master')
    refreshData('g5_faq')
    refreshData('bidding')
    refreshData('expertise')
    refreshData('g5_member')
    refreshData('g5_qa_content')
    refreshData('g5_write_estimate')
    refreshData('g5_write_event')
    refreshData('g5_write_example')
    refreshData('g5_write_review')
    refreshData('g5_write_notice')
    refreshData('partners')
    refreshData('estimate_pay')
    refreshData('stratum_list')
  },[])
  

  const fetchUser = async () => {
    AsyncStorage.setItem(
      '@super:id',
      '로그인해주세요'
    );
  } //초기 아이디 설정

  async function isFavorite() {
    try {
      return await AsyncStorage.getItem("@super:id");
    } catch (error) {
      return false;
    }
  } //아이디값 가져오기

  useEffect(() => {

    const result = isFavorite().then((company_id) => {
      if(company_id == null){
        console.log('로그인정보 없음')
        fetchUser()
      }else{
        setNewid(company_id.toLowerCase());
        console.log('새 : ', company_id);
        console.log('새새 : '+newid)
      }
    });

  }, []) //위의 두 함수를 앱이 빌드될때 한번만 실행하게끔 useEffect를 걸어줬다. [] 안에 변수를 넣으면 변수의 값이 변경될때마다 useEffect가 리빌드된다.







  const logo = { uri: "https://pluslink.kr/img/pluslink/logo.png" };
  const logo2 = { uri: "https://pluslink.kr/img/menu.png" };
  const navigation = useNavigation();
  return (
    <View>
      <View style={{width:chartWidth,height:chartHeight}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
          {/* 메인 맨 위 배너 */}
          <Banner></Banner>

          {/* 중단 카테고리 메뉴 */}
          <Mmenu></Mmenu>

          {/* 메인 업체 뷰 */}
          {/* <TouchableOpacity onPress={()=>navigation.navigate('회사자세히보기',{name:'김업체'})}>
        <Company img={comImg} star='3.1' color='red' text='주방 수도, 인테리어 전문 업체입니다. 원하시는 디자인으로 깔끔하게 시공해드립니다.' addr='부산 남구'></Company>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('회사자세히보기',{name:'박업체'})}>
        <Company img={comImg2} star='3.8' color='blue' text='수도전문 동진설비입니다. 새로운 수도 설치 전문입니다!' addr='부산 사하구'></Company>
        </TouchableOpacity> */}



          {/* 이벤트 뷰 */}
          <EEvent></EEvent>

          {/* 우수시공사례 */}
          <View>
            <BestTwo></BestTwo>
          </View>

          {/* 메인 하단의 리뷰보기 */}
          <REview></REview>

        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>



    </View>
  )
}

const starimg = require('./img/review.png')
const comImg = require('./img/14.png')
const comImg2 = require('./img/123.png')
const maker = require('./img/main_marker.png')

const ffimg = require('./img/b01.png')
const ffimg2 = require('./img/b02.png')
const ffimg3 = require('./img/b03.png')
const ffimg4 = require('./img/b04.png')

const logo = { uri: "https://pluslink.kr/img/pluslink/logo.png" };
const logo2 = { uri: "https://pluslink.kr/img/menu.png" };
const testlogo = require('./img/logo.png')

const Eimg = require('./img/e_banner01.jpg')
const Eimg2 = require('./img/e_banner02.jpg')
const Eimg3 = require('./img/e_banner03.jpg')

//-------------------------스택 네비게이터를 위한 함수---------------------
function App2() {

  return (
    //실제론 앱이 빌드될때 전체 정보가 다 빌드된다. 하지만 맨 앞엔 홈이 자리잡고있기때문에 홈만 로딩된것 처럼 보인다.
    <NavigationContainer>
      <Stack.Navigator headerMode={"none"} mode='modal'>
        <Stack.Screen
          name="홈"
          component={App}
        />
        <Stack.Screen
          name="로그인"
          component={Login}
        />
        <Stack.Screen
          name="회원가입"
          component={Register}
        />
        <Stack.Screen
          name="회사자세히보기"
          component={ComLook} />
        <Stack.Screen
          name="회사테스트"
          component={Company} />
        <Stack.Screen
          name="이벤트자세히보기"
          component={EventToPage} />
        <Stack.Screen
          name="견적의뢰"
          component={REquset} />
        <Stack.Screen
          name="견적현황"
          component={CurGyeon} />
        <Stack.Screen
          name="푸터"
          component={FootTer} />
        <Stack.Screen
          name="헤더"
          component={HeadHeder} />
        <Stack.Screen
          name="정보변경" component={PasswordCheck} />
        <Stack.Screen
          name="이벤트목록" component={EventList} />
        <Stack.Screen
          name="1대1문의" component={OneonOne} />
        <Stack.Screen
          name="업체목록" component={CompanyList} />
        <Stack.Screen
          name="지정의뢰" component={SelectRequest} />
        <Stack.Screen
          name="1대1문의보기" component={OneView} />
        <Stack.Screen
          name="1대1문의쓰기" component={OneWrite} />
        <Stack.Screen
          name="마이페이지" component={Mypage} />
        <Stack.Screen
          name="견적테이블" component={CurrentTable} />
        <Stack.Screen
          name="견적자세히보기" component={CurrentPlus} />
        <Stack.Screen
          name="정보변경2" component={InfoChange} />
        <Stack.Screen
          name="취약계층인증" component={InjuryPath} />
        <Stack.Screen
          name="베스트보기" component={BestView} />
        <Stack.Screen
          name="결제관리" component={PayManage} />
        <Stack.Screen
          name="리뷰관리" component={ReviewManage} />
        <Stack.Screen
          name="리뷰용견적요청서" component={ReviewPlus} />
        <Stack.Screen
          name="테스트" component={JsonTest} />
        <Stack.Screen
          name="테스트2" component={JsonTest2} />
        <Stack.Screen
          name="입찰정보" component={PayInfo} />
          <Stack.Screen
          name="시공취소" component={SigongCancel} />
          <Stack.Screen
          name="쇼핑몰" component={PnlMall} />
          <Stack.Screen
          name="자주묻는질문" component={Faq} />
          <Stack.Screen
          name="공지사항" component={Gongzi} />
          <Stack.Screen
          name="공지사항상세" component={GongziPlus} />
           <Stack.Screen
          name="아이디찾기" component={FindId} />
          <Stack.Screen
          name="회원탈퇴체크" component={DeleteCheck} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const DrawerNavigator = () => {
//   const [islogin,setLogin] = useState(false);

//   return (
//     <NavigationContainer>
//       <Drawer.Navigator>
//           <Drawer.Screen name="홈" component={App} />
//           {
//             islogin ? <Drawer.Screen name="마이페이지" component={Mypage} /> : <Drawer.Screen name="로그인" component={Login} />
//           }
//           {
//             islogin ? <Drawer.Screen name="마이페이지" name='   ' component={Mypage} /> : <Drawer.Screen name="회원가입" component = {Register} />
//           }

//           <Drawer.Screen name="정보변경" component = {PasswordCheck} />
//           <Drawer.Screen name="견적의뢰" component = {REquset} />
//           <Drawer.Screen name="견적현황" component = {CurGyeon} />
//           {/* <Drawer.Screen name="화사테스트" component = {Company} /> */}
//           <Drawer.Screen name="이벤트목록"   component={EventList} options={{drawerLabel:'이벤트목록'}} />
//           <Drawer.Screen name="1대1문의"   component={OneonOne} options={{drawerLabel:'1대1문의'}} />
//           <Drawer.Screen name="업체목록"   component={CompanyList} options={{drawerLabel:'업체목록'}} />

//           <Drawer.Screen name="지정의뢰"   component={SelectRequest} options={{drawerLabel:''}} />
//           <Drawer.Screen name="1대1문의보기"   component={OneView} options={{drawerLabel:''}} />
//           <Drawer.Screen name="1대1문의쓰기"   component={OneWrite} options={{drawerLabel:''}} />
//           <Drawer.Screen name="회사자세히보기" component = {ComLook} options={{drawerLabel:''}} />
//           <Drawer.Screen name="이벤트자세히보기"  component = {EventToPage} options={{drawerLabel:''}} />
//           <Drawer.Screen name="마이페이지"   component={Mypage} options={{drawerLabel:''}} />
//           <Drawer.Screen name="견적테이블"   component={CurrentTable} options={{drawerLabel:''}} />
//           <Drawer.Screen name="견적자세히보기"   component={CurrentPlus} options={{drawerLabel:''}} />
//           <Drawer.Screen name="정보변경2"   component={InfoChange} options={{drawerLabel:''}} />
//           <Drawer.Screen name="취약계층인증"   component={InjuryPath} options={{drawerLabel:''}} />

//       </Drawer.Navigator>
//       </NavigationContainer>
//   );
// };


//----------------------------------------------------------



export default App2;//App2