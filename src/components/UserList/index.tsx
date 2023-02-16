import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersApi } from '../../store/slices';
import { colors } from '../../theme';
import { IUser, IUserListProps } from '../../types';

export const UserList: React.FC<IUserListProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const { users, isLoading } = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch(getUsersApi());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {isLoading && <Text style={styles.loadingText}>Loading...</Text>}
      {!isLoading &&
        users?.length > 0 &&
        users.map((user: IUser, i: number) => (
          <TouchableOpacity
            style={styles.user}
            key={i}
            onPress={() =>
              navigation.navigate('UserDetail', {
                userId: user?.id,
                name: user?.name || 'UserDetail',
              })
            }>
            <View>
              <Text style={styles.username}>{user?.name}</Text>
              <Text>{user?.email}</Text>
            </View>
          </TouchableOpacity>
        ))}
      <FlatList
        data={users}
        renderItem={({ user }: any) => (
          <TouchableOpacity
            style={styles.user}
            onPress={() =>
              navigation.navigate('UserDetail', {
                userId: user?.id,
                name: user?.name || 'UserDetail',
              })
            }>
            <View>
              <Text style={styles.username}>{user?.name}</Text>
              <Text>{user?.email}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(user: IUser) => `${user.id}`}
      />
      {!isLoading && users?.length === 0 && <Text>No result!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
  },
  user: {
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
  },
});
