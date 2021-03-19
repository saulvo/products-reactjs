import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: {},
	},

	reducers: {
		updateUser(state, action) {
			state.user = action.payload;
    },
	},
});

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
