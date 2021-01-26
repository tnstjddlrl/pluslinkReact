
import React, { useState, useEffect } from 'react';
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
import axios from "axios";

import { useNavigation } from '@react-navigation/native';

import arraydata from './json/g5_write_estimate'


const JsonTest = () => {
  const [list,setList]=useState([]);
  const [testlist,setTestlist]=useState([]);

  

    function refreshData(tableName){
      axios.post('http://ip0131.cafe24.com/pluslink/json/jsonMember.php', JSON.stringify({
        id : tableName,
      }))
      .then(function (response) {
        console.log('리스폰스 ',response);
        if(response.request._response=='suc'){
        alert('로그인 되었습니다.')
        }
        else{
          alert(response.request._response)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }


return(
  <View style={{justifyContent:'center',alignContent:'center',height:chartHeight}}>
    <TouchableOpacity onPress={()=>refreshData('bidding')}>
     <Text>테스트</Text>
    </TouchableOpacity>
  </View>
)
}






export default JsonTest;