import React,{} from "react";
import {
  StyleSheet,
} from "react-native";



const styles = StyleSheet.create({
    wrapper: {
      marginTop:30,
      height:200,
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
    viewStyle1: {
      backgroundColor : "#fff",
      flex: 1,
      width : 100,
      height : 50,
      marginLeft:10,
      marginRight:10,
      justifyContent: 'center',
      alignItems: 'center'
  },
  cardview :{
    backgroundColor: '#fff',
    height:300,
  
  },
  etitle:{
    fontSize: 25,
    marginTop: 30,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  etitle2:{
    fontSize: 17,
    marginTop: 1,
    marginBottom: 30,
    fontWeight: '300',
    textAlign: 'center',
  },
  reviewc:{
    height:400,
    backgroundColor : "#ff0043",
    marginBottom:40,
  },
  reviewT:{
    fontSize: 23,
    marginTop: 35,
    marginBottom: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'white',
  },
  reviewCard:{
    backgroundColor: '#e0e0eb',
    height:250,
    width:170,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
      marginLeft: 10,
      marginRight: 0,
  },image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  imagetest:{
    borderTopLeftRadius: 1,
      borderTopRightRadius: 10,
      borderBottomLeftRadius:10,
      borderBottomRightRadius:1,
    width:180,
    height:100,
  },
  eventList:{
    marginLeft:15,
    marginRight:2,
  },
  bannerimg:{
    width:400,
    height:180,
  },
  button:{
    color:'black',
  }
  
  })

  export default styles;