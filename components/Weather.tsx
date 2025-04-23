import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShowIcon from './ShowIcon';

interface WeatherProps {
  forecast: {
    hour: number;
    temp: number;
    icon: string;
  };
}

const Weather: React.FC<WeatherProps> = ({ forecast }) => {
  console.log('Rendering weather for forecast:', forecast);
  return (
    <View style={styles.container}>
      <Text style={styles.hour}>{forecast.hour}h</Text>
      <ShowIcon icon={forecast.icon} size={40} />
      <Text style={styles.temp}>{Math.round(forecast.temp)}°C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  hour: {
    fontSize: 16,
    marginBottom: 5,
  },
  temp: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default Weather; 