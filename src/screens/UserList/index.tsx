import React from 'react';
import { UserList as UserListController } from '../../components/UserList';
import { IUserListProps } from '../../types';

export const UserList: React.FC<IUserListProps> = props => {
  return <UserListController {...props} />;
};
