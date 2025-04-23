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
}

interface DayForecast {
  day: string;
  data: ForecastData[];
}

const ForecastWeather: React.FC<ForecastWeatherProps> = ({ data }) => {
  const [forecastsGrouped, setForecastsGrouped] = useState<DayForecast[]>([]);

  useEffect(() => {
    if (data && data.list) {
      console.log('Processing forecast data:', data);
      // Build list with necessary data for display
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
        };
      });
      console.log('Forecasts data processed:', forecastsData);

      // Create list containing only forecast days
      let daysGrouped = forecastsData
        .map((forecast: ForecastData) => forecast.day)
        .filter((day: string, index: number, array: string[]) => array.indexOf(day) === index)
        .slice(0, 5); // Ensure we only get 5 days
      console.log('Days grouped:', daysGrouped);

      // Create list with forecasts grouped by day
      let forecastsGrouped: DayForecast[] = daysGrouped.map((day: string) => {
        const forecasts = forecastsData.filter((forecast: ForecastData) => forecast.day === day);
        return {
          day: day,
          data: forecasts,
        };
      });
      console.log('Forecasts grouped by day:', forecastsGrouped);

      // Modify title for today
      if (forecastsGrouped.length > 0) {
        forecastsGrouped[0].day = "Aujourd'hui";
      }

      setForecastsGrouped(forecastsGrouped);
    } else {
      console.log('No forecast data available');
    }
  }, [data]);

  if (forecastsGrouped.length === 0) {
    console.log('No forecasts to display');
    return null;
  }

  console.log('Rendering forecasts:', forecastsGrouped);

  return (
    <View style={styles.container}>
      <ScrollView>
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
    flex: 1,
    padding: 10,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ForecastWeather; 