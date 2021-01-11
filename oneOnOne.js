import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

import { useNavigation } from '@react-navigation/native';

import FootTer from './footer.js'
import HeadHeder from "./header.js";

const OneonOne = () => {
    return(
        <View>
            <View style={{width:chartWidth,height:chartHeight}}>

            </View>


            <HeadHeder></HeadHeder>
            <FootTer></FootTer>

        </View>
    )
}