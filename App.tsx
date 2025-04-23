import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ImageBackground, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';

const API_KEY = 'd6def4924ad5f9a9b59f3ae895b234cb';

export default function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [city, setCity] = useState('');
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
            'La clé API OpenWeather n\'est pas encore activée. Veuillez attendre quelques heures après la création de la clé. En attendant, vous pouvez utiliser une clé API de test : d6def4924ad5f9a9b59f3ae895b234cb'
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

  const searchCity = async () => {
    if (!city.trim()) {
      console.log('Empty city name');
      Alert.alert('Erreur', 'Veuillez entrer une ville');
      return;
    }

    try {
      console.log('Searching for city:', city);
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city},fr&limit=1&appid=${API_KEY}`
      );
      console.log('Geocoding response:', response.data);

      if (response.data.length === 0) {
        console.log('City not found');
        Alert.alert('Erreur', 'Ville non trouvée');
        setLoading(false);
        return;
      }

      const { lat, lon } = response.data[0];
      console.log('City coordinates:', { lat, lon });
      await getWeatherData(lat, lon);
    } catch (error) {
      console.error('Error searching city:', error);
      Alert.alert('Erreur', 'Impossible de trouver la ville');
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <ImageBackground
      source={require('./assets/background.jpg')}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Entrez une ville..."
          placeholderTextColor="#F"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.button} onPress={searchCity}>
          <Text style={styles.buttonText}>Rechercher</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      ) : (
        <>
          <CurrentWeather data={weatherData} />
          <ForecastWeather data={weatherData} />
        </>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 20,
    marginTop: 40,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 20,
    paddingHorizontal: 20,
    color: '#fff',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
