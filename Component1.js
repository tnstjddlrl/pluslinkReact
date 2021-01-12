import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

const sigong1 = require('./img/sigong1.jpg')

export default ComSigong = () => {
  return (
    
    <View style = {
      {
        "alignItems": "flex-start",
        "paddingStart": 17,
        "paddingTop": 12,
        "width": 193,
        "height": 323
        
      }
    } >
    <Image style = {
      {
        "width": 155,
        "height": 116,
        "borderRadius": 19
      }
    }
    source = {sigong1
    }
    />
    <View style = {
      {
        "alignItems": "flex-start",
        "paddingStart": 5,
        "paddingTop": 7,
        "marginTop": 10,
        "width": 155,
        "height": 152,
      }
    } >
    <Text style = {
      {
        "fontSize": 12,
        "color": "rgba(0, 0, 0, 255)"
      }
    } > 테스트글자입니다.테스트 글자입니다.테스트 글자입 </Text>
    <Text style = {
      {
        "fontWeight": "300",
        "fontSize": 10,
        "color": "rgba(0, 0, 0, 255)",
        "marginTop": 21
      }
    } > 테스트 내용입니다.테스트 내 용입니다.테스트 내용입니다.테스트내용입니다.테스트 내용 입니다.테스트내용 </Text>
    </View>
    <View style = {
      {
        "marginStart": 0.92,
        "marginTop": 13.64,
        "backgroundColor": "rgba(112, 112, 112, 255)",
        "width": 154.97,
        "height": 1
      }
    }
    />
    </View>
  );
};

const SigongBtn = () =>{
  return(
    <View style = {
      {
        "alignItems": "flex-start"
      }
    } >
    <View style = {
      {
        "alignItems": "flex-start",
        "paddingStart": 114,
        "paddingTop": 9,
        "width": 350,
        "height": 46,
        "borderRadius": 11,
        "backgroundColor": "rgba(71, 67, 55, 255)"
      }
    } >
    <Text style = {
      {
        "fontSize": 20,
        "color": "rgba(255, 255, 255, 255)"
      }
    } > 견적의뢰하기 </Text>
    </View>
    </View>
  )
}