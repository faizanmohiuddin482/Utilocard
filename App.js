/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  const [asyncValue, setAsyncValue] = useState('');
  const [valExist, setValExist] = useState(false);

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('number', value);
      setAsyncValue(value);
      setQrvalue(value);
      setValExist(true);
    } catch (e) {
      console.log(e);
      // saving error
    }
  };

  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem('number');
      if (value !== null) {
        // value previously stored
        setAsyncValue(value);
        setQrvalue(value);
        setValExist(true);
      }
      console.log(value, 'val');
    } catch (e) {
      console.log(e);
    }
  }, []);
  console.log(valExist, 'valExist');
  const changeIt =()=>{
    setValExist(false);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <QRCode size={350} value={qrvalue ? qrvalue : 'NA'} />
        {valExist ? (
          <View>
            <Text style={{marginTop:20}}>{asyncValue}</Text>
            <TouchableOpacity  style={styles.editButton} onPress={changeIt} >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.inputField}
              text={inputText}
              onChangeText={text => setInputText(text)}
              placeholder={asyncValue ? asyncValue : 'Enter Phone Number'}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => storeData(inputText)}>
              <Text style={styles.buttonText}>Generate</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: 'black',
    padding: 5,
    alignItems: 'center',
    marginTop: 5,
    width:40,
  },
  buttonText: {
    color: 'white',
  },
  inputField: {
    flexDirection: 'row',
    marginTop: 30,
    borderWidth: 2,
    height: 40,
    width: 200,
  },
});

export default App;
