/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';


const App = () => {
  const [inputText,setInputText] = useState('');
  const [qrvalue,setQrvalue] = useState('');
  console.log(inputText,'input')
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
     <QRCode value={qrvalue ? qrvalue : 'NA'} />
     <TextInput text={inputText} onChangeText={(text)=>setInputText(text)} placeholder='Enter Phone Number' />
     <TouchableOpacity style={styles.button} onPress={()=>setQrvalue(inputText)}>
       <Text>Generate</Text>
     </TouchableOpacity>
     </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 container:{
   flex:1,
   alignItems:'center',
   justifyContent:'center',
   textAlign:'center',
   backgroundColor:'white'
 },
 button:{
   backgroundColor:'red',
   padding:10,
   alignItems:'center',
   marginTop:30
 }
});

export default App;
