import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

const starimg =require('./img/review.png')
const commain =require('./img/ID11.png')
const handha =require('./img/handhart.png')
const TestCom = (prop) => {
  return (
    <View style = {
      {
        "alignItems": "flex-start"
      }
    } >
    <Image style = {
      {
        "width": 366,
        "height": 166,
        "borderRadius": 25
      }
    }
    source = {commain
    }
    />
    <View style = {
      {
        flexDirection: 'row',
        alignItems: 'flex-start'
      }
    } ><Image style = {
      {
        "marginStart": 1,
        "marginTop": 19,
        "width": 30,
        "height": 30,
        "borderRadius": 15,
        "transform": [{
          "scaleY": 1.03
        }]
      }
    }
    source = {handha
    }
    />
    <Text style = {
      {
        "fontSize": 20,
        "color": "rgba(0, 0, 0, 255)",
        "marginStart": 2,
        "marginTop": 21
      }
    } > {prop.comname} </Text>
    <Image style = {
      {
        "marginStart": 1,
        "marginTop": 26,
        "width": 20,
        "height": 20
      }
    }
    source = {starimg
    }
    />
    <Text style = {
      {
        "fontSize": 20,
        "color": "rgba(0, 0, 0, 255)",
        "marginStart": 8,
        "marginTop": 22
      }
    } > 4.0 </Text>
    <Text style = {
      {
        "fontSize": 20,
        "color": "rgba(112, 112, 112, 255)",
        "marginTop": 22
      }
    } > (2) </Text>
    </View>
    <Text style = {
      {
        "fontSize": 15,
        "color": "rgba(0, 0, 0, 255)",
        "marginStart": 1,
        "marginTop": 14
      }
    } > 반갑습니다.수도 전문업체는 15 년 경력을가지고 있습 니다.맡겨만 주시면 싼값에 열심히 시공해드림 </Text>
    <View style = {
      {
        flexDirection: 'row',
        alignItems: 'flex-start'
      }
    } ><View style = {
      {
        "alignItems": "flex-start",
        "marginStart": 60,
        "marginTop": 21
      }
    } >
    <View style = {
      {
        "alignItems": "flex-start",
        "paddingStart": 22,
        "paddingTop": 12,
        "width": 104,
        "height": 44,
        "borderRadius": 22,
        "backgroundColor": "rgba(71, 67, 55, 255)"
      }
    } >
    <Text style = {
      {
        "fontSize": 15,
        "color": "rgba(255, 255, 255, 255)"
      }
    } > 시공사례 </Text>
    </View>
    </View>
    <View style = {
      {
        "alignItems": "flex-start",
        "paddingStart": 37,
        "paddingTop": 12,
        "marginStart": 27,
        "marginTop": 21,
        "width": 104,
        "height": 44,
        "borderRadius": 22,
        "backgroundColor": "rgba(222, 218, 218, 255)"
      }
    } >
    <Text style = {
      {
        "fontSize": 15,
        "color": "rgba(20, 6, 6, 255)"
      }
    } > 리뷰 </Text>
    </View>
    </View>
    </View>
  );
};

export default TestCom;