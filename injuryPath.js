import React, { useState, Component, useEffect } from "react";
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
    Alert
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

const chartHeight = Dimensions.get('window').height;
const chartWidth = Dimensions.get('window').width;

import FootTer from './footer.js'
import HeadHeder from "./header.js";

const mt_b = require('./img/mt_b.jpg')
const arrow = require('./img/arrow02.png')

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

const InjuryPath = () => {
    

    const navigation = useNavigation();

    const [select, setSelect] = useState(false)
    const [listCate, SetlistCate] = useState('선택')

    const [state,setState] =useState(false);
    const [sName,setSName] = useState('미신청')
    const [uri,setUri] =useState('')
 
    const [response, setResponse] = React.useState(null);

    let os = Platform.OS
    console.log(os)
    let nowheight;
    if (os == 'ios') {
        nowheight = 100;
    } else {
        nowheight = 60;
    }

    const [newid, setNewid] = useState('');

    async function isFavorite() {
        try {
            return await AsyncStorage.getItem("@super:id");
        } catch (error) {
            return false;
        }
    }

    const result = isFavorite().then((company_id) => {
        setNewid(company_id.toLowerCase())
    });

    console.log(newid)

    async function GetJson() {
        try {
            return await axios.get('http://ip0131.cafe24.com/pluslink/json/stratum_list.json');
        } catch (error) {
            console.log('에러 : ', error)
            return false;
        }
    }

    const [list, setlist] = useState([])
    useEffect(() => {
        refreshData('stratum_list')
        if (list.length == 0) {
            GetJson().then((res) => {
                setlist(res.data)
                
            })
        }
    })

    var mp = []
    function Mainpush (){
        console.log(list)
        for(var i =0;i<list.length;i++){
            if((list[i].cf_id==newid && list[i].cf_state=='신청승인')||(list[i].cf_id==newid &&list[i].cf_state=='신청완료')){
               setState(true)
               SetlistCate(list[i].cf_type)
               setSName(list[i].cf_state)
               setUri(list[i].cf_filename)
               console.log('누구냐 넌:'+uri)
               return <Main from={state} state={list[i].cf_state}></Main>
            }
        }

        return <Main state={"미신청"} uri={""}></Main>
    }


    const Main = (prop) =>{
        return (
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text>신청현황</Text>
                    <Text style={{ position: 'absolute', left: chartWidth / 4 }}>{prop.state}</Text>
                </View>

                <TouchableOpacity onPress={() => setSelect(true)}>
                    <View style={{ flexDirection: 'row', marginTop: 25, alignItems: 'center' }}>
                        <Text>취약계층구분</Text>

                        <View style={{ width: 100, height: 30, borderWidth: 0.7, position: 'absolute', left: chartWidth / 4, top: -10, alignItems: "center", flexDirection: "row" }}>
                            <Text style={{ left: 2 }}>{listCate}</Text>
                            <Image source={arrow} style={{ width: 8, height: 14, right: 5, position: 'absolute' }}></Image>
                        </View>

                    </View>
                </TouchableOpacity>
                

                

                
            </View>
        )
    }


    function req() {
        if (listCate == '선택') {
            Alert.alert('취약계층구분을 선택해주세요')
        } else {
            axios.post('http://ip0131.cafe24.com/pluslink/json/stratum.php', {
                mb_id: newid,
                img: response.base64,
                imgtype: response.type,
                type: listCate

            })
                .then(function (response) {
                    console.log('리스폰스 ', response.request._response);
                    if (response.request._response == '') {
                        Alert.alert('신청이 완료되었습니다.')
                    }
                    else {
                        Alert.alert(response.request._response)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    function del() {
            axios.post('http://ip0131.cafe24.com/pluslink/json/cancelStratum.php', {
                id: newid
            })
                .then(function (response) {
                    console.log('리스폰스 ', response.request._response);
                    if (response.request._response == '') {
                        Alert.alert('신청이 취소되었습니다.')
                    }
                    else {
                        Alert.alert(response.request._response)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    return (
        <View>
            <View style={{ height: chartHeight, width: chartWidth }}>
                <ScrollView>
                    <View style={{ top: nowheight, backgroundColor: 'white' }}>
                        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, backgroundColor: 'white', marginBottom: 200 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ borderWidth: 1, height: 60, width: 60, borderRadius: 27, backgroundColor: 30 }}></View>
                                <Text style={{ fontSize: 20, marginLeft: 10 }}>{newid}</Text>
                            </View>

                            <View style={{ width: chartWidth - 40, borderWidth: 0.5, marginBottom: 5, marginTop: 10 }}></View>
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <View style={{ flexDirection: "row", width: chartWidth }}>
                                    <View style={{ left: chartWidth / 15 }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('정보변경')}>
                                            <Text>정보변경</Text>
                                        </TouchableOpacity>
                                    </View>


                                    <View style={{ left: chartWidth / 4 }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('취약계층인증')}>
                                            <Text>취약계층인증</Text>
                                        </TouchableOpacity>
                                    </View>


                                    <View style={{ left: chartWidth / 2.5 }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('정보변경')}>
                                            <Text>로그아웃</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                            <View style={{ width: chartWidth - 40, borderWidth: 0.5, marginBottom: 5, marginTop: 10 }}></View>


                            <Mainpush></Mainpush>

                            {uri == '' && (<View>
                                <View style={{ flexDirection: 'row', marginTop: 50 }}>
                                <Text>인증이미지첨부</Text>
                            </View>
                            <TouchableOpacity onPress={() =>
                                launchImageLibrary(
                                    {
                                        mediaType: 'photo',
                                        includeBase64: true,
                                        maxHeight: chartHeight,
                                        maxWidth: chartWidth / 1.1,
                                    },
                                    (response) => {
                                        setResponse(response);
                                        console.log(response)
                                        // console.log(JSON.stringify(response))
                                    },
                                )
                            }>
                                <View style={{ marginTop: 15, marginBottom: 15, borderWidth: 0.5, width: 80, height: 30, alignItems: 'center' }}>
                                    <Text style={{ marginTop: 5 }}>사진선택</Text>
                                </View>
                            </TouchableOpacity></View>)}

                            {state && (
                                <View>
                                    <View style={{ flexDirection: 'row', marginTop: 50 }}>
                                <Text>첨부된 인증 이미지</Text>
                            </View>
                                    <View>
                                        <Image
                                            style={{ width: chartWidth - 40,height:chartHeight/2 }}
                                            source={{ uri: 'http://ip0131.cafe24.com' + uri }}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <View style={{ backgroundColor: '#df80ff', width: 80, height: 50, justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>확인</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={()=>{del(),navigation.navigate('홈')}}>
                                            <View style={{ backgroundColor: 'black', width: 80, height: 50, justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold' }}>신청취소</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}

                            {response && (
                                <View>
                                    <View>
                                        <Image
                                            style={{ width: response.width, height: response.height }}
                                            source={{ uri: response.uri }}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                                        <TouchableOpacity onPress={() => req()}>
                                            <View style={{ backgroundColor: '#df80ff', width: 80, height: 50, justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>신청</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <View style={{ backgroundColor: 'black', width: 80, height: 50, justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold' }}>취소</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}


                        </View>
                    </View>


                </ScrollView>
            </View>
            <HeadHeder></HeadHeder>
            <FootTer></FootTer>
            <Modal transparent={true} visible={select}>
                <TouchableOpacity onPress={() => setSelect(false)} style={{ width: chartWidth, height: chartHeight }}>
                    <View style={{ width: 100, position: 'absolute', backgroundColor: 'white', borderWidth: 0.5, left: chartWidth / 3.4, top: chartHeight / 3 }}>
                        <TouchableOpacity onPress={() => { SetlistCate('선택'), setSelect(false) }}>
                            <Text style={{ left: 5, marginTop: 5 }}>선택</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { SetlistCate('장애인'), setSelect(false) }}>
                            <Text style={{ left: 5, marginTop: 5 }}>장애인</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export default InjuryPath