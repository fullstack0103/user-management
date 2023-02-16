import {
  PayloadAction,
  combineReducers,
  createAction,
  createSlice,
} from '@reduxjs/toolkit';

const prefix = 'users';

const users = createSlice({
  name: `${prefix}/users`,
  initialState: [],
  reducers: {
    setUsers: (state, { payload }: PayloadAction) => payload,
  },
});

const isLoading = createSlice({
  name: `${prefix}/isLoading`,
  initialState: false,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => payload,
  },
});

export default combineReducers({
  users: users.reducer,
  isLoading: isLoading.reducer,
});

// actions
export const { setUsers } = users.actions;
export const { setIsLoading } = isLoading.actions;

export const getUsersApi = createAction(`${prefix}/getUsersApi`);
