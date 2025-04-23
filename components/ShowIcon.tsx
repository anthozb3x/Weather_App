import React from 'react';
import { Image } from 'react-native';

interface ShowIconProps {
  icon: string;
  resolution?: string;
  size?: number;
}

const ShowIcon: React.FC<ShowIconProps> = ({ icon, resolution = '2x', size = 50 }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@${resolution}.png`;
  console.log('Rendering weather icon:', { icon, resolution, size, iconUrl });
  return (
    <Image
      source={{ uri: iconUrl }}
      style={{ width: size, height: size }}
    />
  );
};

export default ShowIcon; 