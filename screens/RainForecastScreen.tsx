import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { UrlTile, Marker } from 'react-native-maps';

const API_KEY = 'd6def4924ad5f9a9b59f3ae895b234cb';

const RainForecastScreen = () => {
  const [zoomLevel, setZoomLevel] = useState(8);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 15));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 5));
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Prévisions de pluie</Text>
      </View>
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
            urlTemplate={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}&opacity=0.7`}
            zIndex={1}
            maximumZ={zoomLevel}
            tileSize={256}
          />
          <Marker
            coordinate={{
              latitude: 46.603354,
              longitude: 1.888334,
            }}
            title="Centre de la France"
            description="Point de référence"
          />
        </MapView>
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
            <Text style={styles.zoomButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
            <Text style={styles.zoomButtonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  zoomControls: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 5,
  },
  zoomButton: {
    padding: 5,
  },
  zoomButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: 20,
    borderRadius: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default RainForecastScreen; 