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

const heart = require('./img/handhart.png')
const starimg =require('./img/review.png')

const CompanyList = () => {
  const [select,setSelect] = useState(false)
  const [listCate,SetlistCate] = useState("전기&조명")

  const [subSelect,setSubselect] = useState(false)
  const [listPlus,setListPlus] = useState('전기') //세부카테고리
  const Subcate = ()=>{
    if(listCate=='전기&조명'){
      return(
        <Modal  transparent={true} visible={subSelect}>
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:300}}>
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
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:300}}>
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
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:300}}>
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
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:300}}>
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
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:300}}>
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
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:300}}>
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
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:300}}>
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
                    <View style={{width:chartWidth-30, position:'absolute',backgroundColor:'white',borderWidth:0.5,left:15,top:300}}>
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
                        <Text style={{position:'absolute',color:"white",fontSize:20,fontWeight:'bold',top:40,left:10}}>업체목록</Text>
                      </View>

            <View style={{margin:10}}>
              <View style={{backgroundColor:'#e6e6e6', width:chartWidth-20,borderRadius:17}}>
                <Text style={{fontSize:18,marginTop:15,marginLeft:15}}>카테고리</Text>
                  <TouchableOpacity onPress={()=>setSelect(true)}>
                                <View style={{borderWidth:0.5,marginTop:10,alignItems:"center",flexDirection:"row",width:chartWidth-40,marginLeft:10,backgroundColor:'white',borderRadius:5}}>
                                    <Text style={{margin:10}}>{listCate}</Text>
                                    <Image source={arrow} style={{width:8,height:14,right:5,position:'absolute'}}></Image>
                                </View>
                  </TouchableOpacity>

                <Text style={{fontSize:18,marginTop:15,marginLeft:15}}>세부카테고리</Text>
                  <TouchableOpacity onPress={()=>setSubselect(true)}>
                                <View style={{borderWidth:0.5,marginBottom:20,marginTop:10,alignItems:"center",flexDirection:"row",width:chartWidth-40,marginLeft:10,backgroundColor:'white',borderRadius:5}}>
                                    <Text style={{margin:10}}>{listPlus}</Text>
                                    <Image source={arrow} style={{width:8,height:14,right:5,position:'absolute'}}></Image>
                                </View>
                  </TouchableOpacity>
              </View>

              <View style={{backgroundColor:'#e6e6e6', width:chartWidth-20,borderRadius:17,borderWidth:0.5,marginTop:30}}>
                
                <ListItem></ListItem>
                <ListItem></ListItem>


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

    </View>
  )
}

const ListItem = () => {
  return(
    <View style={{margin:20}}>
            <TouchableOpacity>
                  <View style={{height:180,width:chartWidth-60,borderRadius:10,backgroundColor:'gray'}}></View>

                  <View style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
                    <Image source={heart} style={{width:30,height:30}}></Image>
                    <Text style={{fontSize:18,marginLeft:15}}>김업체</Text>
                  </View>

                  <View style={{flexDirection:'row',marginTop:5,alignItems:'center'}}>
                    <Image source={starimg} style={{width:20,height:20}}></Image>
                    <Text style={{fontSize:18,marginLeft:15}}>3.7</Text>
                  </View>

                  <Text style={{marginTop:10}}>업체소개</Text>
                  <View style={{width:50,borderWidth:0.5,marginTop:3}}></View>
                  <Text numberOfLines={1} style={{marginTop:10}}>반갑습니다 수도전문업체는 15년 경력을가지고있습니다. 많은 이용바랍니다.</Text>

                  <View style={{width:chartWidth-60,borderWidth:0.8,marginTop:10,borderColor:'#a6a6a6'}}></View>
            </TouchableOpacity>
    </View>
  )
}

export default CompanyList;