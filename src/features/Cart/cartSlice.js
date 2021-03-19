import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		list: [],
	},

	reducers: {
		addCart(state, action) {
			state.list.push(action.payload);
		},

		updateQuantity(state, action) {
			const newCartList = [...state.list];
			const updateCartList = [
				...newCartList.slice(0, action.payload.idx),
				{
					...newCartList[action.payload.idx],
					quantity: action.payload.newQuantity,
					money:
						action.payload.newQuantity * newCartList[action.payload.idx].price,
				},
				...newCartList.slice(action.payload.idx + 1),
			];

			return {
				...state,
				list: updateCartList,
			};
		},

		removeItemCart(state, action) {
			const newCartList = [...state.list];
			return {
				...state,
				list: newCartList.filter((x) => x.prodID !== action.payload),
			};
		},
	},
});

export const { addCart, updateQuantity, removeItemCart } = cartSlice.actions;
export default cartSlice.reducer;
