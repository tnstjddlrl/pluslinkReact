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

//========================이벤트 자세히보기==============================
const gif = require('./img/eventBg.jpg')
const event_1 = require('./img/event_1.jpg')
const EventToPage= ({navigation}) => {
  return (
    <View style = {
      {
        "alignItems": "flex-start"
      }
    } >
    <ImageBackground style = {
      {
        "width": 412,
        "height": 125
      }
    }
    source = {gif
    } >
    <View style = {
      {
        "alignItems": "flex-start",
        "paddingStart": 15,
        "paddingTop": 48,
        "flex": 1
      }
    } >
    <Text style = {
      {
        "fontWeight": "bold",
        "fontSize": 18,
        "color": "rgba(255, 255, 255, 255)"
      }
    } > 이벤트 </Text>
    <View style = {
      {
        "marginStart": 0.5,
        "marginTop": 5.5,
        "backgroundColor": "rgba(255, 255, 255, 255)",
        "width": 54,
        "height": 2
      }
    }
    />
    </View>
    </ImageBackground><Text style={{"fontWeight":"bold","fontSize":18,"color":"rgba(0, 0, 0, 255)","marginStart":15,"marginTop":12}}>[테스트]인테리어 이벤트 테스트!</Text >
    <Image style = {
      {
        "marginStart": 46,
        "marginTop": 17,
        "width": 320,
        "height": 209
      }
    }
    source = {event_1
    }
    />
    <Text style = {
      {
        "fontWeight": "300",
        "fontSize": 15,
        "color": "rgba(0, 0, 0, 255)",
        "marginStart": 15,
        "marginTop": 20
      }
    } > 내용입니다. </Text>
    </View>

  );
};

export default EventToPage;