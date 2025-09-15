import React, { useEffect, useState, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList  } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import songs from './model/data';

const { width, height } = Dimensions.get('window');

export default function App() {
  const[sound, setSound] = useState(null);
  const[songIndex, setSongIndex] = useState(0);
  const[songStatus, setSongStatus] = useState(null);
  const[isPlaying, setIsPlaying] = useState(false);
  const[isLooping, setIsLooping] = useState(false);

const scroollX = useRef(new Animated.Value(0)).current;

useEffect(() => {
  scroollX.addListener(({value}) => {
    const index = Math.round(value / width);
    //console.log(`ScroollX : ${value}`);
    //console.log(index);
    setSongIndex(index);
  });
}, []);

  const renderSongs =({ item, index}) => {
     return(
     <Animated.View style={styles.mainImageWrapper}>
      <View style={[styles.imagewrapper, styles.elevation]}>
        <Image
         source={item.artwork}
         style={styles.musicImage}
        />
      </View>
     </Animated.View> 
     )
  };

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync ( 
      [songIndex].url
    );
    setSound(sound);
    const status = await sound.getStatusAsync();
    await sound.setIsLoopingAsync(isLooping);
    setSongStatus(status);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (sound) {
      sound.unloadAsync();
    }
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    }
  }, [songIndex]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await pause ();
    } else {
      await play();
    }
  }

  const play = async () => {
    if (sound) {
      setIsPlaying(true);
      await sound.playAsync();
    }
  }

  const pause = async () => {
    if (sound) {
      setIsPlaying(false);
      await sound.pauseAsync();
    }
  }

  const skipToNext = () => {

  }

  const skipToPrevious = () => {

  }

  const stop = async () => {

  }

  const repeat = async (vaule) => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}> 
      
      <Animated.FlatList
        data={songs}
        keyExtractor={item => item.id}
        renderItem={renderSongs}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x : scroollX },
              }
            }
          ],
          {useNativeDriver: true }
        )}
      />
  

      <View>
        <Text style={[styles.songContent, styles.songTittle]}>
          {songs[songIndex].title}
        </Text>
        <Text style={[styles.songContent, styles.songArtist]}>
          {songs[songIndex].artist}
        </Text>
      </View>

      <View>
        <Slider
          style={styles.progressBar}
          value={10}
          minimumValue={0}
          maximumValue={100}
          thumbTintColor='#FFD369'
          minimumTrackTintColor='#FFD369'
          maximumTrackTintColor='#fff'
          onSlidingComplete={() => {}}
        />
        <View style={styles.progressLevelDuration}>
          <Text style={styles.progressLabelText}>00:00</Text>
          <Text style={styles.progressLabelText}>00:00</Text>
        </View>
      </View>

      <View style={styles.musicControlsContainer}>
        <TouchableOpacity onPress={skipToPrevious}>
          <Ionicons name='play-skip-back-outline' size={35} color="#FFD369" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Ionicons name='pause-circle' size={75} color="#FFD369" />
        </TouchableOpacity> 
        <TouchableOpacity onPress={skipToNext}>
          <Ionicons name='play-skip-forward-outline' size={35} color="#FFD369" />
        </TouchableOpacity>

      </View>

      </View>
      <View style={styles.footer}>
        <View style={styles.iconWrapper}>
          <TouchableOpacity>
            <Ionicons name='heart-outline' size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name='repeat' size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name='share-outline' size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name='ellipsis-horizontal' size={30} color="#888888" />
          </TouchableOpacity>

        </View>
      </View>

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
  mainImageWrapper:{
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
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
  songContent: {
    textAlign: 'center',
    color: '#EEEEE',
  },
  songTittle: {
  fontSize: 18,
  fontWeight:'600',
  },
  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },
  progressBar: {
    width: 350,
    height: 40,
    marginTop: 20,
  },
  progressLevelDuration: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#fff',
    fontWeight: '500',
  },
  musicControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 10,
  }

});
