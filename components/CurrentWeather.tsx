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
      console.log('Processing current weather data:', data);
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
        icon: firstForecast.weather[0].icon,
        description: firstForecast.weather[0].description,
      };
      console.log('Current weather data processed:', currentWeatherData);
      setCurrentWeather(currentWeatherData);
    } else {
      console.log('No weather data available');
    }
  }, [data]);

  if (!currentWeather) {
    console.log('No current weather to display');
    return null;
  }

  console.log('Rendering current weather:', currentWeather);

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{currentWeather.city}</Text>
      <Text style={styles.date}>{currentWeather.date} - {currentWeather.time}</Text>
      <ShowIcon icon={currentWeather.icon} size={100} />
      <Text style={styles.temp}>{Math.round(currentWeather.temp)}°C</Text>
      <Text style={styles.description}>{currentWeather.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 18,
    marginBottom: 10,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
});

export default CurrentWeather; 