import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Weather from './Weather';

interface ForecastWeatherProps {
  data: any;
}

interface ForecastData {
  date: Date;
  hour: number;
  day: string;
  temp: number;
  icon: string;
  humidity: number;
  wind_speed: number;
}

interface DayForecast {
  day: string;
  data: ForecastData[];
}

const ForecastWeather: React.FC<ForecastWeatherProps> = ({ data }) => {
  const [forecastsGrouped, setForecastsGrouped] = useState<DayForecast[]>([]);

  useEffect(() => {
    if (data && data.list) {
      const forecastsData: ForecastData[] = data.list.map((forecast: any) => {
        let forecastDate = new Date(forecast.dt * 1000);
        return {
          date: forecastDate,
          hour: forecastDate.getHours(),
          day: forecastDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          }),
          temp: forecast.main.temp,
          icon: forecast.weather[0].icon,
          humidity: forecast.main.humidity,
          wind_speed: forecast.wind.speed,
        };
      });

      let daysGrouped = forecastsData
        .map((forecast: ForecastData) => forecast.day)
        .filter((day: string, index: number, array: string[]) => array.indexOf(day) === index)
        .slice(0, 5);

      let forecastsGrouped: DayForecast[] = daysGrouped.map((day: string) => {
        const forecasts = forecastsData.filter((forecast: ForecastData) => forecast.day === day);
        return {
          day: day,
          data: forecasts,
        };
      });

      if (forecastsGrouped.length > 0) {
        forecastsGrouped[0].day = "Aujourd'hui";
      }

      setForecastsGrouped(forecastsGrouped);
    }
  }, [data]);

  if (forecastsGrouped.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prévisions sur 5 jours</Text>
      <ScrollView style={styles.forecastScrollView}>
        {forecastsGrouped.map((dayForecast, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{dayForecast.day}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dayForecast.data.map((forecast, forecastIndex) => (
                <Weather key={forecastIndex} forecast={forecast} />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
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
  forecastScrollView: {
    maxHeight: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    paddingLeft: 5,
  },
});

export default ForecastWeather; 