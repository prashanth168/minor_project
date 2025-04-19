// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  email: '',
  role: '',
  username: '',
  age: '',
  gender: '',
  city: '',
  specialization: '',
  experience: '',
  token: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      return initialState;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
