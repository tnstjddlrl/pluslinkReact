import React, { useState,useEffect } from "react";
import key from "./key";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  SafeAreaView 
} from 'react-native';
import Postcode from 'react-native-daum-postcode';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { TouchableOpacity } from "react-native-gesture-handler";

import {
  ListPicker,
} from 'react-native-ultimate-modal-picker';

const event = require('./img/eventBg.jpg')

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

const REquset = () => {
    const [value, onChangeText] = React.useState('');//textinput용
    const [text, setText] = useState("기본주소");
    const [date,setDate] = useState("날짜를 입력해주세요");

    const [show, setShow] = React.useState(false);//modal용
    const [calShow,setCalShow] = useState(false);

    const [item, setItem] =useState("카테고리를 선택해주세요.");
    const [listItem,setListItem] = useState([]);

    const items = [
      { label: '카테고리를 선택해주세요.', value: '카테고리를 선택해주세요.' },
      { label: '전기&조명', value: '전기&조명' },
      { label: '수도', value: '수도' },
      { label: '도배&장판', value: '도배&장판' },
      { label: '인테리어', value: '인테리어' },
      { label: '샷시&창호', value: '샷시&창호' },
      { label: '청소&철거', value: '청소&철거' },
      { label: '보일러&배관', value: '보일러&배관' },
      { label: '건물외부', value: '건물외부' },
    ];
    const basicitems = [
      { label: '먼저 카테고리를 선택해주세요.', value: '먼저 카테고리를 선택해주세요.' }
    ];
    const elecItems =[
      { label: 'cctv', value: 'cctv' },
      { label: '계전', value: '계전' },
      { label: '소방공사', value: '소방공사' },
      { label: '에어컨', value: '에어컨' },
      { label: '음향', value: '음향'},
      { label: '인터폰 및 도어폰', value: '인터폰 및 도어폰' },
      { label: '전기', value: '전기' },
      { label: '조명', value: '조명' },
      { label: '통신설비', value: '통신설비' }
    ]
    const waterItems =[
      { label: '결로', value: '결로' },
      { label: '누수', value: '누수' },
      { label: '동파', value: '동파' },
      { label: '방수공사', value: '방수공사' },
      { label: '상하수도', value: '상하수도'},
      { label: '소모품 교체', value: '소모품 교체' },
      { label: '악취제거', value: '악취제거' }
    ]

    const resetList =()=>{
      console.log('함수실행')
      switch(item){
        case "전기&조명":
          setListItem(elecItems);
          break;
        case "수도":
          setListItem(waterItems);
          break;
        default :
          setListItem(basicitems);
          break;
      }
    }

    
  return (
    <SafeAreaView>
   
    <ScrollView>
    <View style = {
      {
        "alignItems": "flex-start",
        height:1000
      }
    } >
    <ImageBackground style = {
      {
        "width": 412,
        "height": 125
      }
    }
    source = {event
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
    } > 견적의뢰 </Text>
    <View style = {
      {
        "marginStart": 0.5,
        "marginTop": 5.5,
        "backgroundColor": "rgba(255, 255, 255, 255)",
        "width": 72,
        "height": 2
      }
    }
    />
    </View>
    </ImageBackground>
    <Text style={{"fontWeight":"bold","fontSize":16,"color":"rgba(0, 0, 0, 255)","marginStart":16,"marginTop":37}}>카테고리d</Text >
    <ListPicker
    items={items}
    style={{width:350}}
    onChange={(item) => {resetList(),setItem(item)}}
  />
    <Text style = {
      {

        "fontWeight": "bold",
        "fontSize": 16,
        "color": "rgba(0, 0, 0, 255)",
        "marginStart": 17,
        "marginTop": 9
      }
    } >세부항목 </Text>
    <ListPicker
    items={listItem}
    style={{width:350}}
    onChange={(item) => console.log(item)}
  />
    <Text style = {
      {

        "fontWeight": "bold",
        "fontSize": 16,
        "color": "rgba(0, 0, 0, 255)",
        "marginStart": 15,
        "marginTop": 17
      }
    } >시공주소 </Text>
    <TouchableOpacity onPress={()=>setShow(true)}>
    <View style = {
      {
        "alignItems": "flex-start",
        "marginStart": 15,
        "marginTop": 8,
        "width": 325,
        "height": 37,
        "borderWidth": 1,
        "borderColor": "rgba(171, 171, 171, 255)",
        "backgroundColor": "rgba(255, 255, 255, 255)"
      }
    }
    ><Text>{text}</Text></View>
        </TouchableOpacity>
    <View style = {
      {
        "alignItems": "flex-start",
        "marginStart": 15,
        "marginTop": 10,
        "width": 325,
        "height": 37,
        "borderWidth": 1,
        "borderColor": "rgba(171, 171, 171, 255)",
        "backgroundColor": "rgba(255, 255, 255, 255)"
      }
    }
    />
    <Text style = {
      {

        "fontWeight": "bold",
        "fontSize": 16,
        "color": "rgba(0, 0, 0, 255)",
        "marginStart": 15,
        "marginTop": 17
      }
    } >방문날짜 </Text>
    <TouchableOpacity onPress={()=>setCalShow(true)}>
     <View style = {
      {
        "alignItems": "flex-start",
        "marginStart": 15,
        "marginTop": 10,
        "width": 325,
        "height": 37,
        "borderWidth": 1,
        "borderColor": "rgba(171, 171, 171, 255)",
        "backgroundColor": "rgba(255, 255, 255, 255)"
      }
    }
    ><Text>{date}</Text></View>
    </TouchableOpacity>
    <Text style = {
      {

        "fontWeight": "bold",
        "fontSize": 13,
        "color": "rgba(252, 0, 0, 255)",
        "marginStart": 16,
        "marginTop": 2
      }
    } > # 방문날짜 이전에 낙찰이 되지않으면 견적이 자동취소 됩니다. </Text>
    <Text style = {
      {

        "fontWeight": "bold",
        "fontSize": 16,
        "color": "rgba(0, 0, 0, 255)",
        "marginStart": 17,
        "marginTop": 10
      }
    } >상세설명 </Text>
    <View style = {
      {
        "alignItems": "flex-start",
        "marginStart": 17,
        "marginTop": 8,
        "width": chartWidth/1.1,
        "height": 120,
        "borderWidth": 1,
        "borderColor": "rgba(161, 161, 161, 255)",
        "backgroundColor": "rgba(255, 255, 255, 255)"
      }
    }
    />
    <Text style = {
      {

        "fontWeight": "bold",
        "fontSize": 16,
        "color": "rgba(0, 0, 0, 255)",
        "marginStart": 17,
        "marginTop": 17
      }
    } >첨부파일 </Text>
    <View style = {
      {
        "alignItems": "flex-start",
        "marginStart": 16,
        "marginTop": 18,
        "width": 65,
        "height": 35,
        "borderWidth": 1,
        "borderColor": "rgba(112, 112, 112, 255)",
        "backgroundColor": "rgba(238, 238, 238, 255)"
      }
    }
    />
    <View style = {
      {
        "flexDirection": "row",
        "alignItems": "flex-start",
        "paddingStart": 9,
        "paddingTop": 6,
        "marginStart": 17,
        "marginTop": -35,
        "width":  chartWidth/1.1,
        "height": 35,
        "borderWidth": 1,
        "borderColor": "rgba(112, 112, 112, 255)",
        "backgroundColor": "rgba(255, 255, 255, 255)"
      }
    } >
    <Text style = {
      {

        "fontWeight": "bold",
        "fontSize": 16,
        "color": "rgba(0, 0, 0, 255)"
      }
    } > 파일 0 </Text>
    <View style = {
      {
        "alignItems": "flex-start",
        "marginStart": 15,
        "width": 221,
        "height": 21,
        "borderWidth": 1,
        "borderColor": "rgba(112, 112, 112, 255)",
        "backgroundColor": "rgba(255, 255, 255, 255)"
      }
    }
    />
    </View>
    <View style = {
      {
        "alignItems": "flex-start",
        "paddingStart": 18,
        "paddingTop": 7,
        "marginStart": 15,
        "marginTop": 17,
        "width": 84,
        "height": 33,
        "backgroundColor": "rgba(165, 121, 201, 255)"
      }
    } >
    <Text style = {
      {

        "fontWeight": "bold",
        "fontSize": 12,
        "color": "rgba(255, 255, 255, 255)"
      }
    } > 추가하기 </Text>
    </View>
    <View style = {
      {
        "alignItems": "flex-start",
        "paddingStart": 18,
        "paddingTop": 7,
        "marginStart": 103,
        "marginTop": -33,
        "width": 84,
        "height": 33,
        "backgroundColor": "rgba(51, 51, 51, 255)"
      }
    } >
    <Text style = {
      {

        "fontWeight": "bold",
        "fontSize": 12,
        "color": "rgba(255, 255, 255, 255)"
      }
    } > 삭제하기 </Text>
    </View>
    <View style = {
      {
        flexDirection: 'row',
        alignItems: 'flex-start'
      }
    } >
    <View style = {
      {
        "alignItems": "flex-start",
        "paddingStart": 19,
        "paddingTop": 8,
        "marginStart": 137,
        "marginTop": 57,
        "width": 84,
        "height": 33,
        "backgroundColor": "rgba(165, 121, 201, 255)"
      }
    } >
    <Text style = {
      {

        "fontWeight": "bold",
        "fontSize": 12,
        "color": "rgba(255, 255, 255, 255)"
      }
    } > 작성하기 </Text>
    </View>
    <View style = {
      {
        "alignItems": "flex-start",
        "paddingStart": 13,
        "paddingTop": 8,
        "marginStart": 5,
        "marginTop": 57,
        "width": 50,
        "height": 33,
        "backgroundColor": "rgba(51, 51, 51, 255)"
      }
    } >
    <Text style = {
      {

        "fontWeight": "bold",
        "fontSize": 12,
        "color": "rgba(255, 255, 255, 255)"
      }
    } > 취소 </Text>
    </View>
    </View>
    </View>
    </ScrollView>

<Modal transparent={true} visible={show}>
<View style={{width:300, height:500,position:'absolute',margin:30}}>
  <Postcode
      jsOptions={{ animated: true }}
      onSelected={(data) => {setText(JSON.stringify(data.address)),setShow(false)}}
  />
</View>
</Modal>

<Modal transparent={true} visible={calShow}>
<View style={{ height:chartHeight/2,top:chartHeight/2.5 }}>
        <Calendar
        onDayPress={(day) => {console.log('selected day', day),setCalShow(false),setDate(day.dateString)}}
        onDayLongPress={(day) => {console.log('selected day', day)}}
        monthFormat={'yyyy MM'}
        onMonthChange={(month) => {console.log('month changed', month)}}
        hideExtraDays={false}
        disableMonthChange={true}
        firstDay={1}
        hideDayNames={false}
        showWeekNumbers={false}
        onPressArrowLeft={substractMonth => substractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableAllTouchEventsForDisabledDays={true}
        />
      </View>
</Modal>

</SafeAreaView>
  );
};

export default REquset;