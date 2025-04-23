import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShowIcon from './ShowIcon';

interface CurrentWeatherProps {
  data: any;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);

  useEffect(() => {
    if (data && data.list && data.list.length > 0) {
      const firstForecast = data.list[0];
      const currentWeatherData = {
        city: data.city.name,
        date: new Date(firstForecast.dt * 1000).toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
        }),
        time: new Date(firstForecast.dt * 1000).toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        temp: firstForecast.main.temp,
        feels_like: firstForecast.main.feels_like,
        humidity: firstForecast.main.humidity,
        wind_speed: firstForecast.wind.speed,
        icon: firstForecast.weather[0].icon,
        description: firstForecast.weather[0].description,
      };
      setCurrentWeather(currentWeatherData);
    }
  }, [data]);

  if (!currentWeather) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.city}>{currentWeather.city}</Text>
        <Text style={styles.date}>{currentWeather.date}</Text>
        <Text style={styles.time}>{currentWeather.time}</Text>
      </View>

      <View style={styles.mainInfo}>
        <ShowIcon icon={currentWeather.icon} size={120} />
        <Text style={styles.temp}>{Math.round(currentWeather.temp)}°C</Text>
        <Text style={styles.description}>{currentWeather.description}</Text>
        <Text style={styles.feelsLike}>Ressenti {Math.round(currentWeather.feels_like)}°C</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidité</Text>
          <Text style={styles.detailValue}>{currentWeather.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Vent</Text>
          <Text style={styles.detailValue}>{Math.round(currentWeather.wind_speed * 3.6)} km/h</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  date: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  mainInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temp: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  description: {
    fontSize: 24,
    color: '#fff',
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  feelsLike: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CurrentWeather; 