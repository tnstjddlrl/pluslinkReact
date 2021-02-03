import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  Alert
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')
const heart = require('./img/handhart.png')
const clock = require('./img/clock.png')


import { useNavigation } from '@react-navigation/native';

import FootTer from './footer.js'
import HeadHeder from "./header.js";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import { BootpayWebView } from 'react-native-bootpay';


const CurrentPlus = ({ route }) => {

  const bootpay = useRef(<BootpayWebView />);

  const onPress = (price,name) => {
    const payload = {
      pg: 'inicis',  //['kcp', 'danal', 'inicis', 'nicepay', 'lgup', 'toss', 'payapp', 'easypay', 'jtnet', 'tpay', 'mobilians', 'payletter', 'onestore', 'welcome'] 중 택 1
      name: '낙찰_'+name, //결제창에 보여질 상품명
      order_id: '1234_1234', //개발사에 관리하는 주문번호 
      method: 'card',
      price: price //결제금액 
    }

    //결제되는 상품정보들로 통계에 사용되며, price의 합은 결제금액과 동일해야함 
    const items = [
      {
        item_name: '낙찰_'+name, //통계에 반영될 상품명 
        qty: 1, //수량 
        unique: 'ITEM_CODE_KEYBOARD', //개발사에서 관리하는 상품고유번호 
        price: price, //상품단가 
        cat1: '낙찰_'+name, //카테고리 상 , 자유롭게 기술
        cat2: '', //카테고리 중, 자유롭게 기술 
        cat3: '', //카테고리 하, 자유롭게 기술
      }
    ]

    //구매자 정보로 결제창이 미리 적용될 수 있으며, 통계에도 사용되는 정보 
    const user = {
      id: 'user_id_1234', //개발사에서 관리하는 회원고유번호 
      username: '홍길동', //구매자명
      email: 'user1234@gmail.com', //구매자 이메일
      gender: 1, //성별, 1:남자 , 0:여자
      birth: '1986-10-14', //생년월일 yyyy-MM-dd
      phone: '01012345678', //전화번호, 페이앱 필수 
      area: '부산', // [서울,인천,대구,광주,부산,울산,경기,강원,충청북도,충북,충청남도,충남,전라북도,전북,전라남도,전남,경상북도,경북,경상남도,경남,제주,세종,대전] 중 택 1
      addr: '서울시 동작구 상도로' //주소
    }


    //기타 설정
    const extra = {
      app_scheme: "pltest2", //ios의 경우 카드사 앱 호출 후 되돌아오기 위한 앱 스키마명
      expire_month: "0", //정기결제가 적용되는 개월 수 (정기결제 사용시), 미지정일시 PG사 기본값에 따름
      vbank_result: true, //가상계좌 결과창을 볼지(true), 말지(false)
      start_at: "",  //정기 결제 시작일 - 지정하지 않을 경우 - 그 날 당일로부터 결제가 가능한 Billing key 지급, "2020-10-14"
      end_at: "", // 정기결제 만료일 - 기간 없음 - 무제한, "2020-10-14"
      quota: "0,2,3",  //결제금액이 5만원 이상시 할부개월 허용범위를 설정할 수 있음, [0(일시불), 2개월, 3개월] 허용, 미설정시 12개월까지 허용
      offer_period: "", //결제창 제공기간에 해당하는 string 값, 지원하는 PG만 적용됨
      popup: 1, //1이면 popup, 아니면 iframe 연동
      quick_popup: 0, //1: popup 호출시 버튼을 띄우지 않는다. 아닐 경우 버튼을 호출한다
      locale: "ko",
      disp_cash_result: "Y",  // 현금영수증 보일지 말지.. 가상계좌 KCP 옵션
      escrow: "0",  // 에스크로 쓸지 안쓸지
      theme: "purple",
      custom_background: "",
      custom_font_color: "",
      iosCloseButton: false
    }

    if (bootpay != null && bootpay.current != null) bootpay.current.request(payload, items, user, extra);
  }


  const onCancel = (data) => {
    console.log('cancel', data);
    Alert.alert('결제를 취소하셨습니다.')
  }

  const onError = (data) => {
    console.log('error', data);
    Alert.alert('오류가 발생하였습니다. 이와같은 오류가 반복될시 문의하여 주시기 바랍니다..')
  }

  const onReady = (data) => {
    console.log('ready', data);
  }

  const onConfirm = (data) => {
    console.log('confirm', data);
    Alert.alert('결제가 완료되었습니다.')
    if (bootpay != null && bootpay.current != null) bootpay.current.transactionConfirm(data);
  }

  const onDone = (data) => {
    console.log('done', data);
    Alert.alert('결제가 완료되었습니다.')
  }

  const onClose = () => {
    console.log('창닫힘');
    Alert.alert('결제를 취소하셨습니다.')
  }

  const PayInfo = (prop) => {
    const navigation = useNavigation()
    return (
      <View>
        <View style={{ width: chartWidth - 60, borderRadius: 10, borderWidth: 0.5, borderColor: 'gray', marginBottom: 10 }}>
          <View style={{ alignItems: "center", flexDirection: "row", justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={heart} style={{ width: 30, height: 30, borderRadius: 28, marginLeft: 10, marginTop: 10 }}></Image>
              <Text style={{ fontSize: 17, marginLeft: 5 }}>{prop.name}</Text>
              <Text style={{ fontSize: 17, marginLeft: 15 }}>{prop.pay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('회사자세히보기', { id: prop.id })}>
                <View style={{ borderRadius: 5, borderWidth: 0.5, marginRight: 10 }}>
                  <Text style={{ margin: 5, fontSize: 17 }}>업체정보</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ width: chartWidth - 80, borderWidth: 0.5, marginLeft: 10, marginTop: 10 }}></View>
          <Text style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }} numberOfLines={3}>{prop.content}</Text>



          {prop.ispay ? <TouchableOpacity onPress={() => navigation.navigate('입찰정보', { bid: prop.no })}>
            <View style={{ borderRadius: 5, width: chartWidth - 80, backgroundColor: '#d9d9d9', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
              <Text style={{ margin: 10 }}>낙찰정보</Text>
            </View>
          </TouchableOpacity>
            :
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.navigate('입찰정보', { bid: prop.no })}>
                <View style={{ borderRadius: 5, width: chartWidth / 2.6, backgroundColor: '#d9d9d9', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
                  <Text style={{ margin: 10 }}>입찰정보</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>onPress(prop.pay,prop.name)}>
                <View style={{ borderRadius: 5, width: chartWidth / 2.6, backgroundColor: '#d9d9d9', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginTop: 10, marginBottom: 10 }}>
                  <Text style={{ margin: 10 }}>결제하기</Text>
                </View>
              </TouchableOpacity>
            </View>
          }

        </View>
      </View>
    )
  }







  const navigation = useNavigation()
  const [newid, setNewid] = useState('');

  async function isFavorite() {
    try {
      return await AsyncStorage.getItem("@super:id");
    } catch (error) {
      return false;
    }
  }

  const result = isFavorite().then((company_id) => {
    setNewid(company_id.toLowerCase())
  });

  async function GetJson() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/bidding.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetEstimate() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_estimate.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetMember() {
    try {
      console.log('겟멤버 작동됨')
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_member.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetBidding() {
    try {
      console.log('겟멤버 작동됨')
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/bidding.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetPatners() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/partners.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }
  async function GetPay() {
    try {
      return await axios.get('http://ip0131.cafe24.com/pluslink/json/estimate_pay.json');
    } catch (error) {
      console.log('에러 : ', error)
      return false;
    }
  }

  const [memberList, setMemberList] = useState([]);
  const [list, setlist] = useState([]);
  const [estimate, setEstimate] = useState([]);
  const [patners, setPatners] = useState([])
  const [bidding, setBidding] = useState([])
  const [paylist, setPaylist] = useState([])

  useEffect(() => {
    if (list.length == 0) {
      GetJson().then((res) => {
        setlist(res.data)
        console.log(list)
      })
    }
    if (memberList.length == 0) {
      console.log('작동테스트')
      GetMember().then((res) => {
        setMemberList(res.data)
      })
    }
    if (list.length == 0) {
      GetEstimate().then((res) => {
        setEstimate(res.data)
        console.log(list)
      })
    }
    if (bidding.length == 0) {
      GetBidding().then((res) => {
        setBidding(res.data)
      })
    }
    if (patners.length == 0) {
      GetPatners().then((res) => {
        setPatners(res.data)
      })
    }
    if (paylist.length == 0) {
      GetPay().then((res) => {
        setPaylist(res.data)
      })
    }
  })


  const StPush = () => {
    var stp = []
    if (estimate.length != 0) {
      for (var i = 0; i < estimate.length; i++) {
        if (estimate[i].wr_parent == route.params.num && estimate[i].wr_is_comment == 1) {
          for (var j = 0; j < memberList.length; j++) {
            if (estimate[i].mb_id == memberList[j].mb_id) {
              stp.push(<SmallText name={memberList[j].mb_name} id={estimate[i].mb_id} date={estimate[i].wr_datetime.substr(5, 14)} content={estimate[i].wr_content}></SmallText>)
            }
          }
        }
      }
    }
    if (stp.length == 0) {
      return <View><Text>등록된 댓글이 없습니다.</Text></View>
    }
    return stp
  }


  var pay = []
  const Payment = () => {
    if (list.length != 0) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].wr_id == route.params.num) {

        }
      }
    }
    return pay
  }

  const [sigongState,setSigongstate] = useState('');
  var main = []
  const MainPush = () => {
    for (var j = 0; j < patners.length; j++) {
      for (var i = 0; i < estimate.length; i++) {
        if (estimate[i].wr_id == route.params.num) {
          if (estimate[i].wr_subject == '일반견적') {
            main.push(<MainContent content={estimate[i].wr_content} num={estimate[i].wr_id} state={estimate[i].wr_8} subj={estimate[i].wr_subject} com={estimate[i].wr_9} cate={estimate[i].wr_1} subcate={estimate[i].wr_2} fdate={estimate[i].wr_7} addr={estimate[i].wr_4 + ' ' + estimate[i].wr_5}></MainContent>)
            setSigongstate(estimate[i].wr_8)
            return main
          } else {
            if (estimate[i].wr_3 == patners[j].no) {
              main.push(<MainContent content={estimate[i].wr_content} num={estimate[i].wr_id} state={estimate[i].wr_8} subj={estimate[i].wr_subject} com={patners[j].pt_name} cate={estimate[i].wr_1} subcate={estimate[i].wr_2} fdate={estimate[i].wr_7} addr={estimate[i].wr_4 + ' ' + estimate[i].wr_5}></MainContent>)
              setSigongstate(estimate[i].wr_8)
              return main
            }
          }

        }
      }
    }


    return main
  }

  const [ispaied, setIspaied] = useState(false)
  function isPay() {
    for (var j = 0; j < paylist.length; j++) {
      if (paylist[j].wr_id == route.params.num) {
        setIspaied(true)
      }
    }
  }

  var ppaayy = []
  function Paypush() {
    isPay()
    if (bidding.length != 0) {
      for (var i = 0; i < bidding.length; i++) {
        if (bidding[i].wr_id == route.params.num && bidding[i].state == '입찰') {
          for (var j = 0; j < patners.length; j++) {
            if (patners[j].mb_id == bidding[i].mb_id) {
              ppaayy.push(<PayInfo ispay={ispaied} name={patners[j].pt_name} id={patners[j].mb_id} pay={bidding[i].pay} no={bidding[i].no} content={bidding[i].info}></PayInfo>)

            }
          }
        }
      }
      if(sigongState=='견적취소'){
        return <View><Text>취소된 견적은 입찰정보를 확인할 수 없습니다.</Text></View>
      }else{
        return ppaayy
      }
      
    }
    return (<View>
      <Text>입찰에 참여한 업체가 없습니다.</Text>
    </View>)
  }

  const heart = require('./img/handhart.png')

  const MainContent = (prop) => {
    const navigation = useNavigation()
    function refreshData(id) {
      axios.post('http://ip0131.cafe24.com/pluslink/json/cancelEstimate.php', JSON.stringify({
        id: id,
        add_id: newid
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
      Alert.alert('취소가 완료되었습니다.')
      navigation.navigate('홈')
    }
    return (
      <View>
        <PlusItem key={1} name='견적번호' num={prop.num}></PlusItem>
        <PlusItem key={2} name='상태' num={prop.state}></PlusItem>
        {prop.subj == '지정견적' ? <PlusItem key={3} name='지정업체' num={prop.com}></PlusItem> : <View></View>}
        <PlusItem key={4} name='카테고리' num={prop.cate}></PlusItem>
        <PlusItem key={5} name='세부항목' num={prop.subcate}></PlusItem>
        <PlusItem key={6} name='요청날짜' num={prop.fdate}></PlusItem>
        <PlusItem key={7} name='시공주소' num={prop.addr}></PlusItem>

        <View style={{ marginTop: 15, marginLeft: 15 }}>
          <Text style={{ fontSize: 16 }}>상세내용</Text>
          <View style={{ borderWidth: 0.5, borderColor: 'gray', marginTop: 15, marginBottom: 15, marginRight: 15 }}>
            <Text style={{ margin: 10 }}>{prop.content}</Text>
          </View>
        </View>

        {(prop.state == '입찰대기') &&
          <TouchableOpacity onPress={() => { refreshData(prop.num) }}>
            <View style={{ marginTop: 15, marginLeft: 15, width: chartWidth - 90, height: 50, backgroundColor: '#cc33ff', justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>견적취소</Text>
            </View>
          </TouchableOpacity>}

        {(prop.state == '입찰진행중') &&
          <TouchableOpacity onPress={() => { refreshData(prop.num) }}>
            <View style={{ marginTop: 15, marginLeft: 15, width: chartWidth - 90, height: 50, backgroundColor: '#cc33ff', justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>견적취소</Text>
            </View>
          </TouchableOpacity>}
      </View>
    )
  }

  const [stText, setStText] = useState('') //댓글
  const [stLoad, setStLoad] = useState(true)

  const [pwss, setPwss] = useState('') //비밀번호
  const [name, setName] = useState('') //이름

  if (memberList.length != 0 && pwss == '') {
    for (var i = 0; i < memberList.length; i++) {
      if (memberList[i].mb_id == newid.toLowerCase()) {
        setPwss(memberList[i].mb_password)
        setName(memberList[i].mb_name)
      }
    }
  }

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

  useEffect(() => {
    refreshData('g5_write_estimate')
  })

  function insertSmall() {
    setStLoad(false)
    axios.post('http://ip0131.cafe24.com/pluslink/json/insertConmment.php', JSON.stringify({
      wr_content: stText, //상세설명
      mb_id: newid,//아이디
      wr_password: pwss,//비번
      wr_name: name,//이름
      parent: route.params.num,
    }))
      .then(function (response) {
        console.log('리스폰스 ', response.request._response);
        if (response.request._response == 'succ') {
        }
        else {
          console.log(response.request._response)
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    refreshData('g5_write_estimate')

    setStText('')
    setStLoad(true)

    Alert.alert('댓글이 등록되었습니다.(댓글 반영은 앱을 재시작하면 적용됩니다.')

  }


  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth }}>
        <ScrollView>
          <View style={{ marginBottom: 100 }}>
            <View style={{ width: chartWidth, marginTop: 50 }}>
              <ImageBackground source={event} style={{ width: chartWidth, height: chartHeight / 7 }}>
              </ImageBackground>
              <Text style={{ position: 'absolute', color: "white", fontSize: 20, fontWeight: 'bold', top: 40, left: 10 }}>견적현황</Text>
            </View>


            <View style={{ margin: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: chartWidth - 30, marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>견적요청서</Text>
                <Image source={arrow} style={{ right: 0, position: 'absolute' }}></Image>
              </View>
              <View style={{ width: chartWidth - 30, borderWidth: 0.5, borderColor: 'gray', marginTop: 10 }}></View>

              <View style={{ width: chartWidth - 30, backgroundColor: '#e6e6e6', }}>
                <View style={{ backgroundColor: 'white', width: chartWidth - 60, marginLeft: 15, marginTop: 15, marginBottom: 20 }}>
                  <MainPush></MainPush>

                  <Text style={{ marginTop: 60, fontSize: 18 }}>댓글</Text>
                  <View style={{ width: 40, borderWidth: 0.5, marginTop: 5, marginBottom: 10 }}></View>

                  <ScrollView horizontal={true}>
                    {stLoad && <StPush></StPush>}
                  </ScrollView>

                  <View style={{ justifyContent: 'center', alignItems: "center", marginTop: 15 }}>
                    <View style={{ borderWidth: 0.5, borderColor: 'gray', width: chartWidth - 80, height: 130, backgroundColor: '#e6e6e6', alignItems: "center" }}>
                      <View style={{ backgroundColor: 'white', width: chartWidth - 100, height: 80, marginTop: 10, borderWidth: 0.5, borderColor: 'gray' }}>
                        <TextInput multiline={true} style={{ width: chartWidth - 100, height: 80 }} onChangeText={(text) => setStText(text)} value={stText}></TextInput>
                      </View>
                      <TouchableOpacity onPress={() => insertSmall()}>
                        <View style={{ width: 80, height: 30, borderWidth: 0.5, borderColor: 'gray', marginTop: 5, backgroundColor: 'white', justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ fontWeight: 'bold' }}>등록</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {ispaied ? <View>
                    <Text style={{ marginTop: 60, fontSize: 18 }}>낙찰현황</Text>
                    <View style={{ width: 65, borderWidth: 0.5, marginTop: 5, marginBottom: 10 }}></View>
                  </View> : <View>
                      <Text style={{ marginTop: 60, fontSize: 18 }}>입찰현황</Text>
                      <View style={{ width: 65, borderWidth: 0.5, marginTop: 5, marginBottom: 10 }}></View>
                    </View>}

                  <Paypush></Paypush>

                </View>
              </View>

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={{ backgroundColor: 'black', width: 60, height: 30, justifyContent: "center", alignItems: 'center' }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>목록</Text>
                </View>
              </TouchableOpacity>



            </View>

          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

      <BootpayWebView
        ref={bootpay}
        ios_application_id={'6018b8975b2948001d51f63a'}
        android_application_id={'6018b8975b2948001d51f639'}
        onCancel={onCancel}
        onError={onError}
        onReady={onReady}
        onConfirm={onConfirm}
        onDone={onDone}
        onClose={onClose}
      />
    </View>
  )
}

const SmallText = (prop) => {
  return (
    <View style={{ marginLeft: 10, borderWidth: 0.5, borderRadius: 5, borderColor: 'gray' }}>
      <View style={{ margin: 5 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold' }}>{prop.name}</Text>
          <Text style={{ fontWeight: '100' }}>({prop.id})</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Image source={clock} style={{ width: 10, height: 10 }}></Image>
          <Text style={{ fontSize: 9, color: 'gray' }}>{prop.date}</Text>
        </View>

        <Text style={{ marginTop: 10, width: chartWidth / 1.75 }}>{prop.content}</Text>
      </View>
    </View>
  )
}




const PlusItem = (prop) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}>
        <Text style={{ fontSize: 16, width: 80 }}>{prop.name}</Text>
        <Text style={{ left: 50, width: 170 }}>{prop.num}</Text>
      </View>
      <View style={{ width: chartWidth - 60, borderWidth: 0.5, borderColor: '#b3b3b3', marginTop: 10 }}></View>
    </View>
  )
}


export default CurrentPlus;
