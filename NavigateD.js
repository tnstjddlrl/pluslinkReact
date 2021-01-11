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
  Modal,
} from "react-native";
import REquset from "./Requset.js";
const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;
import styles from './styles.js'

const NaviMenu = (prop) => {
    return(
        <Modal transparent={true} visible={prop.show}>
            <View style={{backgroundColor:'black', width:chartWidth-chartWidth/2.2, height:300}}></View>
        </Modal>
    )
}

export default NaviMenu;