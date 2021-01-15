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
import styles from './styles.js'


const Mmenu = () =>{
  const [whoclicked,setWhoclicked] = useState('1');
  const puple = "rgba(164, 108, 209, 255)"
  const gray = "rgba(234, 234, 234, 255)"

  const [color1,setColor1] = useState(puple)
  const [color2,setColor2] = useState(gray)
  const [color3,setColor3] = useState(gray)
  const [color4,setColor4] = useState(gray)
  const [color5,setColor5] = useState(gray)
  const [color6,setColor6] = useState(gray)
  const [color7,setColor7] = useState(gray)
  const [color8,setColor8] = useState(gray)


  function listTouch(){
    setColor1(gray)
    setColor2(gray)
    setColor3(gray)
    setColor4(gray)
    setColor5(gray)
    setColor6(gray)
    setColor7(gray)
    setColor8(gray)
  }


    return(
      <View>
        <TouchableOpacity>
      <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd ={
                      () => {console.log('Scrolling is End')}
                  }
              >
                  <TouchableOpacity onPress={()=>{listTouch(),setColor1(puple)}}>
                  <View style = {
                    {
                      "alignItems": "flex-start"
                    }
                  } >
                <View style={{marginTop:10,marginLeft:10}}>
                <View style = {
                  {
                    "alignItems": "flex-start",
                    "paddingStart": 10,
                    "paddingTop": 8,
                    "width": 91,
                    "height": 32,
                    "borderRadius": 16,
                    "borderWidth": 1,
                    "borderColor": color1
                  }
                } >
                <Text style = {
                  {
                    "fontWeight": "bold",
                    "fontSize": 12,
                    "color": "rgba(0, 0, 0, 255)"
                  }
                } > # 전기 & 조명 </Text>
                </View>
                </View>
                </View>
                </TouchableOpacity>
  
                <TouchableOpacity onPress={()=>{listTouch(),setColor2(puple)}}>
                <View style = {
                    {
                      "alignItems": "flex-start"
                    }
                  } >
                <View style={{marginTop:10,marginLeft:10}}>
                <View style = {
                  {
                    "alignItems": "flex-start",
                    "paddingStart": 10,
                    "paddingTop": 8,
                    "width": 63,
                    "height": 32,
                    "borderRadius": 16,
                    "borderWidth": 1,
                    "borderColor": color2
                  }
                } >
                <Text style = {
                  {
                    "fontWeight": "bold",
                    "fontSize": 12,
                    "color": "rgba(0, 0, 0, 255)"
                  }
                } > # 수도 </Text>
                </View>
                </View>
                </View>

                </TouchableOpacity>
  
                
                <TouchableOpacity onPress={()=>{listTouch(),setColor3(puple)}}>
                <View style = {
                    {
                      "alignItems": "flex-start"
                    }
                  } >
                <View style={{marginTop:10,marginLeft:10}}>
                <View style = {
                  {
                    "alignItems": "flex-start",
                    "paddingStart": 10,
                    "paddingTop": 8,
                    "width": 91,
                    "height": 32,
                    "borderRadius": 16,
                    "borderWidth": 1,
                    "borderColor": color3
                  }
                } >
                <Text style = {
                  {
                    "fontWeight": "bold",
                    "fontSize": 12,
                    "color": "rgba(0, 0, 0, 255)"
                  }
                } > # 도배 & 장판 </Text>
                </View>
                </View>
                </View>
                </TouchableOpacity>
                

                <TouchableOpacity onPress={()=>{listTouch(),setColor4(puple)}}>
                <View style = {
                    {
                      "alignItems": "flex-start"
                    }
                  } >
                <View style={{marginTop:10,marginLeft:10}}>
                <View style = {
                  {
                    "alignItems": "flex-start",
                    "paddingStart": 10,
                    "paddingTop": 8,
                    "width": 80,
                    "height": 32,
                    "borderRadius": 16,
                    "borderWidth": 1,
                    "borderColor": color4
                  }
                } >
                <Text style = {
                  {
                    "fontWeight": "bold",
                    "fontSize": 12,
                    "color": "rgba(0, 0, 0, 255)"
                  }
                } > # 인테리어 </Text>
                </View>
                </View>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{listTouch(),setColor5(puple)}}>
                <View style = {
                    {
                      "alignItems": "flex-start"
                    }
                  } >
                <View style={{marginTop:10,marginLeft:10}}>
                <View style = {
                  {
                    "alignItems": "flex-start",
                    "paddingStart": 10,
                    "paddingTop": 8,
                    "width": 91,
                    "height": 32,
                    "borderRadius": 16,
                    "borderWidth": 1,
                    "borderColor": color5
                  }
                } >
                <Text style = {
                  {
                    "fontWeight": "bold",
                    "fontSize": 12,
                    "color": "rgba(0, 0, 0, 255)"
                  }
                } > # 샷시 & 창호 </Text>
                </View>
                </View>
                </View>
                </TouchableOpacity>
  

                <TouchableOpacity onPress={()=>{listTouch(),setColor6(puple)}}>
                <View style = {
                    {
                      "alignItems": "flex-start"
                    }
                  } >
                <View style={{marginTop:10,marginLeft:10}}>
                <View style = {
                  {
                    "alignItems": "flex-start",
                    "paddingStart": 10,
                    "paddingTop": 8,
                    "width": 91,
                    "height": 32,
                    "borderRadius": 16,
                    "borderWidth": 1,
                    "borderColor": color6
                  }
                } >
                <Text style = {
                  {
                    "fontWeight": "bold",
                    "fontSize": 12,
                    "color": "rgba(0, 0, 0, 255)"
                  }
                } > # 청소 & 철거 </Text>
                </View>
                </View>
                </View>
                </TouchableOpacity>
  

                <TouchableOpacity onPress={()=>{listTouch(),setColor7(puple)}}>
                <View style = {
                    {
                      "alignItems": "flex-start"
                    }
                  } >
                <View style={{marginTop:10,marginLeft:10}}>
                <View style = {
                  {
                    "alignItems": "flex-start",
                    "paddingStart": 10,
                    "paddingTop": 8,
                    "width": 95,
                    "height": 32,
                    "borderRadius": 16,
                    "borderWidth": 1,
                    "borderColor": color7
                  }
                } >
                <Text style = {
                  {
                    "fontWeight": "bold",
                    "fontSize": 12,
                    "color": "rgba(0, 0, 0, 255)"
                  }
                } > # 보일러&배관 </Text>
                </View>
                </View>
                </View>
                </TouchableOpacity>
  

                <TouchableOpacity onPress={()=>{listTouch(),setColor8(puple)}}>
                <View style = {
                    {
                      "alignItems": "flex-start"
                    }
                  } >
                <View style={{marginTop:10,marginLeft:10}}>
                <View style = {
                  {
                    "alignItems": "flex-start",
                    "paddingStart": 10,
                    "paddingTop": 8,
                    "width": 85,
                    "height": 32,
                    "borderRadius": 16,
                    "borderWidth": 1,
                    "borderColor": color8
                  }
                } >
                <Text style = {
                  {
                    "fontWeight": "bold",
                    "fontSize": 12,
                    "color": "rgba(0, 0, 0, 255)"
                  }
                } > # 건물외부 </Text>
                </View>
                </View>
                </View>
                </TouchableOpacity>
                 
                  
              </ScrollView>
              </TouchableOpacity>
          </View>
    )
  }
  

  export default Mmenu;