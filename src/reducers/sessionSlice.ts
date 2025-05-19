import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the auth user
export interface AuthUser {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  // Add other relevant Firebase User properties if needed
}

// Define a type for the session state
export interface SessionState {
  authUser: AuthUser | null;
}

const initialState: SessionState = {
  authUser: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.authUser = action.payload;
    },
    clearAuthUser: (state) => {
      state.authUser = null;
    },
  },
});

export const { setAuthUser, clearAuthUser } = sessionSlice.actions;
export default sessionSlice.reducer; 