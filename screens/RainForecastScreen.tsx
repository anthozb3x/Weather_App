import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { UrlTile } from 'react-native-maps';

const API_KEY = 'd6def4924ad5f9a9b59f3ae895b234cb';

const RainForecastScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 46.603354,
            longitude: 1.888334,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
        >
          <UrlTile
            urlTemplate={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
            zIndex={1}
          />
        </MapView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});

export default RainForecastScreen; 