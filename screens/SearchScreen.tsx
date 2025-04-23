import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrentWeather from '../components/CurrentWeather';
import ForecastWeather from '../components/ForecastWeather';

const API_KEY = 'd6def4924ad5f9a9b59f3ae895b234cb';
const RECENT_SEARCHES_KEY = 'recent_searches';

const SearchScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const searches = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (searches) {
        setRecentSearches(JSON.parse(searches));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  };

  const saveRecentSearch = async (searchCity: string) => {
    try {
      const updatedSearches = [searchCity, ...recentSearches.filter(s => s !== searchCity)].slice(0, 5);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
    } catch (error) {
      console.error('Error saving recent search:', error);
    }
  };

  const searchCity = async () => {
    if (!city.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer une ville');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city},fr&limit=1&appid=${API_KEY}`
      );

      if (response.data.length === 0) {
        Alert.alert('Erreur', 'Ville non trouvée');
        setLoading(false);
        return;
      }

      const { lat, lon } = response.data[0];
      await getWeatherData(lat, lon);
      saveRecentSearch(city);
    } catch (error) {
      console.error('Error searching city:', error);
      Alert.alert('Erreur', 'Impossible de trouver la ville');
      setLoading(false);
    }
  };

  const getWeatherData = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      Alert.alert('Erreur', 'Impossible de récupérer les données météo');
      setLoading(false);
    }
  };

  const handleRecentSearchPress = (selectedCity: string) => {
    setCity(selectedCity);
    searchCity();
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Entrez une ville..."
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.button} onPress={searchCity}>
          <Text style={styles.buttonText}>Rechercher</Text>
        </TouchableOpacity>
      </View>

      {recentSearches.length > 0 && (
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.recentSearchesTitle}>Recherches récentes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentSearchItem}
                onPress={() => handleRecentSearchPress(search)}
              >
                <Text style={styles.recentSearchText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      ) : weatherData ? (
        <ScrollView style={styles.contentScrollView}>
          <CurrentWeather data={weatherData} />
          <ForecastWeather data={weatherData} />
        </ScrollView>
      ) : null}
    </ImageBackground>
  );
};

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
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#fff',
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  recentSearchesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  recentSearchesTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  recentSearchItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  recentSearchText: {
    color: '#fff',
    fontSize: 14,
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
  contentScrollView: {
    flexGrow: 1,
  },
});

export default SearchScreen; 