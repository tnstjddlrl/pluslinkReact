import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;


const bg_1 = require('./img/case_bg.png')
const best1 = require('./img/best1.png')
const best2 = require('./img/best2.jpg')
const best3 = require('./img/best3.jpg')
const best4 = require('./img/best4.jpg')
const bongwoo = require('./img/bongwoo.png')

const SigongBest = () => {
  return (
      <View style={{marginBottom:30,marginRight:10}}>
    <View style = {
        {
          "alignItems": "flex-start"
        }
      } ><View style = {
        {
          flexDirection: 'row',
          alignItems: 'flex-start'
        }
      } ><View style = {
        {
          "alignItems": "flex-start"
        }
      } ><ImageBackground style = {
        {
          "width": 412,
          "height": 205
        }
      }
      source = {bg_1
      } >
      <View style = {
        {
          "alignItems": "flex-start",
          "paddingStart": 146,
          "paddingTop": 129,
          "flex": 1
        }
      } >
      <Text style = {
        {
          "fontWeight": "bold",
          "fontSize": 20,
          "color": "rgba(0, 0, 0, 255)"
        }
      } > 우수시공사례 </Text>
      </View>
      </ImageBackground></View >


      
      <View style = {
        {
          "alignItems": "flex-start",
          "paddingStart": 1,
          "paddingTop": 1,
          "marginStart": -402,
          "marginTop": 170,
          "width": chartWidth/2.2,
          "height": 268,
          "borderWidth": 1,
          "borderColor": "rgba(229, 229, 229, 255)",
          "backgroundColor": "rgba(255, 255, 255, 255)"
        }
      } >
      <Image style = {
        {
          "width": chartWidth/2.2,
          "height": 145,
          "borderWidth": 1,
          "borderColor": "rgba(229, 229, 229, 255)"
        }
      }
      source = {best1
      }
      />
      <Text style = {
        {
          "fontWeight": "bold",
          "fontSize": 12,
          "color": "rgba(0, 0, 0, 255)",
          "marginStart": 8,
          "marginTop": 12
        }
      } > 울산 제2장애인 체육관 조명 </Text>
      <View style = {
        {
          flexDirection: 'row',
          alignItems: 'flex-start'
        }
      } ><Image style = {
        {
          "marginStart": 8,
          "marginTop": 5,
          "width": 28,
          "height": 28,
          "borderRadius": 14
        }
      }
      source = {bongwoo
      }
      />
      <Text style = {
        {
          "fontWeight": "bold",
          "fontSize": 12,
          "color": "rgba(161, 177, 199, 255)",
          "marginStart": 9,
          "marginTop": 11
        }
      } > 이봉우 </Text>
      </View>
      <Text style = {
        {
          "fontWeight": "bold",
          "fontSize": 12,
          "color": "rgba(161, 177, 199, 255)",
          "marginStart": 8,
          "marginTop": 10
        }
      } > 울산 제2장애인 체육관 조명시공 </Text>
      </View>
     

      <View style = {
        {
          "alignItems": "flex-start",
          "paddingStart": 1,
          "paddingTop": 1,
          "marginStart": 11,
          "marginTop": 171,
          "width": chartWidth/2.2,
          "height": 268,
          "borderWidth": 1,
          "borderColor": "rgba(229, 229, 229, 255)",
          "backgroundColor": "rgba(255, 255, 255, 255)"
        }
      } >
      <Image style = {
        {
          "width": chartWidth/2.2,
          "height": 145,
          "borderWidth": 1,
          "borderColor": "rgba(229, 229, 229, 255)"
        }
      }
      source = {best2
      }
      />
      <Text style = {
        {
          "fontWeight": "bold",
          "fontSize": 12,
          "color": "rgba(0, 0, 0, 255)",
          "marginStart": 8,
          "marginTop": 12
        }
      } > 우드앤화이트로 꾸민 세련된 </Text>
      <View style = {
        {
          flexDirection: 'row',
          alignItems: 'flex-start'
        }
      } ><Image style = {
        {
          "marginStart": 8,
          "marginTop": 5,
          "width": 28,
          "height": 28,
          "borderRadius": 14
        }
      }
      source = {bongwoo
      }
      />
      <Text style = {
        {
          "fontWeight": "bold",
          "fontSize": 12,
          "color": "rgba(161, 177, 199, 255)",
          "marginStart": 9,
          "marginTop": 11
        }
      } > 김업체 </Text>
      </View>
      <Text style = {
        {
          "fontWeight": "bold",
          "fontSize": 12,
          "color": "rgba(161, 177, 199, 255)",
          "marginStart": 8,
          "marginTop": 10
        }
      } > 울산 제2장애인 체육관 조명시공 </Text>
      </View>
      </View>
      <View style = {
        {
          flexDirection: 'row',
          alignItems: 'flex-start'
        }
      } ><View style = {
        {
          "alignItems": "flex-start",
          "paddingStart": 1,
          "paddingTop": 1,
          "marginStart": 10,
          "marginTop": 12,
          "width": chartWidth/2.2,
          "height": 268,
          "borderWidth": 1,
          "borderColor": "rgba(229, 229, 229, 255)",
          "backgroundColor": "rgba(255, 255, 255, 255)"
        }
      } >
      <Image style = {
        {
          "width": chartWidth/2.2,
          "height": 145,
          "borderWidth": 1,
          "borderColor": "rgba(229, 229, 229, 255)"
        }
      }
      source = {best3
      }
      />
      <Text style = {
        {
          "fontWeight": "bold",
          "fontSize": 12,
          "color": "rgba(0, 0, 0, 255)",
          "marginStart": 8,
          "marginTop": 12
        }
      } > 직사각형 타일로 시공한 깔끔한 </Text>
      <View style = {
        {
          flexDirection: 'row',
          alignItems: 'flex-start'
        }
      } ><Image style = {
        {
          "marginStart": 8,
          "marginTop": 5,
          "width": 28,
          "height": 28,
          "borderRadius": 14
        }
      }
      source = {bongwoo
      }
      />
      <Text style = {
        {
          "fontWeight": "bold",
          "fontSize": 12,
          "color": "rgba(161, 177, 199, 255)",
          "marginStart": 9,
          "marginTop": 11
        }
      } > 김업체 </Text>
      </View>
      <Text style = {
        {
          "fontWeight": "bold",
          "fontSize": 12,
          "color": "rgba(161, 177, 199, 255)",
          "marginStart": 8,
          "marginTop": 10
        }
      } > 울산 제2장애인 체육관 조명시공 </Text>
      </View>
      <View style = {
        {
          "alignItems": "flex-start",
          "paddingStart": 1,
          "paddingTop": 1,
          "marginStart": 12,
          "marginTop": 13,
          "width": chartWidth/2.2,
          "height": 268,
          "borderWidth": 1,
          "borderColor": "rgba(229, 229, 229, 255)",
          "backgroundColor": "rgba(255, 255, 255, 255)"
        }
      } >
      <Image style = {
        {
          "width": chartWidth/2.2,
          "height": 145,
          "borderWidth": 1,
          "borderColor": "rgba(229, 229, 229, 255)"
        }
      }
      source = {best4
      }
      />
      <Text style = {
        {
          "fontWeight": "bold",
          "fontSize": 12,
          "color": "rgba(0, 0, 0, 255)",
          "marginStart": 8,
          "marginTop": 12
        }
      } > [32 평 아파트 수도시공] </Text>
      <View style = {
        {
          flexDirection: 'row',
          alignItems: 'flex-start'
        }
      } ><Image style = {
        {
          "marginStart": 8,
          "marginTop": 5,
          "width": 28,
          "height": 28,
          "borderRadius": 14
        }
      }
      source = {bongwoo
      }
      />
      <Text style = {
        {
          "fontWeight": "bold",
          "fontSize": 12,
          "color": "rgba(161, 177, 199, 255)",
          "marginStart": 9,
          "marginTop": 11
        }
      } > 김업체 </Text>
      </View>
      <Text style = {
        {
          "fontWeight": "bold",
          "fontSize": 12,
          "color": "rgba(161, 177, 199, 255)",
          "marginStart": 8,
          "marginTop": 10
        }
      } > 울산 제2장애인 체육관 조명시공 </Text>
      </View>
      </View>
      </View>
      </View>

  );
};

export default SigongBest;