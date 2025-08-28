import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { requireNativeView } from 'expo';
import Slider from '@react-native-community/Slider';

const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}> 
      <View style={[styles.imagewrapper, styles.elevation]}>
        <Image
         source={require('./assets/img/gallo.png')}
         style={styles.musicImage}
        />
      </View>

      <View>
        <Slider/>
      </View>

      </View>
      <View style={styles.footer}>
        <View style={styles.iconWrapper}>
          <TouchableOpacity>
            <Ionicons name='heart-outline' size={30} color="#88888" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name='repeat' size={30} color="#88888" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name='share-outline' size={30} color="#88888" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name='ellipsis-horizontal' size={30} color="#88888" />
          </TouchableOpacity>

        </View>
      </View>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',

  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer:{
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopColor: '#39E45',
    borderWidth: 1,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  imagewrapper: {
    width: 340,
    height: 360,
    marginVertical: 20,
  },
  elevation: {
    elevation: 5,
    shadowOffset:{
      width:5,
      height:5
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84
  },
  musicImage: {
    width:'100%',
    height: '100%',
    borderRadius: 15
  },
});
