import { NavigationScreenProp } from 'react-navigation';

export interface IUserListProps {
  navigation: NavigationScreenProp<any, any>;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IUserDetailProps {
  userId: number;
}

export interface IUserDetailScreenProps {
  route: any;
  navigation: NavigationScreenProp<any, any>;
}

export interface OpenURLTextProps {
  url: string;
  children: string;
}
