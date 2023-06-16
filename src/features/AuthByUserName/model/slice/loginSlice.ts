import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema, LOGIN_SLICE_NAME } from '../types/loginSchema';
import { loginByUsername } from '../services/loginByUserName/loginByUserName';

export const initialState: LoginSchema = {
  username: '',
  password: '',
  isLoading: false,
};

export const loginSlice = createSlice({
  name: LOGIN_SLICE_NAME,
  initialState,
  reducers: {
    setUsetname: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginByUsername.pending, (state) => {
      console.log('login pending');
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(loginByUsername.fulfilled, (state, action) => {
      console.log('login success');
      console.log('Login payload', action.payload);
      state.isLoading = false;
    });
    builder.addCase(loginByUsername.rejected, (state, action) => {
      console.log('login rejected');
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
