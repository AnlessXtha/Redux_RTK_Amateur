import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Aadesh Shrestha" },
  { id: "1", name: "Ronish Shrestha" },
  { id: "2", name: "Pratham Maharjan" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
