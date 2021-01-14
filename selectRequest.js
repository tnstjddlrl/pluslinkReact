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
  const [subSelect,setSubselect] = useState(false)
  const [listCate,SetlistCate] = useState("전기&조명") //카테고리
  const [listPlus,setListPlus] = useState('전기') //세부카테고리
  const [text, setText] = useState("기본주소");//주소용

  const [show, setShow] = React.useState(false);//modal용
  const [calShow,setCalShow] = useState(false);
  const [date,setDate] = useState("날짜를 입력해주세요");

  const [value, onChangeText] = React.useState('');//상세내용

  const Subcate = ()=>{
    if(listCate=='전기&조명'){
      return(
        <Modal  transparent={true} visible={subSelect}>
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:150}}>
                        <TouchableOpacity onPress={()=>{setListPlus('전기'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>전기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('조명'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>조명</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('cctv'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>cctv</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{setListPlus('인터폰 및 도어폰'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>인터폰 및 도어폰</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('에어컨'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>에어컨</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('통신설비'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>통신설비</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('계전'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>계전</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('음향'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>음향</Text>
                        </TouchableOpacity>
                    </View>
       </Modal>
      )
    } else if(listCate=='수도'){
      return(
        <Modal  transparent={true} visible={subSelect}>
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:150}}>
                        <TouchableOpacity onPress={()=>{setListPlus('상하수도'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>상하수도</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('동파'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>동파</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('누수'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>누수</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{setListPlus('소모품 교체'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>소모품 교체</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('악취제거'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>악취제거</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('방수공사'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>방수공사</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('결로'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>결로</Text>
                        </TouchableOpacity>
                    </View>
       </Modal>
      )
    } else if(listCate=='도배&장판'){
      return(
        <Modal  transparent={true} visible={subSelect}>
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:150}}>
                        <TouchableOpacity onPress={()=>{setListPlus('도배'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>도배</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('장판'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>장판</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('몰딩'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>몰딩</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{setListPlus('바닥재 및 타일'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>바닥재 및 타일</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('줄눈시공'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>줄눈시공</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('곰팡이제거'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>곰팡이제거</Text>
                        </TouchableOpacity>
                    </View>
       </Modal>
      )
    } else if(listCate=='인테리어'){
      return(
        <Modal  transparent={true} visible={subSelect}>
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:150}}>
                        <TouchableOpacity onPress={()=>{setListPlus('화장실 리모델링'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>화장실 리모델링</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('부엌 리모델링'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>부엌 리모델링</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('종합 인테리어'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>종합 인테리어</Text>
                        </TouchableOpacity>
                    </View>
       </Modal>
      )
    } else if(listCate=='샷시&창호'){
      return(
        <Modal  transparent={true} visible={subSelect}>
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:150}}>
                        <TouchableOpacity onPress={()=>{setListPlus('샷시'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>샷시</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('창호'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>창호</Text>
                        </TouchableOpacity>
                    </View>
       </Modal>
      )
    }else if(listCate=='청소&철거'){
      return(
        <Modal  transparent={true} visible={subSelect}>
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:150}}>
                        <TouchableOpacity onPress={()=>{setListPlus('입주청소'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>입주청소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('건물청소'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>건물청소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('에어컨청소'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>에어컨청소</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{setListPlus('세탁기청소'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>세탁기청소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('철거 및 처리'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>철거 및 처리</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('방역'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>방역</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('가사도우미'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>가사도우미</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('상가복구'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>상가복구</Text>
                        </TouchableOpacity>
                    </View>
       </Modal>
      )
    } else if(listCate=='보일러&배관'){
      return(
        <Modal  transparent={true} visible={subSelect}>
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:150}}>
                        <TouchableOpacity onPress={()=>{setListPlus('보일러'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>보일러</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('배관공사'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>배관공사</Text>
                        </TouchableOpacity>
                    </View>
       </Modal>
      )
    } else if(listCate=='건물외부'){
      return(
        <Modal  transparent={true} visible={subSelect}>
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:150}}>
                        <TouchableOpacity onPress={()=>{setListPlus('외벽크랙'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>외벽크랙</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('지붕 및 담장'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>지붕 및 담장</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('울타리 및 펜스'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>울타리 및 펜스</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{setListPlus('미장'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>미장</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('석재'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>석재</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('어닝 및 천막'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>어닝 및 천막</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('간판'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>간판</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setListPlus('빗물받이'),setSubselect(false)}}>
                        <Text style={{left:5,marginTop:5}}>상가복구</Text>
                        </TouchableOpacity>
                    </View>
       </Modal>
      )
    }
  }

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
              <TouchableOpacity onPress={()=>setSubselect(true)}>
                                <View style={{borderWidth:0.5,marginTop:10,alignItems:"center",flexDirection:"row",width:chartWidth-30,backgroundColor:'white',borderRadius:5}}>
                                    <Text style={{margin:10}}>{listPlus}</Text>
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

                <Text style={{fontWeight:'bold',marginTop:10}}>상세설명</Text>
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
                        <TouchableOpacity onPress={()=>{SetlistCate('전기&조명'),setSelect(false),setListPlus('전기')}}>
                        <Text style={{left:5,marginTop:5}}>전기&조명</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('수도'),setSelect(false),setListPlus('상하수도')}}>
                        <Text style={{left:5,marginTop:5}}>수도</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('도배&장판'),setSelect(false),setListPlus('도배')}}>
                        <Text style={{left:5,marginTop:5}}>도배&장판</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{SetlistCate('인테리어'),setSelect(false),setListPlus('화장실 리모델링')}}>
                        <Text style={{left:5,marginTop:5}}>인테리어</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('샷시&창호'),setSelect(false),setListPlus('샷시')}}>
                        <Text style={{left:5,marginTop:5}}>샷시&창호</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('청소&철거'),setSelect(false),setListPlus('입주청소')}}>
                        <Text style={{left:5,marginTop:5}}>청소&철거</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('보일러&배관'),setSelect(false),setListPlus('보일러')}}>
                        <Text style={{left:5,marginTop:5}}>보일러&배관</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{SetlistCate('건물외부'),setSelect(false),setListPlus('외벽크랙')}}>
                        <Text style={{left:5,marginTop:5}}>건물외부</Text>
                        </TouchableOpacity>
                    </View>
       </Modal>

       <Subcate></Subcate>

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