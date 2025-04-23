import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import axios from 'axios';
import CurrentWeather from '../components/CurrentWeather';
import ForecastWeather from '../components/ForecastWeather';

const API_KEY = 'd6def4924ad5f9a9b59f3ae895b234cb';

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getWeatherData = async (lat: number, lon: number) => {
    try {
      console.log('Fetching weather data for coordinates:', { lat, lon });
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=${API_KEY}`
      );
      console.log('Weather data received:', response.data);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (axios.isAxiosError(error)) {
        console.error('API Error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
        
        if (error.response?.status === 401) {
          Alert.alert(
            'Clé API non activée',
            'La clé API OpenWeather n\'est pas encore activée. Veuillez attendre quelques heures après la création de la clé.'
          );
        } else {
          Alert.alert('Erreur', 'Impossible de récupérer les données météo');
        }
      }
      setLoading(false);
    }
  };

  const getLocation = async () => {
    try {
      console.log('Requesting location permission...');
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        Alert.alert('Erreur', 'Permission de localisation refusée');
        setLoading(false);
        return;
      }

      console.log('Getting current position...');
      let location = await Location.getCurrentPositionAsync({});
      console.log('Current position:', location);
      await getWeatherData(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Erreur', 'Impossible de récupérer la localisation');
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.container}
    >
      <StatusBar style="light" />
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <CurrentWeather data={weatherData} />
          <ForecastWeather data={weatherData} />
        </ScrollView>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen; 