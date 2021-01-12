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
    return(
      <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd ={
                      () => {console.log('Scrolling is End')}
                  }
              >
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
                    "borderColor": "rgba(164, 108, 209, 255)"
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
                    "borderColor": "rgba(234, 234, 234, 255)"
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
                    "borderColor": "rgba(234, 234, 234, 255)"
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
                    "borderColor": "rgba(234, 234, 234, 255)"
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
                    "borderColor": "rgba(234, 234, 234, 255)"
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
                    "borderColor": "rgba(234, 234, 234, 255)"
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
                    "borderColor": "rgba(234, 234, 234, 255)"
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
                    "borderColor": "rgba(234, 234, 234, 255)"
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
                 
                  
              </ScrollView>
    )
  }
  

  export default Mmenu;