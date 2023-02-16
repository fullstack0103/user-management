import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet, Linking, Alert, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { IUser, IUserDetailProps } from '../../types';
import { colors } from '../../theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { OpenURLTextProps } from '../../types';
import { checkSiteUrl } from '../../utils';
import openMap from 'react-native-open-maps';

export const UserDetail: React.FC<IUserDetailProps> = ({ userId }) => {
  const { users } = useSelector((state: any) => state.users);

  const [userInfo, setUserInfo] = useState<IUser>();

  // eslint-disable-next-line react/no-unstable-nested-components
  const OpenURLText = ({ url, children }: OpenURLTextProps) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.linkText}>{children}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (users && userId) {
      const selectedUser = users.find((user: IUser) => user.id === userId);
      setUserInfo(selectedUser);
    }
  }, [userId, users]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{userInfo?.name}</Text>
      <Text style={styles.username}>{userInfo?.company?.name}</Text>
      <View style={styles.infoWrapper}>
        <Text style={styles.infoTitle}>Contact Information</Text>
        <Text style={{ marginBottom: 10 }}>{userInfo?.email}</Text>
        <TouchableOpacity
          onPress={() =>
            openMap({
              latitude: Number(userInfo?.address?.geo?.lat),
              longitude: Number(userInfo?.address?.geo?.lng),
            })
          }>
          <Text style={styles.linkText}>{userInfo?.address?.street}</Text>
          <Text style={styles.linkText}>{userInfo?.address?.suite}</Text>
          <Text style={styles.linkText}>
            {userInfo?.address?.city} {userInfo?.address?.zipcode}
          </Text>
        </TouchableOpacity>
        <Text>{userInfo?.phone}</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.infoTitle}>Other Information</Text>
        <Text>User Name: {userInfo?.username}</Text>
        {userInfo?.website && (
          <View style={styles.linkWrapper}>
            <Text>Website: </Text>
            <OpenURLText url={checkSiteUrl(userInfo?.website)}>
              {userInfo?.website}
            </OpenURLText>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.black,
  },
  infoWrapper: {
    marginTop: 35,
    marginBottom: 30,
  },
  username: {
    fontSize: 20,
    textAlign: 'center',
  },
  infoTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '500',
    color: colors.black,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: colors.primary_light,
  },
  linkWrapper: {
    flexDirection: 'row',
  },
});
