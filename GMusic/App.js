import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/|Ionicons';

const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <view styles={styles.main}>

      </view>
      <view style={styles.footer}>
        <view style={styles.iconWrapper}>
          <TouchableOpacity>
            <Ionicons name='heart-outline' size={30} color= "#88888" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='repeat' size={30} color= "#88888" />
          </TouchableOpacity><TouchableOpacity>
            <Ionicons name='share-outline' size={30} color= "#88888" />
          </TouchableOpacity><TouchableOpacity>
            <Ionicons name='ellipsis-horizontal' size={30} color= "#88888" />
          </TouchableOpacity>
        </view>
      </view>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
