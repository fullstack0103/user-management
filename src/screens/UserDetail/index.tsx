import React from 'react';
import { UserDetail as UserDetailController } from '../../components/UserDetail';
import { IUserDetailScreenProps } from '../../types';

export const UserDetail: React.FC<IUserDetailScreenProps> = props => {
  const { route } = props;

  const userDetailProps = {
    userId: route.params?.userId,
  };

  return <UserDetailController {...userDetailProps} />;
};
