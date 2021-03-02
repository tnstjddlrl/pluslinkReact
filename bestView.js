//우수시공사례 자세히보기

import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TextInput
} from 'react-native';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width; //현재 창 크기 가져오기

const event = require('./img/eventBg.jpg')
const arrow = require('./img/arrow02.png')

import FootTer from './footer.js'
import HeadHeder from "./header.js"; //푸터 헤더

import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-community/async-storage'; 

const user = require('./img/user.png')
const clock = require('./img/clock.png')

const webViewScript =`
(function () {
    var height = null;
    function changeHeight() {
      if (document.body.scrollHeight != height) {
        height = document.body.scrollHeight;
        window.ReactNativeWebView.postMessage(height)
      }
    }
    setTimeout(changeHeight, 300);
} ())
`



function refreshData(tableName) {
  axios.post('http://ip0131.cafe24.com/pluslink/json/jsonMember.php', JSON.stringify({
    id: tableName,
  }))
    .then(function (response) {
      console.log('리스폰스 ', response);
      if (response.request._response == 'suc') {
      }
      else {
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}


const BestView = ({route}) => {

  function insertSmall() {
    axios.post('http://ip0131.cafe24.com/pluslink/json/insertCommentBest.php', JSON.stringify({
      wr_content: stText, //상세설명
      mb_id: newid,//아이디
      wr_password: pwss,//비번
      wr_name: name,//이름
      parent: route.params.id,
    }))
      .then(function (response) {
        console.log('리스폰스 ', response.request._response);
        if (response.request._response == 'succ') {
        }
        else {
          console.log(response.request._response)
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    refreshData('g5_write_estimate')

    setStText('')
      navigation.goBack()
    Alert.alert('댓글이 등록되었습니다.')

  }

  

  

  const [stText, setStText] = useState('') //댓글
  const [stLoad, setStLoad] = useState(true)
  const [newid,setNewid] = useState('')

  const navigation = useNavigation();

  async function isFavorite() {
    try {
      return await AsyncStorage.getItem("@super:id");
    } catch (error) {
      return false;
    }
  } //아이디값 가져오기

  useEffect(() => {

    const result = isFavorite().then((company_id) => {
      if(company_id == null){
        console.log('로그인정보 없음')
        setNewid('로그인해주세요')
      }else{
        setNewid(company_id.toLowerCase());
        console.log('새 : ', company_id);
        console.log('새새 : '+newid)
      }
    });

    refreshData('g5_write_example')

  }, [])

  const [OneList,setOneList] = useState([]);
  const [memberList, setMemberList] = useState([]);

    async function GetJson() {
      try {
        return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_write_example.json');
      } catch (error) {
        console.log('에러 : ',error)
        return false;
      }
    }
    async function GetMember() {
      try {
        console.log('겟멤버 작동됨')
        return await axios.get('http://ip0131.cafe24.com/pluslink/json/g5_member.json');
      } catch (error) {
        console.log('에러 : ', error)
        return false;
      }
    }

    useEffect(()=>{
      if(OneList.length==0){
        GetJson().then((res)=>{
        setOneList(res.data)
        console.log(list)
        })
      }
      if (memberList.length == 0) {
        console.log('작동테스트')
        GetMember().then((res) => {
          setMemberList(res.data)
        })
      }
    })

    var title = []
    const PushTitle = ()=>{
      if(OneList.length!=0){
        for(var i =0;i<OneList.length;i++){
          if(OneList[i].wr_id==route.params.id){
            var date = OneList[i].wr_datetime
            date = date.substring(0,10)
            title.push(<TitleItem title={OneList[i].wr_subject} name={OneList[i].wr_name} date={date} img={OneList[i].as_thumb} main={OneList[i].wr_content}></TitleItem>)
          }
        }
      }
      return title
    }

    const StPush = () => {
      var stp = []

        for (var i = 0; i < OneList.length; i++) {
          if (OneList[i].wr_parent == route.params.id && OneList[i].wr_is_comment == 1) {
            for (var j = 0; j < memberList.length; j++) {
              if (OneList[i].mb_id == memberList[j].mb_id) {
                stp.push(<SmallText name={memberList[j].mb_name} id={OneList[i].mb_id} date={OneList[i].wr_datetime.substr(5, 14)} content={OneList[i].wr_content}></SmallText>)
              }
            }
          }
        }

      if (stp.length == 0) {
        return <View style={{width:chartWidth,justifyContent:"center",alignItems:"center"}}><View style={{borderWidth:0.5,borderColor:'gray',borderRadius:10,justifyContent:"center",alignItems:"center"}}><Text style={{color:'gray',margin:20}}>등록된 댓글이 없습니다.</Text></View></View>
      }
      return stp
    }


    const [pwss, setPwss] = useState('') //비밀번호
    const [name, setName] = useState('') //이름

    if (memberList.length != 0 && pwss == '') {
      for (var i = 0; i < memberList.length; i++) {
        if (memberList[i].mb_id == newid.toLowerCase()) {
          setPwss(memberList[i].mb_password)
          setName(memberList[i].mb_name)
        }
      }
    }
  


  return (
    <View>
      <View style={{ height: chartHeight, width: chartWidth, backgroundColor: 'white' }}>
        {/* 상단 이미지 */}
        <ScrollView>
          <View style={{ marginBottom:100 }}>
            <View style={{ width: chartWidth, marginTop: 50 }}>
              <ImageBackground source={event} style={{ width: chartWidth, height: chartHeight / 7 }}>
              </ImageBackground>
              <Text style={{ position: 'absolute', color: "white", fontSize: 20, fontWeight: 'bold', top: 40, left: 10 }}>시공사례</Text>
            </View>
            <PushTitle></PushTitle>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <StPush></StPush>
            </ScrollView>


            { newid!='로그인해주세요'  ? <View style={{ justifyContent: 'center', alignItems: "center", marginTop: 15 }}>
                    <View style={{ borderWidth: 0.5, borderColor: 'gray', width: chartWidth - 80, height: 130, backgroundColor: '#e6e6e6', alignItems: "center" }}>
                      <View style={{ backgroundColor: 'white', width: chartWidth - 100, height: 80, marginTop: 10, borderWidth: 0.5, borderColor: 'gray' }}>
                        <TextInput multiline={true} style={{ width: chartWidth - 100, height: 80 }} onChangeText={(text) => setStText(text)} value={stText}></TextInput>
                      </View>
                      <TouchableOpacity onPress={() => insertSmall()}>
                        <View style={{ width: 80, height: 30, borderWidth: 0.5, borderColor: 'gray', marginTop: 5, backgroundColor: 'white', justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ fontWeight: 'bold' }}>등록</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View> : 
                  <View style={{justifyContent:"center",alignItems:"center"}}>
                    <View style={{borderWidth:0.5,borderColor:'gray',borderRadius:10}}>
                      <Text>로그인 후 댓글을 작성할 수 있습니다.</Text>
                    </View>
                  </View>
                    }

          </View>
        </ScrollView>
      </View>

      <HeadHeder></HeadHeder>
      <FootTer></FootTer>

    </View>
  )
}

const TitleItem =(prop) =>{
  const [wHeight,setWHeight] = useState(100);
  return(
    <View>
    <View style={{flexDirection:'row',alignItems:'center',marginTop:10,marginLeft:20}}>
    <Image source={{uri:prop.img}} style={{backgroundColor:'gray',borderRadius:28,width:60,height:60}}></Image>
      <Text style={{marginLeft:5,fontSize:18,fontWeight:'bold',width:chartWidth/1.3}} >{prop.title}</Text>
  </View>

  {/* 작성자 전화번호 이메일 일시 */}
  <View style={{marginLeft:10,marginTop:10}}>
    <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
      <View style={{flexDirection:'row',alignItems:'center',margin:10}}>
        <Image source={user} style={{width:10,height:10,marginLeft:10}}></Image>
        <Text style={{fontSize:13}}>{prop.name}</Text>
        <Image source={clock} style={{width:10,height:10 ,marginLeft:20}}></Image>
        <Text style={{fontSize:13}}>{prop.date}</Text>
      </View>
    <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
    <View style={{width:chartWidth-30,borderWidth:0.4,borderColor:'gray'}}></View>
  </View>


      <WebView
      style={{width:chartWidth,height:wHeight*0.5,marginTop:10}}
      source={{html: prop.main+'<style>img { width: 80%;} p,span,div,b {font-size:30px !important;}</style>'}}
      javaScriptEnabled={true}
  injectedJavaScript ={webViewScript}
  domStorageEnabled={true}
  onMessage={event => {
    setWHeight(parseInt(event.nativeEvent.data))
  }}>
      </WebView>

  </View>
  )
}

const SmallText = (prop) => {
  return (
    <View style={{ marginLeft: 10, borderWidth: 0.5, borderRadius: 5, borderColor: 'gray' }}>
      <View style={{ margin: 5 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold' }}>{prop.name}</Text>
          <Text style={{ fontWeight: '100' }}>({prop.id})</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Image source={clock} style={{ width: 10, height: 10 }}></Image>
          <Text style={{ fontSize: 9, color: 'gray' }}>{prop.date}</Text>
        </View>

        <Text style={{ marginTop: 10, maxWidth: chartWidth *0.5 }}>{prop.content}</Text>
      </View>
    </View>
  )
}

export default BestView;