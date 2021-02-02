
import React, { useState, useEffect,useRef } from 'react';
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

import axios from "axios";

import { BootpayWebView } from 'react-native-bootpay';



const JsonTest2 = () => {

  const bootpay = useRef(<BootpayWebView/>);

  const onPress = () => {  

    const payload = {
      pg: 'inicis',  //['kcp', 'danal', 'inicis', 'nicepay', 'lgup', 'toss', 'payapp', 'easypay', 'jtnet', 'tpay', 'mobilians', 'payletter', 'onestore', 'welcome'] 중 택 1
      name: '입찰금', //결제창에 보여질 상품명
      order_id: '1234_1234', //개발사에 관리하는 주문번호 
      method: 'card',
      price: 1000 //결제금액 
    }

    //결제되는 상품정보들로 통계에 사용되며, price의 합은 결제금액과 동일해야함 
    const items = [
      {
        item_name: '입찰금', //통계에 반영될 상품명 
        qty: 1, //수량 
        unique: 'ITEM_CODE_KEYBOARD', //개발사에서 관리하는 상품고유번호 
        price: 1000, //상품단가 
        cat1: '입찰금', //카테고리 상 , 자유롭게 기술
        cat2: '', //카테고리 중, 자유롭게 기술 
        cat3: '', //카테고리 하, 자유롭게 기술
      }
    ]

    //구매자 정보로 결제창이 미리 적용될 수 있으며, 통계에도 사용되는 정보 
    const user = {
      id: 'user_id_1234', //개발사에서 관리하는 회원고유번호 
      username: '홍길동', //구매자명
      email: 'user1234@gmail.com', //구매자 이메일
      gender: 0, //성별, 1:남자 , 0:여자
      birth: '1986-10-14', //생년월일 yyyy-MM-dd
      phone: '01012345678', //전화번호, 페이앱 필수 
      area: '서울', // [서울,인천,대구,광주,부산,울산,경기,강원,충청북도,충북,충청남도,충남,전라북도,전북,전라남도,전남,경상북도,경북,경상남도,경남,제주,세종,대전] 중 택 1
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

    if(bootpay != null && bootpay.current != null) bootpay.current.request(payload, items, user, extra);
  }


const onCancel = (data) => {
  console.log('cancel', data);
}

const onError = (data) => {
  console.log('error', data);
}

const onReady = (data) => {
  console.log('ready', data);
}

const onConfirm = (data) => {
  console.log('confirm', data);
  if(bootpay != null && bootpay.current != null) bootpay.current.transactionConfirm(data);
}

const onDone = (data) => {
  console.log('done', data);
}

const onClose = () => {
  console.log('창닫힘');
}


  return(
    <View style={{width:chartWidth,height:chartHeight}}>
      <TouchableOpacity
            onPress={onPress}
          >
            <Text style={{marginTop:200}}>Press Here</Text>
          </TouchableOpacity> 

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

export default JsonTest2;