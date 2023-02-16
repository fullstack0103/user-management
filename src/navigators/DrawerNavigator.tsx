import React from 'react';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Text, View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import the screens
import { Home } from '../screens/Home';
import { UserList } from '../screens/UserList';
import { UserDetail } from '../screens/UserDetail';
import { colors, icons } from '../theme';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

interface DrawerContentProps {
  navigation: any;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <View style={{ margin: 10 }}>
        <View style={{ margin: 15 }}>
          <Text>User Management</Text>
        </View>
        <DrawerItem label="Home" onPress={() => navigation.navigate('Home')} />
        <DrawerItem
          label="UserList"
          onPress={() => navigation.navigate('UserList')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const HeaderLeft: React.FC<DrawerContentProps> = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{ marginLeft: 20 }}
      onPress={() => navigation.openDrawer()}>
      <Image source={icons.menuList} style={{ tintColor: colors.white }} />
    </TouchableOpacity>
  );
};

const HeaderLeftClose: React.FC<DrawerContentProps> = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{ marginLeft: 20 }}
      onPress={() => navigation.goBack()}>
      <Image source={icons.arrowLeft} style={{ tintColor: colors.white }} />
    </TouchableOpacity>
  );
};

export const Screens: React.FC<DrawerContentProps> = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerStyle: { backgroundColor: colors.primary_light },
        headerTintColor: colors.white,
      }}>
      <Stack.Screen
        name="Home"
        options={{ headerTitle: '', headerTransparent: true }}
        component={Home}
      />
      <Stack.Screen
        name="UserList"
        options={{ headerTitle: 'User list' }}
        component={UserList}
      />
      <Stack.Screen
        name="UserDetail"
        options={({ route }: any) => ({
          title: route.params.name,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => <HeaderLeftClose navigation={navigation} />,
        })}
        component={UserDetail}
      />
    </Stack.Navigator>
  );
};

export const DrawerNavigator = (): JSX.Element => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Screens" component={Screens} />
    </Drawer.Navigator>
  );
};
