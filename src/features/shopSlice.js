import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	basket: [],
	totalPrice: 0,
};

const shopSlice = createSlice({
	name: "shop",
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload;
		},
		addToBasket: (state, action) => {
			const existingProduct = state.basket.find(
				(item) => item.id === action.payload.id
			);

			if (!existingProduct) {
				state.basket.push({ ...action.payload, quantity: 1 });
				state.totalPrice += action.payload.price;
			} else {
				existingProduct.quantity += 1;
				state.totalPrice += action.payload.price;
			}
		},
		increaseQuantity: (state, action) => {
			const product = state.basket.find((item) => item.id === action.payload);
			if (product) {
				product.quantity += 1;
				state.totalPrice += product.price;
			}
		},
		decreaseQuantity: (state, action) => {
			const product = state.basket.find((item) => item.id === action.payload);
			if (product && product.quantity > 1) {
				product.quantity -= 1;
				state.totalPrice -= product.price;
			}
		},
	},
});

export const { setProducts, addToBasket, increaseQuantity, decreaseQuantity } =
	shopSlice.actions;
export default shopSlice.reducer;
