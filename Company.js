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


const starimg =require('./img/review.png')
const comImg = require('./img/14.png')
const comImg2 =require('./img/123.png')
const maker = require('./img/main_marker.png')

//prop(아무 변수이름)으로 App에서 Company를 생성할때 넣어준 값을 받아올 수 있다.
//네비게이터로 화면을 넘겨올때 값을 받을 때는 route를 사용해야한다.

const Company=(prop)=>{
    return(
      <View style={{marginLeft:15,marginTop:15}}>
  <View style = {
    {
      "alignItems": "flex-start",
      "paddingStart": 10,
      "paddingTop": 11,
      "width": chartWidth-30,
      "height": 175,
      "borderRadius": 7,
      "backgroundColor": "rgba(247, 247, 247, 255)"
    }
  } >
  <View style = {
    {
      flexDirection: 'row',
      alignItems: 'flex-start'
    }
  } ><Image style = {
    {
      "width": 50,
      "height": 50,
      "borderRadius": 25,
      "transform": [{
        "scaleX": 1.02
      }]
    }
  }
  source = {prop.img}
  
  />
  <View style = {
    {
      "alignItems": "flex-start",
      "marginStart": 200,
      "marginTop": 12
    }
  } >
  <View style = {
    {
      "alignItems": "flex-start",
      "paddingStart": 8,
      "paddingTop": 5,
      "width": 88,
      "height": 26,
      "borderRadius": 6,
      "borderWidth": 1,
      "borderColor": "rgba(147, 147, 147, 255)",
      "backgroundColor": "rgba(247, 247, 247, 255)"
    }
  } >
  <Text style = {
    {
      "fontWeight": "bold",
      "fontStyle": "italic",
      "fontSize": 12,
      "color": "rgba(91, 92, 101, 255)",
    }
  } >시공사례 5 건 </Text>
  </View>
  </View>
  </View>
  <Text style = {
    {
      "fontWeight": "bold",
      "fontStyle": "italic",
      "fontSize": 12,
      "color": "rgba(91, 92, 101, 255)",
      "marginStart": 7,
      "marginTop": 14
    }
  } >{prop.text}</Text>
  <View style = {
    {
      flexDirection: 'row',
      alignItems: 'flex-start'
    }
  } ><Image style = {
    {
      "marginTop": 37,
      "width": 19,
      "height": 19
    }
  }
  source = {maker
  }
  />
  <Image style = {
    {
      "marginStart": 286,
      "marginTop": 34,
      "width": 19,
      "height": 19
    }
  }
  source = {starimg
  }
  />
  <Text style = {
    {
      "fontWeight": "bold",
      "fontStyle": "italic",
      "fontSize": 12,
      "color": "rgba(103, 83, 80, 255)",
      "marginStart": -298,
      "marginTop": 37
    }
  } >{prop.addr}</Text>
  <Text style = {
    {
      "fontWeight": "bold",
      "fontStyle": "italic",
      "fontSize": 12,
      "color": "rgba(103, 83, 80, 255)",
      "marginStart": 250,
      "marginTop": 34
    }
  } >{prop.star}</Text>
  </View>
  </View>
  </View>
  
  
    )
  }

  export default Company;