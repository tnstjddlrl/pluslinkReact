import React,{useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js";

import { useNavigation } from '@react-navigation/native';
import Postcode from 'react-native-daum-postcode';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler';

const SelectRequest = () => {

  const [select,setSelect] = useState(false)
  const [listCate,SetlistCate] = useState("전기&조명")
  const [text, setText] = useState("기본주소");//주소용

  const [show, setShow] = React.useState(false);//modal용
  const [calShow,setCalShow] = useState(false);
  const [date,setDate] = useState("날짜를 입력해주세요");

  const [value, onChangeText] = React.useState('');//상세내용

  return(
    <View>
      <View style={{height:chartHeight,width:chartWidth}}>
        <ScrollView>
          <View style={{marginBottom:500}}>
                      <View style={{width:chartWidth,marginTop:50}}>
                        <ImageBackground source={event} style={{width:chartWidth,height:chartHeight/7}}>
                        </ImageBackground>
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>견적의뢰</Text>
                      </View>

            <View style={{margin:10,marginTop:20}}>
              <Text style={{fontWeight:'bold'}}>카테고리</Text>
              <TouchableOpacity onPress={()=>setSelect(true)}>
                                <View style={{borderWidth:0.5,marginTop:10,alignItems:"center",flexDirection:"row",width:chartWidth-30,backgroundColor:'white',borderRadius:5}}>
                                    <Text style={{margin:10}}>{listCate}</Text>
                                    <Image source={arrow} style={{width:8,height:14,right:5,position:'absolute'}}></Image>
                                </View>
              </TouchableOpacity>

              <Text style={{fontWeight:'bold',marginTop:10}}>세부항목</Text>
              <TouchableOpacity onPress={()=>setSelect(true)}>
                                <View style={{borderWidth:0.5,marginTop:10,alignItems:"center",flexDirection:"row",width:chartWidth-30,backgroundColor:'white',borderRadius:5}}>
                                    <Text style={{margin:10}}>{listCate}</Text>
                                    <Image source={arrow} style={{width:8,height:14,right:5,position:'absolute'}}></Image>
                                </View>
              </TouchableOpacity>

              <Text style={{marginTop:15,fontWeight:'bold'}}>지정업체</Text>
                <View style={{borderWidth:1,borderColor:'#cccccc',width:chartWidth-50,marginTop:5,backgroundColor:'#ffcccc'}}>
                  <Text style={{margin:10,fontWeight:'100'}}>지정한 업체</Text>
              </View>

              <Text style = {
                  {

                    "fontWeight": "bold",
                    "fontSize": 16,
                    "color": "rgba(0, 0, 0, 255)",
                    "marginTop": 17
                  }
                } >시공주소 </Text>
                <TouchableOpacity onPress={()=>setShow(true)}>
                <View style = {
                  {
                    "alignItems": "flex-start",
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
                <TextInput placeholder='상세주소' style={{marginTop:8,width:325,height:37,borderWidth:1,borderColor:'gray',}}></TextInput>

                <Text style = {
                  {

                    "fontWeight": "bold",
                    "fontSize": 16,
                    "color": "rgba(0, 0, 0, 255)",
                    "marginTop": 17
                  }
                } >방문날짜 </Text>
                <TouchableOpacity onPress={()=>setCalShow(true)}>
                <View style = {
                  {
                    "alignItems": "flex-start",
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
                <Text style={{color:'red'}}>#방문날짜 이전에 낙찰이 되지않으면 견적이 자동취소 됩니다.</Text>

                <Text style={{fontWeight:'bold',marginTop:10}}>세부항목</Text>
                <TextInput      
                style={{ height: 150,width:chartWidth-30,marginTop:10, borderColor: 'gray', borderWidth: 0.5 }}
                onChangeText={text => onChangeText(text)}
                value={value}
                placeholder="내용을 입력해주세요."
                multiline={true}
              />

              <View style={{flexDirection:'row',alignSelf:'center',marginTop:20}}>
                <View style={{backgroundColor:"#d24dff",width:70,height:35,}}>
                  <Text style={{color:'white',alignSelf:'center',marginTop:10}}>작성하기</Text>
                </View>
                <View style={{backgroundColor:"#404040",width:50,height:35,}}>
                  <Text style={{color:'white',alignSelf:'center',marginTop:10}}>취소</Text>
                </View>
              </View>





            </View>

          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>


      <Modal  transparent={true} visible={select}>
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:150}}>
                        <TouchableOpacity onPress={()=>{SetlistCate('전기&조명'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>전기&조명</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('수도'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>수도</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('도배&장판'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>도배&장판</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{SetlistCate('인테리어'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>인테리어</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('샷시&창호'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>샷시&창호</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('청소&철거'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>청소&철거</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('건물외부'),setSelect(false)}}>
                        <Text style={{left:5,marginTop:5}}>건물외부</Text>
                        </TouchableOpacity>
                    </View>
       </Modal>

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

    </View>
  )
}

export default SelectRequest;