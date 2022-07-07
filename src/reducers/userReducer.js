import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
  },
});

export const { loginStart, loginFail, loginSuccess, logout } =
  userSlice.actions;
export default userSlice.reducer;

// let initialState = [];

// export function userReducer(state = initialState, action) {
//   switch (action.type) {
//     case "REGISTER":
//       return {
//         ...state,
//         users: [action.payload],
//       };

//     case "LOGIN":
//       return {
//         ...state,
//         loggedInUser: action.payload,
//       };

//     case "LOGOUT":
//       return {
//         ...state,
//         loggedInUser: action.payload,
//       };

//     default:
//       return state;
//   }
// }
