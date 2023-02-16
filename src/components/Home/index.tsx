import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { colors, images } from '../../theme';

export const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.homeHero}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.heroText}>User Management</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroText: {
    fontSize: 30,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
